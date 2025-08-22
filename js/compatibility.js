// Compatibility layer for existing functionality
// This bridges the gap between the old monolithic system and new modular system

// Global data structures
window.masterGoalsList = [];
window.goalLookupMap = new Map();
window.currentPlayerName = null;
window.currentPlayerStats = null;
window.currentDiary = null;
window.currentDifficulty = null;
window.currentQuest = null;

// Core utility functions that other parts of the app depend on
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function validateUsername(username) {
    if (!username || typeof username !== 'string') {
        return false;
    }
    
    const trimmed = username.trim();
    if (trimmed.length < 1 || trimmed.length > 12) {
        return false;
    }
    
    // OSRS username validation - letters, numbers, spaces, hyphens, underscores
    const validPattern = /^[a-zA-Z0-9\s\-_]+$/;
    return validPattern.test(trimmed);
}

function validateGroupName(groupName) {
    if (!groupName || typeof groupName !== 'string') {
        return false;
    }
    
    const trimmed = groupName.trim();
    if (trimmed.length < 1 || trimmed.length > 30) {
        return false;
    }
    
    // Group ironman name validation - similar to usernames but can be longer
    const validPattern = /^[a-zA-Z0-9\s\-_]+$/;
    return validPattern.test(trimmed);
}

// Goal management functions
async function populateGoalsList() {
    const container = document.getElementById('master-goals-list');
    if (!container) return;
    
    if (window.masterGoalsList.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; margin-top: 50px;">No goals added yet. Add goals from the Quest or Diary tabs using "Add to Journal".</p>';
        return;
    }
    
    // Group goals by category
    const groupedGoals = {};
    window.masterGoalsList.forEach(goal => {
        const category = goal.category || 'Other';
        if (!groupedGoals[category]) {
            groupedGoals[category] = [];
        }
        groupedGoals[category].push(goal);
    });
    
    // Sort categories for consistent display
    const categoryOrder = ['Quests', 'Tasks', 'Skills', 'Other'];
    const sortedCategories = Object.keys(groupedGoals).sort((a, b) => {
        const aIndex = categoryOrder.indexOf(a);
        const bIndex = categoryOrder.indexOf(b);
        return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    });
    
    let html = '';
    
    sortedCategories.forEach(category => {
        const goals = groupedGoals[category];
        html += `
            <div class="goal-category">
                <h4>${category}</h4>
        `;
        
        goals.forEach(goal => {
            html += `
                <div class="goal-item" data-goal-id="${goal.id}">
                    <div class="goal-content">
                        <div class="goal-label">${escapeHtml(goal.title || 'Untitled Goal')}</div>
                        <div class="goal-description">${escapeHtml(goal.description || '')}</div>
                    </div>
                    <div class="goal-actions">
                        <button class="mark-complete-btn" 
                                onclick="toggleGoalComplete('${goal.id}')">
                            ✓ Mark Complete & Remove
                        </button>
                        <button class="remove-goal-btn" onclick="removeGoal('${goal.id}')">
                            Remove
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += `
            </div>
        `;
    });
    
    container.innerHTML = html;
}

async function updateRequirements() {
    const skillRequirementsContainer = document.getElementById('skill-requirements');
    if (!skillRequirementsContainer) return;
    
    const requirementsGrid = skillRequirementsContainer.querySelector('.requirements-grid');
    if (!requirementsGrid) return;
    
    // Collect all skill requirements from current goals
    const skillRequirements = {};
    
    window.masterGoalsList.forEach(goal => {
        if (goal.type === 'quest' && goal.originalId) {
            const quest = window.QUESTS_DATABASE ? window.QUESTS_DATABASE[goal.originalId] : null;
            if (quest && quest.requirements) {
                // Parse skill requirements from requirements array
                quest.requirements.forEach(req => {
                    // Look for skill level requirements like "75 Magic", "70 Smithing", etc.
                    const skillMatch = req.match(/^(\d+)\s+([A-Za-z]+)$/);
                    if (skillMatch) {
                        const level = parseInt(skillMatch[1]);
                        const skill = skillMatch[2].toLowerCase();
                        if (!skillRequirements[skill] || skillRequirements[skill] < level) {
                            skillRequirements[skill] = level;
                        }
                    }
                });
            }
        } else if (goal.type === 'diary' && goal.originalId && goal.difficulty) {
            const diary = window.getDiaryById ? window.getDiaryById(goal.originalId) : null;
            if (diary && diary.difficulties && diary.difficulties[goal.difficulty] && diary.difficulties[goal.difficulty].requirements) {
                // Parse skill requirements from requirements array
                diary.difficulties[goal.difficulty].requirements.forEach(req => {
                    // Look for skill level requirements like "75 Magic", "70 Smithing", etc.
                    const skillMatch = req.match(/^(\d+)\s+([A-Za-z]+)$/);
                    if (skillMatch) {
                        const level = parseInt(skillMatch[1]);
                        const skill = skillMatch[2].toLowerCase();
                        if (!skillRequirements[skill] || skillRequirements[skill] < level) {
                            skillRequirements[skill] = level;
                        }
                    }
                });
            }
        } else if (goal.type === 'skill' && goal.originalId && goal.targetLevel) {
            skillRequirements[goal.originalId] = goal.targetLevel;
        }
    });
    
    // Create compact skill requirement items like the original design (show all skills)
    let html = '';
    const allSkills = [
        'attack', 'strength', 'defence', 'ranged', 'prayer', 'magic', 'runecraft',
        'construction', 'hitpoints', 'agility', 'herblore', 'thieving', 'crafting',
        'fletching', 'slayer', 'hunter', 'mining', 'smithing', 'fishing', 'cooking',
        'firemaking', 'woodcutting', 'farming'
    ];
    
    const skillIcons = {
        attack: '🗡️', strength: '💪', defence: '🛡️', ranged: '🏹', prayer: '🙏',
        magic: '🔮', runecraft: '🌟', construction: '🏠', hitpoints: '❤️', agility: '🏃',
        herblore: '🧪', thieving: '🥷', crafting: '✂️', fletching: '🏹', slayer: '💀',
        hunter: '🦌', mining: '⛏️', smithing: '⚒️', fishing: '🎣', cooking: '👨‍🍳',
        firemaking: '🔥', woodcutting: '🪓', farming: '🌱'
    };
    
    // Display all skills with required levels or "--" for no requirement
    allSkills.forEach(skill => {
        const requiredLevel = skillRequirements[skill];
        const hasRequirement = requiredLevel !== undefined;
        const currentLevel = getCurrentSkillLevel(skill);
        const needsTraining = hasRequirement && currentLevel < requiredLevel;
        const meetsRequirement = hasRequirement && currentLevel >= requiredLevel;
        const icon = skillIcons[skill] || '⭐';
        
        let cssClass = '';
        if (needsTraining) {
            cssClass = 'needs-training';
        } else if (meetsRequirement) {
            cssClass = 'achievable';
        }
        
        html += `
            <div class="requirement-item ${cssClass}">
                <img src="Pictures/${skill}_icon.png" alt="${skill}" class="requirement-icon">
                <span class="requirement-level">
                    ${hasRequirement ? requiredLevel : '--'}
                </span>
            </div>
        `;
    });
    
    requirementsGrid.innerHTML = html;
    console.log(`Updated skill requirements: ${Object.keys(skillRequirements).length} skills`);
}

async function updateTaskSteps() {
    const taskStepsContainer = document.getElementById('task-steps-list');
    if (!taskStepsContainer) return;
    
    // Collect all diary tasks from current goals
    const diaryTasks = [];
    
    window.masterGoalsList.forEach(goal => {
        if (goal.type === 'diary' && goal.originalId && goal.difficulty && goal.taskIndex !== undefined) {
            const diary = window.getDiaryById ? window.getDiaryById(goal.originalId) : null;
            if (diary && diary.difficulties && diary.difficulties[goal.difficulty] && 
                diary.difficulties[goal.difficulty].tasks[goal.taskIndex]) {
                
                const task = diary.difficulties[goal.difficulty].tasks[goal.taskIndex];
                diaryTasks.push({
                    diaryName: diary.name,
                    difficulty: goal.difficulty,
                    taskDescription: task.description,
                    requirements: task.requirements || [],
                    notes: task.notes || '',
                    diaryId: goal.originalId,
                    taskIndex: goal.taskIndex
                });
            }
        }
    });
    
    // Display task steps
    if (diaryTasks.length === 0) {
        taskStepsContainer.innerHTML = '<p style="text-align: center; color: #666; margin-top: 50px;">Add diary tasks to your goals to see detailed steps here</p>';
        return;
    }
    
    let html = '';
    
    diaryTasks.forEach((task, index) => {
        const difficultyClass = task.difficulty.toLowerCase();
        const isCompleted = localStorage.getItem(`diary_${task.diaryId}_${task.difficulty}_${task.taskIndex}`) === 'true';
        
        html += `
            <div class="task-step-detail ${isCompleted ? 'completed' : ''}" data-task-index="${index}">
                <div class="task-step-header">
                    <div class="task-step-title">${task.diaryName}</div>
                    <div class="task-step-difficulty ${difficultyClass}">${task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}</div>
                </div>
                
                <div class="task-step-content">
                    <div class="task-description">
                        <h4>📋 Task:</h4>
                        <p>${task.taskDescription}</p>
                    </div>
                    
                    ${task.requirements.length > 0 ? `
                        <div class="task-requirements">
                            <h4>📋 Requirements:</h4>
                            <ul class="requirement-list">
                                ${task.requirements.map(req => `<li>${req}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${task.notes ? `
                        <div class="task-notes">
                            <h4>📝 Notes:</h4>
                            <p>${task.notes}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    });
    
    taskStepsContainer.innerHTML = html;
    console.log(`Updated task steps: ${diaryTasks.length} diary tasks`);
}

function toggleGoalComplete(goalId, skipSync = false) {
    const goal = window.masterGoalsList.find(g => g.id === goalId);
    if (!goal) return;
    
    // Mark as completed and sync with quest/diary systems
    if (!skipSync) {
        if (goal.type === 'quest' && goal.originalId) {
            // Mark quest as completed in quest component
            const questStorageKey = `quest_${goal.originalId}_completed`;
            localStorage.setItem(questStorageKey, 'true');
            console.log(`Marked quest ${goal.originalId} as completed`);
            
            // Update quest visual state if quest component is available
            if (window.questComponent && window.questComponent.updateQuestItemVisualState) {
                window.questComponent.updateQuestItemVisualState(goal.originalId, true);
            }
        } else if (goal.type === 'diary' && goal.originalId && goal.difficulty && goal.taskIndex !== undefined) {
            // Mark diary task as completed in diary component
            const diaryStorageKey = `diary_${goal.originalId}_${goal.difficulty}_${goal.taskIndex}`;
            localStorage.setItem(diaryStorageKey, 'true');
            console.log(`Marked diary task ${goal.originalId}_${goal.difficulty}_${goal.taskIndex} as completed`);
            
            // Update diary visual state if diary component is available
            if (window.diaryComponent && window.diaryComponent.updateDiaryTaskVisualState) {
                window.diaryComponent.updateDiaryTaskVisualState(goal.originalId, goal.difficulty, goal.taskIndex, true);
            }
            
            // Update diary progress display
            if (window.diaryComponent && window.diaryComponent.updateDiaryProgress) {
                window.diaryComponent.updateDiaryProgress();
            }
        }
    }
    
    // Remove the goal from the master list (this is the key change)
    const goalIndex = window.masterGoalsList.findIndex(g => g.id === goalId);
    if (goalIndex !== -1) {
        window.masterGoalsList.splice(goalIndex, 1);
        window.goalLookupMap.delete(goalId);
        console.log(`Removed completed goal: ${goal.title}`);
    }
    
    // Delete from Firestore if available
    if (window.firestoreService && window.getCurrentUserId()) {
        window.firestoreService.deleteGoal(window.getCurrentUserId(), goalId)
            .catch(error => console.warn('Failed to delete completed goal:', error));
    } else {
        // Save updated list to localStorage as fallback
        saveGoalsToLocalStorage();
    }
    
    // Refresh UI
    populateGoalsList();
    updateRequirements();
    updateTaskSteps();
}

function removeGoal(goalId) {
    const goalIndex = window.masterGoalsList.findIndex(g => g.id === goalId);
    if (goalIndex === -1) return;
    
    // Remove from arrays
    window.masterGoalsList.splice(goalIndex, 1);
    window.goalLookupMap.delete(goalId);
    
    // Remove from Firestore if available
    if (window.firestoreService && window.getCurrentUserId()) {
        window.firestoreService.deleteGoal(window.getCurrentUserId(), goalId)
            .catch(error => console.warn('Failed to delete goal:', error));
    } else {
        // Save to localStorage as fallback
        saveGoalsToLocalStorage();
    }
    
    // Refresh UI
    populateGoalsList();
    updateRequirements();
    updateTaskSteps();
}

// Initialize the goal lookup map
function rebuildGoalLookupMap() {
    window.goalLookupMap.clear();
    window.masterGoalsList.forEach(goal => {
        window.goalLookupMap.set(goal.id, goal);
    });
}

// Save goals to localStorage as fallback when user not authenticated
function saveGoalsToLocalStorage() {
    try {
        localStorage.setItem('osrs-todo-goals', JSON.stringify(window.masterGoalsList));
        console.log(`Saved ${window.masterGoalsList.length} goals to localStorage`);
    } catch (error) {
        console.warn('Failed to save goals to localStorage:', error);
    }
}

// Load goals from Firestore or localStorage on startup
async function loadToDoList() {
    try {
        if (window.firestoreService && window.getCurrentUserId()) {
            const goals = await window.firestoreService.loadGoals(window.getCurrentUserId());
            window.masterGoalsList = goals || [];
            rebuildGoalLookupMap();
            console.log(`Loaded ${window.masterGoalsList.length} goals from Firestore`);
        } else {
            // Fallback to localStorage when user not authenticated
            console.log('Firestore not available, loading from localStorage');
            const savedGoals = localStorage.getItem('osrs-todo-goals');
            window.masterGoalsList = savedGoals ? JSON.parse(savedGoals) : [];
            rebuildGoalLookupMap();
            console.log(`Loaded ${window.masterGoalsList.length} goals from localStorage`);
        }
    } catch (error) {
        console.warn('Failed to load goals from Firestore:', error);
        // Try localStorage as backup
        try {
            const savedGoals = localStorage.getItem('osrs-todo-goals');
            window.masterGoalsList = savedGoals ? JSON.parse(savedGoals) : [];
            console.log(`Fallback: Loaded ${window.masterGoalsList.length} goals from localStorage`);
        } catch (localError) {
            console.warn('Failed to load from localStorage too:', localError);
            window.masterGoalsList = [];
        }
    }
    
    // Always rebuild the lookup map and populate the UI
    rebuildGoalLookupMap();
    await populateGoalsList();
    
    // Update requirements and task steps after loading goals
    await updateRequirements();
    await updateTaskSteps();
}

// Real-time sync setup
function setupRealtimeSync() {
    if (!window.getCurrentUserId()) {
        console.log('Real-time sync not available - user not authenticated');
        return;
    }

    const userId = window.getCurrentUserId();
    console.log('Setting up real-time sync for user:', userId);

    // Set up goals listener
    if (window.firestoreService) {
        window.firestoreService.setupGoalsListener(userId, async (goals) => {
            console.log('Goals changed - syncing...');
            window.masterGoalsList = goals || [];
            rebuildGoalLookupMap();
            await populateGoalsList();
            await updateRequirements();
            await updateTaskSteps();
        });

        window.firestoreService.setupSelectionsListener(userId, (selections) => {
            console.log('Selections changed - syncing...');
            // Handle selection changes if needed
        });
    }
}

// Modal data storage
let currentModalData = null;

// Helper function to get current skill level from player stats
function getCurrentSkillLevel(skillName) {
    // Check if we have current player stats
    if (window.currentPlayerStats && window.currentPlayerStats[skillName]) {
        return window.currentPlayerStats[skillName].level;
    }
    
    // Fallback: check if OSRS API service has stats
    if (window.osrsApiService && window.osrsApiService.currentPlayerStats && window.osrsApiService.currentPlayerStats[skillName]) {
        return window.osrsApiService.currentPlayerStats[skillName].level;
    }
    
    // Check for Group Iron stats - use the highest level among group members
    if (window.currentGroupData && window.currentGroupData.members) {
        let highestLevel = 1;
        window.currentGroupData.members.forEach(member => {
            if (member.skills && member.skills[skillName] && member.skills[skillName].level) {
                highestLevel = Math.max(highestLevel, member.skills[skillName].level);
            }
        });
        if (highestLevel > 1) {
            return highestLevel;
        }
    }
    
    // Default to 1 if no stats available
    return 1;
}

// Modal functions
function openTodoModal(type, itemId, difficulty = null, taskIndex = null) {
    const modal = document.getElementById('todo-modal');
    const nameElement = document.getElementById('modal-item-name');
    const descElement = document.getElementById('modal-item-description');
    const detailsElement = document.getElementById('modal-item-details');

    // Store current data for confirmation
    currentModalData = { type, itemId, difficulty, taskIndex };

    try {
        if (type === 'quest') {
            const quest = window.QUESTS_DATABASE ? window.QUESTS_DATABASE[itemId] : null;
            if (quest) {
                nameElement.textContent = quest.name;
                descElement.textContent = quest.description;
                detailsElement.innerHTML = `
                    <p><strong>Difficulty:</strong> ${quest.difficulty}</p>
                    <p><strong>Quest Points:</strong> ${quest.quest_points}</p>
                    <p><strong>Members:</strong> ${quest.members ? 'Yes' : 'No'}</p>
                    <p><strong>Combat Required:</strong> ${quest.combat_required ? 'Yes' : 'No'}</p>
                    ${quest.requirements && quest.requirements.length > 0 ? 
                        `<p><strong>Requirements:</strong> ${quest.requirements.join(', ')}</p>` : ''}
                `;
            } else {
                nameElement.textContent = 'Quest';
                descElement.textContent = 'Quest information not available.';
                detailsElement.innerHTML = '';
            }
        } else if (type === 'diary') {
            const diary = window.getDiaryById ? window.getDiaryById(itemId) : null;
            if (diary && diary.difficulties && diary.difficulties[difficulty] && 
                diary.difficulties[difficulty].tasks[taskIndex]) {
                const task = diary.difficulties[difficulty].tasks[taskIndex];
                nameElement.textContent = `${diary.name} - ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`;
                descElement.textContent = task.description;
                detailsElement.innerHTML = `
                    <p><strong>Difficulty:</strong> ${difficulty}</p>
                    <p><strong>Region:</strong> ${diary.region}</p>
                    <p><strong>Task:</strong> ${task.description}</p>
                `;
            } else {
                nameElement.textContent = 'Achievement Diary Task';
                descElement.textContent = 'Diary task information not available.';
                detailsElement.innerHTML = '';
            }
        } else if (type === 'skill') {
            const skillName = itemId.charAt(0).toUpperCase() + itemId.slice(1);
            nameElement.textContent = `${skillName} Training Goal`;
            descElement.textContent = `Set a training goal for your ${skillName} skill.`;
            detailsElement.innerHTML = `
                <p><strong>Skill:</strong> ${skillName}</p>
                <p><strong>Type:</strong> Skill Training Goal</p>
                <p>This will add a customizable ${skillName} training goal to your To-Do list.</p>
            `;
            
            // Show skill level input
            const skillLevelInput = document.getElementById('skill-level-input');
            const targetLevelInput = document.getElementById('target-level');
            const currentLevelSpan = document.getElementById('current-level');
            
            skillLevelInput.style.display = 'block';
            
            // Get current level from loaded player stats
            const currentLevel = getCurrentSkillLevel(itemId);
            currentLevelSpan.textContent = currentLevel;
            
            // Set minimum and default values
            targetLevelInput.min = currentLevel + 1; // Target must be higher than current
            const defaultValue = currentLevel >= 99 ? 99 : currentLevel + 1;
            targetLevelInput.value = defaultValue;
        }

        modal.style.display = 'block';
    } catch (error) {
        console.error('Error opening todo modal:', error);
        alert('Error opening modal. Please try again.');
    }
}

function closeTodoModal() {
    const modal = document.getElementById('todo-modal');
    const skillLevelInput = document.getElementById('skill-level-input');
    
    modal.style.display = 'none';
    skillLevelInput.style.display = 'none'; // Hide skill input
    currentModalData = null;
}

async function confirmAddToTodo() {
    if (!currentModalData) return;

    const { type, itemId, difficulty, taskIndex } = currentModalData;
    
    try {
        // Create a goal object to add to the master list
        let newGoal = null;

        if (type === 'quest') {
            const quest = window.QUESTS_DATABASE ? window.QUESTS_DATABASE[itemId] : null;
            if (quest) {
                // Check if quest is already completed
                const questStorageKey = `quest_${itemId}_completed`;
                const isAlreadyCompleted = localStorage.getItem(questStorageKey) === 'true';
                
                newGoal = {
                    id: `quest_${itemId}`,
                    title: quest.name,
                    description: quest.description,
                    category: 'Quests',
                    type: 'quest',
                    originalId: itemId,
                    completed: isAlreadyCompleted,
                    completedAt: isAlreadyCompleted ? new Date().toISOString() : null,
                    createdAt: new Date().toISOString()
                };
            }
        } else if (type === 'diary') {
            const diary = window.getDiaryById ? window.getDiaryById(itemId) : null;
            if (diary && diary.difficulties && diary.difficulties[difficulty] && 
                diary.difficulties[difficulty].tasks[taskIndex]) {
                const task = diary.difficulties[difficulty].tasks[taskIndex];
                
                // Check if diary task is already completed
                const diaryStorageKey = `diary_${itemId}_${difficulty}_${taskIndex}`;
                const isAlreadyCompleted = localStorage.getItem(diaryStorageKey) === 'true';
                
                newGoal = {
                    id: `diary_${itemId}_${difficulty}_${taskIndex}`,
                    title: `${diary.name} - ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`,
                    description: task.description,
                    category: 'Tasks',
                    type: 'diary',
                    originalId: itemId,
                    difficulty: difficulty,
                    taskIndex: taskIndex,
                    completed: isAlreadyCompleted,
                    completedAt: isAlreadyCompleted ? new Date().toISOString() : null,
                    createdAt: new Date().toISOString()
                };
            }
        } else if (type === 'skill') {
            const targetLevel = document.getElementById('target-level').value;
            const skillName = itemId.charAt(0).toUpperCase() + itemId.slice(1);
            newGoal = {
                id: `skill_${itemId}_${targetLevel}`,
                title: `${skillName} Level ${targetLevel}`,
                description: `Train ${skillName} to level ${targetLevel}`,
                category: 'Skills',
                type: 'skill',
                originalId: itemId,
                targetLevel: parseInt(targetLevel),
                completed: false,
                completedAt: null,
                createdAt: new Date().toISOString()
            };
        }

        if (newGoal) {
            // Add to master goals list
            window.masterGoalsList.push(newGoal);
            window.goalLookupMap.set(newGoal.id, newGoal);

            // Save to Firestore if available
            if (window.firestoreService && window.getCurrentUserId()) {
                await window.firestoreService.saveGoal(window.getCurrentUserId(), newGoal);
            } else {
                // Save to localStorage as fallback
                saveGoalsToLocalStorage();
            }

            // Refresh UI
            await populateGoalsList();
            updateRequirements();
            updateTaskSteps();

            console.log('Goal added successfully:', newGoal.title);
        }

        closeTodoModal();
    } catch (error) {
        console.error('Error adding goal:', error);
        alert('Error adding goal to your list. Please try again.');
    }
}

function openCustomGoalModal() {
    console.log('Custom goal modal not yet implemented');
    // This would open a modal to create a custom goal
}

function clearCompletedGoals() {
    const completedGoals = window.masterGoalsList.filter(g => g.completed);
    if (completedGoals.length === 0) {
        alert('No completed goals to clear.');
        return;
    }
    
    if (!confirm(`Are you sure you want to clear ${completedGoals.length} completed goals?`)) {
        return;
    }
    
    // Remove completed goals
    window.masterGoalsList = window.masterGoalsList.filter(g => !g.completed);
    
    // Remove from Firestore or localStorage
    if (window.firestoreService && window.getCurrentUserId()) {
        completedGoals.forEach(goal => {
            window.firestoreService.deleteGoal(window.getCurrentUserId(), goal.id)
                .catch(error => console.warn('Failed to delete completed goal:', error));
        });
    } else {
        // Save to localStorage as fallback
        saveGoalsToLocalStorage();
    }
    
    rebuildGoalLookupMap();
    populateGoalsList();
    updateRequirements();
    updateTaskSteps();
}

// Monster and potion functions
function populateMonsterSelector() {
    const selector = document.getElementById('monster-selector');
    if (!selector) return;
    
    console.log('Populating monster selector from database...');
    
    // Check if monsters.js functions are available
    if (typeof getSlayerMonsters === 'undefined') {
        console.error('getSlayerMonsters function not found! monsters.js may not be loaded.');
        return;
    }
    
    if (typeof MONSTER_DATABASE === 'undefined') {
        console.error('MONSTER_DATABASE not found! monsters.js may not be loaded.');
        return;
    }
    
    console.log('Monster database available:', Object.keys(MONSTER_DATABASE).length, 'monsters');
    
    // Get slayer monsters from the database
    const slayerMonsters = getSlayerMonsters();
    console.log(`Found ${slayerMonsters.length} slayer monsters in database`);
    
    // Clear existing options
    selector.innerHTML = '<option value="">Select a monster...</option>';
    
    // Add monster options sorted by slayer level
    slayerMonsters.forEach(monster => {
        const option = document.createElement('option');
        // Use the monster's ID directly instead of searching for it
        option.value = monster.id;
        const slayerText = monster.slayer_level > 0 ? `(Level ${monster.slayer_level} Slayer)` : '(No Slayer Level Required)';
        option.textContent = `${monster.name} ${slayerText}`;
        selector.appendChild(option);
    });
    
    console.log(`Loaded ${slayerMonsters.length} slayer monsters into dropdown`);
}

function updateMonsterInfo() {
    const selector = document.getElementById('monster-selector');
    const infoDiv = document.getElementById('monster-info');
    const placeholder = document.getElementById('monster-placeholder');
    const selectedMonster = selector ? selector.value : null;
    
    if (!selectedMonster) {
        if (infoDiv) infoDiv.style.display = 'none';
        if (placeholder) placeholder.style.display = 'block';
        return;
    }
    
    // Get monster from database
    const monster = getMonsterById ? getMonsterById(selectedMonster) : null;
    
    if (monster) {
        // Set monster name as clickable wiki link
        const nameElement = document.getElementById('monster-name');
        if (nameElement) {
            nameElement.innerHTML = `<span class="wiki-link" onclick="openWikiLink('${escapeHtml(monster.name)}')">${escapeHtml(monster.name)}</span>`;
        }
        
        // Format and display monster information
        const description = `Level ${monster.slayer_level} Slayer. ${monster.examine}`;
        const descElement = document.getElementById('monster-description');
        if (descElement) {
            descElement.textContent = description;
        }
        
        const hpElement = document.getElementById('monster-hp');
        if (hpElement) {
            hpElement.textContent = monster.hitpoints;
        }
        
        const defensesElement = document.getElementById('monster-defenses');
        if (defensesElement) {
            defensesElement.textContent = formatMonsterDefenses ? formatMonsterDefenses(monster) : 'Defense info not available';
        }
        
        const weaknessesElement = document.getElementById('monster-weaknesses');
        if (weaknessesElement) {
            weaknessesElement.textContent = monster.weaknesses || 'None specified';
        }
        
        // Format and make drops clickable
        const dropsElement = document.getElementById('monster-drops');
        if (dropsElement) {
            const dropsText = formatMonsterDrops ? formatMonsterDrops(monster) : 'Drop info not available';
            dropsElement.innerHTML = makeLinksClickable(dropsText);
        }
        
        // Format and make locations clickable using locations database
        const locationElement = document.getElementById('monster-location');
        if (locationElement) {
            locationElement.innerHTML = formatMonsterLocations(monster);
        }
        
        if (infoDiv) {
            infoDiv.style.display = 'block';
        }
        if (placeholder) {
            placeholder.style.display = 'none';
        }
    } else {
        if (infoDiv) infoDiv.style.display = 'none';
        if (placeholder) placeholder.style.display = 'block';
    }
}

// Helper functions for wiki links and location formatting
function formatMonsterLocations(monster) {
    if (!monster.locations || monster.locations.length === 0) {
        return 'No known locations';
    }

    const locationDetails = [];
    
    monster.locations.forEach(locationName => {
        // Try to find matching location in database by name
        const location = window.LOCATIONS_DATABASE ? Object.values(window.LOCATIONS_DATABASE).find(loc => 
            loc.name === locationName || 
            locationName.toLowerCase().includes(loc.name.toLowerCase()) ||
            loc.name.toLowerCase().includes(locationName.toLowerCase())
        ) : null;

        if (location) {
            const teleports = location.teleports.length > 0 ? 
                ` (${location.teleports.slice(0, 2).join(', ')})` : '';
            
            locationDetails.push(
                `<a href="${location.wiki_url}" target="_blank" style="color: #8b4513; text-decoration: underline;">
                    <strong>${location.name}</strong>
                </a>
                <span style="color: #666; font-size: 0.9em;">${teleports}</span>
                <div style="font-size: 0.8em; color: #555; margin-top: 2px;">
                    ${location.entrance_description}
                </div>`
            );
        } else {
            // Fallback for locations not in database
            const wikiUrl = `https://oldschool.runescape.wiki/w/${encodeURIComponent(locationName.replace(/ /g, '_'))}`;
            locationDetails.push(
                `<a href="${wikiUrl}" target="_blank" style="color: #8b4513; text-decoration: underline;">
                    ${locationName}
                </a>`
            );
        }
    });

    return locationDetails.join('<br><br>');
}

// Function to make specific items/locations clickable wiki links
function makeLinksClickable(text) {
    // List of items and locations that should be wiki links
    const wikiTerms = [
        // Notable drops/items
        'Abyssal whip', 'Abyssal dagger', 'Granite maul', 'Trident of the seas', 'Dark bow',
        'Wyvern visage', 'Black mask', 'Dragon bones', 'Arclight', 'Silverlight', 'Brine sabre',
        'Dust battlestaff', 'Mystic boots', 'Mystic gloves', 'Occult necklace', 'Dragon boots',
        'Basilisk jaw', 'Granite legs', 'Granite shield', 'Obsidian items', 'Dragon chainbody',
        
        // Major locations
        'Slayer Tower', 'Catacombs of Kourend', 'Kraken Cove', 'Fremennik Slayer Dungeon',
        'Stronghold Slayer Cave', 'Brimhaven Dungeon', 'Asgarnian Ice Dungeon',
        'Taverley Dungeon', 'God Wars Dungeon', 'TzHaar City', 'Smoke Dungeon',
        'Smoke Devil Dungeon', 'Edgeville Dungeon', 'Karamja Volcano', 'Waterfall Dungeon',
        'Mourner Tunnels', 'Ancient Cavern', 'Stronghold of Security', 'Wilderness',
        'Varrock Sewers', 'Lumbridge Swamp Caves', 'Yanille Agility Dungeon',
        'Lizardman Settlement', 'Lizardman Caves', 'Waterbirth Island', 'Lighthouse',
        'Heroes\' Guild', 'Ogre Enclave', 'Evil Chicken\'s Lair', 'Crandor',
        'White Wolf Mountain', 'Wizard\'s Tower', 'Mos Le\'Harmless Cave',
        'Wyvern Cave', 'Fossil Island', 'Jormungand\'s Prison', 'Olaf\'s Quest dungeon',
        'Combat Training Camp', 'Watchtower', 'Feldip Hills', 'Trollheim',
        'Death Plateau', 'Jatizso', 'Legends\' Guild', 'Witchaven Dungeon',
        'Hill Giant area', 'Fishing Trawler'
    ];
    
    let linkedText = text;
    wikiTerms.forEach(term => {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        linkedText = linkedText.replace(regex, `<span class="wiki-link" onclick="openWikiLink('${term}')">${term}</span>`);
    });
    
    return linkedText;
}

// Function to open OSRS Wiki links
function openWikiLink(term) {
    const wikiUrl = `https://oldschool.runescape.wiki/w/${encodeURIComponent(term.replace(/\s+/g, '_'))}`;
    window.open(wikiUrl, '_blank');
}

// Potion functionality
function populatePotionSelector() {
    const selector = document.getElementById('potion-type');
    if (!selector) return;
    
    console.log('Populating potion selector from database...');
    
    // Check if potions.js functions are available
    if (typeof getAllPotions === 'undefined') {
        console.error('getAllPotions function not found! potions.js may not be loaded.');
        return;
    }
    
    if (typeof POTIONS_DATABASE === 'undefined') {
        console.error('POTIONS_DATABASE not found! potions.js may not be loaded.');
        return;
    }
    
    console.log('Potion database available:', Object.keys(POTIONS_DATABASE).length, 'potions');
    
    // Get all potions from the database
    const potions = getAllPotions();
    console.log(`Found ${potions.length} potions in database`);
    
    // Clear existing options
    selector.innerHTML = '<option value="">Choose a potion...</option>';
    
    // Add potion options sorted by level requirement
    potions.forEach(potion => {
        const option = document.createElement('option');
        option.value = potion.id;
        option.textContent = `${potion.name} (Level ${potion.level_required})`;
        selector.appendChild(option);
    });
    
    console.log(`Loaded ${potions.length} potions into dropdown`);
}

function updatePotionInfo() {
    const selector = document.getElementById('potion-type');
    const infoDiv = document.getElementById('potion-info');
    const placeholder = document.getElementById('potion-placeholder');
    const selectedPotion = selector ? selector.value : null;
    
    if (!selectedPotion) {
        if (infoDiv) infoDiv.style.display = 'none';
        if (placeholder) placeholder.style.display = 'block';
        return;
    }
    
    // Get potion from database
    const potion = getPotionById ? getPotionById(selectedPotion) : null;
    
    if (potion) {
        // Set potion name as clickable wiki link
        const nameElement = document.getElementById('potion-name');
        if (nameElement) {
            nameElement.innerHTML = `<span class="wiki-link" onclick="openWikiLink('${escapeHtml(potion.name)}')">${escapeHtml(potion.name)}</span>`;
        }
        
        // Description (effect)
        const descElement = document.getElementById('potion-description');
        if (descElement) {
            descElement.textContent = potion.effect || 'Effect information not available';
        }
        
        // Ingredients
        const ingredientsElement = document.getElementById('potion-ingredients');
        if (ingredientsElement) {
            const ingredients = potion.getIngredientsList();
            ingredientsElement.innerHTML = '';
            ingredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.innerHTML = makeLinksClickable(`${ingredient.name} (${ingredient.quantity})`);
                ingredientsElement.appendChild(li);
            });
        }
        
        // Experience
        const expElement = document.getElementById('potion-experience');
        if (expElement) {
            expElement.textContent = `${potion.xp_gained} XP per potion`;
        }
        
        // Profit/Loss placeholder (would need GE API for accurate prices)
        const profitElement = document.getElementById('potion-profit');
        if (profitElement) {
            profitElement.textContent = 'Price data requires GE API integration';
        }
        
        if (infoDiv) {
            infoDiv.style.display = 'block';
        }
        if (placeholder) {
            placeholder.style.display = 'none';
        }
        
        // Update calculator
        calculatePotionResults();
    } else {
        if (infoDiv) infoDiv.style.display = 'none';
        if (placeholder) placeholder.style.display = 'block';
    }
}

function calculatePotionResults() {
    const selector = document.getElementById('potion-type');
    const quantityInput = document.getElementById('potion-quantity');
    const resultsDiv = document.getElementById('calculation-results');
    
    if (!selector || !quantityInput || !resultsDiv) return;
    
    const selectedPotion = selector.value;
    const quantity = parseInt(quantityInput.value) || 1;
    
    if (!selectedPotion) {
        resultsDiv.innerHTML = '';
        return;
    }
    
    const potion = getPotionById ? getPotionById(selectedPotion) : null;
    
    if (potion) {
        const totalXP = potion.xp_gained * quantity;
        const ingredients = potion.getIngredientsList();
        
        let resultsHTML = `
            <div class="calculation-result">
                <h4>📊 Making ${quantity} ${potion.name}:</h4>
                <p><strong>Total XP:</strong> ${totalXP.toLocaleString()}</p>
                <p><strong>Required Level:</strong> ${potion.level_required}</p>
                <div class="total-ingredients">
                    <h5>Total Ingredients Needed:</h5>
                    <ul>
        `;
        
        ingredients.forEach(ingredient => {
            const totalNeeded = ingredient.quantity * quantity;
            resultsHTML += `<li>${ingredient.name}: ${totalNeeded.toLocaleString()}</li>`;
        });
        
        resultsHTML += `
                    </ul>
                </div>
            </div>
        `;
        
        resultsDiv.innerHTML = resultsHTML;
    }
}

// Notes auto-save functionality
function setupNotesAutoSave() {
    const notesTextarea = document.getElementById('personal-notes');
    const saveStatus = document.getElementById('save-status');
    
    if (!notesTextarea) return;
    
    // Load saved notes
    const savedNotes = localStorage.getItem('osrs-personal-notes');
    if (savedNotes) {
        notesTextarea.value = savedNotes;
    }
    
    // Auto-save on input
    let saveTimeout;
    notesTextarea.addEventListener('input', () => {
        clearTimeout(saveTimeout);
        
        if (saveStatus) {
            saveStatus.textContent = 'Saving...';
            saveStatus.style.color = '#ff6b6b';
        }
        
        saveTimeout = setTimeout(() => {
            localStorage.setItem('osrs-personal-notes', notesTextarea.value);
            
            if (saveStatus) {
                saveStatus.textContent = 'Saved ✓';
                saveStatus.style.color = '#51cf66';
                
                setTimeout(() => {
                    saveStatus.textContent = '';
                }, 2000);
            }
        }, 1000);
    });
}

// Initialize compatibility layer when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🔧 Initializing compatibility layer...');
    
    // Set up notes auto-save
    setupNotesAutoSave();
    
    // Load todo list after a short delay to ensure services are initialized
    setTimeout(async () => {
        await loadToDoList();
        
        // Set up real-time sync if user is authenticated
        if (window.getCurrentUserId()) {
            setupRealtimeSync();
        }
        
        // Populate monster selector for slayer guide after a slight delay
        setTimeout(() => {
            populateMonsterSelector();
        }, 500);
        
        // Populate potion selector for potions guide after a slight delay
        setTimeout(() => {
            populatePotionSelector();
        }, 600);
    }, 1000);
});

// Requirements tab switching function
function switchRequirementsTab(tabName) {
    // Hide all requirement tab panels
    document.querySelectorAll('.requirements-tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Remove active class from all requirement tab buttons
    document.querySelectorAll('.requirements-tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show target panel
    const targetPanel = document.getElementById(`${tabName}-requirements-tab`);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    console.log(`Switched requirements tab to: ${tabName}`);
}

// Export functions globally for backward compatibility
window.populateGoalsList = populateGoalsList;
window.updateRequirements = updateRequirements;
window.updateTaskSteps = updateTaskSteps;
window.toggleGoalComplete = toggleGoalComplete;
window.removeGoal = removeGoal;
window.loadToDoList = loadToDoList;
window.setupRealtimeSync = setupRealtimeSync;
window.openTodoModal = openTodoModal;
window.closeTodoModal = closeTodoModal;
window.confirmAddToTodo = confirmAddToTodo;
window.clearCompletedGoals = clearCompletedGoals;
window.escapeHtml = escapeHtml;
window.validateUsername = validateUsername;
window.validateGroupName = validateGroupName;
window.switchRequirementsTab = switchRequirementsTab;
window.getCurrentSkillLevel = getCurrentSkillLevel;
window.saveGoalsToLocalStorage = saveGoalsToLocalStorage;
window.populateMonsterSelector = populateMonsterSelector;
window.updateMonsterInfo = updateMonsterInfo;
window.formatMonsterLocations = formatMonsterLocations;
window.makeLinksClickable = makeLinksClickable;
window.openWikiLink = openWikiLink;
window.populatePotionSelector = populatePotionSelector;
window.updatePotionInfo = updatePotionInfo;
window.calculatePotionResults = calculatePotionResults;

// Export monsters.js functions to window object if they exist
if (typeof MONSTER_DATABASE !== 'undefined') {
    window.MONSTER_DATABASE = MONSTER_DATABASE;
}
if (typeof getSlayerMonsters !== 'undefined') {
    window.getSlayerMonsters = getSlayerMonsters;
}
if (typeof getMonsterById !== 'undefined') {
    window.getMonsterById = getMonsterById;
}
if (typeof formatMonsterDefenses !== 'undefined') {
    window.formatMonsterDefenses = formatMonsterDefenses;
}
if (typeof formatMonsterDrops !== 'undefined') {
    window.formatMonsterDrops = formatMonsterDrops;
}

// Export potions.js functions to window object if they exist
if (typeof POTIONS_DATABASE !== 'undefined') {
    window.POTIONS_DATABASE = POTIONS_DATABASE;
}
if (typeof getAllPotions !== 'undefined') {
    window.getAllPotions = getAllPotions;
}
if (typeof getPotionById !== 'undefined') {
    window.getPotionById = getPotionById;
}
if (typeof getPotionsByCategory !== 'undefined') {
    window.getPotionsByCategory = getPotionsByCategory;
}
if (typeof getPotionsByLevel !== 'undefined') {
    window.getPotionsByLevel = getPotionsByLevel;
}
if (typeof formatIngredients !== 'undefined') {
    window.formatIngredients = formatIngredients;
}