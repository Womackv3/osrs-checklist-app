class CollectionLogAPI {
    constructor() {
        this.templeOSRSBaseURL = 'https://templeosrs.com';
        this.corsProxy = 'https://corsproxy.io/';
        this.itemsCache = null;
    }

    validatePlayerName(playerName) {
        const nameRegex = /^[a-zA-Z0-9 _-]{1,12}$/;
        return nameRegex.test(playerName);
    }

    async fetchCollectionLogFromAPI(playerName) {
        try {
            const url = `${this.corsProxy}?${encodeURIComponent(this.templeOSRSBaseURL)}/api/collection-log/player_collection_log.php?player=${encodeURIComponent(playerName)}`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Player "${playerName}" not found. Make sure the username is correct and the player has synced their collection log with TempleOSRS using the RuneLite plugin.`);
                } else if (response.status === 429) {
                    throw new Error('Too many requests. Please wait a moment and try again.');
                } else {
                    throw new Error(`API request failed with status ${response.status}. Please try again later.`);
                }
            }

            const responseData = await response.json();
            console.log('Raw API Response:', responseData);

            if (!responseData || typeof responseData !== 'object') {
                throw new Error('Invalid response format from TempleOSRS API');
            }

            let collectionData = responseData;
            if (responseData.data && typeof responseData.data === 'object') {
                collectionData = responseData.data;
                console.log('Using nested data:', collectionData);
            }

            if (Array.isArray(collectionData)) {
                collectionData = collectionData[0] || {};
            }

            console.log('Final collection data:', collectionData);
            console.log('Items structure:', collectionData.items);

            if (!collectionData || !collectionData.items) {
                throw new Error(`No collection log data found for "${playerName}". The player may not have synced their collection log with TempleOSRS yet.`);
            }

            return collectionData;

        } catch (error) {
            if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
                throw new Error('Network error: Unable to connect to TempleOSRS API. Please check your internet connection and try again.');
            }
            throw error;
        }
    }

    async fetchItems() {
        if (this.itemsCache) {
            return this.itemsCache;
        }

        try {
            const url = `${this.corsProxy}?${encodeURIComponent(this.templeOSRSBaseURL)}/api/collection-log/items.php`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Items API request failed with status ${response.status}`);
            }

            const responseData = await response.json();
            
            if (responseData && responseData.items) {
                this.itemsCache = responseData.items;
                return this.itemsCache;
            }
            
            throw new Error('Invalid response format from items API');

        } catch (error) {
            console.warn('Could not fetch items database:', error);
            return null;
        }
    }

    async fetchCategories() {
        try {
            const url = `${this.corsProxy}?${encodeURIComponent(this.templeOSRSBaseURL)}/api/collection-log/categories.php`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const categoriesData = await response.json();
                return categoriesData;
            }
            
            return null;

        } catch (error) {
            console.warn('Could not fetch categories:', error);
            return null;
        }
    }

    getItemName(itemId) {
        if (this.itemsCache && this.itemsCache[itemId]) {
            return this.itemsCache[itemId];
        }
        return `Item ${itemId}`;
    }
}

window.CollectionLogAPI = CollectionLogAPI;