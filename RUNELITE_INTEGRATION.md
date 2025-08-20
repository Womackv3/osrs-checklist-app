# RuneLite Webhook Integration

This document describes how to integrate RuneLite plugins with the OSRS Iron Bible app for automatic quest and diary progress tracking.

## Overview

The app now supports receiving webhook data from RuneLite plugins to automatically sync:
- Quest completions
- Achievement Diary task completions  
- Skill level updates
- Other game events

## Webhook Endpoints

### Base URL
When deployed: `https://your-app.pages.dev/api/`
Local testing: `http://localhost:8000/api/`

### Available Endpoints

#### 1. General RuneLite Webhook
**POST** `/api/runelite-webhook`

Handles all types of RuneLite events.

**Payload:**
```json
{
  "playerName": "YourUsername",
  "eventType": "quest|diary|level|death|loot",
  "timestamp": "2025-01-20T12:00:00.000Z",
  // Event-specific fields...
}
```

#### 2. Quest-Specific Webhook  
**POST** `/api/quest-webhook`

**Payload:**
```json
{
  "playerName": "YourUsername", 
  "questName": "Cook's Assistant",
  "completed": true,
  "questPoints": 1,
  "experience": { "cooking": 300 },
  "timestamp": "2025-01-20T12:00:00.000Z"
}
```

#### 3. Diary-Specific Webhook
**POST** `/api/diary-webhook`

**Payload:**
```json
{
  "playerName": "YourUsername",
  "diaryName": "Varrock", 
  "taskName": "Have Aubury teleport you to the essence mine",
  "difficulty": "easy",
  "completed": true,
  "timestamp": "2025-01-20T12:00:00.000Z"
}
```

#### 4. Get Stored Data
**GET** `/api/runelite-webhook?player=YourUsername&type=quest`

Returns stored webhook data for a player.

## Authentication

Optional API key authentication via header:
```
X-API-Key: your-secret-key
```

Set `RUNELITE_API_KEY` environment variable in Cloudflare Pages for authentication.

## Testing

### Test Endpoints
- **GET** `/api/test-webhook` - View documentation and sample payloads
- **POST** `/api/test-webhook/quest` - Send test quest completion
- **POST** `/api/test-webhook/diary` - Send test diary completion

### Manual Testing
Use the "Sync RuneLite" button in the Player Stats section to manually check for webhook data.

## RuneLite Plugin Integration

### Existing Plugins
Several community plugins already support webhooks:
- Discord Notifications Plugin
- Custom Events API plugins

### Custom Plugin Development

Create a RuneLite plugin that sends HTTP POST requests to the webhook endpoints:

```java
// Example quest completion webhook
public void onQuestCompleted(QuestCompleted questCompleted) {
    JsonObject payload = new JsonObject();
    payload.addProperty("playerName", client.getLocalPlayer().getName());
    payload.addProperty("eventType", "quest");
    payload.addProperty("questName", questCompleted.getQuestName());
    payload.addProperty("completed", true);
    payload.addProperty("timestamp", Instant.now().toString());
    
    sendWebhook("https://your-app.pages.dev/api/runelite-webhook", payload);
}
```

### Discord Webhook Bridge
Modify existing Discord webhook plugins to also send data to your app:

1. Install Discord webhook plugin
2. Modify plugin to send to multiple endpoints
3. Add your app's webhook URL as secondary endpoint

## Frontend Integration

The app automatically:
- Syncs progress when looking up a player
- Updates quest/diary checkboxes based on webhook data
- Saves progress to local IndexedDB storage

### Manual Sync
Users can click "Sync RuneLite" button to manually check for new completions.

## Data Storage

Webhook data is stored in:
- **Cloudflare KV** (if configured) - `RUNELITE_PROGRESS_KV` namespace
- **Browser IndexedDB** (frontend fallback)

## Security Considerations

1. **API Key Authentication** - Prevent unauthorized webhook submissions
2. **CORS Headers** - Properly configured for web app access
3. **Data Validation** - All webhook payloads are validated
4. **Rate Limiting** - Consider implementing for production use

## Deployment

1. **Cloudflare Pages**: Webhook functions deploy automatically
2. **Environment Variables**: Set `RUNELITE_API_KEY` if using authentication
3. **KV Namespace**: Create `RUNELITE_PROGRESS_KV` for data storage (optional)

## Example Usage

1. **Setup**: Deploy app to Cloudflare Pages with HTTPS
2. **Plugin**: Install/modify RuneLite plugin to send webhooks  
3. **Play**: Complete quests/diary tasks in-game
4. **Sync**: Webhook automatically updates app progress
5. **View**: Check app to see auto-completed items

## Troubleshooting

- **Check Console**: Browser dev tools show sync status
- **Test Endpoint**: Use `/api/test-webhook` to verify functionality  
- **CORS Issues**: Ensure proper domain configuration
- **Authentication**: Verify API key if using authentication

## Future Enhancements

- Real-time WebSocket connections
- Collection log integration
- Combat achievements tracking
- Clue scroll completions
- Boss kill counts