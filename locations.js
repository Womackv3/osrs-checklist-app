// OSRS Locations Database
// Complete location data for slayer dungeons and areas

class LocationProperties {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type; // 'dungeon', 'cave', 'tower', 'area', 'building'
        this.region = data.region;
        this.requirements = data.requirements || [];
        this.teleports = data.teleports || [];
        this.notable_features = data.notable_features || [];
        this.monsters = data.monsters || [];
        this.wiki_url = data.wiki_url;
        this.map_coordinates = data.map_coordinates || {};
        this.entrance_description = data.entrance_description;
        this.dangers = data.dangers || [];
        this.recommended_items = data.recommended_items || [];
        this.combat_level_rec = data.combat_level_rec || 1;
        this.slayer_only = data.slayer_only || false;
    }
}

// Comprehensive Locations Database
const LOCATIONS_DATABASE = {
    'slayer-tower': new LocationProperties({
        id: 'slayer-tower',
        name: 'Slayer Tower',
        type: 'tower',
        region: 'Morytania',
        requirements: ['Priest in Peril quest'],
        teleports: [
            'Slayer ring (slayer tower)',
            'Morytania legs teleport',
            'Canifis lodestone',
            'Ectophial to Port Phasmatys'
        ],
        notable_features: [
            'Multi-level dungeon',
            'Slayer masters nearby',
            'Multiple slayer monsters per floor',
            'Climbing boots required for upper floors'
        ],
        monsters: [
            'crawling-hand', 'banshee', 'infernal-mage', 'bloodveld', 
            'aberrant-spectre', 'gargoyle', 'nechryael', 'abyssal-demon'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Slayer_Tower',
        map_coordinates: { x: 3428, y: 3537 },
        entrance_description: 'Located in Morytania, north-east of Canifis',
        dangers: [
            'Aggressive monsters on some floors',
            'Spectres drain Prayer and stats',
            'High-level monsters on upper floors'
        ],
        recommended_items: [
            'Slayer helmet/nose peg (spectres)',
            'Rock hammer (gargoyles)',
            'Prayer potions',
            'Food',
            'Climbing boots'
        ],
        combat_level_rec: 40,
        slayer_only: true
    }),

    'fremennik-slayer-dungeon': new LocationProperties({
        id: 'fremennik-slayer-dungeon',
        name: 'Fremennik Slayer Dungeon',
        type: 'dungeon',
        region: 'Fremennik Province',
        requirements: [],
        teleports: [
            'Slayer ring (fremennik slayer dungeon)',
            'Rellekka teleport',
            'Fremennik sea boots teleport',
            'Lunar spellbook teleports'
        ],
        notable_features: [
            'Largest slayer dungeon',
            'Multiple slayer creatures',
            'Safe spots available',
            'Pet rock needed for some areas'
        ],
        monsters: [
            'cave-crawler', 'rockslug', 'cockatrice', 'pyrefiend', 
            'basilisk', 'jellies', 'turoth', 'kurask'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Fremennik_Slayer_Dungeon',
        map_coordinates: { x: 2796, y: 3615 },
        entrance_description: 'South-east of Rellekka, near the golden apple tree',
        dangers: [
            'Basilisks petrify without mirror shield',
            'Kurasks require leaf-bladed weapons',
            'Turoths require leaf-bladed weapons'
        ],
        recommended_items: [
            'Mirror shield (basilisks)',
            'Leaf-bladed weapons (kurask/turoth)',
            'Pet rock (some areas)',
            'Food and prayer potions'
        ],
        combat_level_rec: 30,
        slayer_only: true
    }),

    'catacombs-of-kourend': new LocationProperties({
        id: 'catacombs-of-kourend',
        name: 'Catacombs of Kourend',
        type: 'dungeon',
        region: 'Great Kourend',
        requirements: ['20% Arceuus favour'],
        teleports: [
            'Kourend teleport (arceuus spellbook)',
            'Xerics glade teleport',
            'Skills necklace (woodcutting guild)',
            'Kourend castle teleport'
        ],
        notable_features: [
            'Ancient shards and totem pieces',
            'Bursting/barraging spots',
            'Dark altar for ancient magicks',
            'Skotizo boss fight'
        ],
        monsters: [
            'bloodveld', 'aberrant-spectre', 'dust-devil', 'nechryael', 
            'abyssal-demon', 'dark-beast'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Catacombs_of_Kourend',
        map_coordinates: { x: 1665, y: 10000 },
        entrance_description: 'Multiple entrances throughout Kourend, main entrance in Arceuus',
        dangers: [
            'High-level monsters',
            'Multi-combat areas',
            'Easy to get lost in maze-like layout'
        ],
        recommended_items: [
            'Ancient magicks for bursting',
            'Prayer potions',
            'High-level food',
            'Slayer helmet'
        ],
        combat_level_rec: 80,
        slayer_only: true
    }),

    'lumbridge-swamp-caves': new LocationProperties({
        id: 'lumbridge-swamp-caves',
        name: 'Lumbridge Swamp Caves',
        type: 'cave',
        region: 'Misthalin',
        requirements: [],
        teleports: [
            'Lumbridge home teleport',
            'Draynor village lodestone',
            'Games necklace (barbarian outpost)'
        ],
        notable_features: [
            'Low-level slayer training',
            'Multiple cave systems',
            'Tears of Guthix minigame',
            'Cave goblin areas'
        ],
        monsters: ['cave-bug', 'cave-slime'],
        wiki_url: 'https://oldschool.runescape.wiki/w/Lumbridge_Swamp_Caves',
        map_coordinates: { x: 3169, y: 9572 },
        entrance_description: 'South of Lumbridge, in the swamp caves',
        dangers: [
            'Minimal danger',
            'Low-level monsters only'
        ],
        recommended_items: [
            'Light source',
            'Basic food',
            'Combat gear'
        ],
        combat_level_rec: 10,
        slayer_only: true
    }),

    'smoke-dungeon': new LocationProperties({
        id: 'smoke-dungeon',
        name: 'Smoke Dungeon',
        type: 'dungeon',
        region: 'Kharidian Desert',
        requirements: ['Desert Treasure quest'],
        teleports: [
            'Pollnivneach teleport',
            'Magic carpet to Pollnivneach',
            'Desert amulet teleports'
        ],
        notable_features: [
            'Constant damage from smoke',
            'Facemask required',
            'Desert Treasure quest area',
            'Ancient magicks altar nearby'
        ],
        monsters: ['dust-devil'],
        wiki_url: 'https://oldschool.runescape.wiki/w/Smoke_Dungeon',
        map_coordinates: { x: 3206, y: 9379 },
        entrance_description: 'South of Pollnivneach, in the desert',
        dangers: [
            'Constant smoke damage without protection',
            'Desert heat damage',
            'Aggressive dust devils'
        ],
        recommended_items: [
            'Facemask or slayer helmet',
            'Desert robes or water',
            'Prayer potions',
            'High-level food'
        ],
        combat_level_rec: 65,
        slayer_only: true
    }),

    'kraken-cove': new LocationProperties({
        id: 'kraken-cove',
        name: 'Kraken Cove',
        type: 'cave',
        region: 'Piscatoris',
        requirements: ['87 Slayer', 'Kraken task'],
        teleports: [
            'Piscatoris teleport',
            'Fairy ring AKQ',
            'Skills necklace (fishing guild)'
        ],
        notable_features: [
            'Kraken boss area',
            'Instance available',
            'Underwater combat',
            'Trident drops'
        ],
        monsters: ['cave-kraken'],
        wiki_url: 'https://oldschool.runescape.wiki/w/Kraken_Cove',
        map_coordinates: { x: 2280, y: 10022 },
        entrance_description: 'North-east of Piscatoris Fishing Colony',
        dangers: [
            'High-level monsters',
            'Magic attacks',
            'Boss encounter'
        ],
        recommended_items: [
            'Trident of the seas/swamp',
            'Magic defence gear',
            'Prayer potions',
            'Sharks or better food'
        ],
        combat_level_rec: 87,
        slayer_only: true
    }),

    'asgarnian-ice-dungeon': new LocationProperties({
        id: 'asgarnian-ice-dungeon',
        name: 'Asgarnian Ice Dungeon',
        type: 'dungeon',
        region: 'Asgarnia',
        requirements: [],
        teleports: [
            'Falador teleport',
            'Amulet of glory (draynor village)',
            'Port sarim lodestone'
        ],
        notable_features: [
            'Wyvern bone drops',
            'High-level combat area',
            'Elemental shield required',
            'Prayer training altar'
        ],
        monsters: ['skeletal-wyvern'],
        wiki_url: 'https://oldschool.runescape.wiki/w/Asgarnian_Ice_Dungeon',
        map_coordinates: { x: 3003, y: 9550 },
        entrance_description: 'South of Port Sarim, mudskipper point',
        dangers: [
            'Elemental breath attacks',
            'High-level monsters',
            'Freezing attacks'
        ],
        recommended_items: [
            'Elemental shield/mind shield/dragonfire shield',
            'Antifire potions',
            'Prayer potions',
            'High-level combat gear'
        ],
        combat_level_rec: 100,
        slayer_only: true
    }),

    'god-wars-dungeon': new LocationProperties({
        id: 'god-wars-dungeon',
        name: 'God Wars Dungeon',
        type: 'dungeon',
        region: 'Trollheim',
        requirements: ['Troll Stronghold quest'],
        teleports: [
            'Trollheim teleport',
            'God wars dungeon teleport (games necklace)',
            'Ghommals hilt teleports'
        ],
        notable_features: [
            'Four god faction areas',
            'Boss encounters',
            'God item requirements',
            'Killcount system'
        ],
        monsters: ['spiritual-mage'],
        wiki_url: 'https://oldschool.runescape.wiki/w/God_Wars_Dungeon',
        map_coordinates: { x: 2918, y: 5300 },
        entrance_description: 'North of Trollheim, past the mountain pass',
        dangers: [
            'All monsters aggressive without god items',
            'Very high-level monsters',
            'Multi-combat areas'
        ],
        recommended_items: [
            'God items (saradomin/zamorak/armadyl/bandos)',
            'High-level combat gear',
            'Prayer potions',
            'Best food available'
        ],
        combat_level_rec: 100,
        slayer_only: false
    }),

    'temple-of-light': new LocationProperties({
        id: 'temple-of-light',
        name: 'Temple of Light',
        type: 'building',
        region: 'Lletya',
        requirements: ['Mournings End Part II quest'],
        teleports: [
            'Lletya teleport crystal',
            'Teleport crystal',
            'Elf teleport crystal'
        ],
        notable_features: [
            'Light puzzle mechanics',
            'High-level agility obstacles',
            'Crystal equipment',
            'Dark beasts'
        ],
        monsters: ['dark-beast'],
        wiki_url: 'https://oldschool.runescape.wiki/w/Temple_of_Light',
        map_coordinates: { x: 2267, y: 3281 },
        entrance_description: 'Within Lletya, accessible after quest completion',
        dangers: [
            'High-level dark beasts',
            'Complex navigation',
            'Agility obstacles'
        ],
        recommended_items: [
            'High ranged gear',
            'Prayer potions',
            'Agility potions',
            'Best food available'
        ],
        combat_level_rec: 120,
        slayer_only: true
    }),

    'smoke-devil-dungeon': new LocationProperties({
        id: 'smoke-devil-dungeon',
        name: 'Smoke Devil Dungeon',
        type: 'dungeon',
        region: 'Zeah',
        requirements: ['93 Slayer'],
        teleports: [
            'Xerics glade teleport',
            'Kourend teleport',
            'Farming guild teleport'
        ],
        notable_features: [
            'Thermonuclear smoke devil boss',
            'Smoke devil minions',
            'Instance available',
            'Occult necklace drops'
        ],
        monsters: ['smoke-devil'],
        wiki_url: 'https://oldschool.runescape.wiki/w/Smoke_Devil_Dungeon',
        map_coordinates: { x: 2379, y: 9452 },
        entrance_description: 'Stronghold Slayer Cave entrance in Kourend',
        dangers: [
            'High-level monsters',
            'Boss encounters',
            'Magic attacks'
        ],
        recommended_items: [
            'Facemask or slayer helmet',
            'Magic defence gear',
            'Prayer potions',
            'High-level food'
        ],
        combat_level_rec: 110,
        slayer_only: true
    }),

    'karuulm-slayer-dungeon': new LocationProperties({
        id: 'karuulm-slayer-dungeon',
        name: 'Karuulm Slayer Dungeon',
        type: 'dungeon',
        region: 'Mount Karuulm',
        requirements: ['95 Slayer for hydras'],
        teleports: [
            'Rada\'s blessing teleport',
            'Fairy ring CIR',
            'Karamja gloves teleport'
        ],
        notable_features: [
            'Alchemical hydra boss',
            'Multi-phase boss fight',
            'High-level slayer content',
            'Hydra leather and claws'
        ],
        monsters: ['hydra'],
        wiki_url: 'https://oldschool.runescape.wiki/w/Karuulm_Slayer_Dungeon',
        map_coordinates: { x: 1311, y: 10188 },
        entrance_description: 'Mount Karuulm, accessed through Lovakengj',
        dangers: [
            'Highest level slayer monsters',
            'Complex boss mechanics',
            'High damage output'
        ],
        recommended_items: [
            'Best combat gear available',
            'Prayer potions',
            'Saradomin brews',
            'Anti-venom potions'
        ],
        combat_level_rec: 125,
        slayer_only: true
    })
};

// Helper functions
function getAllLocations() {
    return Object.values(LOCATIONS_DATABASE).sort((a, b) => a.name.localeCompare(b.name));
}

function getLocationById(id) {
    return LOCATIONS_DATABASE[id] || null;
}

function getLocationsByType(type) {
    return Object.values(LOCATIONS_DATABASE)
        .filter(location => location.type === type)
        .sort((a, b) => a.name.localeCompare(b.name));
}

function getLocationsByRegion(region) {
    return Object.values(LOCATIONS_DATABASE)
        .filter(location => location.region === region)
        .sort((a, b) => a.name.localeCompare(b.name));
}

function getSlayerLocations() {
    return Object.values(LOCATIONS_DATABASE)
        .filter(location => location.slayer_only)
        .sort((a, b) => a.combat_level_rec - b.combat_level_rec);
}

function getLocationsByMonster(monsterId) {
    return Object.values(LOCATIONS_DATABASE)
        .filter(location => location.monsters.includes(monsterId))
        .sort((a, b) => a.combat_level_rec - b.combat_level_rec);
}

function formatLocationTeleports(location) {
    if (!location.teleports || location.teleports.length === 0) {
        return 'No quick teleports available';
    }
    return location.teleports.slice(0, 3).join(', ') + (location.teleports.length > 3 ? `, +${location.teleports.length - 3} more` : '');
}

function formatLocationRequirements(location) {
    if (!location.requirements || location.requirements.length === 0) {
        return 'No requirements';
    }
    return location.requirements.join(', ');
}

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LOCATIONS_DATABASE,
        getAllLocations,
        getLocationById,
        getLocationsByType,
        getLocationsByRegion,
        getSlayerLocations,
        getLocationsByMonster,
        formatLocationTeleports,
        formatLocationRequirements
    };
}