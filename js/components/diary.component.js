// Achievement Diary Component
class DiaryComponent {
    constructor() {
        this.currentDiary = null;
        this.currentDifficulty = null;
    }

    // Main diary navigation functions
    backToDiary() {
        const detailView = document.getElementById('difficulty-detail-view');
        const mainView = document.getElementById('diary-main-view');
        
        if (detailView) {
            detailView.style.display = 'none';
        }
        if (mainView) {
            mainView.style.display = 'block';
        }
        
        this.currentDiary = null;
        this.populateDiaryTiles(); // Repopulate the diary list
    }

    showDifficulty(difficulty) {
        if (!this.currentDiary) return;
        
        const diary = this.getDiaryById(this.currentDiary);
        const difficultyData = diary.difficulties[difficulty];
        if (!difficultyData) return;

        document.getElementById('diary-main-view').style.display = 'none';
        document.getElementById('difficulty-detail-view').style.display = 'block';
        
        const title = `${diary.name} - ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`;
        document.getElementById('difficulty-title').textContent = title;

        const content = `
            <div class="task-step-item">
                <div class="task-step-header">
                    <div class="task-step-title">${diary.name} - ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</div>
                    <div class="task-step-difficulty ${difficulty}">${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</div>
                </div>
                
                <div class="task-steps-container">
                    <ul class="task-step-list">
                        ${difficultyData.tasks.map((task, index) => {
                            const isCompleted = localStorage.getItem(`diary_${this.currentDiary}_${difficulty}_${index}`) === 'true';
                            return `
                                <li class="task-step-list-item ${isCompleted ? 'completed' : ''}">
                                    <div class="task-step-content">
                                        <span class="task-step-description">${task.description}</span>
                                        <div class="task-step-actions">
                                            <button class="mark-complete-btn" onclick="diaryComponent.toggleTaskComplete('${this.currentDiary}', '${difficulty}', ${index})">
                                                ${isCompleted ? '✓ Completed' : 'Mark Complete'}
                                            </button>
                                            <button class="add-to-todo-btn" onclick="openTodoModal('diary', '${this.currentDiary}', '${difficulty}', ${index})">Add to Journal</button>
                                        </div>
                                    </div>
                                </li>
                            `;
                        }).join('')}
                    </ul>
                </div>
                
                <div class="task-step-rewards">
                    <h4>🏆 Rewards</h4>
                    <p>${difficultyData.rewards.join(', ')}</p>
                </div>
            </div>
        `;

        document.getElementById('difficulty-content').innerHTML = content;
        this.loadTaskProgress(this.currentDiary, difficulty);
    }

    // Dynamic diary system functions
    populateDiaryTiles() {
        const diaryList = document.getElementById('diary-list');
        if (!diaryList) return;

        diaryList.innerHTML = '';
        
        const diaries = this.getAllDiaries();
        diaries.forEach(diary => {
            const diaryEntry = document.createElement('div');
            diaryEntry.className = 'diary-entry';
            
            // Create diary header
            const diaryHeader = document.createElement('div');
            diaryHeader.className = 'diary-header-item';
            diaryHeader.textContent = diary.name;
            
            // Create difficulties container
            const difficultiesContainer = document.createElement('div');
            difficultiesContainer.className = 'diary-difficulties';
            
            // Add each difficulty level
            const difficulties = ['easy', 'medium', 'hard', 'elite'];
            difficulties.forEach(difficulty => {
                if (diary.difficulties && diary.difficulties[difficulty]) {
                    const difficultyProgress = this.calculateDifficultyProgress(diary.id, difficulty);
                    
                    const difficultyItem = document.createElement('div');
                    const isFullyCompleted = difficultyProgress.completed === difficultyProgress.total && difficultyProgress.total > 0;
                    difficultyItem.className = `difficulty-item${isFullyCompleted ? ' completed' : ''}`;
                    difficultyItem.onclick = () => this.openDiaryDifficulty(diary.id, difficulty);
                    
                    difficultyItem.innerHTML = `
                        <div class="difficulty-indicator ${difficulty}"></div>
                        <div class="difficulty-info">
                            <div class="difficulty-name">${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</div>
                            <div class="difficulty-progress">${difficultyProgress.completed}/${difficultyProgress.total} tasks completed</div>
                        </div>
                        <div class="difficulty-arrow">→</div>
                    `;
                    
                    difficultiesContainer.appendChild(difficultyItem);
                }
            });
            
            diaryEntry.appendChild(diaryHeader);
            diaryEntry.appendChild(difficultiesContainer);
            diaryList.appendChild(diaryEntry);
        });
    }

    // Helper function to calculate progress for a specific difficulty
    calculateDifficultyProgress(diaryId, difficulty) {
        const diary = this.getAllDiaries().find(d => d.id === diaryId);
        if (!diary || !diary.difficulties || !diary.difficulties[difficulty]) {
            return { completed: 0, total: 0, percentage: 0 };
        }

        const tasks = diary.difficulties[difficulty].tasks;
        const total = tasks.length;
        let completed = 0;

        tasks.forEach((task, index) => {
            const storageKey = `diary_${diaryId}_${difficulty}_${index}`;
            if (localStorage.getItem(storageKey) === 'true') {
                completed++;
            }
        });

        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        return { completed, total, percentage };
    }

    // Function to open a specific diary difficulty
    openDiaryDifficulty(diaryId, difficulty) {
        // Set current diary and difficulty
        this.currentDiary = diaryId;
        this.currentDifficulty = difficulty;
        
        // Update global references for backward compatibility
        window.currentDiary = diaryId;
        window.currentDifficulty = difficulty;
        
        // Hide main view and show difficulty detail view directly
        document.getElementById('diary-main-view').style.display = 'none';
        
        // Show the difficulty detail view (reuse existing showDifficulty function)
        this.showDifficulty(difficulty);
    }

    calculateDiaryProgress(diaryId) {
        const diary = this.getDiaryById(diaryId);
        let totalTasks = 0;
        let completedTasks = 0;

        Object.values(diary.difficulties).forEach(difficulty => {
            totalTasks += difficulty.tasks.length;
            difficulty.tasks.forEach((task, index) => {
                if (this.isTaskCompleted(diaryId, Object.keys(diary.difficulties).find(key => diary.difficulties[key] === difficulty), index)) {
                    completedTasks++;
                }
            });
        });

        return {
            completed: completedTasks,
            total: totalTasks,
            percentage: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
        };
    }

    toggleTaskComplete(diaryId, difficulty, taskIndex) {
        const storageKey = `diary_${diaryId}_${difficulty}_${taskIndex}`;
        const isCompleted = localStorage.getItem(storageKey) === 'true';
        const newCompletedState = !isCompleted;
        localStorage.setItem(storageKey, newCompletedState.toString());
        
        // Sync with To-Do list if goal exists
        this.syncDiaryTaskWithTodoList(diaryId, difficulty, taskIndex, newCompletedState);
        
        // Add visual feedback to diary task
        this.updateDiaryTaskVisualState(diaryId, difficulty, taskIndex, newCompletedState);
        
        // Always update progress display automatically
        this.updateDiaryProgress();
    }
    
    updateDiaryTaskVisualState(diaryId, difficulty, taskIndex, completed) {
        // Find the task container and update its visual state
        const taskContainers = document.querySelectorAll('.task-step-list-item');
        taskContainers.forEach((container, index) => {
            // Check if this is the right task by comparing the onclick handlers or use a data attribute approach
            const button = container.querySelector('.mark-complete-btn');
            if (button && button.onclick && button.onclick.toString().includes(`'${diaryId}', '${difficulty}', ${taskIndex}`)) {
                if (completed) {
                    container.classList.add('completed');
                    button.textContent = '✓ Completed';
                } else {
                    container.classList.remove('completed');
                    button.textContent = 'Mark Complete';
                }
            }
        });
    }
    
    updateDiaryProgress() {
        // Update main diary view if it exists
        if (document.getElementById('diary-main-view')) {
            this.populateDiaryTiles();
        }
    }

    isTaskCompleted(diaryId, difficulty, taskIndex) {
        const storageKey = `diary_${diaryId}_${difficulty}_${taskIndex}`;
        return localStorage.getItem(storageKey) === 'true';
    }

    loadTaskProgress(diaryId, difficulty) {
        // This function would load progress from storage if needed
        // Currently handled by the template generation in showDifficulty
        console.log(`Loading task progress for ${diaryId} ${difficulty}`);
    }

    // Sync diary task completion with To-Do list
    syncDiaryTaskWithTodoList(diaryId, difficulty, taskIndex, completed) {
        if (!window.masterGoalsList) return;
        
        // Find corresponding goal in To-Do list
        const goalId = `diary_${diaryId}_${difficulty}_${taskIndex}`;
        const goal = window.masterGoalsList.find(g => g.id === goalId);
        
        if (goal && completed) {
            // Remove the completed goal from To-Do list
            const goalIndex = window.masterGoalsList.findIndex(g => g.id === goalId);
            if (goalIndex !== -1) {
                window.masterGoalsList.splice(goalIndex, 1);
                window.goalLookupMap.delete(goalId);
                console.log(`Removed completed diary goal: ${goal.title}`);
                
                // Delete from Firestore if available
                if (window.firestoreService && window.getCurrentUserId()) {
                    window.firestoreService.deleteGoal(window.getCurrentUserId(), goalId)
                        .catch(error => console.warn('Failed to delete diary goal:', error));
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
    getDiaryById(diaryId) {
        const diaries = this.getAllDiaries();
        return diaries.find(diary => diary.id === diaryId);
    }

    getAllDiaries() {
        // This is a placeholder - will be replaced with actual data loading
        // For now, return empty array to prevent errors
        if (window.diariesData) {
            return window.diariesData;
        }
        
        // Fallback to existing global data if available
        if (window.getDiaryById || window.getAllDiaries) {
            try {
                return window.getAllDiaries ? window.getAllDiaries() : [];
            } catch (error) {
                console.warn('Could not load diary data:', error);
                return [];
            }
        }
        
        return [];
    }
}

// Create and export singleton instance
window.diaryComponent = new DiaryComponent();

// Backward compatibility - expose key functions globally
window.backToDiary = function() {
    window.diaryComponent.backToDiary();
};

window.showDifficulty = function(difficulty) {
    window.diaryComponent.showDifficulty(difficulty);
};

window.populateDiaryTiles = function() {
    window.diaryComponent.populateDiaryTiles();
};

window.calculateDifficultyProgress = function(diaryId, difficulty) {
    return window.diaryComponent.calculateDifficultyProgress(diaryId, difficulty);
};

window.openDiaryDifficulty = function(diaryId, difficulty) {
    window.diaryComponent.openDiaryDifficulty(diaryId, difficulty);
};

window.calculateDiaryProgress = function(diaryId) {
    return window.diaryComponent.calculateDiaryProgress(diaryId);
};

window.toggleTaskComplete = function(diaryId, difficulty, taskIndex) {
    window.diaryComponent.toggleTaskComplete(diaryId, difficulty, taskIndex);
};

window.updateDiaryTaskVisualState = function(diaryId, difficulty, taskIndex, completed) {
    window.diaryComponent.updateDiaryTaskVisualState(diaryId, difficulty, taskIndex, completed);
};

window.updateDiaryProgress = function() {
    window.diaryComponent.updateDiaryProgress();
};

window.isTaskCompleted = function(diaryId, difficulty, taskIndex) {
    return window.diaryComponent.isTaskCompleted(diaryId, difficulty, taskIndex);
};

window.loadTaskProgress = function(diaryId, difficulty) {
    window.diaryComponent.loadTaskProgress(diaryId, difficulty);
};