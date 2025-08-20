/**
 * Cloudflare Pages Function - Quest Progress Webhook
 * Receives quest completion data from RuneLite plugins
 */

export async function onRequestPost(context) {
    const { request, env } = context;
    
    try {
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
        if (!data.playerName || !data.questName) {
            return new Response('Missing required fields: playerName, questName', { 
                status: 400 
            });
        }
        
        // Structure the quest completion data
        const questData = {
            playerName: data.playerName,
            questName: data.questName,
            completed: data.completed || true,
            timestamp: data.timestamp || new Date().toISOString(),
            source: 'runelite-webhook',
            // Optional fields
            questPoints: data.questPoints || null,
            experience: data.experience || null,
            screenshot: data.screenshot || null
        };
        
        console.log('Quest webhook received:', questData);
        
        // Store in Cloudflare KV if available (optional)
        if (env.QUEST_PROGRESS_KV) {
            const key = `quest:${questData.playerName}:${questData.questName}`;
            await env.QUEST_PROGRESS_KV.put(key, JSON.stringify(questData));
        }
        
        // Return success response with CORS headers
        return new Response(JSON.stringify({
            success: true,
            message: 'Quest progress received',
            data: questData
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });
        
    } catch (error) {
        console.error('Quest webhook error:', error);
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

// Handle preflight requests
export async function onRequestOptions(context) {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400'
        }
    });
}