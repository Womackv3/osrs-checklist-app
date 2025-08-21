// Quest Component
class QuestComponent {
    constructor() {
        this.currentQuest = null;
    }

    // Quest filtering and display functions
    filterQuests() {
        const searchTerm = document.getElementById('quest-search').value.toLowerCase();
        const difficultyFilter = document.getElementById('difficulty-filter').value;
        const membersFilter = document.getElementById('members-filter').value;
        const completionFilter = document.getElementById('completion-filter').value;
        
        let filteredQuests = Object.keys(this.getQuestsDatabase());
        
        if (difficultyFilter !== 'all') {
            filteredQuests = filteredQuests.filter(questId => 
                this.getQuestsDatabase()[questId].difficulty === difficultyFilter
            );
        }
        
        if (membersFilter !== 'all') {
            const isMembersQuest = membersFilter === 'members';
            filteredQuests = filteredQuests.filter(questId => 
                this.getQuestsDatabase()[questId].members === isMembersQuest
            );
        }
        
        if (completionFilter !== 'all') {
            filteredQuests = filteredQuests.filter(questId => {
                const isCompleted = localStorage.getItem(`quest_${questId}_completed`) === 'true';
                return completionFilter === 'completed' ? isCompleted : !isCompleted;
            }
            );
        }
        
        if (searchTerm) {
            filteredQuests = filteredQuests.filter(questId => 
                this.getQuestsDatabase()[questId].name.toLowerCase().includes(searchTerm) ||
                this.getQuestsDatabase()[questId].description.toLowerCase().includes(searchTerm)
            );
        }
        
        this.displayQuests(filteredQuests);
    }

    displayQuests(questIds) {
        const questList = document.getElementById('quest-list');
        if (!questList) return;
        
        questList.innerHTML = '';
        
        questIds.forEach(questId => {
            const quest = this.getQuestsDatabase()[questId];
            if (!quest) return;
            
            const questItem = document.createElement('div');
            const isCompleted = localStorage.getItem(`quest_${questId}_completed`) === 'true';
            questItem.className = `quest-item${isCompleted ? ' completed' : ''}`;
            questItem.setAttribute('data-quest-id', questId);
            questItem.onclick = () => this.openQuest(questId);
            
            questItem.innerHTML = `
                <div class="quest-info">
                    <h3>${quest.name}</h3>
                    <p>${quest.description}</p>
                </div>
                <div class="quest-actions">
                    <span class="difficulty-badge ${quest.difficulty}">${quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}</span>
                    <button class="add-to-todo-btn" onclick="event.stopPropagation(); openTodoModal('quest', '${questId}')">Add to Journal</button>
                </div>
            `;
            
            questList.appendChild(questItem);
        });
    }

    openQuest(questId) {
        const quest = this.getQuestsDatabase()[questId];
        if (!quest) return;

        this.currentQuest = questId;
        window.currentQuest = questId; // For backward compatibility

        document.getElementById('quest-main-view').style.display = 'none';
        document.getElementById('quest-detail-view').style.display = 'block';
        
        document.getElementById('quest-title').textContent = quest.name;
        document.getElementById('quest-difficulty-badge').textContent = quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1);
        document.getElementById('quest-difficulty-badge').className = `difficulty-badge ${quest.difficulty}`;

        const content = `
            <div class="quest-section">
                <h3>Description</h3>
                <p>${quest.description}</p>
            </div>

            <div class="quest-section">
                <h3>Requirements</h3>
                <ul class="item-list">
                    ${quest.requirements && quest.requirements.length > 0 ? 
                        quest.requirements.map(req => `<li>${req}</li>`).join('') :
                        '<li>None</li>'
                    }
                </ul>
            </div>

            <div class="quest-section">
                <h3>Quick Guide</h3>
                <p><a href="${quest.guide || '#'}" target="_blank" style="color: #8b4513; text-decoration: underline;">View Quick Guide on Wiki</a></p>
            </div>

            <div class="quest-section">
                <h3>Rewards</h3>
                <div class="reward-list">
                    ${quest.rewards && quest.rewards.length > 0 ? 
                        quest.rewards.map(reward => `<div class="reward-item">${reward}</div>`).join('') :
                        '<div class="reward-item">No rewards listed</div>'
                    }
                </div>
            </div>

            <div class="quest-section">
                <h3>Quest Info</h3>
                <p><strong>Quest Points:</strong> ${quest.quest_points || 0}</p>
                <p><strong>Members:</strong> ${quest.members ? 'Yes' : 'No'}</p>
                <p><strong>Combat Required:</strong> ${quest.combat_required ? 'Yes' : 'No'}</p>
                <p><strong>Length:</strong> ${quest.official_length || 'Unknown'}</p>
                <p><strong>Start Location:</strong> ${quest.start_location || 'Unknown'}</p>
            </div>

            <div class="quest-section">
                <h3>Completion Status</h3>
                <div class="quest-actions">
                    <button class="mark-complete-btn" onclick="questComponent.toggleQuestCompleted('${questId}')">
                        ${localStorage.getItem(`quest_${questId}_completed`) === 'true' ? '✓ Completed' : 'Mark as Complete'}
                    </button>
                </div>
            </div>
        `;

        document.getElementById('quest-content').innerHTML = content;
        
        // Apply initial styling if quest is already completed
        const isCompleted = localStorage.getItem(`quest_${questId}_completed`) === 'true';
        if (isCompleted) {
            // Use setTimeout to ensure DOM elements are ready
            setTimeout(() => {
                this.updateCurrentQuestDetailView(questId, true);
            }, 0);
        }
    }

    closeQuest() {
        document.getElementById('quest-detail-view').style.display = 'none';
        document.getElementById('quest-main-view').style.display = 'block';
        this.currentQuest = null;
        window.currentQuest = null; // For backward compatibility
    }

    toggleQuestCompletion(questId) {
        const storageKey = `quest_${questId}_completed`;
        const isCompleted = localStorage.getItem(storageKey) === 'true';
        const newCompletedState = !isCompleted;
        localStorage.setItem(storageKey, newCompletedState.toString());
        return newCompletedState;
    }

    toggleQuestCompleted(questId) {
        const completed = this.toggleQuestCompletion(questId);
        const questName = this.getQuestsDatabase()[questId]?.name || 'Unknown Quest';
        console.log(`${questName} marked as ${completed ? 'completed' : 'incomplete'}`);
        
        // Update the current quest detail view immediately
        this.updateCurrentQuestDetailView(questId, completed);
        
        // Sync with To-Do list if goal exists
        this.syncQuestWithTodoList(questId, completed);
        
        // Add visual feedback to quest item
        this.updateQuestItemVisualState(questId, completed);
        
        // Update the quest display
        this.filterQuests();
        this.updateQuestProgress();
    }
    
    updateCurrentQuestDetailView(questId, completed) {
        // Update the button text and styling
        const button = document.querySelector('.quest-actions .mark-complete-btn');
        if (button) {
            button.textContent = completed ? '✓ Completed' : 'Mark as Complete';
            if (completed) {
                button.classList.add('completed');
            } else {
                button.classList.remove('completed');
            }
        }
        
        // Update the completion status section styling
        const questActions = document.querySelector('.quest-actions');
        if (questActions) {
            const completionSection = questActions.closest('.quest-section');
            if (completionSection) {
                if (completed) {
                    completionSection.classList.add('completed');
                } else {
                    completionSection.classList.remove('completed');
                }
            }
        }
    }
    
    updateQuestItemVisualState(questId, completed) {
        // Find quest item in the quest list
        const questItems = document.querySelectorAll('.quest-item');
        questItems.forEach(item => {
            if (item.getAttribute('data-quest-id') === questId) {
                if (completed) {
                    item.classList.add('completed');
                } else {
                    item.classList.remove('completed');
                }
            }
        });
    }

    updateQuestProgress() {
        const progress = this.getQuestProgress();
        const questPoints = this.getTotalQuestPoints();
        const maxQuestPoints = this.getMaxQuestPoints();
        
        // Update any progress displays on the page
        const progressElements = document.querySelectorAll('.quest-progress');
        progressElements.forEach(element => {
            element.textContent = `${progress.completed}/${progress.total} quests completed (${progress.percentage}%) - ${questPoints}/${maxQuestPoints} Quest Points`;
        });
    }

    // Progress calculation functions
    getQuestProgress() {
        const questDatabase = this.getQuestsDatabase();
        const totalQuests = Object.keys(questDatabase).length;
        let completedQuests = 0;

        Object.keys(questDatabase).forEach(questId => {
            if (localStorage.getItem(`quest_${questId}_completed`) === 'true') {
                completedQuests++;
            }
        });

        const percentage = totalQuests > 0 ? Math.round((completedQuests / totalQuests) * 100) : 0;
        return {
            completed: completedQuests,
            total: totalQuests,
            percentage: percentage
        };
    }

    getTotalQuestPoints() {
        const questDatabase = this.getQuestsDatabase();
        let totalPoints = 0;

        Object.keys(questDatabase).forEach(questId => {
            if (localStorage.getItem(`quest_${questId}_completed`) === 'true') {
                totalPoints += questDatabase[questId].quest_points || 0;
            }
        });

        return totalPoints;
    }

    getMaxQuestPoints() {
        const questDatabase = this.getQuestsDatabase();
        let maxPoints = 0;

        Object.values(questDatabase).forEach(quest => {
            maxPoints += quest.quest_points || 0;
        });

        return maxPoints;
    }

    // Sync quest completion with To-Do list
    syncQuestWithTodoList(questId, completed) {
        if (!window.masterGoalsList) return;
        
        // Find corresponding goal in To-Do list
        const goalId = `quest_${questId}`;
        const goal = window.masterGoalsList.find(g => g.id === goalId);
        
        if (goal && completed) {
            // Remove the completed goal from To-Do list
            const goalIndex = window.masterGoalsList.findIndex(g => g.id === goalId);
            if (goalIndex !== -1) {
                window.masterGoalsList.splice(goalIndex, 1);
                window.goalLookupMap.delete(goalId);
                console.log(`Removed completed quest goal: ${goal.title}`);
                
                // Delete from Firestore if available
                if (window.firestoreService && window.getCurrentUserId()) {
                    window.firestoreService.deleteGoal(window.getCurrentUserId(), goalId)
                        .catch(error => console.warn('Failed to delete quest goal:', error));
                } else if (window.saveGoalsToLocalStorage) {
                    window.saveGoalsToLocalStorage();
                }
                
                // Update UI
                if (window.populateGoalsList) {
                    window.populateGoalsList();
                }
            }
        }
    }

    // Data access methods - these will be replaced when data files are extracted
    getQuestsDatabase() {
        // This is a placeholder - will be replaced with actual data loading
        if (window.questsData) {
            return window.questsData;
        }
        
        // Fallback to existing global data if available
        if (window.QUESTS_DATABASE) {
            return window.QUESTS_DATABASE;
        }
        
        console.warn('No quest database available');
        return {};
    }

    getAllQuests() {
        return Object.keys(this.getQuestsDatabase());
    }

    getQuestById(questId) {
        return this.getQuestsDatabase()[questId];
    }

    // Initialize quest filters and search
    initializeQuestFilters() {
        // Set up event listeners for quest filters
        const questSearch = document.getElementById('quest-search');
        const difficultyFilter = document.getElementById('difficulty-filter');
        const membersFilter = document.getElementById('members-filter');
        const completionFilter = document.getElementById('completion-filter');

        if (questSearch) {
            questSearch.addEventListener('input', () => this.filterQuests());
        }

        if (difficultyFilter) {
            difficultyFilter.addEventListener('change', () => this.filterQuests());
        }

        if (membersFilter) {
            membersFilter.addEventListener('change', () => this.filterQuests());
        }

        if (completionFilter) {
            completionFilter.addEventListener('change', () => this.filterQuests());
        }

        // Initial quest display
        this.filterQuests();
    }
}

// Create and export singleton instance
window.questComponent = new QuestComponent();

// Backward compatibility - expose key functions globally
window.filterQuests = function() {
    window.questComponent.filterQuests();
};

window.displayQuests = function(questIds) {
    window.questComponent.displayQuests(questIds);
};

window.openQuest = function(questId) {
    window.questComponent.openQuest(questId);
};

window.closeQuest = function() {
    window.questComponent.closeQuest();
};

window.toggleQuestCompletion = function(questId) {
    return window.questComponent.toggleQuestCompletion(questId);
};

window.toggleQuestCompleted = function(questId) {
    window.questComponent.toggleQuestCompleted(questId);
};

window.updateQuestItemVisualState = function(questId, completed) {
    window.questComponent.updateQuestItemVisualState(questId, completed);
};

window.updateQuestProgress = function() {
    window.questComponent.updateQuestProgress();
};

window.getQuestProgress = function() {
    return window.questComponent.getQuestProgress();
};

window.getTotalQuestPoints = function() {
    return window.questComponent.getTotalQuestPoints();
};

window.getMaxQuestPoints = function() {
    return window.questComponent.getMaxQuestPoints();
};