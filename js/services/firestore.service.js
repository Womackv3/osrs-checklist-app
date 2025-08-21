// Firestore Database Service
class FirestoreService {
    constructor() {
        this.db = window.firebase?.db;
        this.goalsListener = null;
        this.selectionsListener = null;
        this.statsListener = null;
    }

    // Goal Management
    async saveGoal(userId, goal) {
        if (!this.db || !userId) {
            throw new Error('Database not initialized or user not authenticated');
        }

        try {
            const goalRef = window.firebase.doc(this.db, `users/${userId}/goals`, goal.id);
            await window.firebase.setDoc(goalRef, {
                id: goal.id,
                type: goal.type,
                title: goal.title,
                description: goal.description,
                difficulty: goal.difficulty || 'medium',
                requirements: goal.requirements || {},
                completed: false,
                completedAt: null,
                createdAt: goal.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                notes: goal.notes || '',
                originalText: goal.originalText || goal.title,
                customGoal: goal.customGoal || false,
                skillGoal: goal.skillGoal || false,
                targetLevel: goal.targetLevel || null,
                currentLevel: goal.currentLevel || null,
                skillName: goal.skillName || null
            });

            console.log(`Goal saved: ${goal.title}`);
            return true;
        } catch (error) {
            console.error('Error saving goal:', error);
            throw new Error(`Failed to save goal: ${error.message}`);
        }
    }

    async loadGoals(userId) {
        if (!this.db || !userId) {
            throw new Error('Database not initialized or user not authenticated');
        }

        try {
            const goalsRef = window.firebase.collection(this.db, `users/${userId}/goals`);
            const snapshot = await window.firebase.getDocs(goalsRef);
            
            const goals = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                goals.push({
                    id: data.id,
                    type: data.type,
                    title: data.title,
                    description: data.description,
                    difficulty: data.difficulty,
                    requirements: data.requirements,
                    completed: data.completed,
                    completedAt: data.completedAt,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    notes: data.notes,
                    originalText: data.originalText,
                    customGoal: data.customGoal,
                    skillGoal: data.skillGoal,
                    targetLevel: data.targetLevel,
                    currentLevel: data.currentLevel,
                    skillName: data.skillName
                });
            });

            console.log(`Loaded ${goals.length} goals from database`);
            return goals;
        } catch (error) {
            console.error('Error loading goals:', error);
            throw new Error(`Failed to load goals: ${error.message}`);
        }
    }

    async deleteGoal(userId, goalId) {
        if (!this.db || !userId) {
            throw new Error('Database not initialized or user not authenticated');
        }

        try {
            const goalRef = window.firebase.doc(this.db, `users/${userId}/goals`, goalId);
            await window.firebase.deleteDoc(goalRef);
            console.log(`Goal deleted: ${goalId}`);
            return true;
        } catch (error) {
            console.error('Error deleting goal:', error);
            throw new Error(`Failed to delete goal: ${error.message}`);
        }
    }

    // Selection Management
    async saveSelection(userId, goalId, selected) {
        if (!this.db || !userId) {
            throw new Error('Database not initialized or user not authenticated');
        }

        try {
            const selectionRef = window.firebase.doc(this.db, `users/${userId}/selections`, goalId);
            
            if (selected) {
                await window.firebase.setDoc(selectionRef, {
                    goalId: goalId,
                    selected: true,
                    selectedAt: new Date().toISOString()
                });
            } else {
                await window.firebase.deleteDoc(selectionRef);
            }

            return true;
        } catch (error) {
            console.error('Error saving selection:', error);
            throw new Error(`Failed to save selection: ${error.message}`);
        }
    }

    async loadSelections(userId) {
        if (!this.db || !userId) {
            throw new Error('Database not initialized or user not authenticated');
        }

        try {
            const selectionsRef = window.firebase.collection(this.db, `users/${userId}/selections`);
            const snapshot = await window.firebase.getDocs(selectionsRef);
            
            const selections = {};
            snapshot.forEach((doc) => {
                const data = doc.data();
                selections[data.goalId] = {
                    selected: data.selected,
                    selectedAt: data.selectedAt
                };
            });

            console.log(`Loaded ${Object.keys(selections).length} selections from database`);
            return selections;
        } catch (error) {
            console.error('Error loading selections:', error);
            throw new Error(`Failed to load selections: ${error.message}`);
        }
    }

    // Stats Management
    async saveStats(userId, stats) {
        if (!this.db || !userId) {
            throw new Error('Database not initialized or user not authenticated');
        }

        try {
            const statsRef = window.firebase.doc(this.db, `users/${userId}/data`, 'stats');
            await window.firebase.setDoc(statsRef, {
                ...stats,
                lastUpdated: new Date().toISOString()
            });

            console.log('Stats saved successfully');
            return true;
        } catch (error) {
            console.error('Error saving stats:', error);
            throw new Error(`Failed to save stats: ${error.message}`);
        }
    }

    async loadStats(userId) {
        if (!this.db || !userId) {
            throw new Error('Database not initialized or user not authenticated');
        }

        try {
            const statsRef = window.firebase.doc(this.db, `users/${userId}/data`, 'stats');
            const doc = await window.firebase.getDoc(statsRef);
            
            if (doc.exists()) {
                const data = doc.data();
                console.log('Stats loaded successfully');
                return data;
            } else {
                console.log('No stats found in database');
                return null;
            }
        } catch (error) {
            console.error('Error loading stats:', error);
            throw new Error(`Failed to load stats: ${error.message}`);
        }
    }

    // Real-time Listeners
    setupSelectionsListener(userId, callback) {
        if (!this.db || !userId) {
            throw new Error('Database not initialized or user not authenticated');
        }

        try {
            const selectionsRef = window.firebase.collection(this.db, `users/${userId}/selections`);
            this.selectionsListener = window.firebase.onSnapshot(selectionsRef, (snapshot) => {
                const selections = {};
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    selections[data.goalId] = {
                        selected: data.selected,
                        selectedAt: data.selectedAt
                    };
                });

                if (callback) {
                    callback(selections);
                }
            }, (error) => {
                console.error('Selections listener error:', error);
            });

            return this.selectionsListener;
        } catch (error) {
            console.error('Error setting up selections listener:', error);
            throw new Error(`Failed to setup selections listener: ${error.message}`);
        }
    }

    setupGoalsListener(userId, callback) {
        if (!this.db || !userId) {
            throw new Error('Database not initialized or user not authenticated');
        }

        try {
            const goalsRef = window.firebase.collection(this.db, `users/${userId}/goals`);
            this.goalsListener = window.firebase.onSnapshot(goalsRef, (snapshot) => {
                const goals = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    goals.push({
                        id: data.id,
                        type: data.type,
                        title: data.title,
                        description: data.description,
                        difficulty: data.difficulty,
                        requirements: data.requirements,
                        completed: data.completed,
                        completedAt: data.completedAt,
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt,
                        notes: data.notes,
                        originalText: data.originalText,
                        customGoal: data.customGoal,
                        skillGoal: data.skillGoal,
                        targetLevel: data.targetLevel,
                        currentLevel: data.currentLevel,
                        skillName: data.skillName
                    });
                });

                if (callback) {
                    callback(goals);
                }
            }, (error) => {
                console.error('Goals listener error:', error);
            });

            return this.goalsListener;
        } catch (error) {
            console.error('Error setting up goals listener:', error);
            throw new Error(`Failed to setup goals listener: ${error.message}`);
        }
    }

    setupStatsListener(userId, callback) {
        if (!this.db || !userId) {
            throw new Error('Database not initialized or user not authenticated');
        }

        try {
            const statsRef = window.firebase.doc(this.db, `users/${userId}/data`, 'stats');
            this.statsListener = window.firebase.onSnapshot(statsRef, (doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    if (callback) {
                        callback(data);
                    }
                }
            }, (error) => {
                console.error('Stats listener error:', error);
            });

            return this.statsListener;
        } catch (error) {
            console.error('Error setting up stats listener:', error);
            throw new Error(`Failed to setup stats listener: ${error.message}`);
        }
    }

    // Utility Methods
    cleanup() {
        if (this.goalsListener) {
            this.goalsListener();
            this.goalsListener = null;
        }
        if (this.selectionsListener) {
            this.selectionsListener();
            this.selectionsListener = null;
        }
        if (this.statsListener) {
            this.statsListener();
            this.statsListener = null;
        }
    }

    async testConnection(userId) {
        if (!this.db || !userId) {
            throw new Error('Database not initialized or user not authenticated');
        }

        try {
            const testRef = window.firebase.doc(this.db, `users/${userId}/test`, 'connection');
            const doc = await window.firebase.getDoc(testRef);
            
            if (doc.exists()) {
                console.log('Database connection test: READ successful');
            }
            
            await window.firebase.setDoc(testRef, {
                timestamp: new Date().toISOString(),
                test: 'connection'
            });
            console.log('Database connection test: WRITE successful');
            
            await window.firebase.deleteDoc(testRef);
            console.log('Database connection test: DELETE successful');
            
            return true;
        } catch (error) {
            console.error('Database connection test failed:', error);
            throw new Error(`Database connection test failed: ${error.message}`);
        }
    }
}

// Create and export singleton instance
window.firestoreService = new FirestoreService();