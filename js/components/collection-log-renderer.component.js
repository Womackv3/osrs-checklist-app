class CollectionLogRenderer {
    constructor(apiService) {
        this.apiService = apiService;
        this.currentCollectionData = null;
    }

    setLoadingState() {
        const loadingEl = document.getElementById('collection-loading');
        const containerEl = document.getElementById('collection-log-container');
        const errorEl = document.getElementById('collection-error');
        
        if (loadingEl) loadingEl.style.display = 'block';
        if (containerEl) containerEl.style.display = 'none';
        if (errorEl) errorEl.style.display = 'none';
    }

    setErrorState() {
        const errorEl = document.getElementById('collection-error');
        const loadingEl = document.getElementById('collection-loading');
        
        if (errorEl) errorEl.style.display = 'block';
        if (loadingEl) loadingEl.style.display = 'none';
    }

    async displayCollectionLog(collectionData, playerName) {
        const loadingEl = document.getElementById('collection-loading');
        const errorEl = document.getElementById('collection-error');
        const containerEl = document.getElementById('collection-log-container');
        
        if (loadingEl) loadingEl.style.display = 'none';
        if (errorEl) errorEl.style.display = 'none';
        if (containerEl) containerEl.style.display = 'block';
        
        // Store collection data for reference
        this.currentCollectionData = collectionData;
        window.currentCollectionData = collectionData;
        
        // Calculate collection statistics
        const stats = this.calculateCollectionStats(collectionData);
        
        // Update collection header with stats
        await this.renderCollectionHeader(collectionData, playerName, stats);
        
        // Display all categories
        await this.displayCollectionCategories(collectionData);
    }

    async renderCollectionHeader(collectionData, playerName, stats) {
        const collectionHeader = document.getElementById('collection-header');
        if (!collectionHeader) return;
        
        const playerDisplayName = collectionData.player_name_with_capitalization || playerName;
        
        let statsHTML = `
            <h2>${playerDisplayName}'s Collection Log</h2>
            <div class="collection-stats">
                <div class="collection-stat-item">
                    <div class="collection-stat-label">Total Items</div>
                    <div class="collection-stat-value">${stats.totalObtained}/${stats.totalItems}</div>
                </div>
                <div class="collection-stat-item">
                    <div class="collection-stat-label">Completion</div>
                    <div class="collection-stat-value">${stats.completionPercentage}%</div>
                </div>
                <div class="collection-stat-item">
                    <div class="collection-stat-label">Categories</div>
                    <div class="collection-stat-value">${stats.completedCategories}/${stats.totalCategories}</div>
                </div>`;
        
        // Add EHC stats if available
        if (stats.ehc !== undefined) {
            statsHTML += `
                <div class="collection-stat-item">
                    <div class="collection-stat-label">EHC</div>
                    <div class="collection-stat-value">${stats.ehc}</div>
                </div>`;
        }
        
        if (stats.ehcGilded !== undefined) {
            statsHTML += `
                <div class="collection-stat-item">
                    <div class="collection-stat-label">EHC (Gilded)</div>
                    <div class="collection-stat-value">${stats.ehcGilded}</div>
                </div>`;
        }

        statsHTML += `</div>`;
        collectionHeader.innerHTML = statsHTML;
    }

    calculateCollectionStats(collectionData) {
        // Use TempleOSRS API data structure
        if (collectionData.total_collections_available && collectionData.total_collections_finished) {
            return {
                totalObtained: collectionData.total_collections_finished,
                totalItems: collectionData.total_collections_available,
                completionPercentage: Math.round((collectionData.total_collections_finished / collectionData.total_collections_available) * 100),
                completedCategories: 0,
                totalCategories: 0,
                ehc: collectionData.ehc,
                ehcGilded: collectionData.ehc_gilded
            };
        }

        // Fallback: calculate from items data
        let totalItems = 0;
        let obtainedItems = 0;
        let completedCategories = 0;
        let totalCategories = 0;

        const items = collectionData.items || collectionData;
        
        for (const [categoryName, category] of Object.entries(items)) {
            totalCategories++;
            let categoryItems = 0;
            let categoryObtained = 0;
            
            if (Array.isArray(category) && category.length >= 0) {
                categoryItems = category.length;
                categoryObtained = category.filter(item => {
                    if (typeof item === 'object' && item !== null) {
                        return item.obtained === true || item.obtained === 1;
                    }
                    return false;
                }).length;
                
                if (categoryObtained === categoryItems && categoryItems > 0) {
                    completedCategories++;
                }
            }
            
            totalItems += categoryItems;
            obtainedItems += categoryObtained;
        }

        return {
            totalObtained: obtainedItems,
            totalItems: totalItems,
            completionPercentage: totalItems > 0 ? Math.round((obtainedItems / totalItems) * 100) : 0,
            completedCategories: completedCategories,
            totalCategories: totalCategories
        };
    }

    async displayCollectionCategories(collectionData) {
        const categoriesContainer = document.getElementById('collection-categories');
        if (!categoriesContainer) return;
        
        categoriesContainer.innerHTML = '';
        
        // TempleOSRS API returns data in collectionData.items
        const items = collectionData.items || collectionData;
        console.log('Displaying categories for items:', items);
        console.log('Items keys:', Object.keys(items));
        
        try {
            // Try to get all available categories from TempleOSRS
            const categoriesData = await this.apiService.fetchCategories();
            
            if (categoriesData) {
                // First show any categories that actually have data
                for (const [categoryName, category] of Object.entries(items)) {
                    if (Array.isArray(category) && category.length > 0) {
                        console.log(`Found category with data: ${categoryName}`, category);
                        const categoryInfo = categoriesData[categoryName];
                        const categoryElement = this.createCategoryElement(categoryName, category, categoryInfo);
                        categoriesContainer.appendChild(categoryElement);
                    }
                }
                
                // Then show main categories (even if empty)
                const mainCategories = ['Bosses', 'Raids', 'Clue Scrolls', 'Minigames', 'Other'];
                for (const categoryName of mainCategories) {
                    const category = items[categoryName] || [];
                    if (!items.hasOwnProperty(categoryName) || Array.isArray(category) && category.length === 0) {
                        const categoryInfo = categoriesData[categoryName];
                        const categoryElement = this.createCategoryElement(categoryName, category, categoryInfo);
                        categoriesContainer.appendChild(categoryElement);
                    }
                }
            } else {
                throw new Error('Could not load categories');
            }
        } catch (error) {
            console.warn('Could not load all collection log categories, showing available data only:', error);
            this.displayPlayerCategories(items, categoriesContainer);
        }
        
        // Show sync instructions if very limited data
        const totalCategoriesInData = Object.keys(items).length;
        if (totalCategoriesInData <= 2) {
            this.showSyncInstructions(categoriesContainer, totalCategoriesInData);
        }
    }

    displayPlayerCategories(items, categoriesContainer) {
        // Fallback: show only categories that have data
        const sortedCategories = Object.entries(items)
            .filter(([categoryName, category]) => {
                return Array.isArray(category);
            })
            .sort(([a], [b]) => a.localeCompare(b));

        if (sortedCategories.length <= 1) {
            categoriesContainer.innerHTML = `
                <div class="collection-education">
                    <h3>Limited Collection Log Data</h3>
                    <p>Only ${sortedCategories.length} category found. For complete collection log data:</p>
                    <ol>
                        <li>Install the <strong>TempleOSRS</strong> plugin in RuneLite</li>
                        <li>Login to your OSRS account in-game</li>
                        <li>Open your Collection Log interface (Achievement Diaries → Collection Log)</li>
                        <li>Browse through each category to sync all data</li>
                        <li>Wait a few minutes for data to sync with TempleOSRS</li>
                        <li>Try searching again</li>
                    </ol>
                    <p><strong>Note:</strong> The TempleOSRS plugin automatically syncs your Collection Log data when you view different categories in-game.</p>
                </div>
            `;
        }

        for (const [categoryName, category] of sortedCategories) {
            const categoryElement = this.createCategoryElement(categoryName, category);
            categoriesContainer.appendChild(categoryElement);
        }
    }

    createCategoryElement(categoryName, category, categoryInfo = null) {
        console.log(`Creating category: ${categoryName}`, category);
        
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'collection-category';
        categoryDiv.setAttribute('data-category', categoryName);

        let obtainedCount = 0;
        let totalItems = 0;

        // Count items first
        if (Array.isArray(category)) {
            for (const item of category) {
                if (item && typeof item === 'object') {
                    totalItems++;
                    const obtained = item.obtained === true || item.obtained === 1;
                    if (obtained) obtainedCount++;
                }
            }
        }

        if (totalItems === 0) {
            categoryDiv.innerHTML = `
                <div class="collection-category-header" onclick="toggleCategoryItems('${categoryName}')">
                    <h3>${this.formatCategoryName(categoryName)}</h3>
                    <span class="collection-category-stats">No items synced yet</span>
                    <span class="collection-category-toggle">▼</span>
                </div>
                <div class="collection-category-items" style="display: none;">
                    <p class="collection-empty-message">
                        No items found for this category. Open the ${categoryName} section in your in-game Collection Log to sync the data.
                    </p>
                </div>
            `;
        } else {
            const itemsHTML = Array.isArray(category) ? category.map(item => {
                if (item && typeof item === 'object') {
                    return this.createItemElement(item);
                }
                return '';
            }).join('') : '';

            const completionPercentage = totalItems > 0 ? Math.round((obtainedCount / totalItems) * 100) : 0;

            categoryDiv.innerHTML = `
                <div class="collection-category-header" onclick="toggleCategoryItems('${categoryName}')">
                    <h3>${this.formatCategoryName(categoryName)}</h3>
                    <span class="collection-category-stats">${obtainedCount}/${totalItems} (${completionPercentage}%)</span>
                    <span class="collection-category-toggle">▼</span>
                </div>
                <div class="collection-category-items" style="display: none;">
                    ${itemsHTML}
                </div>
            `;
        }

        return categoryDiv;
    }

    createItemElement(item) {
        const obtained = item.obtained === true || item.obtained === 1;
        const itemName = this.apiService.getItemName(item.id) || item.name || `Item ${item.id}`;
        
        return `
            <div class="collection-item ${obtained ? 'obtained' : 'not-obtained'}">
                <span class="collection-item-name">${itemName}</span>
                <span class="collection-item-status">${obtained ? '✓' : '✗'}</span>
            </div>
        `;
    }

    formatCategoryName(categoryName) {
        return categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    }

    setPlayerNameInput(playerName) {
        const playerInput = document.getElementById('collection-player-input');
        if (playerInput) {
            playerInput.value = playerName;
        }
    }

    showSyncInstructions(container, categoriesFound) {
        const instructionsDiv = document.createElement('div');
        instructionsDiv.className = 'collection-sync-instructions';
        instructionsDiv.innerHTML = `
            <div class="sync-notice">
                <h3>⚠️ Limited Collection Log Data</h3>
                <p>Only ${categoriesFound} category found. To see your clue scroll items and other collection log data:</p>
                
                <div class="sync-steps">
                    <h4>How to Sync Your Complete Collection Log:</h4>
                    <ol>
                        <li><strong>Install TempleOSRS Plugin</strong> - In RuneLite, go to Plugin Hub and install "TempleOSRS"</li>
                        <li><strong>Login to OSRS</strong> - Make sure you're logged into your account</li>
                        <li><strong>Open Collection Log</strong> - Press the Collection Log button in-game (Achievement Diaries tab)</li>
                        <li><strong>Browse Each Category</strong> - Click through:
                            <ul>
                                <li>Bosses → Browse through boss subcategories</li>
                                <li><strong>Clues</strong> → Click each clue type (Beginner, Easy, Medium, Hard, Elite, Master)</li>
                                <li>Raids → Browse raid categories</li>
                                <li>Minigames → Browse minigame categories</li>
                                <li>Other → Browse other categories</li>
                            </ul>
                        </li>
                        <li><strong>Wait for Sync</strong> - Data syncs automatically as you browse (2-5 minutes)</li>
                        <li><strong>Refresh This Page</strong> - Search again to see updated data</li>
                    </ol>
                </div>
                
                <div class="sync-tip">
                    <p><strong>💡 Tip:</strong> The TempleOSRS plugin only syncs categories you actively view in-game. 
                    Since you mentioned having 12 clue items, make sure to open the Clue Scrolls section 
                    and click through Beginner, Easy, Medium, Hard, Elite, and Master tabs.</p>
                </div>
            </div>
        `;
        
        container.appendChild(instructionsDiv);
    }
}

window.CollectionLogRenderer = CollectionLogRenderer;