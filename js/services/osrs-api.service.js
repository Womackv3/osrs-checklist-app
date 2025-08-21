// OSRS API Service for player stats and group ironman data
class OSRSApiService {
    constructor() {
        this.proxies = [
            '/api/proxy?url=',  // Our Cloudflare Pages Function (primary)
            'https://corsproxy.io/?',
            'https://proxy.cors.sh/',
            'https://api.allorigins.win/raw?url=',
            'https://cors-proxy.fringe.zone/',
            'https://cors.eu.org/',
            'https://cors-anywhere.herokuapp.com/',
            'https://api.codetabs.com/v1/proxy?quest=',
            'https://thingproxy.freeboard.io/fetch/'
        ];

        this.skillNames = [
            'overall', 'attack', 'defence', 'strength', 'hitpoints', 'ranged', 'prayer', 'magic',
            'cooking', 'woodcutting', 'fletching', 'fishing', 'firemaking', 'crafting', 'smithing',
            'mining', 'herblore', 'agility', 'thieving', 'slayer', 'farming', 'runecraft', 'hunter', 'construction'
        ];

        this.skillMapping = {
            'attack': 0, 'strength': 1, 'defence': 2, 'ranged': 3, 'prayer': 4, 'magic': 5, 'runecraft': 6, 'construction': 7,
            'hitpoints': 8, 'agility': 9, 'herblore': 10, 'thieving': 11, 'crafting': 12, 'fletching': 13, 'slayer': 14, 'hunter': 15,
            'mining': 16, 'smithing': 17, 'fishing': 18, 'cooking': 19, 'firemaking': 20, 'woodcutting': 21, 'farming': 22
        };

        this.skillMaxLevels = {
            'attack': 99, 'strength': 99, 'defence': 99, 'ranged': 99, 'prayer': 99, 'magic': 99, 'runecraft': 99, 'construction': 99,
            'hitpoints': 99, 'agility': 99, 'herblore': 99, 'thieving': 99, 'crafting': 99, 'fletching': 99, 'slayer': 99, 'hunter': 99,
            'mining': 99, 'smithing': 99, 'fishing': 99, 'cooking': 99, 'firemaking': 99, 'woodcutting': 99, 'farming': 99
        };

        this.currentPlayerName = null;
        this.currentPlayerStats = null;
    }

    // Individual Player Data Methods
    async fetchPlayerDataWithProxy(username) {
        const hiscoresUrl = `https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${encodeURIComponent(username)}`;
        
        for (let i = 0; i < this.proxies.length; i++) {
            try {
                console.log(`Trying proxy ${i + 1}/${this.proxies.length}: ${this.proxies[i]}`);
                
                let proxyUrl;
                if (this.proxies[i].includes('codetabs')) {
                    proxyUrl = this.proxies[i] + encodeURIComponent(hiscoresUrl);
                } else {
                    proxyUrl = this.proxies[i] + hiscoresUrl;
                }
                
                const response = await fetch(proxyUrl, {
                    method: 'GET',
                    headers: {
                        'User-Agent': 'Iron-Bible/1.0'
                    }
                });
                
                if (!response.ok) {
                    console.log(`Proxy ${i + 1} failed with status: ${response.status}`);
                    
                    // Handle 404 specifically - player not found on hiscores
                    if (response.status === 404) {
                        const errorText = await response.text();
                        if (errorText === 'PLAYER_NOT_FOUND') {
                            throw new Error('PLAYER_NOT_FOUND');
                        }
                    }
                    
                    continue;
                }
                
                const csvData = await response.text();
                
                // Validate that we got proper CSV data
                if (csvData && csvData.includes(',') && !csvData.includes('<!DOCTYPE')) {
                    console.log(`Success with proxy ${i + 1}`);
                    return csvData;
                } else {
                    console.log(`Proxy ${i + 1} returned invalid data`);
                    continue;
                }
                
            } catch (error) {
                console.log(`Proxy ${i + 1} error:`, error.message);
                
                // If player not found, don't try other proxies
                if (error.message === 'PLAYER_NOT_FOUND') {
                    throw error;
                }
                
                continue;
            }
        }
        
        throw new Error(`Unable to fetch player data for "${username}". All proxy services are currently unavailable. Please try again later.`);
    }

    parseHiscoresData(data) {
        const lines = data.trim().split('\n');
        const stats = {};
        
        this.skillNames.forEach((skill, index) => {
            if (lines[index]) {
                const parts = lines[index].split(',');
                
                // Parse values with proper validation - avoid -1 ranks becoming levels
                let rank = parseInt(parts[0]);
                let level = parseInt(parts[1]);
                let xp = parseInt(parts[2]);
                
                // Handle unranked players (rank = -1) properly
                if (isNaN(rank) || rank < 1) rank = -1;
                if (isNaN(level) || level < 1) level = 1;
                if (isNaN(xp) || xp < 0) xp = 0;
                
                // For skills with -1 rank, ensure level is still valid
                if (rank === -1 && level === 1 && xp === 0) {
                    // This might be a skill that hasn't been trained yet
                    level = 1;
                    xp = 0;
                }
                
                stats[skill] = {
                    rank: rank,
                    level: level,
                    xp: xp
                };
            } else {
                // If line is missing, provide default values
                stats[skill] = {
                    rank: -1,
                    level: 1,
                    xp: 0
                };
            }
        });
        
        return stats;
    }

    async lookupPlayer(username) {
        if (!username) {
            throw new Error('Username is required');
        }

        try {
            console.log(`Looking up player: ${username}`);
            const data = await this.fetchPlayerDataWithProxy(username);
            const stats = this.parseHiscoresData(data);
            
            // Save to localStorage and instance variables
            this.currentPlayerName = username;
            this.currentPlayerStats = stats;
            
            localStorage.setItem('osrs_player_name', username);
            localStorage.setItem('osrs_player_stats', JSON.stringify(stats));
            
            // Update global window references for backward compatibility
            window.currentPlayerName = username;
            window.currentPlayerStats = stats;
            
            console.log(`Successfully loaded stats for ${username}`);
            return { name: username, stats: stats };
            
        } catch (error) {
            if (error.message === 'PLAYER_NOT_FOUND') {
                throw new Error(`Player "${username}" was not found on the Old School RuneScape hiscores. Please check the spelling and make sure the player has gained enough experience to appear on the hiscores.`);
            } else {
                throw new Error(`Failed to lookup player: ${error.message}`);
            }
        }
    }

    // Group Ironman Methods
    async fetchGroupDataWithProxy(groupName) {
        const groupUrl = `https://secure.runescape.com/m=hiscore_oldschool_ironman/group-ironman/view-group?name=${encodeURIComponent(groupName)}`;
        
        for (let i = 0; i < this.proxies.length; i++) {
            try {
                console.log(`Trying proxy ${i + 1}/${this.proxies.length} for group lookup: ${this.proxies[i]}`);
                
                let proxyUrl;
                if (this.proxies[i].includes('codetabs')) {
                    proxyUrl = this.proxies[i] + encodeURIComponent(groupUrl);
                } else {
                    proxyUrl = this.proxies[i] + groupUrl;
                }
                
                const response = await fetch(proxyUrl, {
                    method: 'GET',
                    headers: {
                        'User-Agent': 'Iron-Bible/1.0'
                    }
                });
                
                if (!response.ok) {
                    console.log(`Proxy ${i + 1} failed with status: ${response.status}`);
                    continue;
                }
                
                const htmlData = await response.text();
                
                // Validate that we got proper HTML data (not an error page)
                if (htmlData && htmlData.includes('<html') && !htmlData.includes('Group not found') && !htmlData.includes('error')) {
                    console.log(`Success with proxy ${i + 1} for group lookup`);
                    return htmlData;
                } else {
                    console.log(`Proxy ${i + 1} returned invalid data or group not found`);
                    continue;
                }
                
            } catch (error) {
                console.log(`Proxy ${i + 1} error:`, error.message);
                continue;
            }
        }
        
        throw new Error(`Unable to fetch group data for "${groupName}". All proxy services are currently unavailable or group not found. Please try again later.`);
    }

    parseGroupIronData(htmlContent, groupName) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');
            
            const groupData = {
                name: groupName,
                members: []
            };

            // Look for the main group table or member sections in the HTML
            const tables = doc.querySelectorAll('table');
            let membersFound = false;

            // Try to find tables containing player data
            tables.forEach(table => {
                const rows = table.querySelectorAll('tr');
                
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    
                    // Look for rows that contain player links
                    const playerLink = row.querySelector('a[href*="hiscorepersonal"]');
                    if (playerLink) {
                        // Fix character encoding issues in player names
                        const rawPlayerName = playerLink.textContent.trim();
                        const cleanPlayerName = rawPlayerName.replace(/[^\w\s-]/g, '_').trim();
                        
                        if (cleanPlayerName) {
                            // Extract total level and other data from the row
                            let totalLevel = '0';
                            let totalXp = '0';
                            
                            // Try to find total level in the same row
                            if (cells.length >= 2) {
                                // Usually the format is: PlayerName | Total Level | Total XP
                                const levelCell = cells[1];
                                const xpCell = cells.length > 2 ? cells[2] : null;
                                
                                if (levelCell) {
                                    const levelText = levelCell.textContent.trim();
                                    // Remove commas and validate number
                                    const cleanLevelText = levelText.replace(/,/g, '');
                                    if (cleanLevelText && !isNaN(cleanLevelText)) {
                                        totalLevel = cleanLevelText;
                                    }
                                }
                                
                                if (xpCell) {
                                    const xpText = xpCell.textContent.trim();
                                    // Remove commas and validate number
                                    const cleanXpText = xpText.replace(/,/g, '');
                                    if (cleanXpText && !isNaN(cleanXpText)) {
                                        totalXp = cleanXpText;
                                    }
                                }
                            }

                            // Create member data with actual skill data
                            const memberData = {
                                name: cleanPlayerName,
                                originalName: rawPlayerName, // Keep original for URL encoding
                                totalLevel: totalLevel,
                                totalXp: totalXp,
                                skills: null // Will be populated with real data
                            };
                            
                            groupData.members.push(memberData);
                            membersFound = true;
                            console.log(`Found member: ${cleanPlayerName} (Level ${totalLevel})`);
                        }
                    }
                });
            });

            // Fallback: If no table structure worked, try to find player links anywhere
            if (!membersFound) {
                const playerLinks = doc.querySelectorAll('a[href*="hiscorepersonal"]');
                
                playerLinks.forEach(link => {
                    const rawPlayerName = link.textContent.trim();
                    const cleanPlayerName = rawPlayerName.replace(/[^\w\s-]/g, '_').trim();
                    
                    if (cleanPlayerName) {
                        const memberData = {
                            name: cleanPlayerName,
                            originalName: rawPlayerName,
                            totalLevel: '0',
                            totalXp: '0',
                            skills: null
                        };
                        
                        groupData.members.push(memberData);
                        console.log(`Found member (fallback): ${cleanPlayerName}`);
                    }
                });
            }

            console.log(`Parsed ${groupData.members.length} members from group: ${groupName}`);
            return groupData;
        } catch (error) {
            throw new Error(`Failed to parse group data: ${error.message}`);
        }
    }

    generateBasicSkillsData(totalLevel) {
        // Generate approximated skill data based on total level
        const avgLevel = Math.max(1, Math.floor(parseInt(totalLevel) / 23) || 1);
        const skills = {};
        
        this.skillNames.forEach(skillName => {
            if (skillName === 'overall') {
                skills[skillName] = {
                    rank: -1,
                    level: totalLevel,
                    xp: 0
                };
            } else {
                const level = Math.min(99, Math.max(1, avgLevel + Math.floor(Math.random() * 10) - 5));
                skills[skillName] = {
                    rank: -1,
                    level: level,
                    xp: this.getXpForLevel(level)
                };
            }
        });
        
        return skills;
    }

    getXpForLevel(level) {
        // Simplified XP calculation for approximation
        if (level <= 1) return 0;
        let xp = 0;
        for (let i = 1; i < level; i++) {
            xp += Math.floor(i + 300 * Math.pow(2, i / 7)) / 4;
        }
        return Math.floor(xp);
    }

    async fetchGroupStats(groupName) {
        try {
            console.log(`Fetching group stats for: ${groupName}`);
            
            // Use CORS proxy for API access
            const htmlContent = await this.fetchGroupDataWithProxy(groupName);
            
            // Parse the HTML to extract group member information
            const groupData = this.parseGroupIronData(htmlContent, groupName);
            
            if (!groupData || !groupData.members || groupData.members.length === 0) {
                throw new Error('No group members found. Please check the group name.');
            }
            
            console.log(`Found ${groupData.members.length} members in group: ${groupName}`);
            
            // Fetch individual stats for each member
            const membersWithStats = [];
            
            for (let index = 0; index < groupData.members.length; index++) {
                const member = groupData.members[index];
                const cleanName = member.name;
                
                console.log(`Fetching stats for member ${index + 1}/${groupData.members.length}: ${cleanName}`);
                
                try {
                    const playerStats = await this.fetchIndividualPlayerStats(cleanName);
                    membersWithStats.push({
                        ...member,
                        skills: playerStats
                    });
                    console.log(`Successfully loaded stats for ${cleanName}`);
                    
                } catch (error) {
                    console.warn(`Failed to fetch individual stats for ${cleanName}:`, error.message);
                    
                    if (error.message.includes('not found on the hiscores')) {
                        // Player not high enough level for hiscores - use basic generated data
                        membersWithStats.push({
                            ...member,
                            skills: this.generateBasicSkillsData(member.totalLevel)
                        });
                    } else {
                        // Other errors - show proxy issues message  
                        // Fallback to generated data if individual fetch fails
                        membersWithStats.push({
                            ...member,
                            skills: this.generateBasicSkillsData(member.totalLevel)
                        });
                    }
                }
            }
            
            return {
                name: groupName,
                members: membersWithStats,
                lastUpdated: new Date().toISOString()
            };
            
        } catch (error) {
            throw new Error(`Failed to fetch group stats: ${error.message}`);
        }
    }

    async fetchIndividualPlayerStats(playerName) {
        try {
            // Use the same fetchPlayerDataWithProxy function as lookupPlayer
            const csvData = await this.fetchPlayerDataWithProxy(playerName);
            const playerStats = this.parseHiscoresData(csvData);
            return playerStats;
        } catch (error) {
            throw new Error(`Failed to fetch individual stats for ${playerName}: ${error.message}`);
        }
    }

    // UI Update Methods
    async updateStatsDisplay(stats, playerName) {
        // Update player name display
        const usernameInput = document.getElementById('username-input');
        if (usernameInput && playerName) {
            usernameInput.value = playerName;
            usernameInput.placeholder = `Current: ${playerName}`;
        }
        
        const statItems = document.querySelectorAll('.stat-item .stat-level');
        
        Object.keys(this.skillMapping).forEach(skillName => {
            const index = this.skillMapping[skillName];
            const skillData = stats[skillName];
            
            if (skillData && statItems[index]) {
                const level = skillData.level;
                const maxLevel = this.skillMaxLevels[skillName];
                statItems[index].textContent = `${level}/${maxLevel}`;
                
                // Add visual indicator for high levels
                const statItem = statItems[index].parentElement;
                if (level >= 99) {
                    statItem.style.background = 'rgba(255, 215, 0, 0.2)'; // Gold for 99
                } else if (level >= 90) {
                    statItem.style.background = 'rgba(0, 255, 0, 0.1)'; // Green for 90+
                } else {
                    statItem.style.background = 'rgba(139, 69, 19, 0.1)'; // Default
                }
            }
        });
        
        console.log(`Updated stats display for ${playerName}`);
    }

    async loadSavedPlayerStats() {
        try {
            // Load from localStorage (IndexedDB-only mode)
            const savedName = localStorage.getItem('osrs_player_name');
            const savedStats = localStorage.getItem('osrs_player_stats');
            
            if (savedName && savedStats) {
                console.log('Loading stats from localStorage:', savedName);
                const stats = JSON.parse(savedStats);
                await this.updateStatsDisplay(stats, savedName);
                this.currentPlayerName = savedName;
                this.currentPlayerStats = stats;
                
                // Update global window references for backward compatibility
                window.currentPlayerName = savedName;
                window.currentPlayerStats = stats;
            } else {
                console.log('No saved player stats found - use "Lookup Player" to load your stats');
            }
        } catch (error) {
            console.error('Error loading saved player stats:', error);
        }
    }

    getCurrentPlayer() {
        return {
            name: this.currentPlayerName,
            stats: this.currentPlayerStats
        };
    }
}

// Create and export singleton instance
window.osrsApiService = new OSRSApiService();

// Backward compatibility - expose key functions globally
window.lookupPlayer = async function(username) {
    try {
        const usernameInput = document.getElementById('username-input');
        const playerName = username || (usernameInput ? usernameInput.value.trim() : '');
        
        if (!playerName) {
            throw new Error('Please enter a username');
        }

        const result = await window.osrsApiService.lookupPlayer(playerName);
        await window.osrsApiService.updateStatsDisplay(result.stats, result.name);
        
        // Save to Firestore if available
        if (window.firestoreService && window.getCurrentUserId()) {
            try {
                await window.firestoreService.saveStats(window.getCurrentUserId(), result.stats);
            } catch (error) {
                console.warn('Failed to save stats to Firestore:', error.message);
            }
        }
        
        return result;
    } catch (error) {
        console.error('Lookup error:', error.message);
        alert(error.message);
        throw error;
    }
};

window.fetchPlayerDataWithProxy = function(username) {
    return window.osrsApiService.fetchPlayerDataWithProxy(username);
};

window.parseHiscoresData = function(data) {
    return window.osrsApiService.parseHiscoresData(data);
};