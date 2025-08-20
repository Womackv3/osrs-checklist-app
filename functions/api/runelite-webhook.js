/**
 * Cloudflare Pages Function - General RuneLite Webhook
 * Handles all types of RuneLite plugin events (quests, diaries, levels, etc.)
 */

export async function onRequestPost(context) {
    const { request, env } = context;
    
    try {
        // Optional API key authentication
        const apiKey = request.headers.get('X-API-Key');
        const expectedApiKey = env.RUNELITE_API_KEY;
        
        if (expectedApiKey && apiKey !== expectedApiKey) {
            return new Response('Unauthorized', { 
                status: 401,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        
        // Parse the incoming webhook data
        const contentType = request.headers.get('content-type') || '';
        let data;
        
        if (contentType.includes('application/json')) {
            data = await request.json();
        } else if (contentType.includes('application/x-www-form-urlencoded')) {
            const formData = await request.formData();
            data = Object.fromEntries(formData);
        } else {
            return new Response('Unsupported content type', { status: 400 });
        }
        
        // Validate required fields
        if (!data.playerName || !data.eventType) {
            return new Response('Missing required fields: playerName, eventType', { 
                status: 400 
            });
        }
        
        // Structure the event data
        const eventData = {
            playerName: data.playerName,
            eventType: data.eventType, // 'quest', 'diary', 'level', 'death', 'loot', etc.
            timestamp: data.timestamp || new Date().toISOString(),
            source: 'runelite-webhook',
            ...data // Include all other fields
        };
        
        console.log('RuneLite webhook received:', eventData);
        
        // Process different event types
        let response;
        switch (data.eventType) {
            case 'quest':
                response = await handleQuestEvent(eventData, env);
                break;
            case 'diary':
                response = await handleDiaryEvent(eventData, env);
                break;
            case 'level':
                response = await handleLevelEvent(eventData, env);
                break;
            default:
                response = await handleGenericEvent(eventData, env);
        }
        
        // Return success response with CORS headers
        return new Response(JSON.stringify({
            success: true,
            message: `${data.eventType} event processed`,
            data: eventData,
            result: response
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
            }
        });
        
    } catch (error) {
        console.error('RuneLite webhook error:', error);
        return new Response(JSON.stringify({
            success: false,
            error: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}

async function handleQuestEvent(data, env) {
    if (!data.questName) {
        throw new Error('Quest event missing questName');
    }
    
    const questData = {
        playerName: data.playerName,
        questName: data.questName,
        completed: data.completed || true,
        timestamp: data.timestamp,
        questPoints: data.questPoints || null,
        experience: data.experience || null
    };
    
    // Store in KV if available
    if (env.RUNELITE_PROGRESS_KV) {
        const key = `quest:${questData.playerName}:${questData.questName}`;
        await env.RUNELITE_PROGRESS_KV.put(key, JSON.stringify(questData));
    }
    
    return { type: 'quest', stored: true };
}

async function handleDiaryEvent(data, env) {
    if (!data.diaryName || !data.taskName) {
        throw new Error('Diary event missing diaryName or taskName');
    }
    
    const diaryData = {
        playerName: data.playerName,
        diaryName: data.diaryName,
        taskName: data.taskName,
        difficulty: data.difficulty || 'unknown',
        completed: data.completed || true,
        timestamp: data.timestamp,
        experience: data.experience || null
    };
    
    // Store in KV if available
    if (env.RUNELITE_PROGRESS_KV) {
        const key = `diary:${diaryData.playerName}:${diaryData.diaryName}:${diaryData.taskName}`;
        await env.RUNELITE_PROGRESS_KV.put(key, JSON.stringify(diaryData));
    }
    
    return { type: 'diary', stored: true };
}

async function handleLevelEvent(data, env) {
    if (!data.skill || !data.level) {
        throw new Error('Level event missing skill or level');
    }
    
    const levelData = {
        playerName: data.playerName,
        skill: data.skill,
        level: parseInt(data.level),
        experience: data.experience || null,
        timestamp: data.timestamp
    };
    
    // Store in KV if available
    if (env.RUNELITE_PROGRESS_KV) {
        const key = `level:${levelData.playerName}:${levelData.skill}`;
        await env.RUNELITE_PROGRESS_KV.put(key, JSON.stringify(levelData));
    }
    
    return { type: 'level', stored: true };
}

async function handleGenericEvent(data, env) {
    // Store any other event types
    if (env.RUNELITE_PROGRESS_KV) {
        const key = `event:${data.playerName}:${data.eventType}:${Date.now()}`;
        await env.RUNELITE_PROGRESS_KV.put(key, JSON.stringify(data));
    }
    
    return { type: 'generic', stored: true };
}

// Handle preflight requests
export async function onRequestOptions(context) {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
            'Access-Control-Max-Age': '86400'
        }
    });
}

// Handle GET requests to retrieve stored data
export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const playerName = url.searchParams.get('player');
    const eventType = url.searchParams.get('type');
    
    if (!playerName) {
        return new Response('Missing player parameter', { status: 400 });
    }
    
    try {
        if (!env.RUNELITE_PROGRESS_KV) {
            return new Response(JSON.stringify({ data: [] }), {
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
        }
        
        // List all keys for the player
        const prefix = eventType ? `${eventType}:${playerName}:` : `${playerName}:`;
        const keys = await env.RUNELITE_PROGRESS_KV.list({ prefix });
        
        const results = [];
        for (const key of keys.keys) {
            const data = await env.RUNELITE_PROGRESS_KV.get(key.name);
            if (data) {
                results.push(JSON.parse(data));
            }
        }
        
        return new Response(JSON.stringify({ data: results }), {
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}