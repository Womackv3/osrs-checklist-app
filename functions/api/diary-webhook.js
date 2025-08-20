/**
 * Cloudflare Pages Function - Achievement Diary Webhook
 * Receives diary task completion data from RuneLite plugins
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
        if (!data.playerName || !data.diaryName || !data.taskName) {
            return new Response('Missing required fields: playerName, diaryName, taskName', { 
                status: 400 
            });
        }
        
        // Structure the diary completion data
        const diaryData = {
            playerName: data.playerName,
            diaryName: data.diaryName,
            taskName: data.taskName,
            difficulty: data.difficulty || 'unknown', // easy, medium, hard, elite
            completed: data.completed || true,
            timestamp: data.timestamp || new Date().toISOString(),
            source: 'runelite-webhook',
            // Optional fields
            experience: data.experience || null,
            screenshot: data.screenshot || null,
            requirements: data.requirements || null
        };
        
        console.log('Diary webhook received:', diaryData);
        
        // Store in Cloudflare KV if available (optional)
        if (env.DIARY_PROGRESS_KV) {
            const key = `diary:${diaryData.playerName}:${diaryData.diaryName}:${diaryData.taskName}`;
            await env.DIARY_PROGRESS_KV.put(key, JSON.stringify(diaryData));
        }
        
        // Return success response with CORS headers
        return new Response(JSON.stringify({
            success: true,
            message: 'Diary progress received',
            data: diaryData
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
        console.error('Diary webhook error:', error);
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