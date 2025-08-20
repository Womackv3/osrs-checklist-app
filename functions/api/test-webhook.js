/**
 * Test endpoint for RuneLite webhook integration
 * Use this to test webhook functionality with sample data
 */

export async function onRequestGet(context) {
    return new Response(JSON.stringify({
        message: 'RuneLite Webhook Test Endpoint',
        endpoints: {
            'POST /api/runelite-webhook': 'General webhook for all RuneLite events',
            'POST /api/quest-webhook': 'Specific quest completion webhook',
            'POST /api/diary-webhook': 'Specific diary completion webhook',
            'GET /api/runelite-webhook?player=username&type=quest': 'Get stored quest data',
            'POST /api/test-webhook/quest': 'Test quest completion',
            'POST /api/test-webhook/diary': 'Test diary completion'
        },
        samplePayloads: {
            quest: {
                playerName: 'TestPlayer',
                eventType: 'quest',
                questName: 'Cook\'s Assistant',
                completed: true,
                questPoints: 1,
                timestamp: new Date().toISOString()
            },
            diary: {
                playerName: 'TestPlayer',
                eventType: 'diary',
                diaryName: 'Varrock',
                taskName: 'Have Aubury teleport you to the essence mine',
                difficulty: 'easy',
                completed: true,
                timestamp: new Date().toISOString()
            }
        }
    }), {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
}

export async function onRequestPost(context) {
    const { request } = context;
    const url = new URL(request.url);
    const testType = url.pathname.split('/').pop();
    
    try {
        let testData;
        
        if (testType === 'quest') {
            testData = {
                playerName: 'TestPlayer',
                eventType: 'quest',
                questName: 'Cook\'s Assistant',
                completed: true,
                questPoints: 1,
                timestamp: new Date().toISOString()
            };
        } else if (testType === 'diary') {
            testData = {
                playerName: 'TestPlayer',
                eventType: 'diary',
                diaryName: 'Varrock',
                taskName: 'Have Aubury teleport you to the essence mine',
                difficulty: 'easy',
                completed: true,
                timestamp: new Date().toISOString()
            };
        } else {
            return new Response('Invalid test type. Use /quest or /diary', { 
                status: 400,
                headers: { 'Access-Control-Allow-Origin': '*' }
            });
        }
        
        // Forward to the main webhook endpoint
        const webhookUrl = new URL('/api/runelite-webhook', url.origin);
        const response = await fetch(webhookUrl.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });
        
        const result = await response.json();
        
        return new Response(JSON.stringify({
            message: `Test ${testType} event sent successfully`,
            testData,
            webhookResponse: result
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({
            error: error.message,
            testType
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}

export async function onRequestOptions(context) {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400'
        }
    });
}