const axios = require('axios');
const fs = require('fs');

// List of missing monsters
const missingMonsters = [
    'Ankous', 'Bats', 'Bears', 'Birds', 'Black demons', 'Black dragons', 
    'Blue dragons', 'Bronze dragons', 'Catablepon', 'Cows', 'Crocodiles', 
    'Cyclopes', 'Dagannoths', 'Dogs', 'Dwarfs', 'Earth warriors', 'Elves', 
    'Fire giants', 'Flesh Crawlers', 'Ghosts', 'Ghouls', 'Goblins', 
    'Greater demons', 'Green dragons', 'Hellhounds', 'Hill Giants', 
    'Hobgoblins', 'Icefiends', 'Ice giants', 'Ice warriors', 'Iron dragons', 
    'Jungle horrors', 'Kalphites', 'Lesser demons', 'Mithril dragons', 
    'Minotaurs', 'Monkeys', 'Moss giants', 'Ogres', 'Otherworldly beings', 
    'Rats', 'Red dragons', 'Scabarites', 'Scorpions', 'Sea snakes', 'Shades', 
    'Shadow warriors', 'Skeletons', 'Spiders', 'Steel dragons', 'Suqahs', 
    'Trolls', 'Vampyres', 'Waterfiends', 'Werewolves', 'Wolves', 'Zombies', 
    'Araxytes'
];
console.log("Script started. Fetching data for missing monsters...");
// Function to fetch data for a single monster
async function fetchMonsterData(monsterName) {
    const url = `https://oldschool.runescape.wiki/api.php?action=query&format=json&titles=${encodeURIComponent(monsterName)}&prop=extracts|info&inprop=url`;
    try {
        const response = await axios.get(url);
        const pages = response.data.query.pages;
        const page = Object.values(pages)[0];
        if (page.missing) {
            console.log(`Monster not found: ${monsterName}`);
            return null;
        }
        return {
            name: monsterName,
            url: page.fullurl,
            description: page.extract
        };
    } catch (error) {
        console.error(`Error fetching data for ${monsterName}:`, error);
        return null;
    }
}

// Fetch data for all missing monsters
async function fetchAllMonsters() {
    const monsterData = [];
    for (const monster of missingMonsters) {
        const data = await fetchMonsterData(monster);
        if (data) {
            monsterData.push(data);
        }
    }
    // Save the data to a JSON file
    fs.writeFileSync('missingMonsters.json', JSON.stringify(monsterData, null, 2));
    console.log('Monster data saved to missingMonsters.json');
}

// Run the script
fetchAllMonsters();