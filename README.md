# OSRS Checklist App

Old School RuneScape Iron Bible - A comprehensive quest and achievement tracker for ironman accounts.

## Features

- **Quest Tracking**: Complete quest checklist with filtering and search
- **Player Stats**: Real-time player statistics lookup via OSRS API
- **Group Iron Stats**: Track group ironman progress and stats
- **Achievement Progress**: Various achievement and milestone tracking
- **Potion Database**: Complete herblore potion reference
- **Local Storage**: Progress saved locally in your browser

## Deployment to Cloudflare Pages

### Prerequisites
1. Cloudflare account (free tier works)
2. GitHub account
3. Node.js installed locally (for development)

### Step-by-Step Deployment

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/osrs-checklist-app.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to Pages
   - Click "Create a project"
   - Connect your GitHub repository
   - Configure build settings:
     - Build command: `echo "No build needed"`
     - Build output directory: `/`

3. **Deploy**:
   - Click "Save and Deploy"
   - Your app will be available at `https://your-project.pages.dev`

### CORS Proxy

This app includes a built-in Cloudflare Pages Function that acts as a CORS proxy for the OSRS API, eliminating the need for third-party proxy services.

The proxy is available at: `/api/proxy?url=https://secure.runescape.com/...`

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:8000 in your browser.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.