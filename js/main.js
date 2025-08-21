// Main Application JavaScript
// This file initializes the OSRS Iron Bible application

class OSRSIronBible {
    constructor() {
        this.initialized = false;
        this.currentUser = null;
        this.services = {};
        this.components = {};
    }

    async initialize() {
        console.log('🏰 Initializing OSRS Iron Bible...');

        try {
            // Wait a bit for Firebase to be fully loaded
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Initialize services
            this.initializeServices();
            
            // Initialize components
            this.initializeComponents();
            
            // Set up authentication
            this.setupAuthentication();
            
            // Initialize UI
            this.initializeUI();
            
            // Load saved data
            await this.loadSavedData();
            
            this.initialized = true;
            console.log('✅ OSRS Iron Bible initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize OSRS Iron Bible:', error);
            console.error('Error details:', error);
            this.showError('Failed to initialize application. Please refresh the page.');
        }
    }

    initializeServices() {
        console.log('🔧 Initializing services...');
        
        // Check if Firebase is available
        if (!window.firebase) {
            throw new Error('Firebase not loaded');
        }
        
        // Services are already initialized as singletons
        if (!window.firestoreService) {
            throw new Error('FirestoreService not initialized');
        }
        
        if (!window.osrsApiService) {
            throw new Error('OSRSApiService not initialized');
        }
        
        this.services.firestore = window.firestoreService;
        this.services.osrsApi = window.osrsApiService;
        
        console.log('✅ Services initialized');
    }

    initializeComponents() {
        console.log('🎯 Initializing components...');
        
        // Components are already initialized as singletons
        this.components.quest = window.questComponent;
        this.components.diary = window.diaryComponent;
        
        console.log('✅ Components initialized');
    }

    setupAuthentication() {
        console.log('🔐 Setting up authentication...');
        
        // Set up Firebase authentication state listener
        if (window.firebase && window.firebase.auth) {
            window.firebase.onAuthStateChanged(window.firebase.auth, (user) => {
                this.onAuthStateChanged(user);
            });
        }
        
        console.log('✅ Authentication setup complete');
    }

    onAuthStateChanged(user) {
        this.currentUser = user;
        
        if (user) {
            console.log('👤 User signed in:', user.email);
            this.onUserSignedIn(user);
        } else {
            console.log('👤 User signed out');
            this.onUserSignedOut();
        }
        
        this.updateUIForAuthState(user);
    }

    onUserSignedIn(user) {
        // Set up real-time sync when user signs in
        if (typeof setupRealtimeSync === 'function') {
            setupRealtimeSync();
        }
        
        // Load user data from Firestore
        this.loadUserData(user.uid);
        
        // Update UI to show signed-in state
        const userGreeting = document.querySelector('.user-greeting');
        if (userGreeting) {
            userGreeting.textContent = `Welcome, ${user.email}`;
            userGreeting.style.display = 'block';
        }
    }

    onUserSignedOut() {
        // Clean up listeners
        if (this.services.firestore) {
            this.services.firestore.cleanup();
        }
        
        // Clear user-specific data
        this.currentUser = null;
        
        // Update UI to show signed-out state
        const userGreeting = document.querySelector('.user-greeting');
        if (userGreeting) {
            userGreeting.style.display = 'none';
        }
    }

    async loadUserData(userId) {
        try {
            // Load user stats if available
            const stats = await this.services.firestore.loadStats(userId);
            if (stats) {
                await this.services.osrsApi.updateStatsDisplay(stats, stats.playerName || 'Unknown Player');
            }
            
        } catch (error) {
            console.warn('Could not load user data from Firestore:', error.message);
        }
    }

    updateUIForAuthState(user) {
        // Update navigation and UI elements based on auth state
        const authButtons = document.querySelectorAll('[data-auth-required]');
        authButtons.forEach(button => {
            button.style.display = user ? 'block' : 'none';
        });
        
        const noAuthButtons = document.querySelectorAll('[data-no-auth-required]');
        noAuthButtons.forEach(button => {
            button.style.display = user ? 'none' : 'block';
        });
    }

    initializeUI() {
        console.log('🎨 Initializing UI...');
        
        // Initialize tab system
        this.initializeTabSystem();
        
        // Initialize quest filters if quest component is available
        if (this.components.quest && this.components.quest.initializeQuestFilters) {
            this.components.quest.initializeQuestFilters();
        }
        
        // Initialize diary display
        if (this.components.diary && this.components.diary.populateDiaryTiles) {
            this.components.diary.populateDiaryTiles();
        }
        
        // Initialize hamburger menu
        this.initializeHamburgerMenu();
        
        console.log('✅ UI initialized');
    }

    initializeTabSystem() {
        // Set up left page tab navigation
        const leftTabButtons = document.querySelectorAll('.tab-button');
        leftTabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetTab = e.target.getAttribute('data-tab');
                if (targetTab) {
                    this.switchLeftTab(targetTab);
                }
            });
        });
        
        // Set up right page tab navigation  
        const rightTabButtons = document.querySelectorAll('.tab-button-right');
        rightTabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetTab = e.target.getAttribute('data-tab');
                if (targetTab) {
                    this.switchRightTab(targetTab);
                }
            });
        });
        
        // Show initial tabs
        this.switchLeftTab('notes');   // Left side starts with notes
        this.switchRightTab('stats');  // Right side starts with stats
        
        // Initialize todo list if needed
        setTimeout(() => {
            if (window.populateGoalsList) {
                window.populateGoalsList();
            }
        }, 1000);
    }

    switchLeftTab(tabName) {
        // Hide all left page tab content
        const leftPage = document.querySelector('.left-page');
        const leftTabContents = leftPage.querySelectorAll('.tab-content');
        leftTabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Remove active class from left tab buttons
        const leftTabButtons = document.querySelectorAll('.tab-button');
        leftTabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // Show target tab content in left page
        const targetContent = leftPage.querySelector(`#${tabName}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
        
        // Add active class to clicked left button
        const targetButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
        if (targetButton) {
            targetButton.classList.add('active');
        }
        
        // Special initialization for certain tabs
        if (tabName === 'todo') {
            // Refresh todo display when tab is opened
            setTimeout(() => {
                if (window.populateGoalsList) {
                    window.populateGoalsList();
                }
                if (window.updateRequirements) {
                    window.updateRequirements();
                }
                if (window.updateTaskSteps) {
                    window.updateTaskSteps();
                }
            }, 100);
        }
        
        console.log(`🔄 Left page switched to ${tabName} tab`);
    }

    switchRightTab(tabName) {
        // Hide all right page tab content
        const rightPage = document.querySelector('.right-page');
        const rightTabContents = rightPage.querySelectorAll('.tab-content');
        rightTabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Remove active class from right tab buttons
        const rightTabButtons = document.querySelectorAll('.tab-button-right');
        rightTabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // Show target tab content in right page
        const targetContent = rightPage.querySelector(`#${tabName}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
        
        // Add active class to clicked right button
        const targetButton = document.querySelector(`.tab-button-right[data-tab="${tabName}"]`);
        if (targetButton) {
            targetButton.classList.add('active');
        }
        
        // Special initialization for certain tabs
        if (tabName === 'quests' && this.components.quest) {
            // Refresh quest display when tab is opened
            setTimeout(() => this.components.quest.filterQuests(), 100);
        }
        
        if (tabName === 'diaries' && this.components.diary) {
            // Refresh diary display when tab is opened
            setTimeout(() => this.components.diary.populateDiaryTiles(), 100);
        }
        
        console.log(`🔄 Right page switched to ${tabName} tab`);
    }

    initializeHamburgerMenu() {
        const hamburgerBtn = document.querySelector('.hamburger-btn');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        
        if (hamburgerBtn && dropdownMenu) {
            hamburgerBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownMenu.classList.toggle('show');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburgerBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                    dropdownMenu.classList.remove('show');
                }
            });
        }
        
        // Set up modal close functionality
        this.initializeModals();
    }
    
    initializeModals() {
        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            const todoModal = document.getElementById('todo-modal');
            const removeModal = document.getElementById('remove-modal');
            
            if (todoModal && e.target === todoModal) {
                window.closeTodoModal();
            }
            
            if (removeModal && e.target === removeModal) {
                // Future: closeRemoveModal() when implemented
                removeModal.style.display = 'none';
            }
        });
    }

    async loadSavedData() {
        console.log('💾 Loading saved data...');
        
        try {
            // Load saved player stats
            if (this.services.osrsApi) {
                await this.services.osrsApi.loadSavedPlayerStats();
            }
            
            console.log('✅ Saved data loaded');
            
        } catch (error) {
            console.warn('⚠️ Could not load saved data:', error.message);
        }
    }

    showError(message) {
        // Show error message to user
        console.error('Application Error:', message);
        
        // You could implement a toast notification system here
        if (typeof showNotification === 'function') {
            showNotification(message, 'error');
        } else {
            alert(message);
        }
    }

    // Utility methods for backward compatibility
    getCurrentUserId() {
        return this.currentUser ? this.currentUser.uid : null;
    }

    isFirestoreAvailable() {
        return this.services.firestore && this.getCurrentUserId();
    }
}

// Create global application instance
window.osrsApp = new OSRSIronBible();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await window.osrsApp.initialize();
});

// Expose key functions globally for backward compatibility
window.getCurrentUserId = function() {
    return window.osrsApp.getCurrentUserId();
};

window.isFirestoreAvailable = function() {
    return window.osrsApp.isFirestoreAvailable();
};

window.switchLeftTab = function(tabName) {
    window.osrsApp.switchLeftTab(tabName);
};

window.switchRightTab = function(tabName) {
    window.osrsApp.switchRightTab(tabName);
};

// Global function to show tab (called from HTML onclick events)
window.showTab = function(tabName) {
    // This is kept for backwards compatibility - defaults to right side
    window.osrsApp.switchRightTab(tabName);
};