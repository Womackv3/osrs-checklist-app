class PlayerDataService {
    constructor() {
        this.osrsApiService = window.osrsApiService;
        this.collectionLogAPI = new CollectionLogAPI();
        this.collectionLogRenderer = new CollectionLogRenderer(this.collectionLogAPI);
        this.cacheKey = 'osrs_player_collection_summary';
        this.cacheExpiry = 1000 * 60 * 30; // 30 minutes
        
        // Load cached collection log summary once DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadCachedCollectionSummary());
        } else {
            this.loadCachedCollectionSummary();
        }
    }

    async fetchPlayerData(playerName) {
        const results = {
            playerName: playerName,
            stats: null,
            collectionLog: null,
            errors: []
        };

        // Fetch hiscores data
        try {
            console.log('Fetching hiscores data for:', playerName);
            const hiscoresResult = await this.osrsApiService.lookupPlayer(playerName);
            results.stats = hiscoresResult.stats;
            results.playerName = hiscoresResult.name; // Use capitalized name if available
        } catch (error) {
            console.warn('Failed to fetch hiscores data:', error.message);
            results.errors.push(`Hiscores: ${error.message}`);
        }

        // Fetch collection log data
        try {
            console.log('Fetching collection log data for:', playerName);
            const collectionData = await this.collectionLogAPI.fetchCollectionLogFromAPI(playerName);
            results.collectionLog = collectionData;
        } catch (error) {
            console.warn('Failed to fetch collection log data:', error.message);
            results.errors.push(`Collection Log: ${error.message}`);
        }

        return results;
    }

    updatePlayerStatsDisplay(playerData) {
        if (playerData.stats) {
            // Update regular stats display (existing functionality)
            this.osrsApiService.updateStatsDisplay(playerData.stats, playerData.playerName);
        }

        if (playerData.collectionLog) {
            // Update collection log summary
            this.updateCollectionLogSummary(playerData.collectionLog, playerData.playerName);
        } else {
            // Show helpful error message if no collection log data
            const collectionError = playerData.errors.find(error => error.startsWith('Collection Log:'));
            if (collectionError) {
                this.showCollectionLogError(playerData.playerName, collectionError);
            } else {
                this.hideCollectionLogSummary();
            }
        }
    }

    updateCollectionLogSummary(collectionData, playerName) {
        const summaryContainer = document.getElementById('player-collection-summary');
        
        if (!summaryContainer) {
            console.warn('Collection log summary container not found');
            return;
        }

        // Restore the original HTML structure if it was replaced by error message
        if (!document.getElementById('player-collection-title')) {
            this.restoreCollectionSummaryHTML(summaryContainer);
        }

        const titleElement = document.getElementById('player-collection-title');
        const itemsElement = document.getElementById('player-collection-items');
        const percentageElement = document.getElementById('player-collection-percentage');

        if (!titleElement || !itemsElement || !percentageElement) {
            console.warn('Collection log summary elements not found after restore:', {
                summaryContainer: !!summaryContainer,
                titleElement: !!titleElement,
                itemsElement: !!itemsElement,
                percentageElement: !!percentageElement,
                documentReady: document.readyState,
                statsTabActive: document.getElementById('stats')?.classList.contains('active')
            });
            return;
        }

        // Calculate stats - prefer API totals if available
        let stats;
        if (collectionData.total_collections_finished !== undefined && collectionData.total_collections_available !== undefined) {
            // Use TempleOSRS API provided totals
            stats = {
                totalObtained: collectionData.total_collections_finished,
                totalItems: collectionData.total_collections_available,
                completionPercentage: Math.round((collectionData.total_collections_finished / collectionData.total_collections_available) * 100),
                completedCategories: collectionData.total_categories_finished || 0,
                totalCategories: collectionData.total_categories_available || 0,
                ehc: collectionData.ehc,
                ehcGilded: collectionData.ehc_gilded
            };
        } else {
            // Fallback to calculating from items data
            stats = this.collectionLogRenderer.calculateCollectionStats(collectionData);
        }
        
        const playerDisplayName = collectionData.player_name_with_capitalization || playerName;

        // Update the display
        titleElement.textContent = `${playerDisplayName}'s Collection Log`;
        itemsElement.textContent = `${stats.totalObtained}/${stats.totalItems}`;
        percentageElement.textContent = `${stats.completionPercentage}%`;

        // Show the summary with success styling
        summaryContainer.style.display = 'block';
        summaryContainer.className = 'collection-header'; // Reset to success styling

        // Cache the collection log summary data
        this.saveCollectionSummaryToCache(playerDisplayName, stats, collectionData);

        console.log(`Updated collection log summary for ${playerDisplayName}:`, {
            items: `${stats.totalObtained}/${stats.totalItems}`,
            percentage: `${stats.completionPercentage}%`
        });
    }

    hideCollectionLogSummary() {
        const summaryContainer = document.getElementById('player-collection-summary');
        if (summaryContainer) {
            summaryContainer.style.display = 'none';
        }
    }

    showCollectionLogError(playerName, errorMessage) {
        const summaryContainer = document.getElementById('player-collection-summary');
        if (!summaryContainer) return;

        // Show the container with error message
        summaryContainer.style.display = 'block';
        summaryContainer.className = 'collection-header collection-error';

        summaryContainer.innerHTML = `
            <div class="collection-error-content">
                <h2>⚠️ Collection Log Not Found</h2>
                <p><strong>${playerName}</strong> needs TempleOSRS plugin setup.</p>
                
                <div class="templeosrs-setup">
                    <h3>Quick Setup Guide:</h3>
                    <ol>
                        <li><strong>Install TempleOSRS Plugin:</strong>
                            <ul>
                                <li>RuneLite → Plugin Hub → Search "TempleOSRS"</li>
                                <li>Install plugin</li>
                            </ul>
                        </li>
                        <li><strong>Sync Collection Log:</strong>
                            <ul>
                                <li>Login with RuneLite</li>
                                <li>Open Collection Log (Achievement Diaries tab)</li>
                                <li>Browse all categories (Bosses, Clues, Raids)</li>
                                <li>Wait 2-5 minutes</li>
                            </ul>
                        </li>
                        <li><strong>Search again</strong> to see collection log stats!</li>
                    </ol>
                </div>
                
                <div class="error-note">
                    <p>Plugin only syncs categories you view in-game.</p>
                </div>
            </div>
        `;

        console.log(`Showing collection log setup instructions for ${playerName}`);
    }

    restoreCollectionSummaryHTML(summaryContainer) {
        // Restore the original HTML structure for collection log summary
        summaryContainer.innerHTML = `
            <h2 id="player-collection-title">Collection Log</h2>
            <div class="collection-stats">
                <div class="collection-stat-item">
                    <div class="collection-stat-label">Total Items</div>
                    <div class="collection-stat-value" id="player-collection-items">0/1608</div>
                </div>
                <div class="collection-stat-item">
                    <div class="collection-stat-label">Completion</div>
                    <div class="collection-stat-value" id="player-collection-percentage">0%</div>
                </div>
            </div>
        `;
        
        console.log('Restored collection log summary HTML structure');
    }

    validatePlayerName(playerName) {
        if (!playerName || typeof playerName !== 'string') {
            return false;
        }
        
        const cleanName = playerName.trim();
        if (cleanName.length === 0 || cleanName.length > 12) {
            return false;
        }
        
        // Check for valid characters (letters, numbers, spaces, underscores, hyphens)
        const nameRegex = /^[a-zA-Z0-9 _-]+$/;
        return nameRegex.test(cleanName);
    }

    async lookupPlayerWithCollectionLog(username) {
        try {
            // Get username from input if not provided
            const usernameInput = document.getElementById('username-input');
            const playerName = username || (usernameInput ? usernameInput.value.trim() : '');
            
            if (!playerName) {
                throw new Error('Please enter a username');
            }

            if (!this.validatePlayerName(playerName)) {
                throw new Error('Invalid username format. Usernames must be 1-12 characters long and contain only letters, numbers, spaces, underscores, and hyphens.');
            }

            console.log('Looking up player with collection log:', playerName);

            // Fetch both hiscores and collection log data
            const playerData = await this.fetchPlayerData(playerName);

            // Update displays
            this.updatePlayerStatsDisplay(playerData);

            // Save hiscores data to Firestore if available and we have stats
            if (playerData.stats && window.firestoreService && window.getCurrentUserId()) {
                try {
                    await window.firestoreService.saveStats(window.getCurrentUserId(), playerData.stats);
                    console.log('Stats saved to Firestore');
                } catch (error) {
                    console.warn('Failed to save stats to Firestore:', error.message);
                }
            }

            // Show any errors that occurred
            if (playerData.errors.length > 0) {
                console.warn('Some data could not be fetched:', playerData.errors);
                // You could show a non-blocking notification here if desired
            }

            return playerData;

        } catch (error) {
            console.error('Error in lookupPlayerWithCollectionLog:', error);
            
            // Hide collection log summary on error
            this.hideCollectionLogSummary();
            
            // Re-throw to maintain existing error handling behavior
            throw error;
        }
    }

    saveCollectionSummaryToCache(playerName, stats, collectionData) {
        try {
            const cacheData = {
                playerName: playerName,
                stats: stats,
                timestamp: Date.now(),
                // Store minimal collection data for reconstruction
                rawData: {
                    player_name_with_capitalization: collectionData.player_name_with_capitalization,
                    totalObtained: stats.totalObtained,
                    totalItems: stats.totalItems,
                    completionPercentage: stats.completionPercentage
                }
            };
            
            localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
            console.log(`Collection log summary cached for "${playerName}"`);
        } catch (error) {
            console.warn('Failed to cache collection log summary:', error);
        }
    }

    loadCachedCollectionSummary() {
        try {
            const savedData = localStorage.getItem(this.cacheKey);
            if (!savedData) {
                return false;
            }

            const cacheData = JSON.parse(savedData);
            
            // Check if cache is expired
            if (Date.now() - cacheData.timestamp > this.cacheExpiry) {
                console.log('Cached collection log summary expired, removing...');
                this.clearCollectionSummaryCache();
                return false;
            }

            // Restore the collection log summary display
            const summaryContainer = document.getElementById('player-collection-summary');
            if (summaryContainer) {
                this.updateCollectionLogSummaryFromCache(cacheData);
                console.log('Loaded cached collection log summary for:', cacheData.playerName);
                return true;
            }

            return false;
        } catch (error) {
            console.error('Error loading cached collection log summary:', error);
            return false;
        }
    }

    updateCollectionLogSummaryFromCache(cacheData) {
        const summaryContainer = document.getElementById('player-collection-summary');
        const titleElement = document.getElementById('player-collection-title');
        const itemsElement = document.getElementById('player-collection-items');
        const percentageElement = document.getElementById('player-collection-percentage');

        if (!summaryContainer || !titleElement || !itemsElement || !percentageElement) {
            console.warn('Collection log summary elements not found for cache restore');
            return;
        }

        const displayName = cacheData.rawData.player_name_with_capitalization || cacheData.playerName;

        // Update the display with cached data
        titleElement.textContent = `${displayName}'s Collection Log`;
        itemsElement.textContent = `${cacheData.rawData.totalObtained}/${cacheData.rawData.totalItems}`;
        percentageElement.textContent = `${cacheData.rawData.completionPercentage}%`;

        // Show the summary with success styling
        summaryContainer.style.display = 'block';
        summaryContainer.className = 'collection-header'; // Reset to success styling

        console.log(`Restored collection log summary from cache for ${displayName}`);
    }

    clearCollectionSummaryCache() {
        try {
            localStorage.removeItem(this.cacheKey);
            console.log('Collection log summary cache cleared');
        } catch (error) {
            console.warn('Failed to clear collection log summary cache:', error);
        }
    }

    getCachedPlayerName() {
        try {
            const savedData = localStorage.getItem(this.cacheKey);
            if (savedData) {
                const cacheData = JSON.parse(savedData);
                if (Date.now() - cacheData.timestamp <= this.cacheExpiry) {
                    return cacheData.playerName;
                }
            }
        } catch (error) {
            console.warn('Error getting cached player name:', error);
        }
        return null;
    }
}

// Create and expose singleton instance
window.playerDataService = new PlayerDataService();

// Replace the existing lookupPlayer function
window.lookupPlayer = async function(username) {
    return await window.playerDataService.lookupPlayerWithCollectionLog(username);
};