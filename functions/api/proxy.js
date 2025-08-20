/**
 * Cloudflare Pages Function - CORS Proxy for OSRS API
 * This handles CORS issues by proxying requests to the OSRS hiscores API
 */

export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');

    // Validate the target URL to prevent abuse
    if (!targetUrl) {
        return new Response('Missing url parameter', { status: 400 });
    }

    // Only allow OSRS domains for security
    const allowedDomains = [
        'secure.runescape.com',
        'oldschool.runescape.com'
    ];

    try {
        const targetUrlObj = new URL(targetUrl);
        if (!allowedDomains.includes(targetUrlObj.hostname)) {
            return new Response('Domain not allowed', { status: 403 });
        }
    } catch (error) {
        return new Response('Invalid URL', { status: 400 });
    }

    try {
        console.log('Proxying request to:', targetUrl);

        // Fetch the target URL
        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'OSRS-Checklist-App/1.0 (https://your-domain.pages.dev)'
            }
        });

        if (!response.ok) {
            console.log(`Target responded with status: ${response.status}`);
            
            // Handle 404 specifically for player not found
            if (response.status === 404) {
                return new Response('PLAYER_NOT_FOUND', { 
                    status: 404 
                });
            }
            
            return new Response(`Target server error: ${response.status}`, { 
                status: response.status 
            });
        }

        // Get the response data
        const data = await response.text();
        console.log('Successfully fetched data, length:', data.length);

        // Return with CORS headers
        return new Response(data, {
            status: response.status,
            statusText: response.statusText,
            headers: {
                'Content-Type': response.headers.get('Content-Type') || 'text/plain',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Cache-Control': 'public, max-age=60' // Cache for 1 minute
            }
        });

    } catch (error) {
        console.error('Proxy error:', error);
        return new Response(`Proxy error: ${error.message}`, { 
            status: 500,
            headers: {
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
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400'
        }
    });
}