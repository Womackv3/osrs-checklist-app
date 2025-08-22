// Group Iron Component
class GroupIronComponent {
    constructor() {
        this.currentGroupData = null;
    }

    // Group Iron Stats Functions
    handleGroupLookupEnter(event) {
        if (event.key === 'Enter') {
            this.lookupGroupStats();
        }
    }

    async lookupGroupStats() {
        const groupName = document.getElementById('group-name-input').value.trim();
        if (!groupName) {
            alert('Please enter a group name');
            return;
        }

        if (!this.validateGroupName(groupName)) {
            alert('Invalid group name format. Group names must be 1-50 characters long and contain only letters, numbers, spaces, underscores, and hyphens.');
            return;
        }

        // Show loading state
        document.getElementById('group-loading').style.display = 'block';
        document.getElementById('group-stats-container').style.display = 'none';
        document.getElementById('group-error').style.display = 'none';

        try {
            // Clear any cached data to force fresh lookup
            await this.clearGroupStatsFromDatabase();
            
            // Fetch fresh group data
            const groupData = await this.fetchGroupStatsFromAPI(groupName);
            
            if (groupData && groupData.members && groupData.members.length > 0) {
                // Save to IndexedDB
                await this.saveGroupStatsToDatabase(groupData);
                
                // Display the stats
                this.displayGroupStats(groupData);
            } else {
                throw new Error('No group data found');
            }
        } catch (error) {
            console.error('Error fetching group stats:', error);
            document.getElementById('group-error').style.display = 'block';
            document.getElementById('group-loading').style.display = 'none';
            
            // Update error message to be more informative
            const errorDiv = document.getElementById('group-error');
            errorDiv.innerHTML = `
                <p><strong>Group lookup failed:</strong> ${error.message}</p>
                <small style="color: #666; font-style: italic; margin-top: 10px; display: block;">
                    Please check the group name and try again. If the issue persists, the group may be private or the backend service may be unavailable.
                </small>
            `;
        }
    }

    validateGroupName(groupName) {
        // Group names must be 1-50 characters and contain only letters, numbers, spaces, underscores, and hyphens
        const groupNameRegex = /^[a-zA-Z0-9 _-]{1,50}$/;
        return groupNameRegex.test(groupName);
    }

    async fetchGroupStatsFromAPI(groupName) {
        try {
            console.log('Looking up group ironman:', groupName);
            
            // Use the existing proxy-based group stats fetching from osrsApiService
            if (window.osrsApiService && window.osrsApiService.fetchGroupStats) {
                const groupData = await window.osrsApiService.fetchGroupStats(groupName);
                
                if (groupData && groupData.members && groupData.members.length > 0) {
                    console.log(`Successfully parsed group "${groupName}" with ${groupData.members.length} members`);
                    return groupData;
                }
            }
            
            throw new Error(`Group "${groupName}" not found or has no members`);
            
        } catch (error) {
            console.error('Error fetching group stats:', error);
            throw new Error(`Failed to fetch group stats: ${error.message}`);
        }
    }

    async fetchGroupDataWithWebFetch(groupName) {
        try {
            console.log(`🌐 Fetching group data for "${groupName}"...`);
            
            // Production-ready web scraping implementation
            // This calls the Cloudflare Worker that handles the web scraping
            const response = await fetch('https://osrs-group-iron-api.matthew-womack91.workers.dev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    groupName: groupName
                })
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Group "${groupName}" not found. Please check the group name and try again.`);
                } else if (response.status === 429) {
                    throw new Error(`Rate limit exceeded. Please wait a moment before trying again.`);
                } else if (response.status >= 500) {
                    throw new Error(`Server error occurred. Please try again later.`);
                } else {
                    throw new Error(`Failed to fetch group data (${response.status}). Please try again.`);
                }
            }

            const groupData = await response.json();
            
            if (!groupData || !groupData.members || groupData.members.length === 0) {
                throw new Error(`No members found for group "${groupName}". The group may be private or empty.`);
            }

            console.log(`✅ Successfully fetched group "${groupName}" with ${groupData.members.length} members`);
            return groupData;
            
        } catch (error) {
            console.error(`❌ Web scraping failed for group "${groupName}":`, error);
            
            // Provide helpful error message for connection issues
            if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
                throw new Error(`Unable to connect to the Group Iron service. 

This could be due to:
• Network connectivity issues
• Cloudflare Worker not deployed yet
• OSRS servers being unavailable

Please check your internet connection and try again. If the issue persists, the OSRS Group Ironman service may be temporarily unavailable.`);
            }
            
            throw error;
        }
    }



    generateBasicSkills() {
        const skills = {};
        // Use the exact same skill order as the main Stats section
        const skillNames = [
            'attack', 'strength', 'defence',
            'ranged', 'prayer', 'magic',
            'runecraft', 'construction', 'hitpoints',
            'agility', 'herblore', 'thieving',
            'crafting', 'fletching', 'slayer',
            'hunter', 'mining', 'smithing',
            'fishing', 'cooking', 'firemaking',
            'woodcutting', 'farming'
        ];
        
        skillNames.forEach(skill => {
            skills[skill] = {
                level: 1,
                xp: 0
            };
        });
        
        // Hitpoints starts at level 10
        skills.hitpoints.level = 10;
        skills.hitpoints.xp = 1154;
        
        return skills;
    }


    displayGroupStats(groupData) {
        document.getElementById('group-loading').style.display = 'none';
        document.getElementById('group-error').style.display = 'none';
        document.getElementById('group-stats-container').style.display = 'block';
        
        // Store group data globally for reference
        this.currentGroupData = groupData;
        window.currentGroupData = groupData;
        
        // Calculate group totals
        const groupTotalLevel = groupData.members.reduce((sum, member) => 
            sum + parseInt(member.totalLevel), 0
        );
        
        const groupTotalContribution = groupData.members.reduce((sum, member) => {
            if (!member.skills) return sum;
            
            const memberXp = Object.values(member.skills).reduce((xpSum, skill) => 
                xpSum + this.getSkillXp(skill), 0
            );
            return sum + memberXp;
        }, 0);
        
        // Update group header with totals
        const groupHeader = document.getElementById('group-header');
        groupHeader.innerHTML = `
            <h2>${groupData.name}</h2>
            <div class="group-info">
                <div class="group-stat-item">
                    <div class="group-stat-label">Members</div>
                    <div class="group-stat-value">${groupData.members.length}</div>
                </div>
                <div class="group-stat-item">
                    <div class="group-stat-label">Total Level</div>
                    <div class="group-stat-value">${groupTotalLevel.toLocaleString()}</div>
                </div>
                <div class="group-stat-item">
                    <div class="group-stat-label">Total XP</div>
                    <div class="group-stat-value">${groupTotalContribution.toLocaleString()}</div>
                </div>
            </div>
        `;
        
        // Display all members
        const groupMembers = document.getElementById('group-members');
        groupMembers.innerHTML = '';
        
        groupData.members.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.className = 'group-member';
            memberDiv.innerHTML = `
                <div class="member-header">
                    <h3>${member.name}</h3>
                    <div class="member-total-level">Total Level: ${member.totalLevel}</div>
                </div>
                <div class="member-stats">
                    ${this.generateMemberStatsHTML(member)}
                </div>
            `;
            groupMembers.appendChild(memberDiv);
        });
        
        // Update skill requirements after group stats are loaded
        if (window.updateRequirements) {
            window.updateRequirements();
        }
    }

    generateMemberStatsHTML(member) {
        if (!member.skills) {
            return '<p class="no-stats">No skill data available</p>';
        }

        // Use the exact same skill order as the main Stats section
        const skillOrder = [
            'attack', 'strength', 'defence',
            'ranged', 'prayer', 'magic',
            'runecraft', 'construction', 'hitpoints',
            'agility', 'herblore', 'thieving',
            'crafting', 'fletching', 'slayer',
            'hunter', 'mining', 'smithing',
            'fishing', 'cooking', 'firemaking',
            'woodcutting', 'farming'
        ];

        let statsHTML = '<div class="member-stats-grid">';
        
        skillOrder.forEach(skillName => {
            const skill = member.skills[skillName];
            if (skill) {
                statsHTML += `
                    <div class="member-stat-item">
                        <img src="Pictures/${skillName}_icon.png" alt="${skillName}" class="stat-icon">
                        <div class="stat-info">
                            <div class="stat-name">${skillName.charAt(0).toUpperCase() + skillName.slice(1)}</div>
                            <div class="stat-level">${skill.level}</div>
                        </div>
                    </div>
                `;
            }
        });
        
        statsHTML += '</div>';
        return statsHTML;
    }

    getSkillXp(skill) {
        if (typeof skill.xp === 'number') {
            return skill.xp;
        }
        if (typeof skill.xp === 'string') {
            return parseInt(skill.xp.replace(/,/g, '')) || 0;
        }
        return 0;
    }

    // IndexedDB Functions for Group Iron Stats
    async saveGroupStatsToDatabase(groupData) {
        try {
            const db = await this.openDatabase();
            const transaction = db.transaction(['groupIronStats'], 'readwrite');
            const objectStore = transaction.objectStore('groupIronStats');
            
            const groupStatsData = {
                id: 'current_group',
                groupName: groupData.name,
                members: groupData.members,
                lastUpdated: new Date().toISOString()
            };
            
            await objectStore.put(groupStatsData);
            console.log('Group Iron stats saved to database successfully');
        } catch (error) {
            console.error('Error saving group stats to database:', error);
        }
    }

    async loadGroupStatsFromDatabase() {
        try {
            const db = await this.openDatabase();
            const transaction = db.transaction(['groupIronStats'], 'readonly');
            const objectStore = transaction.objectStore('groupIronStats');
            const request = objectStore.get('current_group');
            
            return new Promise((resolve, reject) => {
                request.onsuccess = function() {
                    if (request.result) {
                        console.log('Group Iron stats loaded from database successfully');
                        resolve(request.result);
                    } else {
                        resolve(null);
                    }
                };
                request.onerror = function() {
                    reject(request.error);
                };
            });
        } catch (error) {
            console.error('Error loading group stats from database:', error);
            return null;
        }
    }

    async clearGroupStatsFromDatabase() {
        try {
            const db = await this.openDatabase();
            const transaction = db.transaction(['groupIronStats'], 'readwrite');
            const objectStore = transaction.objectStore('groupIronStats');
            
            await objectStore.delete('current_group');
            console.log('Group Iron stats cleared from database successfully');
        } catch (error) {
            console.error('Error clearing group stats from database:', error);
        }
    }

    async openDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('iron-bible-goals', 1);
            
            request.onerror = function() {
                reject(request.error);
            };
            
            request.onsuccess = function() {
                resolve(request.result);
            };
            
            request.onupgradeneeded = function(event) {
                const db = event.target.result;
                
                // Create group iron stats object store if it doesn't exist
                if (!db.objectStoreNames.contains('groupIronStats')) {
                    const groupStatsStore = db.createObjectStore('groupIronStats', { keyPath: 'id' });
                    groupStatsStore.createIndex('groupName', 'groupName', { unique: false });
                    groupStatsStore.createIndex('lastUpdated', 'lastUpdated', { unique: false });
                    console.log('Created group iron stats object store');
                }
            };
        });
    }

    async loadSavedGroupIronStats() {
        try {
            const savedGroupData = await this.loadGroupStatsFromDatabase();
            
            if (savedGroupData) {
                console.log('Loading group iron stats from database:', savedGroupData.groupName);
                
                // Set the group name in the input field
                const groupNameInput = document.getElementById('group-name-input');
                if (groupNameInput) {
                    groupNameInput.value = savedGroupData.groupName;
                }
                
                // Create proper group data structure
                const groupData = {
                    name: savedGroupData.groupName,
                    members: savedGroupData.members || []
                };
                
                // Display the group stats if there are members
                if (groupData.members.length > 0) {
                    this.displayGroupStats(groupData);
                    console.log(`Loaded group "${groupData.name}" with ${groupData.members.length} members from database`);
                }
            } else {
                console.log('No saved group iron stats found in database');
            }
        } catch (error) {
            console.error('Error loading saved group iron stats:', error);
        }
    }
}

// Create and export singleton instance
window.groupIronComponent = new GroupIronComponent();

// Backward compatibility - expose key functions globally
window.lookupGroupStats = function() {
    window.groupIronComponent.lookupGroupStats();
};

window.handleGroupLookupEnter = function(event) {
    window.groupIronComponent.handleGroupLookupEnter(event);
};

window.loadSavedGroupIronStats = function() {
    return window.groupIronComponent.loadSavedGroupIronStats();
};