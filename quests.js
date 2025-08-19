// OSRS Quest Database
// Complete quest data for Old School RuneScape

class QuestProperties {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.difficulty = data.difficulty; // 'novice', 'intermediate', 'experienced', 'master', 'grandmaster'
        this.description = data.description;
        this.requirements = data.requirements || [];
        this.guide = data.guide;
        this.rewards = data.rewards || [];
        this.completed = data.completed || false;
        this.wiki_url = data.wiki_url;
        this.release_date = data.release_date;
        this.quest_points = data.quest_points || 1;
        this.members = data.members || false;
        this.combat_required = data.combat_required || false;
        this.length = data.length; // 'very short', 'short', 'medium', 'long', 'very long'
        this.start_location = data.start_location;
        this.official_length = data.official_length;
        this.miniquest = data.miniquest || false; // true for miniquests
    }
}

// Comprehensive Quest Database
const QUESTS_DATABASE = {
    // ========== NOVICE QUESTS ==========
    'cooks-assistant': new QuestProperties({
        id: 'cooks-assistant',
        name: "Cook's Assistant",
        difficulty: 'novice',
        description: "Help the Lumbridge Castle cook make a cake for the Duke's birthday.",
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Cook%27s_Assistant/Quick_guide',
        rewards: [
            '300 Cooking experience',
            'Access to the Lumbridge Castle kitchen range'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Cook%27s_Assistant',
        release_date: '2001-01-04',
        quest_points: 1,
        members: false,
        combat_required: false,
        length: 'very short',
        start_location: 'Lumbridge Castle kitchen',
        official_length: 'Very short'
    }),

    'x-marks-the-spot': new QuestProperties({
        id: 'x-marks-the-spot',
        name: 'X Marks the Spot',
        difficulty: 'novice',
        description: 'A tutorial quest that introduces new players to questing mechanics.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/X_Marks_the_Spot/Quick_guide',
        rewards: [
            '300 Lumbridge & Draynor Diary experience',
            'Antique lamp (300 exp in any skill)'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/X_Marks_the_Spot',
        release_date: '2019-01-24',
        quest_points: 1,
        members: false,
        combat_required: false,
        length: 'very short',
        start_location: 'Lumbridge',
        official_length: 'Very short'
    }),

    'below-ice-mountain': new QuestProperties({
        id: 'below-ice-mountain',
        name: 'Below Ice Mountain',
        difficulty: 'novice', 
        description: 'Help the dwarves of Ice Mountain deal with a new threat.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Below_Ice_Mountain/Quick_guide',
        rewards: [
            '1,000 Mining experience',
            '1,000 Smithing experience',
            'Access to Dwarven Mine'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Below_Ice_Mountain',
        release_date: '2021-03-17',
        quest_points: 1,
        members: false,
        combat_required: true,
        length: 'short',
        start_location: 'Ice Mountain',
        official_length: 'Short'
    }),

    'the-corsair-curse': new QuestProperties({
        id: 'the-corsair-curse',
        name: 'The Corsair Curse',
        difficulty: 'novice',
        description: 'Help Captain Tock lift the curse from his crew.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/The_Corsair_Curse/Quick_guide',
        rewards: [
            '2,000 Strength experience',
            '2,000 Defence experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Corsair_Curse',
        release_date: '2013-08-06',
        quest_points: 2,
        members: false,
        combat_required: true,
        length: 'medium',
        start_location: 'Rimmington',
        official_length: 'Medium'
    }),

    'misthalin-mystery': new QuestProperties({
        id: 'misthalin-mystery',
        name: 'Misthalin Mystery',
        difficulty: 'novice',
        description: 'Help solve a mystery in the kingdom of Misthalin.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Misthalin_Mystery/Quick_guide',
        rewards: [
            '600 Crafting experience',
            '1,200 Mining experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Misthalin_Mystery',
        release_date: '2016-07-07',
        quest_points: 1,
        members: false,
        combat_required: false,
        length: 'short',
        start_location: 'Lumbridge',
        official_length: 'Short'
    }),

    'the-restless-ghost': new QuestProperties({
        id: 'the-restless-ghost',
        name: 'The Restless Ghost',
        difficulty: 'novice',
        description: 'Help Father Aereck deal with a ghost haunting Lumbridge church.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/The_Restless_Ghost/Quick_guide',
        rewards: [
            '1,125 Prayer experience',
            'Access to the Lumbridge Swamp training area'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Restless_Ghost',
        release_date: '2001-01-04',
        quest_points: 1,
        members: false,
        combat_required: false,
        length: 'short',
        start_location: 'Lumbridge Church',
        official_length: 'Short'
    }),

    'romeo-and-juliet': new QuestProperties({
        id: 'romeo-and-juliet',
        name: 'Romeo & Juliet',
        difficulty: 'novice',
        description: 'Help Romeo find his beloved Juliet in Varrock.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Romeo_%26_Juliet/Quick_guide',
        rewards: [
            '5 quest points'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Romeo_%26_Juliet',
        release_date: '2001-01-04',
        quest_points: 5,
        members: false,
        combat_required: false,
        length: 'short',
        start_location: 'Varrock Square',
        official_length: 'Short'
    }),

    'sheep-shearer': new QuestProperties({
        id: 'sheep-shearer',
        name: 'Sheep Shearer',
        difficulty: 'novice',
        description: 'Help Fred the Farmer by collecting wool from his sheep.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Sheep_Shearer/Quick_guide',
        rewards: [
            '150 Crafting experience',
            '60 coins'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Sheep_Shearer',
        release_date: '2001-01-04',
        quest_points: 1,
        members: false,
        combat_required: false,
        length: 'very short',
        start_location: 'Lumbridge Sheep Field',
        official_length: 'Very short'
    }),

    'shield-of-arrav': new QuestProperties({
        id: 'shield-of-arrav',
        name: 'Shield of Arrav',
        difficulty: 'novice',
        description: 'Help recover the legendary Shield of Arrav with another player.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Shield_of_Arrav/Quick_guide',
        rewards: [
            '600 coins',
            'Access to the Heroes\' Guild'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Shield_of_Arrav',
        release_date: '2001-01-04',
        quest_points: 1,
        members: false,
        combat_required: true,
        length: 'short',
        start_location: 'Varrock Palace Library',
        official_length: 'Short'
    }),

    'ernest-the-chicken': new QuestProperties({
        id: 'ernest-the-chicken',
        name: 'Ernest the Chicken',
        difficulty: 'novice',
        description: 'Help Veronica find her fiancé who has been turned into a chicken.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Ernest_the_Chicken/Quick_guide',
        rewards: [
            '300 coins',
            '4 feathers'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Ernest_the_Chicken',
        release_date: '2001-01-04',
        quest_points: 4,
        members: false,
        combat_required: false,
        length: 'short',
        start_location: 'Draynor Manor',
        official_length: 'Short'
    }),

    'vampyre-slayer': new QuestProperties({
        id: 'vampyre-slayer',
        name: 'Vampyre Slayer',
        difficulty: 'novice',
        description: 'Help rid Draynor Village of a dangerous vampyre.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Vampyre_Slayer/Quick_guide',
        rewards: [
            '4,825 Attack experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Vampyre_Slayer',
        release_date: '2001-01-04',
        quest_points: 3,
        members: false,
        combat_required: true,
        length: 'short',
        start_location: 'Draynor Village',
        official_length: 'Short'
    }),

    'imp-catcher': new QuestProperties({
        id: 'imp-catcher',
        name: 'Imp Catcher',
        difficulty: 'novice',
        description: 'Help Wizard Mizgog collect coloured beads from imps.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Imp_Catcher/Quick_guide',
        rewards: [
            '875 Magic experience',
            'Amulet of accuracy'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Imp_Catcher',
        release_date: '2001-01-04',
        quest_points: 1,
        members: false,
        combat_required: true,
        length: 'short',
        start_location: 'Wizards\' Tower',
        official_length: 'Short'
    }),

    'prince-ali-rescue': new QuestProperties({
        id: 'prince-ali-rescue',
        name: 'Prince Ali Rescue',
        difficulty: 'novice',
        description: 'Help rescue Prince Ali from Al-Kharid jail.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Prince_Ali_Rescue/Quick_guide',
        rewards: [
            '700 coins',
            'Free passage through Al-Kharid gate'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Prince_Ali_Rescue',
        release_date: '2001-01-04',
        quest_points: 3,
        members: false,
        combat_required: false,
        length: 'short',
        start_location: 'Al Kharid Palace',
        official_length: 'Short'
    }),

    'doric-quest': new QuestProperties({
        id: 'doric-quest',
        name: "Doric's Quest",
        difficulty: 'novice',
        description: 'Help Doric the dwarf with his anvil problems.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Doric%27s_Quest/Quick_guide',
        rewards: [
            '1,300 Mining experience',
            'Access to Doric\'s anvils',
            '180 coins'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Doric%27s_Quest',
        release_date: '2001-01-04',
        quest_points: 1,
        members: false,
        combat_required: false,
        length: 'very short',
        start_location: 'North of Falador',
        official_length: 'Very short'
    }),

    // ========== INTERMEDIATE QUESTS ==========
    'black-knights-fortress': new QuestProperties({
        id: 'black-knights-fortress',
        name: "Black Knights' Fortress",
        difficulty: 'intermediate',
        description: 'Infiltrate the Black Knights fortress to sabotage their plans.',
        requirements: [
            '12 Quest points'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Black_Knights%27_Fortress/Quick_guide',
        rewards: [
            '2,500 coins'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Black_Knights%27_Fortress',
        release_date: '2001-01-04',
        quest_points: 3,
        members: false,
        combat_required: false,
        length: 'short',
        start_location: 'White Knights\' Castle',
        official_length: 'Short'
    }),

    'witch-house': new QuestProperties({
        id: 'witch-house',
        name: 'Witch\'s House',
        difficulty: 'intermediate',
        description: 'Help a boy retrieve his ball from a witch\'s garden.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Witch%27s_House/Quick_guide',
        rewards: [
            '6,325 Hitpoints experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Witch%27s_House',
        release_date: '2001-01-04',
        quest_points: 4,
        members: false,
        combat_required: true,
        length: 'short',
        start_location: 'East of Taverley',
        official_length: 'Short'
    }),

    'knights-sword': new QuestProperties({
        id: 'knights-sword',
        name: "The Knight's Sword",
        difficulty: 'intermediate',
        description: 'Help a squire recover his knight\'s lost sword.',
        requirements: [
            '10 Mining'
        ],
        guide: 'https://oldschool.runescape.wiki/w/The_Knight%27s_Sword/Quick_guide',
        rewards: [
            '12,725 Smithing experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Knight%27s_Sword',
        release_date: '2001-01-04',
        quest_points: 1,
        members: false,
        combat_required: false,
        length: 'short',
        start_location: 'White Knights\' Castle',
        official_length: 'Short'
    }),

    'goblin-diplomacy': new QuestProperties({
        id: 'goblin-diplomacy',
        name: 'Goblin Diplomacy',
        difficulty: 'intermediate',
        description: 'Help settle a dispute about armor colors between goblin clans.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Goblin_Diplomacy/Quick_guide',
        rewards: [
            '200 Crafting experience',
            'Gold bar'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Goblin_Diplomacy',
        release_date: '2001-01-04',
        quest_points: 5,
        members: false,
        combat_required: false,
        length: 'short',
        start_location: 'Goblin Village',
        official_length: 'Short'
    }),

    'pirates-treasure': new QuestProperties({
        id: 'pirates-treasure',
        name: "Pirate's Treasure",
        difficulty: 'intermediate',
        description: 'Help RedBeard Frank recover his treasure on Karamja.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Pirate%27s_Treasure/Quick_guide',
        rewards: [
            '450 coins',
            '2 cut emeralds',
            'One-eyed Hector\'s casket'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Pirate%27s_Treasure',
        release_date: '2001-01-04',
        quest_points: 2,
        members: false,
        combat_required: false,
        length: 'short',
        start_location: 'Port Sarim',
        official_length: 'Short'
    }),

    'rune-mysteries': new QuestProperties({
        id: 'rune-mysteries',
        name: 'Rune Mysteries',
        difficulty: 'intermediate',
        description: 'Discover the secret of the runes and help the wizards.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Rune_Mysteries/Quick_guide',
        rewards: [
            'Access to the Runecrafting skill',
            'Air talisman',
            'Mind talisman'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Rune_Mysteries',
        release_date: '2001-03-27',
        quest_points: 1,
        members: false,
        combat_required: false,
        length: 'short',
        start_location: 'Lumbridge',
        official_length: 'Short'
    }),

    // ========== EXPERIENCED QUESTS (Members) ==========
    'druidic-ritual': new QuestProperties({
        id: 'druidic-ritual',
        name: 'Druidic Ritual',
        difficulty: 'experienced',
        description: 'Help the druids perform an ancient ritual to unlock Herblore.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Druidic_Ritual/Quick_guide',
        rewards: [
            'Access to the Herblore skill',
            '250 Herblore experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Druidic_Ritual',
        release_date: '2001-12-12',
        quest_points: 4,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Taverley',
        official_length: 'Short'
    }),

    'lost-city': new QuestProperties({
        id: 'lost-city',
        name: 'Lost City',
        difficulty: 'experienced',
        description: 'Find the lost fairy city of Zanaris.',
        requirements: [
            '31 Crafting',
            '36 Woodcutting'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Lost_City/Quick_guide',
        rewards: [
            'Access to Zanaris',
            'Dragon longsword',
            'Dragon dagger'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Lost_City',
        release_date: '2001-08-27',
        quest_points: 3,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Lumbridge Swamp',
        official_length: 'Medium'
    }),

    'witchs-potion': new QuestProperties({
        id: 'witchs-potion',
        name: "Witch's Potion",
        difficulty: 'experienced',
        description: 'Help Hetty the witch brew a magical potion.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Witch%27s_Potion/Quick_guide',
        rewards: [
            '325 Magic experience',
            'Access to Hetty\'s magic shop'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Witch%27s_Potion',
        release_date: '2001-12-12',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'very short',
        start_location: 'Rimmington',
        official_length: 'Very short'
    }),

    'demon-slayer': new QuestProperties({
        id: 'demon-slayer',
        name: 'Demon Slayer',
        difficulty: 'experienced',
        description: 'Save Varrock from the terrible demon Delrith.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Demon_Slayer/Quick_guide',
        rewards: [
            'Silverlight',
            '3 quest points'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Demon_Slayer',
        release_date: '2001-01-04',
        quest_points: 3,
        members: false,
        combat_required: true,
        length: 'short',
        start_location: 'Varrock',
        official_length: 'Short'
    }),

    'dragon-slayer-i': new QuestProperties({
        id: 'dragon-slayer-i',
        name: 'Dragon Slayer I',
        difficulty: 'experienced',
        description: 'Prove yourself worthy by slaying the dragon Elvarg.',
        requirements: [
            '32 Quest points',
            'Able to defeat Elvarg (level 83)'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Dragon_Slayer_I/Quick_guide',
        rewards: [
            '18,650 Strength and Defence experience',
            'Ability to wear rune platebody and green dragonhide body'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Dragon_Slayer_I',
        release_date: '2001-01-04',
        quest_points: 2,
        members: false,
        combat_required: true,
        length: 'long',
        start_location: 'Lumbridge',
        official_length: 'Long'
    }),

    // ========== MASTER QUESTS ==========
    'monkey-madness-i': new QuestProperties({
        id: 'monkey-madness-i',
        name: 'Monkey Madness I',
        difficulty: 'master',
        description: 'Help the gnomes in their battle against the monkeys of Ape Atoll.',
        requirements: [
            'The Grand Tree',
            'Tree Gnome Village'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Monkey_Madness_I/Quick_guide',
        rewards: [
            '35,000 Attack and Defence experience, OR 20,000 Strength and Hitpoints experience',
            'Dragon scimitar',
            'Access to Ape Atoll'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Monkey_Madness_I',
        release_date: '2004-12-06',
        quest_points: 3,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Tree Gnome Stronghold',
        official_length: 'Long'
    }),

    'legends-quest': new QuestProperties({
        id: 'legends-quest',
        name: 'Legends\' Quest',
        difficulty: 'master',
        description: 'Prove yourself worthy to enter the Legends\' Guild.',
        requirements: [
            'Family Crest',
            'Heroes\' Quest',
            'Shilo Village',
            'Underground Pass',
            'Waterfall Quest',
            '50 Attack',
            '50 Defence',
            '45 Magic',
            '56 Quest points',
            '50 Crafting',
            '50 Mining',
            '52 Prayer',
            '42 Thieving',
            '50 Woodcutting',
            '50 Agility',
            '50 Herblore',
            '45 Cooking',
            '40 Fishing',
            '50 Firemaking',
            '50 Magic',
            '50 Smithing'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Legends%27_Quest/Quick_guide',
        rewards: [
            'Access to Legends\' Guild',
            '7,650 Attack, Defence, Strength, and Hitpoints experience',
            '1,575 Prayer experience',
            '3,875 Woodcutting experience',
            '4 quest points'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Legends%27_Quest',
        release_date: '2003-08-20',
        quest_points: 4,
        members: true,
        combat_required: true,
        length: 'very long',
        start_location: 'Legends\' Guild',
        official_length: 'Very long'
    }),

    'recipe-for-disaster': new QuestProperties({
        id: 'recipe-for-disaster',
        name: 'Recipe for Disaster',
        difficulty: 'master',
        description: 'Save the Lumbridge council members from the Culinaromancer.',
        requirements: [
            'Cook\'s Assistant',
            '175+ Quest points',
            'Multiple subquest requirements'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Recipe_for_Disaster/Quick_guide',
        rewards: [
            'Access to Culinaromancer\'s chest',
            'Barrows gloves',
            'Various experience rewards'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Recipe_for_Disaster',
        release_date: '2006-03-14',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'very long',
        start_location: 'Lumbridge Castle',
        official_length: 'Very long'
    }),

    // ========== GRANDMASTER QUESTS ==========
    'monkey-madness-ii': new QuestProperties({
        id: 'monkey-madness-ii',
        name: 'Monkey Madness II',
        difficulty: 'grandmaster',
        description: 'Return to Ape Atoll to stop Glough\'s evil plan.',
        requirements: [
            'Monkey Madness I',
            'Enlightened Journey',
            'The Grand Tree',
            'Tree Gnome Village',
            '69 Slayer',
            '70 Crafting',
            '60 Hunter',
            '55 Agility',
            '55 Thieving'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Monkey_Madness_II/Quick_guide',
        rewards: [
            '50,000 experience in Attack, Defence, Strength, and Hitpoints',
            '20,000 Slayer experience',
            'Heavy ballista',
            'Access to maniacal monkeys'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Monkey_Madness_II',
        release_date: '2016-05-19',
        quest_points: 4,
        members: true,
        combat_required: true,
        length: 'very long',
        start_location: 'Tree Gnome Stronghold',
        official_length: 'Very long'
    }),

    'dragon-slayer-ii': new QuestProperties({
        id: 'dragon-slayer-ii',
        name: 'Dragon Slayer II',
        difficulty: 'grandmaster',
        description: 'Face Vorkath and uncover the truth about dragons.',
        requirements: [
            'Dragon Slayer I',
            'Legends\' Quest',
            'Dream Mentor',
            'A Void Dance',
            '75 Magic',
            '70 Smithing',
            '68 Mining',
            '62 Crafting',
            '60 Agility',
            '50 Construction'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Dragon_Slayer_II/Quick_guide',
        rewards: [
            '200,000 experience in two combat skills',
            '15,000 Magic experience',
            'Access to Vorkath',
            'Mythical cape'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Dragon_Slayer_II',
        release_date: '2018-01-04',
        quest_points: 5,
        members: true,
        combat_required: true,
        length: 'very long',
        start_location: 'Lithkren Vault',
        official_length: 'Very long'
    }),

    // ========== MORE INTERMEDIATE QUESTS ==========
    'waterfall-quest': new QuestProperties({
        id: 'waterfall-quest',
        name: 'Waterfall Quest',
        difficulty: 'intermediate',
        description: 'Search for treasure behind the Baxtorian Falls.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Waterfall_Quest/Quick_guide',
        rewards: [
            '13,750 Attack experience',
            '13,750 Strength experience',
            '2 diamonds',
            '2 gold bars',
            '40 mithril seeds'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Waterfall_Quest',
        release_date: '2002-12-12',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'Baxtorian Falls',
        official_length: 'Medium'
    }),

    'fight-arena': new QuestProperties({
        id: 'fight-arena',
        name: 'Fight Arena',
        difficulty: 'intermediate',
        description: 'Save two warriors from the Fight Arena.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Fight_Arena/Quick_guide',
        rewards: [
            '12,175 Attack experience',
            '2,175 Thieving experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Fight_Arena',
        release_date: '2002-06-03',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'short',
        start_location: 'Al Kharid',
        official_length: 'Short'
    }),

    'tree-gnome-village': new QuestProperties({
        id: 'tree-gnome-village',
        name: 'Tree Gnome Village',
        difficulty: 'intermediate',
        description: 'Help the gnomes defend their village.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Tree_Gnome_Village/Quick_guide',
        rewards: [
            '11,450 Attack experience',
            'Access to gnome glider network',
            'Gnome amulet'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Tree_Gnome_Village',
        release_date: '2003-03-25',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Tree Gnome Village',
        official_length: 'Medium'
    }),

    'the-grand-tree': new QuestProperties({
        id: 'the-grand-tree',
        name: 'The Grand Tree',
        difficulty: 'intermediate',
        description: 'Help King Narnode save the Grand Tree.',
        requirements: ['Tree Gnome Village'],
        guide: 'https://oldschool.runescape.wiki/w/The_Grand_Tree/Quick_guide',
        rewards: [
            '18,400 Attack experience',
            '7,900 Magic experience',
            'Access to gnome glider to Grand Tree'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Grand_Tree',
        release_date: '2003-10-14',
        quest_points: 5,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Tree Gnome Stronghold',
        official_length: 'Medium'
    }),

    'merlin-crystal': new QuestProperties({
        id: 'merlin-crystal',
        name: "Merlin's Crystal",
        difficulty: 'intermediate',
        description: 'Free Merlin from his crystal prison.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Merlin%27s_Crystal/Quick_guide',
        rewards: [
            'Excalibur',
            '6 quest points'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Merlin%27s_Crystal',
        release_date: '2001-01-04',
        quest_points: 6,
        members: false,
        combat_required: true,
        length: 'short',
        start_location: 'Camelot Castle',
        official_length: 'Short'
    }),

    'holy-grail': new QuestProperties({
        id: 'holy-grail',
        name: 'Holy Grail',
        difficulty: 'intermediate',
        description: 'Help King Arthur find the Holy Grail.',
        requirements: ["Merlin's Crystal", '20 Attack'],
        guide: 'https://oldschool.runescape.wiki/w/Holy_Grail/Quick_guide',
        rewards: [
            '15,300 Prayer experience',
            '2 quest points'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Holy_Grail',
        release_date: '2001-01-04',
        quest_points: 2,
        members: false,
        combat_required: true,
        length: 'short',
        start_location: 'Camelot Castle',
        official_length: 'Short'
    }),

    'scorpion-catcher': new QuestProperties({
        id: 'scorpion-catcher',
        name: 'Scorpion Catcher',
        difficulty: 'intermediate',
        description: 'Help the Seer recapture his escaped scorpions.',
        requirements: ['31 Prayer'],
        guide: 'https://oldschool.runescape.wiki/w/Scorpion_Catcher/Quick_guide',
        rewards: [
            '6,625 Strength experience',
            'Seer\'s headband'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Scorpion_Catcher',
        release_date: '2001-12-12',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Seer\'s Village',
        official_length: 'Short'
    }),

    'family-crest': new QuestProperties({
        id: 'family-crest',
        name: 'Family Crest',
        difficulty: 'intermediate',
        description: 'Help Dimintheis find his three sons and the family crest.',
        requirements: [
            '40 Mining',
            '40 Smithing',
            '59 Magic',
            '40 Crafting'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Family_Crest/Quick_guide',
        rewards: [
            '2,812 Magic experience',
            '2,812 Smithing experience',
            'Gauntlets of various types',
            'Combat bracelet'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Family_Crest',
        release_date: '2003-08-20',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Varrock',
        official_length: 'Long'
    }),

    'tribal-totem': new QuestProperties({
        id: 'tribal-totem',
        name: 'Tribal Totem',
        difficulty: 'intermediate',
        description: 'Retrieve a tribal totem from Ardougne.',
        requirements: ['21 Thieving'],
        guide: 'https://oldschool.runescape.wiki/w/Tribal_Totem/Quick_guide',
        rewards: [
            '1,775 Thieving experience',
            '5 swordfish'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Tribal_Totem',
        release_date: '2002-08-14',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Brimhaven',
        official_length: 'Short'
    }),

    'fishing-contest': new QuestProperties({
        id: 'fishing-contest',
        name: 'Fishing Contest',
        difficulty: 'intermediate',
        description: 'Win a fishing contest to gain passage through White Wolf Mountain.',
        requirements: ['10 Fishing'],
        guide: 'https://oldschool.runescape.wiki/w/Fishing_Contest/Quick_guide',
        rewards: [
            '2,437 Fishing experience',
            'Access through White Wolf Mountain',
            'Fishing trophy'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Fishing_Contest',
        release_date: '2001-12-12',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Hemenster',
        official_length: 'Short'
    }),

    // ========== MORE EXPERIENCED QUESTS ==========
    'clocktower': new QuestProperties({
        id: 'clocktower',
        name: 'Clock Tower',
        difficulty: 'experienced',
        description: 'Help Brother Kojo fix the Clocktower.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Clock_Tower/Quick_guide',
        rewards: [
            '1,500 experience in any skill above level 10'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Clock_Tower',
        release_date: '2002-09-11',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Clock Tower',
        official_length: 'Short'
    }),

    'underground-pass': new QuestProperties({
        id: 'underground-pass',
        name: 'Underground Pass',
        difficulty: 'experienced',
        description: 'Navigate the dangerous Underground Pass to reach the elven lands.',
        requirements: [
            '25 Ranged',
            'Biohazard'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Underground_Pass/Quick_guide',
        rewards: [
            '3,000 Attack experience',
            'Access to Tirannwn',
            'Iban\'s staff'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Underground_Pass',
        release_date: '2004-08-26',
        quest_points: 5,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'West Ardougne',
        official_length: 'Long'
    }),

    'plague-city': new QuestProperties({
        id: 'plague-city',
        name: 'Plague City',
        difficulty: 'experienced',
        description: 'Find Elena who is trapped in West Ardougne.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Plague_City/Quick_guide',
        rewards: [
            '2,425 Mining experience',
            'Access to West Ardougne'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Plague_City',
        release_date: '2002-08-14',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'East Ardougne',
        official_length: 'Short'
    }),

    'biohazard': new QuestProperties({
        id: 'biohazard',
        name: 'Biohazard',
        difficulty: 'experienced',
        description: 'Help Elena and the citizens of West Ardougne.',
        requirements: ['Plague City'],
        guide: 'https://oldschool.runescape.wiki/w/Biohazard/Quick_guide',
        rewards: [
            '1,250 Thieving experience',
            'Access to Tirannwn area'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Biohazard',
        release_date: '2002-08-14',
        quest_points: 3,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'East Ardougne',
        official_length: 'Medium'
    }),

    'sea-slug': new QuestProperties({
        id: 'sea-slug',
        name: 'Sea Slug',
        difficulty: 'experienced',
        description: 'Investigate the strange happenings on Witchaven.',
        requirements: ['30 Firemaking'],
        guide: 'https://oldschool.runescape.wiki/w/Sea_Slug/Quick_guide',
        rewards: [
            '7,175 Fishing experience',
            'Oyster pearls'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Sea_Slug',
        release_date: '2003-01-27',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Witchaven',
        official_length: 'Short'
    }),

    'priest-peril': new QuestProperties({
        id: 'priest-peril',
        name: 'Priest in Peril',
        difficulty: 'experienced',
        description: 'Help the monk in Paterdomus.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Priest_in_Peril/Quick_guide',
        rewards: [
            '1,406 Prayer experience',
            'Access to Morytania'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Priest_in_Peril',
        release_date: '2005-05-31',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'short',
        start_location: 'Paterdomus',
        official_length: 'Short'
    }),

    'nature-spirit': new QuestProperties({
        id: 'nature-spirit',
        name: 'Nature Spirit',
        difficulty: 'experienced',
        description: 'Help the Nature Spirit in Mort Myre Swamp.',
        requirements: [
            'Priest in Peril',
            'The Restless Ghost'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Nature_Spirit/Quick_guide',
        rewards: [
            '2,000 Crafting experience',
            '2,000 Defence experience',
            '2,000 Hitpoints experience',
            'Access to fairy rings'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Nature_Spirit',
        release_date: '2005-05-31',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Mort Myre Swamp',
        official_length: 'Medium'
    }),

    'in-search-of-myreque': new QuestProperties({
        id: 'in-search-of-myreque',
        name: 'In Search of the Myreque',
        difficulty: 'experienced',
        description: 'Find the secret organization fighting Drakan.',
        requirements: [
            'Nature Spirit',
            '25 Agility'
        ],
        guide: 'https://oldschool.runescape.wiki/w/In_Search_of_the_Myreque/Quick_guide',
        rewards: [
            '600 Attack experience',
            '600 Defence experience',
            'Steel sickle'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/In_Search_of_the_Myreque',
        release_date: '2005-09-06',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Canifis',
        official_length: 'Medium'
    }),

    'shilo-village': new QuestProperties({
        id: 'shilo-village',
        name: 'Shilo Village',
        difficulty: 'experienced',
        description: 'Help the people of Shilo Village with their undead problem.',
        requirements: [
            'Jungle Potion',
            '4 Crafting',
            '20 Smithing'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Shilo_Village/Quick_guide',
        rewards: [
            '3,875 Crafting experience',
            'Access to Shilo Village',
            'Yommi tree seeds'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Shilo_Village',
        release_date: '2003-07-16',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Shilo Village',
        official_length: 'Long'
    }),

    'jungle-potion': new QuestProperties({
        id: 'jungle-potion',
        name: 'Jungle Potion',
        difficulty: 'experienced',
        description: 'Help Trufitus brew a special potion.',
        requirements: [
            '3 Herblore'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Jungle_Potion/Quick_guide',
        rewards: [
            '775 Herblore experience',
            'Barbarian training access'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Jungle_Potion',
        release_date: '2003-07-16',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Karamja',
        official_length: 'Short'
    }),

    'animal-magnetism': new QuestProperties({
        id: 'animal-magnetism',
        name: 'Animal Magnetism',
        difficulty: 'experienced',
        description: 'Help Ava create a device that will attract arrows.',
        requirements: [
            'The Restless Ghost',
            'Ernest the Chicken',
            'Priest in Peril',
            '18 Slayer',
            '19 Crafting',
            '30 Ranged',
            '35 Woodcutting'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Animal_Magnetism/Quick_guide',
        rewards: [
            'Ava\'s accumulator',
            '1,000 Fletching experience',
            '2,500 Woodcutting experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Animal_Magnetism',
        release_date: '2007-09-11',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'short',
        start_location: 'Draynor Manor',
        official_length: 'Short'
    }),

    // ========== MORE MASTER AND EXPERT QUESTS ==========
    'heroes-quest': new QuestProperties({
        id: 'heroes-quest',
        name: "Heroes' Quest",
        difficulty: 'master',
        description: 'Prove yourself worthy to join the Heroes\' Guild.',
        requirements: [
            'Shield of Arrav',
            '55 Quest points',
            '53 Cooking',
            '53 Fishing',
            '25 Herblore',
            '50 Mining'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Heroes%27_Quest/Quick_guide',
        rewards: [
            'Access to Heroes\' Guild',
            '3,075 Attack, Defence, Strength, and Hitpoints experience',
            '1,575 Cooking, Fishing, Firemaking, Ranged, and Woodcutting experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Heroes%27_Quest',
        release_date: '2003-08-20',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Heroes\' Guild',
        official_length: 'Long'
    }),

    'horror-deep': new QuestProperties({
        id: 'horror-deep',
        name: 'Horror from the Deep',
        difficulty: 'experienced',
        description: 'Investigate the Lighthouse and face an ancient horror.',
        requirements: [
            '35 Agility'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Horror_from_the_Deep/Quick_guide',
        rewards: [
            '4,662 Magic experience',
            '4,662 Ranged experience',
            '4,662 Strength experience',
            'God books'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Horror_from_the_Deep',
        release_date: '2005-01-17',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Lighthouse',
        official_length: 'Medium'
    }),

    'throne-miscellania': new QuestProperties({
        id: 'throne-miscellania',
        name: 'Throne of Miscellania',
        difficulty: 'experienced',
        description: 'Help Prince Brand reclaim his throne on Miscellania.',
        requirements: [
            'The Fremennik Trials',
            '40 Woodcutting'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Throne_of_Miscellania/Quick_guide',
        rewards: [
            '5,000 Thieving experience',
            '5,000 Defence experience',
            'Access to Managing Miscellania'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Throne_of_Miscellania',
        release_date: '2005-11-29',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'short',
        start_location: 'Miscellania',
        official_length: 'Short'
    }),

    'monkey-madness-i': new QuestProperties({
        id: 'monkey-madness-i',
        name: 'Monkey Madness I',
        difficulty: 'master',
        description: 'Help the gnomes in their battle against the monkeys of Ape Atoll.',
        requirements: [
            'The Grand Tree',
            'Tree Gnome Village'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Monkey_Madness_I/Quick_guide',
        rewards: [
            '35,000 Attack and Defence experience, OR 20,000 Strength and Hitpoints experience',
            'Dragon scimitar',
            'Access to Ape Atoll'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Monkey_Madness_I',
        release_date: '2004-12-06',
        quest_points: 3,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Tree Gnome Stronghold',
        official_length: 'Long'
    }),

    'desert-treasure': new QuestProperties({
        id: 'desert-treasure',
        name: 'Desert Treasure',
        difficulty: 'master',
        description: 'Help the archaeologist find four diamonds of Azzanadra.',
        requirements: [
            'The Dig Site',
            'Temple of Ikov',
            'The Tourist Trap',
            'Troll Stronghold',
            'Death Plateau',
            'Waterfall Quest',
            '53 Thieving',
            '50 Firemaking',
            '10 Slayer',
            '50 Magic'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Desert_Treasure/Quick_guide',
        rewards: [
            'Ancient Magicks spellbook',
            '20,000 Magic experience',
            'Access to four ancient bosses'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Desert_Treasure',
        release_date: '2005-01-17',
        quest_points: 3,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Bedabin Camp',
        official_length: 'Long'
    }),

    'regicide': new QuestProperties({
        id: 'regicide',
        name: 'Regicide',
        difficulty: 'master',
        description: 'Help the rebels overthrow King Lathas.',
        requirements: [
            'Underground Pass',
            '56 Agility'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Regicide/Quick_guide',
        rewards: [
            '13,750 Agility experience',
            'Access to Tirannwn',
            'Crystal bow'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Regicide',
        release_date: '2004-08-26',
        quest_points: 3,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'East Ardougne',
        official_length: 'Long'
    }),

    'roving-elves': new QuestProperties({
        id: 'roving-elves',
        name: 'Roving Elves',
        difficulty: 'experienced',
        description: 'Help Islwyn track down the Dark Lord.',
        requirements: [
            'Regicide',
            'Waterfall Quest'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Roving_Elves/Quick_guide',
        rewards: [
            '10,000 Strength experience',
            'Crystal bow (full)',
            'Access to Lletya'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Roving_Elves',
        release_date: '2004-12-06',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'short',
        start_location: 'Lletya',
        official_length: 'Short'
    }),

    'mournings-end-part-i': new QuestProperties({
        id: 'mournings-end-part-i',
        name: "Mourning's End Part I",
        difficulty: 'master',
        description: 'Discover the truth behind the plague in West Ardougne.',
        requirements: [
            'Roving Elves',
            '60 Ranged'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Mourning%27s_End_Part_I/Quick_guide',
        rewards: [
            '25,000 Ranged experience',
            'Teleport crystal',
            'Access to Death Altar'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Mourning%27s_End_Part_I',
        release_date: '2004-12-06',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Lletya',
        official_length: 'Long'
    }),

    'mournings-end-part-ii': new QuestProperties({
        id: 'mournings-end-part-ii',
        name: "Mourning's End Part II",
        difficulty: 'master',
        description: 'Navigate the Temple of Light and face the Dark Lord.',
        requirements: [
            "Mourning's End Part I",
            '60 Agility'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Mourning%27s_End_Part_II/Quick_guide',
        rewards: [
            '20,000 Agility experience',
            'Access to Dark Altar',
            'Death talisman'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Mourning%27s_End_Part_II',
        release_date: '2005-10-17',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Temple of Light',
        official_length: 'Long'
    }),

    // ========== SLAYER AND COMBAT QUESTS ==========
    'smoking-kills': new QuestProperties({
        id: 'smoking-kills',
        name: 'Smoking Kills',
        difficulty: 'experienced',
        description: 'Help the Slayer Masters with a dangerous experiment.',
        requirements: [
            '35 Slayer',
            'Priest in Peril'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Smoking_Kills/Quick_guide',
        rewards: [
            'Double Slayer Points',
            'Access to new Slayer rewards',
            '18,500 Slayer experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Smoking_Kills',
        release_date: '2007-01-15',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Pollnivneach',
        official_length: 'Medium'
    }),

    'wanted': new QuestProperties({
        id: 'wanted',
        name: 'Wanted!',
        difficulty: 'experienced',
        description: 'Help capture the notorious criminal Solus Dellagar.',
        requirements: [
            '32 Quest points'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Wanted!/Quick_guide',
        rewards: [
            'Access to White Knights\' Fortress',
            '5,000 Strength experience',
            '5,000 Defence experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Wanted!',
        release_date: '2006-01-17',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Falador',
        official_length: 'Medium'
    }),

    // ========== FREMENNIK QUESTLINE ==========
    'fremennik-trials': new QuestProperties({
        id: 'fremennik-trials',
        name: 'The Fremennik Trials',
        difficulty: 'experienced',
        description: 'Become an honorary member of the Fremennik tribe.',
        requirements: [
            '40 Fletching',
            '40 Woodcutting'
        ],
        guide: 'https://oldschool.runescape.wiki/w/The_Fremennik_Trials/Quick_guide',
        rewards: [
            '2,812 Attack, Defence, Strength, and Hitpoints experience',
            '2,812 Agility, Fletching, Thieving, and Woodcutting experience',
            'Access to Rellekka'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Fremennik_Trials',
        release_date: '2004-11-23',
        quest_points: 3,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Rellekka',
        official_length: 'Long'
    }),

    'fremennik-isles': new QuestProperties({
        id: 'fremennik-isles',
        name: 'The Fremennik Isles',
        difficulty: 'experienced',
        description: 'Help settle the dispute between Jatizso and Neitiznot.',
        requirements: [
            'The Fremennik Trials',
            '56 Woodcutting',
            '46 Crafting',
            '20 Construction'
        ],
        guide: 'https://oldschool.runescape.wiki/w/The_Fremennik_Isles/Quick_guide',
        rewards: [
            '10,000 Attack and Defence experience',
            'Helm of neitiznot',
            'Access to yak-hide armour'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Fremennik_Isles',
        release_date: '2007-02-06',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Rellekka',
        official_length: 'Long'
    }),

    // ========== MINIQUEST-STYLE AND SHORT QUESTS ==========
    'enter-abyss': new QuestProperties({
        id: 'enter-abyss',
        name: 'Enter the Abyss',
        difficulty: 'experienced',
        description: 'Learn about the Abyss from the Mage of Zamorak.',
        requirements: [
            'Rune Mysteries'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Enter_the_Abyss/Quick_guide',
        rewards: [
            '1,000 Runecrafting experience',
            'Access to the Abyss',
            'Small pouch'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Enter_the_Abyss',
        release_date: '2004-03-29',
        quest_points: 0,
        members: true,
        combat_required: false,
        length: 'very short',
        start_location: 'Varrock',
        official_length: 'Very short'
    }),

    // ========== RECENT AND ZEAH QUESTS ==========
    'client-kourend': new QuestProperties({
        id: 'client-kourend',
        name: 'Client of Kourend',
        difficulty: 'novice',
        description: 'Help Veos establish a new client base in Great Kourend.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Client_of_Kourend/Quick_guide',
        rewards: [
            '500 experience in two skills of choice (level 20+)',
            'Access to Great Kourend'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Client_of_Kourend',
        release_date: '2016-01-07',
        quest_points: 2,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Port Sarim',
        official_length: 'Short'
    }),

    'architectural-alliance': new QuestProperties({
        id: 'architectural-alliance',
        name: 'Architectural Alliance',
        difficulty: 'experienced',
        description: 'Help the Architectural Alliance repair the statue of King Rada I.',
        requirements: [
            'Client of Kourend',
            '42 Mining',
            '52 Smithing'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Architectural_Alliance/Quick_guide',
        rewards: [
            '10,000 Mining experience',
            '15,000 Smithing experience',
            'Architectural Alliance miniquest completion'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Architectural_Alliance',
        release_date: '2019-01-10',
        quest_points: 0,
        members: true,
        combat_required: false,
        length: 'long',
        start_location: 'Great Kourend',
        official_length: 'Long'
    }),

    'tale-righteous': new QuestProperties({
        id: 'tale-righteous',
        name: 'Tale of the Righteous',
        difficulty: 'experienced',
        description: 'Uncover the dark secrets of the Kebos region.',
        requirements: [
            'Client of Kourend',
            '16 Strength'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Tale_of_the_Righteous/Quick_guide',
        rewards: [
            '8,000 Strength experience',
            'Access to Mount Karuulm',
            'Rada\'s blessing'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Tale_of_the_Righteous',
        release_date: '2019-01-10',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Kourend Castle',
        official_length: 'Medium'
    }),

    'ascent-arceuus': new QuestProperties({
        id: 'ascent-arceuus',
        name: 'The Ascent of Arceuus',
        difficulty: 'experienced',
        description: 'Help Lord Arceuus ascend to become the new leader.',
        requirements: [
            'Client of Kourend',
            '12 Hunter'
        ],
        guide: 'https://oldschool.runescape.wiki/w/The_Ascent_of_Arceuus/Quick_guide',
        rewards: [
            '1,500 Hunter experience',
            '6,000 Magic experience',
            'Access to arceuus spellbook'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Ascent_of_Arceuus',
        release_date: '2019-07-25',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'Arceuus',
        official_length: 'Medium'
    }),

    'forsaken-tower': new QuestProperties({
        id: 'forsaken-tower',
        name: 'The Forsaken Tower',
        difficulty: 'experienced',
        description: 'Investigate the mysterious tower in the Kebos Swamplands.',
        requirements: [
            'Client of Kourend',
            'The Ascent of Arceuus'
        ],
        guide: 'https://oldschool.runescape.wiki/w/The_Forsaken_Tower/Quick_guide',
        rewards: [
            '500 Magic experience',
            '1,500 Agility experience',
            'Dinheiro'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Forsaken_Tower',
        release_date: '2020-07-01',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'short',
        start_location: 'Kebos Swamplands',
        official_length: 'Short'
    }),

    // Add many more quests to reach 173 total...
    // This is a comprehensive sample covering major questlines
    // The actual implementation would include all 173 quests

    'barrows-gloves': new QuestProperties({
        id: 'barrows-gloves',
        name: 'Barrows Gloves (RFD)',
        difficulty: 'master',
        description: 'Complete Recipe for Disaster to unlock the best gloves in game.',
        requirements: [
            'Complete Recipe for Disaster subquests',
            '175+ Quest points'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Recipe_for_Disaster/Freeing_the_Lumbridge_Guide/Quick_guide',
        rewards: [
            'Barrows gloves',
            'Access to Culinaromancer\'s chest'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Recipe_for_Disaster',
        release_date: '2006-03-14',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'very long',
        start_location: 'Lumbridge Castle',
        official_length: 'Very long'
    }),

    // ========== ADDITIONAL F2P QUESTS ==========
    'gertrudes-cat': new QuestProperties({
        id: 'gertrudes-cat',
        name: "Gertrude's Cat",
        difficulty: 'novice',
        description: 'Help Gertrude find her missing cat Fluffs.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Gertrude%27s_Cat/Quick_guide',
        rewards: [
            '1,525 Cooking experience',
            'Kitten pet',
            'Chocolate cake'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Gertrude%27s_Cat',
        release_date: '2002-02-27',
        quest_points: 1,
        members: false,
        combat_required: false,
        length: 'short',
        start_location: 'Varrock',
        official_length: 'Short'
    }),

    'imp-catcher': new QuestProperties({
        id: 'imp-catcher',
        name: 'Imp Catcher',
        difficulty: 'novice',
        description: 'Help Wizard Mizgog collect magical beads from imps.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Imp_Catcher/Quick_guide',
        rewards: [
            '875 Magic experience',
            'Amulet of accuracy'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Imp_Catcher',
        release_date: '2001-01-04',
        quest_points: 1,
        members: false,
        combat_required: false,
        length: 'short',
        start_location: 'Wizard\'s Tower',
        official_length: 'Short'
    }),

    'pirates-treasure': new QuestProperties({
        id: 'pirates-treasure',
        name: "Pirate's Treasure",
        difficulty: 'novice',
        description: 'Help RedBeard Frank find his treasure.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Pirate%27s_Treasure/Quick_guide',
        rewards: [
            '450 coins',
            'One-Eyed Hector\'s casket',
            'Emerald'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Pirate%27s_Treasure',
        release_date: '2001-12-12',
        quest_points: 2,
        members: false,
        combat_required: false,
        length: 'short',
        start_location: 'Port Sarim',
        official_length: 'Short'
    }),

    'prince-ali-rescue': new QuestProperties({
        id: 'prince-ali-rescue',
        name: 'Prince Ali Rescue',
        difficulty: 'novice',
        description: 'Rescue Prince Ali from the jail in Draynor Village.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Prince_Ali_Rescue/Quick_guide',
        rewards: [
            '700 coins',
            'Access to Al Kharid without paying toll'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Prince_Ali_Rescue',
        release_date: '2001-01-04',
        quest_points: 3,
        members: false,
        combat_required: false,
        length: 'medium',
        start_location: 'Al Kharid Palace',
        official_length: 'Medium'
    }),

    'sheep-shearer': new QuestProperties({
        id: 'sheep-shearer',
        name: 'Sheep Shearer',
        difficulty: 'novice',
        description: 'Help Fred the Farmer collect wool from his sheep.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Sheep_Shearer/Quick_guide',
        rewards: [
            '150 Crafting experience',
            '60 coins'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Sheep_Shearer',
        release_date: '2001-01-04',
        quest_points: 1,
        members: false,
        combat_required: false,
        length: 'very short',
        start_location: 'Lumbridge',
        official_length: 'Very short'
    }),

    'shield-of-arrav': new QuestProperties({
        id: 'shield-of-arrav',
        name: 'Shield of Arrav',
        difficulty: 'novice',
        description: 'Join a gang and recover the legendary Shield of Arrav.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Shield_of_Arrav/Quick_guide',
        rewards: [
            '600 coins',
            'Shield of Arrav'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Shield_of_Arrav',
        release_date: '2001-01-04',
        quest_points: 1,
        members: false,
        combat_required: false,
        length: 'medium',
        start_location: 'Varrock',
        official_length: 'Medium'
    }),

    'vampyre-slayer': new QuestProperties({
        id: 'vampyre-slayer',
        name: 'Vampyre Slayer',
        difficulty: 'novice',
        description: 'Help Morgan kill the vampyre Count Draynor.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Vampyre_Slayer/Quick_guide',
        rewards: [
            '4,825 Attack experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Vampyre_Slayer',
        release_date: '2001-01-04',
        quest_points: 3,
        members: false,
        combat_required: true,
        length: 'short',
        start_location: 'Draynor Village',
        official_length: 'Short'
    }),

    'ernest-the-chicken': new QuestProperties({
        id: 'ernest-the-chicken',
        name: 'Ernest the Chicken',
        difficulty: 'novice',
        description: 'Help Veronica find her fiancé Ernest.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Ernest_the_Chicken/Quick_guide',
        rewards: [
            '300 coins',
            '4 feathers'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Ernest_the_Chicken',
        release_date: '2001-01-04',
        quest_points: 4,
        members: false,
        combat_required: false,
        length: 'short',
        start_location: 'Draynor Village',
        official_length: 'Short'
    }),

    'knights-sword': new QuestProperties({
        id: 'knights-sword',
        name: "The Knight's Sword",
        difficulty: 'intermediate',
        description: 'Help Sir Vyvin get a new sword.',
        requirements: [
            '10 Mining (can be boosted)'
        ],
        guide: 'https://oldschool.runescape.wiki/w/The_Knight%27s_Sword/Quick_guide',
        rewards: [
            '12,725 Smithing experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Knight%27s_Sword',
        release_date: '2001-01-04',
        quest_points: 1,
        members: false,
        combat_required: false,
        length: 'short',
        start_location: 'Falador',
        official_length: 'Short'
    }),

    'goblin-diplomacy': new QuestProperties({
        id: 'goblin-diplomacy',
        name: 'Goblin Diplomacy',
        difficulty: 'novice',
        description: 'Help resolve a dispute between warring goblin tribes.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Goblin_Diplomacy/Quick_guide',
        rewards: [
            '200 Crafting experience',
            'Gold bar'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Goblin_Diplomacy',
        release_date: '2001-01-04',
        quest_points: 5,
        members: false,
        combat_required: false,
        length: 'short',
        start_location: 'Goblin Village',
        official_length: 'Short'
    }),

    // ========== MORE INTERMEDIATE QUESTS ==========
    'animal-magnetism': new QuestProperties({
        id: 'animal-magnetism',
        name: 'Animal Magnetism',
        difficulty: 'intermediate',
        description: 'Help Ava create her accumulator device.',
        requirements: [
            '18 Slayer',
            '19 Crafting',
            '30 Ranged',
            '35 Woodcutting',
            'The Restless Ghost',
            'Ernest the Chicken',
            'Priest in Peril'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Animal_Magnetism/Quick_guide',
        rewards: [
            '1,000 Slayer experience',
            '2,500 Fletching experience',
            'Access to Ava\'s accumulator'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Animal_Magnetism',
        release_date: '2007-10-15',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'short',
        start_location: 'Draynor Manor',
        official_length: 'Short'
    }),

    'big-chompy-bird-hunting': new QuestProperties({
        id: 'big-chompy-bird-hunting',
        name: 'Big Chompy Bird Hunting',
        difficulty: 'intermediate',
        description: 'Help Rantz hunt the elusive Chompy bird.',
        requirements: [
            '5 Fletching',
            '30 Cooking',
            '30 Ranged'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Big_Chompy_Bird_Hunting/Quick_guide',
        rewards: [
            '1,470 Ranged experience',
            '735 Cooking experience',
            'Ogre bow'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Big_Chompy_Bird_Hunting',
        release_date: '2004-09-07',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Feldip Hills',
        official_length: 'Medium'
    }),

    'biohazard': new QuestProperties({
        id: 'biohazard',
        name: 'Biohazard',
        difficulty: 'intermediate',
        description: 'Help Elena investigate the plague in West Ardougne.',
        requirements: [
            'Plague City'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Biohazard/Quick_guide',
        rewards: [
            '1,250 Thieving experience',
            'Access to Tirannwn'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Biohazard',
        release_date: '2002-06-26',
        quest_points: 3,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'East Ardougne',
        official_length: 'Medium'
    }),

    'cabin-fever': new QuestProperties({
        id: 'cabin-fever',
        name: 'Cabin Fever',
        difficulty: 'experienced',
        description: 'Help Bill Teach and his crew of pirates.',
        requirements: [
            '42 Agility',
            '45 Crafting',
            '50 Smithing',
            'Pirate\'s Treasure',
            'Rum Deal'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Cabin_Fever/Quick_guide',
        rewards: [
            '7,000 Agility experience',
            '7,000 Smithing experience',
            'Access to Mos Le\'Harmless'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Cabin_Fever',
        release_date: '2007-09-03',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Port Phasmatys',
        official_length: 'Medium'
    }),

    'cold-war': new QuestProperties({
        id: 'cold-war',
        name: 'Cold War',
        difficulty: 'intermediate',
        description: 'Investigate KGP spy activity in Ardougne.',
        requirements: [
            '34 Construction',
            '15 Hunter',
            '10 Thieving',
            'Hunter quest',
            'Recruitment Drive'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Cold_War/Quick_guide',
        rewards: [
            '1,500 Agility experience',
            '5,000 Crafting experience',
            'Penguin suit'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Cold_War',
        release_date: '2007-12-10',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'East Ardougne Zoo',
        official_length: 'Medium'
    }),

    'contact': new QuestProperties({
        id: 'contact',
        name: 'Contact!',
        difficulty: 'master',
        description: 'Help the archaeologist Abigail contact the Menaphites.',
        requirements: [
            'Prince Ali Rescue',
            'Icthlarin\'s Little Helper',
            'Gertrude\'s Cat'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Contact!/Quick_guide',
        rewards: [
            '7,000 Thieving experience',
            'Access to Sophanem dungeon',
            'Keris dagger'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Contact!',
        release_date: '2005-08-15',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Pyramid in the desert',
        official_length: 'Medium'
    }),

    'creature-of-fenkenstrain': new QuestProperties({
        id: 'creature-of-fenkenstrain',
        name: 'Creature of Fenkenstrain',
        difficulty: 'intermediate',
        description: 'Help Dr. Fenkenstrain create his monster.',
        requirements: [
            '25 Thieving',
            '20 Crafting',
            'The Restless Ghost',
            'Priest in Peril'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Creature_of_Fenkenstrain/Quick_guide',
        rewards: [
            '1,000 Defence experience',
            '2,000 Thieving experience',
            'Ring of charos'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Creature_of_Fenkenstrain',
        release_date: '2003-10-07',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Canifis',
        official_length: 'Medium'
    }),

    'demon-slayer': new QuestProperties({
        id: 'demon-slayer',
        name: 'Demon Slayer',
        difficulty: 'novice',
        description: 'Slay the demon Delrith to save Varrock.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Demon_Slayer/Quick_guide',
        rewards: [
            '3 quest points'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Demon_Slayer',
        release_date: '2001-01-04',
        quest_points: 3,
        members: false,
        combat_required: true,
        length: 'medium',
        start_location: 'Varrock',
        official_length: 'Medium'
    }),

    // ========== CONSTRUCTION QUESTS ==========
    'darkness-of-hallowvale': new QuestProperties({
        id: 'darkness-of-hallowvale',
        name: 'Darkness of Hallowvale',
        difficulty: 'master',
        description: 'Investigate the mysterious happenings in Hallowvale.',
        requirements: [
            '5 Construction',
            '20 Mining',
            '22 Thieving',
            '32 Crafting',
            '33 Magic',
            '40 Strength',
            'In Aid of the Myreque',
            'Priest in Peril'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Darkness_of_Hallowvale/Quick_guide',
        rewards: [
            '2,000 Construction experience',
            '6,000 Thieving experience',
            '7,000 Agility experience',
            'Tome of experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Darkness_of_Hallowvale',
        release_date: '2005-07-04',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Burgh de Rott',
        official_length: 'Long'
    }),

    'death-plateau': new QuestProperties({
        id: 'death-plateau',
        name: 'Death Plateau',
        difficulty: 'novice',
        description: 'Help Denulth plan an assault on the trolls.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Death_Plateau/Quick_guide',
        rewards: [
            '3,000 Attack experience',
            '3,000 Strength experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Death_Plateau',
        release_date: '2005-01-17',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Burthorpe',
        official_length: 'Short'
    }),

    'death-to-the-dorgeshuun': new QuestProperties({
        id: 'death-to-the-dorgeshuun',
        name: 'Death to the Dorgeshuun',
        difficulty: 'intermediate',
        description: 'Investigate the disappearance of H.A.M. members.',
        requirements: [
            '23 Agility',
            '23 Thieving',
            'The Lost Tribe'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Death_to_the_Dorgeshuun/Quick_guide',
        rewards: [
            '2,000 Ranged experience',
            '2,000 Thieving experience',
            'Bone crossbow'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Death_to_the_Dorgeshuun',
        release_date: '2005-06-06',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Lumbridge',
        official_length: 'Medium'
    }),

    'desert-treasure': new QuestProperties({
        id: 'desert-treasure',
        name: 'Desert Treasure',
        difficulty: 'master',
        description: 'Help the archaeologist unlock the secrets of Ancient Magicks.',
        requirements: [
            '10 Slayer',
            '50 Firemaking',
            '53 Thieving',
            'The Dig Site',
            'Temple of Ikov',
            'The Tourist Trap',
            'Troll Stronghold',
            'Death Plateau',
            'Priest in Peril',
            'Waterfall Quest'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Desert_Treasure/Quick_guide',
        rewards: [
            '20,000 Magic experience',
            'Access to Ancient Magicks',
            'Access to four new spells'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Desert_Treasure',
        release_date: '2005-01-17',
        quest_points: 3,
        members: true,
        combat_required: true,
        length: 'very long',
        start_location: 'Bedabin Camp',
        official_length: 'Very long'
    }),

    // ========== SKILL-SPECIFIC QUESTS ==========
    'elemental-workshop-i': new QuestProperties({
        id: 'elemental-workshop-i',
        name: 'Elemental Workshop I',
        difficulty: 'novice',
        description: 'Discover the secrets of elemental smithing.',
        requirements: [
            '20 Mining',
            '20 Smithing',
            '20 Crafting'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Elemental_Workshop_I/Quick_guide',
        rewards: [
            '5,000 Smithing experience',
            '5,000 Crafting experience',
            'Elemental shield'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Elemental_Workshop_I',
        release_date: '2003-08-25',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Seers\' Village',
        official_length: 'Short'
    }),

    'elemental-workshop-ii': new QuestProperties({
        id: 'elemental-workshop-ii',
        name: 'Elemental Workshop II',
        difficulty: 'intermediate',
        description: 'Create the mind helmet and further explore elemental magic.',
        requirements: [
            '30 Magic',
            '30 Smithing',
            'Elemental Workshop I'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Elemental_Workshop_II/Quick_guide',
        rewards: [
            '7,500 Smithing experience',
            '7,500 Magic experience',
            'Mind helmet'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Elemental_Workshop_II',
        release_date: '2004-06-07',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'Seers\' Village',
        official_length: 'Medium'
    }),

    // ========== FARMING QUESTS ==========
    'fairytale-i-growing-pains': new QuestProperties({
        id: 'fairytale-i-growing-pains',
        name: 'Fairytale I - Growing Pains',
        difficulty: 'experienced',
        description: 'Help the fairy godfather with his tangled situation.',
        requirements: [
            'Lost City',
            'Nature Spirit'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Fairytale_I_-_Growing_Pains/Quick_guide',
        rewards: [
            '3,500 Farming experience',
            '2,000 Attack experience',
            'Magic secateurs'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Fairytale_I_-_Growing_Pains',
        release_date: '2004-07-12',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Zanaris',
        official_length: 'Medium'
    }),

    'fairytale-ii-cure-a-queen': new QuestProperties({
        id: 'fairytale-ii-cure-a-queen',
        name: 'Fairytale II - Cure a Queen',
        difficulty: 'experienced',
        description: 'Help cure the Fairy Queen and restore the fairy rings.',
        requirements: [
            '40 Thieving',
            '49 Farming',
            '57 Herblore',
            'Fairytale I - Growing Pains'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Fairytale_II_-_Cure_a_Queen/Quick_guide',
        rewards: [
            '2,500 Thieving experience',
            '3,500 Farming experience',
            '4,000 Herblore experience',
            'Access to fairy rings'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Fairytale_II_-_Cure_a_Queen',
        release_date: '2004-11-15',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Zanaris',
        official_length: 'Long'
    }),

    // ========== HUNTER QUESTS ==========
    'eagles-peak': new QuestProperties({
        id: 'eagles-peak',
        name: "Eagle's Peak",
        difficulty: 'novice',
        description: 'Investigate the mysterious eagles and unlock the Hunter skill.',
        requirements: [
            '27 Hunter'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Eagle%27s_Peak/Quick_guide',
        rewards: [
            '1,500 Hunter experience',
            'Access to the Hunter skill tutorial'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Eagle%27s_Peak',
        release_date: '2006-11-21',
        quest_points: 2,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Ardougne',
        official_length: 'Short'
    }),

    'eadgars-ruse': new QuestProperties({
        id: 'eadgars-ruse',
        name: "Eadgar's Ruse",
        difficulty: 'experienced',
        description: 'Help Eadgar the druid with his plan involving trolls.',
        requirements: [
            '31 Herblore',
            'Druidic Ritual',
            'Troll Stronghold'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Eadgar%27s_Ruse/Quick_guide',
        rewards: [
            '11,000 Herblore experience',
            'Access to Trollheim herb patch'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Eadgar%27s_Ruse',
        release_date: '2005-03-14',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'Burthorpe',
        official_length: 'Medium'
    }),

    // ========== ZEAH EXPANSION QUESTS ==========
    'architectural-alliance': new QuestProperties({
        id: 'architectural-alliance',
        name: 'Architectural Alliance',
        difficulty: 'novice',
        description: 'Help the architect Hosa design the perfect building.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Architectural_Alliance/Quick_guide',
        rewards: [
            '1,000 Construction experience',
            '1,000 Mining experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Architectural_Alliance',
        release_date: '2016-01-07',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Great Kourend',
        official_length: 'Short'
    }),

    'the-depths-of-despair': new QuestProperties({
        id: 'the-depths-of-despair',
        name: 'The Depths of Despair',
        difficulty: 'novice',
        description: 'Investigate the strange occurrences in the Kourend catacombs.',
        requirements: [
            'Client of Kourend'
        ],
        guide: 'https://oldschool.runescape.wiki/w/The_Depths_of_Despair/Quick_guide',
        rewards: [
            '1,500 Agility experience',
            '1,500 Thieving experience',
            'Access to Kourend catacombs'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Depths_of_Despair',
        release_date: '2016-03-17',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'short',
        start_location: 'Great Kourend',
        official_length: 'Short'
    }),

    'the-queen-of-thieves': new QuestProperties({
        id: 'the-queen-of-thieves',
        name: 'The Queen of Thieves',
        difficulty: 'novice',
        description: 'Help Lady Shauna with her thieving operations.',
        requirements: [
            '20 Thieving',
            'The Depths of Despair'
        ],
        guide: 'https://oldschool.runescape.wiki/w/The_Queen_of_Thieves/Quick_guide',
        rewards: [
            '4,000 Thieving experience',
            'Access to Piscarilius blackjacking'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Queen_of_Thieves',
        release_date: '2016-08-18',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Great Kourend',
        official_length: 'Short'
    }),

    'the-forsaken-tower': new QuestProperties({
        id: 'the-forsaken-tower',
        name: 'The Forsaken Tower',
        difficulty: 'intermediate',
        description: 'Investigate the mysterious tower in the Kebos Lowlands.',
        requirements: [
            '40 Magic',
            '50 Construction',
            'The Queen of Thieves'
        ],
        guide: 'https://oldschool.runescape.wiki/w/The_Forsaken_Tower/Quick_guide',
        rewards: [
            '6,000 Magic experience',
            '4,000 Construction experience',
            'Access to Kebos Lowlands'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Forsaken_Tower',
        release_date: '2019-01-10',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Kebos Lowlands',
        official_length: 'Medium'
    }),

    // ========== DRAGON SLAYER SERIES ==========
    'dragon-slayer-i': new QuestProperties({
        id: 'dragon-slayer-i',
        name: 'Dragon Slayer I',
        difficulty: 'experienced',
        description: 'Slay the dragon Elvarg on Crandor Island.',
        requirements: [
            '32 Quest points',
            'Ability to kill Elvarg (level 83)'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Dragon_Slayer_I/Quick_guide',
        rewards: [
            '18,650 Strength experience',
            '18,650 Defence experience',
            'Access to wear rune platebody'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Dragon_Slayer_I',
        release_date: '2001-01-04',
        quest_points: 2,
        members: false,
        combat_required: true,
        length: 'long',
        start_location: 'Lumbridge',
        official_length: 'Long'
    }),

    'dragon-slayer-ii': new QuestProperties({
        id: 'dragon-slayer-ii',
        name: 'Dragon Slayer II',
        difficulty: 'grandmaster',
        description: 'Face the legendary dragon Vorkath and save RuneScape.',
        requirements: [
            '75 Magic',
            '70 Smithing',
            '68 Mining',
            '62 Crafting',
            '60 Agility',
            '50 Construction',
            '50 Hitpoints',
            'Legends\' Quest',
            'Dream Mentor',
            'A Tail of Two Cats',
            'Animal Magnetism',
            'Ghosts Ahoy',
            'Bone Voyage',
            '200 Quest points'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Dragon_Slayer_II/Quick_guide',
        rewards: [
            '25,000 Attack experience',
            '25,000 Strength experience',
            '25,000 Defence experience',
            '25,000 Hitpoints experience',
            '25,000 Magic experience',
            '25,000 Ranged experience',
            'Access to Vorkath',
            'Assembler (upgraded Ava\'s)',
            'Myths\' Guild access'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Dragon_Slayer_II',
        release_date: '2018-01-04',
        quest_points: 5,
        members: true,
        combat_required: true,
        length: 'very long',
        start_location: 'Myths\' Guild or Draynor Village',
        official_length: 'Very long'
    }),

    // ========== MORE EXPERIENCED QUESTS ==========
    'family-crest': new QuestProperties({
        id: 'family-crest',
        name: 'Family Crest',
        difficulty: 'experienced',
        description: 'Help restore the Fitzharmon family crest.',
        requirements: [
            '40 Mining',
            '40 Smithing',
            '59 Magic',
            'The Lost Tribe'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Family_Crest/Quick_guide',
        rewards: [
            '7,000 Smithing experience',
            '7,000 Magic experience',
            'Access to goldsmith gauntlets'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Family_Crest',
        release_date: '2003-05-12',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Varrock',
        official_length: 'Medium'
    }),

    'garden-of-tranquillity': new QuestProperties({
        id: 'garden-of-tranquillity',
        name: 'Garden of Tranquillity',
        difficulty: 'intermediate',
        description: 'Help Queen Ellamaria create her garden.',
        requirements: [
            '25 Farming'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Garden_of_Tranquillity/Quick_guide',
        rewards: [
            '5,000 Farming experience',
            'Access to Queen\'s garden'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Garden_of_Tranquillity',
        release_date: '2007-07-31',
        quest_points: 2,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'Falador',
        official_length: 'Medium'
    }),

    'ghosts-ahoy': new QuestProperties({
        id: 'ghosts-ahoy',
        name: 'Ghosts Ahoy',
        difficulty: 'intermediate',
        description: 'Help the ghosts of Port Phasmatys find peace.',
        requirements: [
            '25 Agility',
            '20 Cooking',
            'The Restless Ghost',
            'Priest in Peril'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Ghosts_Ahoy/Quick_guide',
        rewards: [
            '2,400 Prayer experience',
            'Ectophial',
            'Access to Port Phasmatys'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Ghosts_Ahoy',
        release_date: '2003-10-07',
        quest_points: 2,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'Port Phasmatys',
        official_length: 'Medium'
    }),

    // ========== ADDITIONAL MAJOR QUESTLINES ==========
    'lunar-diplomacy': new QuestProperties({
        id: 'lunar-diplomacy',
        name: 'Lunar Diplomacy',
        difficulty: 'experienced',
        description: 'Establish diplomatic relations with the Moon Clan.',
        requirements: [
            '61 Crafting',
            '40 Defence',
            '49 Firemaking',
            '5 Herblore',
            '65 Magic',
            '60 Mining',
            '55 Woodcutting',
            'The Fremennik Trials',
            'Lost City',
            'Rune Mysteries',
            'Shilo Village'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Lunar_Diplomacy/Quick_guide',
        rewards: [
            '5,000 Magic experience',
            '5,000 Runecraft experience',
            'Access to Lunar spells',
            'Lunar equipment'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Lunar_Diplomacy',
        release_date: '2006-08-07',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Rellekka',
        official_length: 'Long'
    }),

    'dream-mentor': new QuestProperties({
        id: 'dream-mentor',
        name: 'Dream Mentor',
        difficulty: 'master',
        description: 'Enter Cyrisus\' dreams and help cure his nightmares.',
        requirements: [
            '85 Combat level',
            'Lunar Diplomacy',
            'Eadgar\'s Ruse'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Dream_Mentor/Quick_guide',
        rewards: [
            '15,000 Magic experience',
            '5,000 Hitpoints experience',
            'Access to NPC Contact lunar spell'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Dream_Mentor',
        release_date: '2006-08-07',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Lunar Isle',
        official_length: 'Long'
    }),

    'recipe-for-disaster-mountain-dwarf': new QuestProperties({
        id: 'recipe-for-disaster-mountain-dwarf',
        name: 'Recipe for Disaster: Mountain Dwarf',
        difficulty: 'intermediate',
        description: 'Free the Mountain Dwarf from the Culinaromancer\'s spell.',
        requirements: [
            '20 Cooking',
            'Recipe for Disaster start',
            'Fishing Contest'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Recipe_for_Disaster:_Freeing_the_Mountain_Dwarf/Quick_guide',
        rewards: [
            '1,000 Cooking experience',
            '1,000 Slayer experience',
            'Steel gauntlets'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Recipe_for_Disaster:_Freeing_the_Mountain_Dwarf',
        release_date: '2006-03-14',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Lumbridge Castle',
        official_length: 'Short'
    }),

    'recipe-for-disaster-goblin-generals': new QuestProperties({
        id: 'recipe-for-disaster-goblin-generals',
        name: 'Recipe for Disaster: Goblin Generals',
        difficulty: 'intermediate',
        description: 'Free the Goblin Generals from the Culinaromancer\'s spell.',
        requirements: [
            '20 Cooking',
            'Recipe for Disaster start',
            'Goblin Diplomacy'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Recipe_for_Disaster:_Freeing_the_Goblin_generals/Quick_guide',
        rewards: [
            '1,000 Cooking experience',
            '1,000 Farming experience',
            'Black gauntlets'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Recipe_for_Disaster:_Freeing_the_Goblin_generals',
        release_date: '2006-03-14',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Lumbridge Castle',
        official_length: 'Short'
    }),

    'recipe-for-disaster-pirate-pete': new QuestProperties({
        id: 'recipe-for-disaster-pirate-pete',
        name: 'Recipe for Disaster: Pirate Pete',
        difficulty: 'intermediate',
        description: 'Free Pirate Pete from the Culinaromancer\'s spell.',
        requirements: [
            '31 Cooking',
            'Recipe for Disaster start'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Recipe_for_Disaster:_Freeing_Pirate_Pete/Quick_guide',
        rewards: [
            '1,000 Cooking experience',
            '1,000 Slayer experience',
            'Mithril gauntlets'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Recipe_for_Disaster:_Freeing_Pirate_Pete',
        release_date: '2006-03-14',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Lumbridge Castle',
        official_length: 'Short'
    }),

    'recipe-for-disaster-lumbridge-guide': new QuestProperties({
        id: 'recipe-for-disaster-lumbridge-guide',
        name: 'Recipe for Disaster: Lumbridge Guide',
        difficulty: 'master',
        description: 'Free the Lumbridge Guide and complete Recipe for Disaster.',
        requirements: [
            '70 Cooking',
            '175 Quest points',
            'Recipe for Disaster subquests'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Recipe_for_Disaster:_Freeing_the_Lumbridge_Guide/Quick_guide',
        rewards: [
            '20,000 Cooking experience',
            'Barrows gloves',
            'Culinaromancer\'s chest access'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Recipe_for_Disaster:_Freeing_the_Lumbridge_Guide',
        release_date: '2006-03-14',
        quest_points: 5,
        members: true,
        combat_required: true,
        length: 'very long',
        start_location: 'Lumbridge Castle',
        official_length: 'Very long'
    }),

    // ========== SKILL-SPECIFIC EXPANSION ==========
    'sea-slug': new QuestProperties({
        id: 'sea-slug',
        name: 'Sea Slug',
        difficulty: 'intermediate',
        description: 'Investigate the mysterious sea slugs affecting Witchaven.',
        requirements: [
            '30 Firemaking'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Sea_Slug/Quick_guide',
        rewards: [
            '7,175 Fishing experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Sea_Slug',
        release_date: '2005-05-16',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Witchaven',
        official_length: 'Short'
    }),

    'wanted': new QuestProperties({
        id: 'wanted',
        name: 'Wanted!',
        difficulty: 'intermediate',
        description: 'Help clear Sir Amik Varze\'s name in a daring prison break.',
        requirements: [
            '32 Quest points'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Wanted!/Quick_guide',
        rewards: [
            '5,000 Slayer experience',
            'Access to White Knight equipment'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Wanted!',
        release_date: '2006-01-16',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Falador',
        official_length: 'Medium'
    }),

    'slug-menace': new QuestProperties({
        id: 'slug-menace',
        name: 'The Slug Menace',
        difficulty: 'intermediate',
        description: 'Continue investigating the sea slug conspiracy.',
        requirements: [
            '30 Crafting',
            '30 Runecraft',
            '30 Slayer',
            '30 Thieving',
            'Sea Slug',
            'Wanted!'
        ],
        guide: 'https://oldschool.runescape.wiki/w/The_Slug_Menace/Quick_guide',
        rewards: [
            '3,500 Thieving experience',
            '3,500 Runecraft experience',
            'Commorb v2'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Slug_Menace',
        release_date: '2006-01-16',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Witchaven',
        official_length: 'Medium'
    }),

    'tower-of-life': new QuestProperties({
        id: 'tower-of-life',
        name: 'Tower of Life',
        difficulty: 'intermediate',
        description: 'Investigate the mysterious Tower of Life and its experiments.',
        requirements: [
            '10 Construction'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Tower_of_Life/Quick_guide',
        rewards: [
            '1,000 Construction experience',
            '500 Crafting experience',
            'Access to Tower of Life'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Tower_of_Life',
        release_date: '2006-02-06',
        quest_points: 2,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'Ardougne',
        official_length: 'Medium'
    }),

    'mournings-end-part-i': new QuestProperties({
        id: 'mournings-end-part-i',
        name: "Mourning's End Part I",
        difficulty: 'master',
        description: 'Continue helping the elves of Lletya.',
        requirements: [
            '60 Ranged',
            'Regicide'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Mourning%27s_End_Part_I/Quick_guide',
        rewards: [
            '25,000 Ranged experience',
            'Access to Death altar'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Mourning%27s_End_Part_I',
        release_date: '2004-10-25',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Lletya',
        official_length: 'Long'
    }),

    'mournings-end-part-ii': new QuestProperties({
        id: 'mournings-end-part-ii',
        name: "Mourning's End Part II",
        difficulty: 'master',
        description: 'Complete the elf questline and access the Temple of Light.',
        requirements: [
            '60 Agility',
            'Mourning\'s End Part I'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Mourning%27s_End_Part_II/Quick_guide',
        rewards: [
            '60,000 Agility experience',
            'Access to dark beasts',
            'Death altar access'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Mourning%27s_End_Part_II',
        release_date: '2005-10-17',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'very long',
        start_location: 'Lletya',
        official_length: 'Very long'
    }),

    // ========== BARBARIAN AND BARCRAWL ==========
    'alfred-grimhands-barcrawl': new QuestProperties({
        id: 'alfred-grimhands-barcrawl',
        name: "Alfred Grimhand's Barcrawl",
        difficulty: 'novice',
        description: 'Complete the traditional barbarian barcrawl.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Alfred_Grimhand%27s_Barcrawl/Quick_guide',
        rewards: [
            'Access to Barbarian Outpost',
            'Barbarian teleport'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Alfred_Grimhand%27s_Barcrawl',
        release_date: '2003-05-26',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'Barbarian Outpost',
        official_length: 'Medium'
    }),

    'horror-from-the-deep': new QuestProperties({
        id: 'horror-from-the-deep',
        name: 'Horror from the Deep',
        difficulty: 'intermediate',
        description: 'Investigate the mysterious lighthouse and face an ancient horror.',
        requirements: [
            'Alfred Grimhand\'s Barcrawl'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Horror_from_the_Deep/Quick_guide',
        rewards: [
            '4,662 Magic experience',
            '4,662 Ranged experience',
            '4,662 Attack experience',
            'Book of balance (or god book)'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Horror_from_the_Deep',
        release_date: '2005-03-07',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Lighthouse',
        official_length: 'Medium'
    }),

    'scorpion-catcher': new QuestProperties({
        id: 'scorpion-catcher',
        name: 'Scorpion Catcher',
        difficulty: 'intermediate',
        description: 'Help Thormac find his escaped Kharidian scorpions.',
        requirements: [
            '31 Prayer'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Scorpion_Catcher/Quick_guide',
        rewards: [
            '6,625 Strength experience',
            'Staff upgrade services from Thormac'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Scorpion_Catcher',
        release_date: '2002-01-28',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Sorcerer\'s Tower',
        official_length: 'Short'
    }),

    'clock-tower': new QuestProperties({
        id: 'clock-tower',
        name: 'Clock Tower',
        difficulty: 'novice',
        description: 'Help Brother Kojo repair the Ardougne Clock Tower.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Clock_Tower/Quick_guide',
        rewards: [
            '500 Construction experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Clock_Tower',
        release_date: '2004-09-06',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Clock Tower',
        official_length: 'Short'
    }),

    // ========== MISCELLANEOUS QUESTS ==========
    'holy-grail': new QuestProperties({
        id: 'holy-grail',
        name: 'Holy Grail',
        difficulty: 'intermediate',
        description: 'Embark on a quest to find the Holy Grail.',
        requirements: [
            '20 Attack',
            'Merlin\'s Crystal'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Holy_Grail/Quick_guide',
        rewards: [
            '15,300 Prayer experience',
            '11,000 Defence experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Holy_Grail',
        release_date: '2001-01-04',
        quest_points: 2,
        members: false,
        combat_required: true,
        length: 'medium',
        start_location: 'Camelot Castle',
        official_length: 'Medium'
    }),

    'lost-city': new QuestProperties({
        id: 'lost-city',
        name: 'Lost City',
        difficulty: 'experienced',
        description: 'Find the lost city of Zanaris and meet the fairies.',
        requirements: [
            '31 Crafting',
            '36 Woodcutting'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Lost_City/Quick_guide',
        rewards: [
            'Access to Zanaris',
            'Dragon longsword and dagger'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Lost_City',
        release_date: '2004-07-12',
        quest_points: 3,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Lumbridge Swamp',
        official_length: 'Medium'
    }),

    'merlins-crystal': new QuestProperties({
        id: 'merlins-crystal',
        name: "Merlin's Crystal",
        difficulty: 'intermediate',
        description: 'Free Merlin from Mordred\'s crystal prison.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Merlin%27s_Crystal/Quick_guide',
        rewards: [
            '6 quest points'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Merlin%27s_Crystal',
        release_date: '2001-01-04',
        quest_points: 6,
        members: false,
        combat_required: false,
        length: 'medium',
        start_location: 'Camelot Castle',
        official_length: 'Medium'
    }),

    'fishing-contest': new QuestProperties({
        id: 'fishing-contest',
        name: 'Fishing Contest',
        difficulty: 'novice',
        description: 'Enter the annual Hemenster fishing competition.',
        requirements: [
            '10 Fishing'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Fishing_Contest/Quick_guide',
        rewards: [
            '2,437 Fishing experience',
            'Access to White Wolf Mountain pass'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Fishing_Contest',
        release_date: '2001-01-04',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Hemenster',
        official_length: 'Short'
    }),

    'monks-friend': new QuestProperties({
        id: 'monks-friend',
        name: "Monk's Friend",
        difficulty: 'novice',
        description: 'Help Brother Omad find a party balloon.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Monk%27s_Friend/Quick_guide',
        rewards: [
            '2,000 Woodcutting experience',
            '8 law runes'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Monk%27s_Friend',
        release_date: '2001-01-04',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'very short',
        start_location: 'Monastery',
        official_length: 'Very short'
    }),

    'murder-mystery': new QuestProperties({
        id: 'murder-mystery',
        name: 'Murder Mystery',
        difficulty: 'novice',
        description: 'Investigate a murder at the Sinclair Mansion.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Murder_Mystery/Quick_guide',
        rewards: [
            '1,406 Crafting experience',
            '2,000 coins'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Murder_Mystery',
        release_date: '2002-05-13',
        quest_points: 3,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Sinclair Mansion',
        official_length: 'Short'
    }),

    'observatory-quest': new QuestProperties({
        id: 'observatory-quest',
        name: 'Observatory Quest',
        difficulty: 'novice',
        description: 'Help the professor repair his observatory.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Observatory_Quest/Quick_guide',
        rewards: [
            '2,250 Crafting experience',
            'Telescope'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Observatory_Quest',
        release_date: '2004-04-26',
        quest_points: 2,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Observatory',
        official_length: 'Short'
    }),

    // ========== REMAINING F2P QUESTS ==========
    'rune-mysteries': new QuestProperties({
        id: 'rune-mysteries',
        name: 'Rune Mysteries',
        difficulty: 'novice',
        description: 'Discover the secrets of runecrafting.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Rune_Mysteries/Quick_guide',
        rewards: [
            'Access to Runecrafting skill',
            'Access to Aubury\'s rune shop'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Rune_Mysteries',
        release_date: '2004-03-29',
        quest_points: 1,
        members: false,
        combat_required: false,
        length: 'short',
        start_location: 'Lumbridge',
        official_length: 'Short'
    }),

    'what-lies-below': new QuestProperties({
        id: 'what-lies-below',
        name: 'What Lies Below',
        difficulty: 'intermediate',
        description: 'Investigate the mysterious statue beneath Varrock.',
        requirements: [
            '35 Runecrafting',
            'Rune Mysteries'
        ],
        guide: 'https://oldschool.runescape.wiki/w/What_Lies_Below/Quick_guide',
        rewards: [
            '8,000 Runecrafting experience',
            'Beacon ring'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/What_Lies_Below',
        release_date: '2006-01-30',
        quest_points: 1,
        members: false,
        combat_required: true,
        length: 'medium',
        start_location: 'Varrock',
        official_length: 'Medium'
    }),

    // ========== VAMPIRE QUESTLINE ==========
    'aid-of-the-myreque': new QuestProperties({
        id: 'aid-of-the-myreque',
        name: 'In Aid of the Myreque',
        difficulty: 'intermediate',
        description: 'Help the Myreque fight against the vampyres.',
        requirements: [
            '25 Agility',
            '7 Magic',
            '15 Mining',
            'Vampyre Slayer',
            'Priest in Peril'
        ],
        guide: 'https://oldschool.runescape.wiki/w/In_Aid_of_the_Myreque/Quick_guide',
        rewards: [
            '2,000 Agility experience',
            '2,000 Attack experience',
            '600 Mining experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/In_Aid_of_the_Myreque',
        release_date: '2004-06-07',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Canifis',
        official_length: 'Medium'
    }),

    'a-taste-of-hope': new QuestProperties({
        id: 'a-taste-of-hope',
        name: 'A Taste of Hope',
        difficulty: 'experienced',
        description: 'Continue the Myreque storyline in Darkmeyer.',
        requirements: [
            '48 Agility',
            '40 Attack',
            '40 Crafting',
            '38 Herblore',
            '45 Slayer',
            'Darkness of Hallowvale'
        ],
        guide: 'https://oldschool.runescape.wiki/w/A_Taste_of_Hope/Quick_guide',
        rewards: [
            '2,500 Attack experience',
            '2,500 Agility experience',
            '1,500 Crafting experience',
            'Drakan\'s medallion'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/A_Taste_of_Hope',
        release_date: '2020-04-06',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Burgh de Rott',
        official_length: 'Long'
    }),

    'sins-of-the-father': new QuestProperties({
        id: 'sins-of-the-father',
        name: 'Sins of the Father',
        difficulty: 'master',
        description: 'Infiltrate Darkmeyer and confront Lowerniel Drakan.',
        requirements: [
            '62 Woodcutting',
            '60 Fletching',
            '56 Crafting',
            '52 Agility',
            '50 Attack',
            '50 Slayer',
            'A Taste of Hope'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Sins_of_the_Father/Quick_guide',
        rewards: [
            '15,000 Attack experience',
            '15,000 Woodcutting experience',
            'Ivandis flail upgrade',
            'Access to Darkmeyer'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Sins_of_the_Father',
        release_date: '2020-06-04',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Slepe',
        official_length: 'Long'
    }),

    // ========== DWARF QUESTLINE ==========
    'giant-dwarf': new QuestProperties({
        id: 'giant-dwarf',
        name: 'The Giant Dwarf',
        difficulty: 'intermediate',
        description: 'Help resolve the political turmoil in Keldagrim.',
        requirements: [
            '12 Crafting',
            '16 Firemaking',
            '33 Magic',
            '14 Thieving'
        ],
        guide: 'https://oldschool.runescape.wiki/w/The_Giant_Dwarf/Quick_guide',
        rewards: [
            '2,500 Crafting experience',
            '2,500 Firemaking experience',
            '1,500 Magic experience',
            'Access to Keldagrim'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Giant_Dwarf',
        release_date: '2005-05-31',
        quest_points: 2,
        members: true,
        combat_required: false,
        length: 'long',
        start_location: 'Keldagrim',
        official_length: 'Long'
    }),

    'forgettable-tale': new QuestProperties({
        id: 'forgettable-tale',
        name: 'Forgettable Tale of a Drunken Dwarf',
        difficulty: 'intermediate',
        description: 'Help the dwarves with their brewing problems.',
        requirements: [
            '22 Cooking',
            '17 Farming',
            'The Giant Dwarf'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Forgettable_Tale_of_a_Drunken_Dwarf/Quick_guide',
        rewards: [
            '5,000 Cooking experience',
            '5,000 Farming experience',
            'Dwarven stout mature'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Forgettable_Tale_of_a_Drunken_Dwarf',
        release_date: '2007-02-26',
        quest_points: 2,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'Keldagrim',
        official_length: 'Medium'
    }),

    'between-a-rock': new QuestProperties({
        id: 'between-a-rock',
        name: 'Between a Rock...',
        difficulty: 'experienced',
        description: 'Help the dwarves deal with the Chaos dwarf threat.',
        requirements: [
            '30 Defence',
            '50 Mining',
            'Forgettable Tale of a Drunken Dwarf'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Between_a_Rock.../Quick_guide',
        rewards: [
            '5,000 Defence experience',
            '5,000 Mining experience',
            'Gold helmet'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Between_a_Rock...',
        release_date: '2007-09-10',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Keldagrim',
        official_length: 'Medium'
    }),

    // ========== GNOME QUESTLINE EXPANSION ==========
    'grand-tree': new QuestProperties({
        id: 'grand-tree',
        name: 'The Grand Tree',
        difficulty: 'experienced',
        description: 'Investigate the sickness affecting the Grand Tree.',
        requirements: [
            '25 Agility',
            'Tree Gnome Village'
        ],
        guide: 'https://oldschool.runescape.wiki/w/The_Grand_Tree/Quick_guide',
        rewards: [
            '7,900 Agility experience',
            '18,400 Attack experience',
            '2,150 Magic experience',
            'Gnome glider access'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Grand_Tree',
        release_date: '2003-12-08',
        quest_points: 5,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Tree Gnome Stronghold',
        official_length: 'Long'
    }),

    // ========== PIRATE QUESTLINE ==========
    'rum-deal': new QuestProperties({
        id: 'rum-deal',
        name: 'Rum Deal',
        difficulty: 'experienced',
        description: 'Investigate the mysterious happenings on Braindeath Island.',
        requirements: [
            '42 Crafting',
            '40 Fishing',
            '47 Farming',
            '42 Prayer',
            'Priest in Peril',
            'Zogre Flesh Eaters'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Rum_Deal/Quick_guide',
        rewards: [
            '7,000 Fishing experience',
            '7,000 Farming experience',
            'Holy wrench'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Rum_Deal',
        release_date: '2007-09-03',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Port Phasmatys',
        official_length: 'Long'
    }),

    'great-brain-robbery': new QuestProperties({
        id: 'great-brain-robbery',
        name: 'The Great Brain Robbery',
        difficulty: 'experienced',
        description: 'Help Dr. Fenkenstrain with his latest experiment.',
        requirements: [
            '16 Crafting',
            '30 Construction',
            '50 Prayer',
            'Cabin Fever',
            'Creature of Fenkenstrain'
        ],
        guide: 'https://oldschool.runescape.wiki/w/The_Great_Brain_Robbery/Quick_guide',
        rewards: [
            '6,000 Crafting experience',
            '2,000 Construction experience',
            '3,000 Prayer experience',
            'Barrelchest anchor'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Great_Brain_Robbery',
        release_date: '2007-10-29',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Mos Le\'Harmless',
        official_length: 'Medium'
    }),

    // ========== SLAYER QUESTS ==========
    'smoking-kills': new QuestProperties({
        id: 'smoking-kills',
        name: 'Smoking Kills',
        difficulty: 'intermediate',
        description: 'Help the Slayer Masters deal with a rogue assignment.',
        requirements: [
            '35 Slayer',
            'Priest in Peril'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Smoking_Kills/Quick_guide',
        rewards: [
            '10,000 Slayer experience',
            'Slayer point system unlock'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Smoking_Kills',
        release_date: '2007-01-29',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'short',
        start_location: 'Slayer Tower',
        official_length: 'Short'
    }),

    // ========== DESERT QUESTLINE ==========
    'desert-treasure-ii': new QuestProperties({
        id: 'desert-treasure-ii',
        name: 'Desert Treasure II - The Fallen Empire',
        difficulty: 'grandmaster',
        description: 'Face the ancient Mahjarrat and unlock new spells.',
        requirements: [
            '75+ Magic',
            '70+ Firemaking',
            '62+ Runecrafting',
            'Desert Treasure',
            'Contact!',
            'Legends\' Quest',
            'Sins of the Father'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Desert_Treasure_II/Quick_guide',
        rewards: [
            '40,000 Magic experience',
            'Access to Ancient Magicks II',
            'Awakened orbs'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Desert_Treasure_II',
        release_date: '2023-07-26',
        quest_points: 5,
        members: true,
        combat_required: true,
        length: 'very long',
        start_location: 'Nardah',
        official_length: 'Very long'
    }),

    'spirits-of-the-elid': new QuestProperties({
        id: 'spirits-of-the-elid',
        name: 'Spirits of the Elid',
        difficulty: 'intermediate',
        description: 'Help the water spirits of the River Elid.',
        requirements: [
            '33 Magic',
            '37 Ranged',
            '37 Mining',
            '37 Thieving'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Spirits_of_the_Elid/Quick_guide',
        rewards: [
            '8,000 Magic experience',
            '1,000 Ranged experience',
            '1,000 Mining experience',
            '1,000 Thieving experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Spirits_of_the_Elid',
        release_date: '2006-01-09',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Nardah',
        official_length: 'Medium'
    }),

    'enakhras-lament': new QuestProperties({
        id: 'enakhras-lament',
        name: "Enakhra's Lament",
        difficulty: 'experienced',
        description: 'Uncover the ancient temple and face Enakhra.',
        requirements: [
            '45 Firemaking',
            '50 Prayer',
            '39 Magic',
            '50 Crafting',
            '45 Mining'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Enakhra%27s_Lament/Quick_guide',
        rewards: [
            '7,000 Prayer experience',
            '7,000 Magic experience',
            'Camulet'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Enakhra%27s_Lament',
        release_date: '2005-01-03',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Quarry',
        official_length: 'Long'
    }),

    // ========== MISCELLANEOUS INTERMEDIATE ==========
    'recruitment-drive': new QuestProperties({
        id: 'recruitment-drive',
        name: 'Recruitment Drive',
        difficulty: 'intermediate',
        description: 'Apply to join the Temple Knights.',
        requirements: [
            '12 Agility',
            '20 Herblore',
            'Druidic Ritual',
            'What Lies Below'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Recruitment_Drive/Quick_guide',
        rewards: [
            '1,000 Agility experience',
            '1,000 Herblore experience',
            '1,000 Prayer experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Recruitment_Drive',
        release_date: '2006-01-16',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'Falador',
        official_length: 'Medium'
    }),

    'ratcatchers': new QuestProperties({
        id: 'ratcatchers',
        name: 'Ratcatchers',
        difficulty: 'intermediate',
        description: 'Help the Ardougne rat catchers with their problem.',
        requirements: [
            'Icthlarin\'s Little Helper',
            'Gertrude\'s Cat'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Ratcatchers/Quick_guide',
        rewards: [
            '4,500 Thieving experience',
            'Rat pole'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Ratcatchers',
        release_date: '2005-08-29',
        quest_points: 2,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'Ardougne',
        official_length: 'Medium'
    }),

    'tail-of-two-cats': new QuestProperties({
        id: 'tail-of-two-cats',
        name: 'A Tail of Two Cats',
        difficulty: 'intermediate',
        description: 'Continue the cat-related adventures.',
        requirements: [
            'Icthlarin\'s Little Helper',
            'Ratcatchers'
        ],
        guide: 'https://oldschool.runescape.wiki/w/A_Tail_of_Two_Cats/Quick_guide',
        rewards: [
            '2,500 Thieving experience',
            'Cat training medal'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/A_Tail_of_Two_Cats',
        release_date: '2006-09-11',
        quest_points: 2,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'Ardougne',
        official_length: 'Medium'
    }),

    // ========== REMAINING MISCELLANEOUS ==========
    'bone-voyage': new QuestProperties({
        id: 'bone-voyage',
        name: 'Bone Voyage',
        difficulty: 'intermediate',
        description: 'Help the Varrock Museum reach Fossil Island.',
        requirements: [
            '100 Kudos'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Bone_Voyage/Quick_guide',
        rewards: [
            '1,000 Magic experience',
            'Access to Fossil Island'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Bone_Voyage',
        release_date: '2017-09-07',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'Varrock Museum',
        official_length: 'Medium'
    }),

    'song-of-the-elves': new QuestProperties({
        id: 'song-of-the-elves',
        name: 'Song of the Elves',
        difficulty: 'grandmaster',
        description: 'Complete the elf questline and rebuild Prifddinas.',
        requirements: [
            '70 Agility',
            '70 Construction',
            '70 Farming',
            '70 Herblore',
            '70 Hunter',
            '70 Mining',
            '70 Smithing',
            '70 Woodcutting',
            'Mourning\'s End Part II'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Song_of_the_Elves/Quick_guide',
        rewards: [
            '40,000 experience in 2 skills of choice',
            'Access to Prifddinas',
            'Crystal equipment'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Song_of_the_Elves',
        release_date: '2019-07-25',
        quest_points: 4,
        members: true,
        combat_required: true,
        length: 'very long',
        start_location: 'Lletya',
        official_length: 'Very long'
    }),

    'making-friends-with-my-arm': new QuestProperties({
        id: 'making-friends-with-my-arm',
        name: 'Making Friends with My Arm',
        difficulty: 'master',
        description: 'Help My Arm the troll with his farming ambitions.',
        requirements: [
            '66 Firemaking',
            '72 Mining',
            '35 Construction',
            '68 Agility',
            'My Arm\'s Big Adventure'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Making_Friends_with_My_Arm/Quick_guide',
        rewards: [
            '10,000 Firemaking experience',
            '15,000 Mining experience',
            '35,000 Agility experience',
            'Disease-free herb patch'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Making_Friends_with_My_Arm',
        release_date: '2018-02-01',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Weiss',
        official_length: 'Medium'
    }),

    'a-porcine-of-interest': new QuestProperties({
        id: 'a-porcine-of-interest',
        name: 'A Porcine of Interest',
        difficulty: 'novice',
        description: 'Help investigate the pig crime wave in Draynor Village.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/A_Porcine_of_Interest/Quick_guide',
        rewards: [
            '1,000 Investigation experience',
            'Access to pig-related activities'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/A_Porcine_of_Interest',
        release_date: '2018-07-26',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Draynor Village',
        official_length: 'Short'
    }),

    // ========== FINAL BATCH - COMPLETING TO 173 QUESTS ==========
    'druidic-ritual': new QuestProperties({
        id: 'druidic-ritual',
        name: 'Druidic Ritual',
        difficulty: 'novice',
        description: 'Help the druids with their ritual to gain access to Herblore.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Druidic_Ritual/Quick_guide',
        rewards: [
            '250 Herblore experience',
            'Access to Herblore skill'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Druidic_Ritual',
        release_date: '2001-01-04',
        quest_points: 4,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Taverley',
        official_length: 'Short'
    }),

    'witch-house': new QuestProperties({
        id: 'witch-house',
        name: 'Witch\'s House',
        difficulty: 'intermediate',
        description: 'Retrieve a ball from the witch\'s house.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Witch%27s_House/Quick_guide',
        rewards: [
            '6,325 Hitpoints experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Witch%27s_House',
        release_date: '2003-04-07',
        quest_points: 4,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Taverley',
        official_length: 'Medium'
    }),

    'hazeel-cult': new QuestProperties({
        id: 'hazeel-cult',
        name: 'Hazeel Cult',
        difficulty: 'novice',
        description: 'Choose to help or hinder the resurrection of Hazeel.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Hazeel_Cult/Quick_guide',
        rewards: [
            '1,500 Thieving experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Hazeel_Cult',
        release_date: '2003-05-26',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Ardougne',
        official_length: 'Short'
    }),

    'sheep-herder': new QuestProperties({
        id: 'sheep-herder',
        name: 'Sheep Herder',
        difficulty: 'novice',
        description: 'Help Councillor Halgrive deal with diseased sheep.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Sheep_Herder/Quick_guide',
        rewards: [
            '3,000 Herblore experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Sheep_Herder',
        release_date: '2002-04-01',
        quest_points: 4,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Ardougne',
        official_length: 'Short'
    }),

    'plague-city': new QuestProperties({
        id: 'plague-city',
        name: 'Plague City',
        difficulty: 'novice',
        description: 'Investigate the plague affecting West Ardougne.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Plague_City/Quick_guide',
        rewards: [
            '2,425 Mining experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Plague_City',
        release_date: '2002-07-01',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'Ardougne',
        official_length: 'Medium'
    }),

    'underground-pass': new QuestProperties({
        id: 'underground-pass',
        name: 'Underground Pass',
        difficulty: 'experienced',
        description: 'Navigate the dangerous Underground Pass to reach the elven lands.',
        requirements: [
            '25 Ranged',
            'Biohazard'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Underground_Pass/Quick_guide',
        rewards: [
            '3,000 Attack experience',
            'Access to Tirannwn'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Underground_Pass',
        release_date: '2004-08-09',
        quest_points: 5,
        members: true,
        combat_required: true,
        length: 'very long',
        start_location: 'West Ardougne',
        official_length: 'Very long'
    }),

    'regicide': new QuestProperties({
        id: 'regicide',
        name: 'Regicide',
        difficulty: 'experienced',
        description: 'Assassinate King Lathas and continue the elf storyline.',
        requirements: [
            '56 Agility',
            'Underground Pass'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Regicide/Quick_guide',
        rewards: [
            '13,750 Agility experience',
            'Access to Lletya'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Regicide',
        release_date: '2004-10-25',
        quest_points: 3,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'East Ardougne',
        official_length: 'Long'
    }),

    'legends-quest': new QuestProperties({
        id: 'legends-quest',
        name: 'Legends\' Quest',
        difficulty: 'master',
        description: 'Prove yourself worthy of becoming a legend.',
        requirements: [
            '107 Quest points',
            '50 Agility',
            '50 Crafting',
            '45 Herblore',
            '56 Magic',
            '52 Mining',
            '42 Prayer',
            '50 Smithing',
            '50 Strength',
            '50 Thieving',
            '50 Woodcutting',
            'Family Crest',
            'Heroes\' Quest',
            'Shilo Village',
            'Underground Pass',
            'Waterfall Quest'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Legends%27_Quest/Quick_guide',
        rewards: [
            '7,650 experience in 4 skills',
            'Access to Legends\' Guild'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Legends%27_Quest',
        release_date: '2003-08-11',
        quest_points: 4,
        members: true,
        combat_required: true,
        length: 'very long',
        start_location: 'Legends\' Guild',
        official_length: 'Very long'
    }),

    'nature-spirit': new QuestProperties({
        id: 'nature-spirit',
        name: 'Nature Spirit',
        difficulty: 'novice',
        description: 'Help purify Mort Myre Swamp with the Nature Spirit.',
        requirements: [
            'The Restless Ghost',
            'Priest in Peril'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Nature_Spirit/Quick_guide',
        rewards: [
            '2,000 Crafting experience',
            '2,000 Defence experience',
            '2,000 Hitpoints experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Nature_Spirit',
        release_date: '2004-10-25',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Mort Myre Swamp',
        official_length: 'Medium'
    }),

    'lost-tribe': new QuestProperties({
        id: 'lost-tribe',
        name: 'The Lost Tribe',
        difficulty: 'intermediate',
        description: 'Discover the cave goblins living beneath Lumbridge.',
        requirements: [
            '13 Agility',
            '13 Thieving',
            '17 Mining',
            'Goblin Diplomacy',
            'Rune Mysteries'
        ],
        guide: 'https://oldschool.runescape.wiki/w/The_Lost_Tribe/Quick_guide',
        rewards: [
            '3,000 Agility experience',
            '3,000 Thieving experience',
            '3,000 Mining experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Lost_Tribe',
        release_date: '2005-03-28',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'Lumbridge',
        official_length: 'Medium'
    }),

    'tears-of-guthix': new QuestProperties({
        id: 'tears-of-guthix',
        name: 'Tears of Guthix',
        difficulty: 'intermediate',
        description: 'Discover the cave of the Tears of Guthix.',
        requirements: [
            '43 Quest points',
            '49 Firemaking',
            '20 Crafting',
            '20 Mining'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Tears_of_Guthix/Quick_guide',
        rewards: [
            'Access to Tears of Guthix minigame'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Tears_of_Guthix',
        release_date: '2005-01-10',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Lumbridge Swamp',
        official_length: 'Short'
    }),

    'throne-of-miscellania': new QuestProperties({
        id: 'throne-of-miscellania',
        name: 'Throne of Miscellania',
        difficulty: 'experienced',
        description: 'Become regent of Miscellania and manage the kingdom.',
        requirements: [
            'The Fremennik Trials',
            'Heroes\' Quest'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Throne_of_Miscellania/Quick_guide',
        rewards: [
            'Access to Managing Miscellania minigame'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Throne_of_Miscellania',
        release_date: '2005-06-20',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Miscellania',
        official_length: 'Short'
    }),

    'one-small-favour': new QuestProperties({
        id: 'one-small-favour',
        name: 'One Small Favour',
        difficulty: 'experienced',
        description: 'Help Yanni Salika with one small favour that becomes many.',
        requirements: [
            '25 Agility',
            '18 Herblore',
            '30 Crafting',
            '36 Smithing',
            'Druidic Ritual',
            'The Giant Dwarf',
            'Rune Mysteries'
        ],
        guide: 'https://oldschool.runescape.wiki/w/One_Small_Favour/Quick_guide',
        rewards: [
            '10,000 experience in 2 chosen skills',
            'Access to key rings'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/One_Small_Favour',
        release_date: '2006-02-21',
        quest_points: 2,
        members: true,
        combat_required: false,
        length: 'long',
        start_location: 'Shilo Village',
        official_length: 'Long'
    }),

    'mountain-daughter': new QuestProperties({
        id: 'mountain-daughter',
        name: 'Mountain Daughter',
        difficulty: 'intermediate',
        description: 'Help Hamal the Chieftain find his missing daughter.',
        requirements: [
            '20 Agility'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Mountain_Daughter/Quick_guide',
        rewards: [
            '2,000 Attack experience',
            '1,000 Prayer experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Mountain_Daughter',
        release_date: '2004-09-06',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Mountain Camp',
        official_length: 'Medium'
    }),

    'roving-elves': new QuestProperties({
        id: 'roving-elves',
        name: 'Roving Elves',
        difficulty: 'experienced',
        description: 'Help Islwyn and Eluned with their crystal bow.',
        requirements: [
            'Regicide'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Roving_Elves/Quick_guide',
        rewards: [
            '10,000 Strength experience',
            'Crystal bow'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Roving_Elves',
        release_date: '2004-12-20',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'short',
        start_location: 'Lletya',
        official_length: 'Short'
    }),

    'watchtower': new QuestProperties({
        id: 'watchtower',
        name: 'Watchtower',
        difficulty: 'intermediate',
        description: 'Help the watchtower wizard with his magical problems.',
        requirements: [
            '15 Magic',
            '14 Agility',
            '25 Herblore',
            '40 Smithing',
            '54 Thieving'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Watchtower/Quick_guide',
        rewards: [
            '15,250 Magic experience',
            'Access to Watchtower teleport'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Watchtower',
        release_date: '2003-12-15',
        quest_points: 4,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Yanille',
        official_length: 'Medium'
    }),

    'grim-tales': new QuestProperties({
        id: 'grim-tales',
        name: 'Grim Tales',
        difficulty: 'master',
        description: 'Help Sylas with his family\'s dark fairy tale problems.',
        requirements: [
            '45 Farming',
            '52 Herblore',
            '58 Thieving',
            '59 Agility',
            '71 Woodcutting',
            'Witch\'s House'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Grim_Tales/Quick_guide',
        rewards: [
            '6,000 Farming experience',
            '14,000 Herblore experience',
            '6,000 Thieving experience',
            '16,000 Agility experience',
            '6,000 Woodcutting experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Grim_Tales',
        release_date: '2008-04-15',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'McGrubor\'s Wood',
        official_length: 'Long'
    }),

    'devious-minds': new QuestProperties({
        id: 'devious-minds',
        name: 'Devious Minds',
        difficulty: 'experienced',
        description: 'Help the monk with his suspicious temple plans.',
        requirements: [
            '50 Runecrafting',
            '65 Smithing',
            'Wanted!',
            'Troll Stronghold',
            'Doric\'s Quest'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Devious_Minds/Quick_guide',
        rewards: [
            '6,500 Runecrafting experience',
            '5,000 Smithing experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Devious_Minds',
        release_date: '2006-10-30',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Entrana',
        official_length: 'Short'
    }),

    'dorics-quest': new QuestProperties({
        id: 'dorics-quest',
        name: 'Doric\'s Quest',
        difficulty: 'novice',
        description: 'Help Doric the dwarf smith with his anvil problems.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Doric%27s_Quest/Quick_guide',
        rewards: [
            '1,300 Mining experience',
            '180 coins',
            'Access to Doric\'s anvils'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Doric%27s_Quest',
        release_date: '2001-01-04',
        quest_points: 1,
        members: false,
        combat_required: false,
        length: 'very short',
        start_location: 'Falador',
        official_length: 'Very short'
    }),

    'swan-song': new QuestProperties({
        id: 'swan-song',
        name: 'Swan Song',
        difficulty: 'master',
        description: 'Help the Piscatoris Fishing Colony with their sea troll problem.',
        requirements: [
            '62 Fishing',
            '66 Cooking',
            '45 Smithing',
            '42 Firemaking',
            '40 Crafting',
            'One Small Favour',
            'Garden of Tranquillity'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Swan_Song/Quick_guide',
        rewards: [
            '15,000 Magic experience',
            '10,000 Fishing experience',
            'Access to monkfish'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Swan_Song',
        release_date: '2006-07-25',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Piscatoris Fishing Colony',
        official_length: 'Long'
    }),

    'royal-trouble': new QuestProperties({
        id: 'royal-trouble',
        name: 'Royal Trouble',
        difficulty: 'experienced',
        description: 'Continue helping the Fremennik with their royal problems.',
        requirements: [
            '40 Agility',
            '40 Slayer',
            'Throne of Miscellania'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Royal_Trouble/Quick_guide',
        rewards: [
            '5,000 Agility experience',
            '5,000 Slayer experience',
            'Expanded Managing Miscellania'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Royal_Trouble',
        release_date: '2006-12-04',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Miscellania',
        official_length: 'Medium'
    }),

    'enlightened-journey': new QuestProperties({
        id: 'enlightened-journey',
        name: 'Enlightened Journey',
        difficulty: 'intermediate',
        description: 'Help Auguste create his hot air balloon.',
        requirements: [
            '20 Firemaking',
            '30 Farming',
            '36 Crafting'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Enlightened_Journey/Quick_guide',
        rewards: [
            '1,500 Firemaking experience',
            '4,000 Farming experience',
            '1,500 Crafting experience',
            'Access to balloon transport'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Enlightened_Journey',
        release_date: '2006-05-01',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'Entrana',
        official_length: 'Medium'
    }),

    'hand-in-the-sand': new QuestProperties({
        id: 'hand-in-the-sand',
        name: 'The Hand in the Sand',
        difficulty: 'intermediate',
        description: 'Investigate the mysterious hand discovered in the sand.',
        requirements: [
            '17 Thieving',
            '49 Crafting'
        ],
        guide: 'https://oldschool.runescape.wiki/w/The_Hand_in_the_Sand/Quick_guide',
        rewards: [
            '1,000 Thieving experience',
            '9,000 Crafting experience',
            'Bert\'s daily sand delivery'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Hand_in_the_Sand',
        release_date: '2008-07-07',
        quest_points: 1,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Yanille',
        official_length: 'Short'
    }),

    'kings-ransom': new QuestProperties({
        id: 'kings-ransom',
        name: 'King\'s Ransom',
        difficulty: 'experienced',
        description: 'Help King Arthur deal with the threat to Camelot.',
        requirements: [
            '65 Defence',
            '45 Magic',
            'Holy Grail',
            'Murder Mystery',
            'One Small Favour'
        ],
        guide: 'https://oldschool.runescape.wiki/w/King%27s_Ransom/Quick_guide',
        rewards: [
            '5,000 Defence experience',
            '33,000 Magic experience',
            'Access to Chivalry and Piety prayers'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/King%27s_Ransom',
        release_date: '2006-02-28',
        quest_points: 1,
        members: true,
        combat_required: true,
        length: 'long',
        start_location: 'Camelot',
        official_length: 'Long'
    }),

    // ========== MINIQUESTS ==========
    'enter-the-abyss': new QuestProperties({
        id: 'enter-the-abyss',
        name: 'Enter the Abyss',
        difficulty: 'intermediate',
        description: 'Learn to use the Abyss for runecrafting from the Zamorakian mage.',
        requirements: [
            'Rune Mysteries'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Enter_the_Abyss/Quick_guide',
        rewards: [
            '1,000 Runecrafting experience',
            'Access to the Abyss'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Enter_the_Abyss',
        release_date: '2005-03-21',
        quest_points: 0,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Wilderness (Zamorak Mage)',
        official_length: 'Short',
        miniquest: true
    }),

    'barbarian-training': new QuestProperties({
        id: 'barbarian-training',
        name: 'Barbarian Training',
        difficulty: 'intermediate',
        description: 'Learn ancient barbarian skills from Otto Godblessed.',
        requirements: [
            'Alfred Grimhand\'s Barcrawl',
            'Various skill requirements for different training'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Barbarian_Training/Quick_guide',
        rewards: [
            'Barbarian Firemaking',
            'Barbarian Herblore',
            'Barbarian Fishing',
            'Barbarian Smithing'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Barbarian_Training',
        release_date: '2005-05-17',
        quest_points: 0,
        members: true,
        combat_required: false,
        length: 'long',
        start_location: 'Otto\'s Grotto',
        official_length: 'Long',
        miniquest: true
    }),

    'mage-arena': new QuestProperties({
        id: 'mage-arena',
        name: 'Mage Arena',
        difficulty: 'intermediate',
        description: 'Prove your magical prowess to Kolodion and gain god spells.',
        requirements: [
            '60 Magic'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Mage_Arena/Quick_guide',
        rewards: [
            'God spells (Saradomin Strike, Claws of Guthix, Flames of Zamorak)',
            'God capes'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Mage_Arena',
        release_date: '2001-08-27',
        quest_points: 0,
        members: true,
        combat_required: true,
        length: 'short',
        start_location: 'Mage Arena (Level 56 Wilderness)',
        official_length: 'Short',
        miniquest: true
    }),

    'mage-arena-ii': new QuestProperties({
        id: 'mage-arena-ii',
        name: 'Mage Arena II',
        difficulty: 'master',
        description: 'Continue your magical training and unlock imbued god capes.',
        requirements: [
            '75 Magic',
            'Mage Arena completion'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Mage_Arena_II/Quick_guide',
        rewards: [
            'Imbued god capes',
            'Imbued god books'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Mage_Arena_II',
        release_date: '2017-07-20',
        quest_points: 0,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Mage Arena',
        official_length: 'Medium',
        miniquest: true
    }),

    'lair-of-tarn-razorlor': new QuestProperties({
        id: 'lair-of-tarn-razorlor',
        name: 'Lair of Tarn Razorlor',
        difficulty: 'experienced',
        description: 'Venture into Tarn\'s lair and defeat the undead necromancer.',
        requirements: [
            '40 Slayer',
            'Haunted Mine completion'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Lair_of_Tarn_Razorlor/Quick_guide',
        rewards: [
            '5,000 Slayer experience',
            'Salve amulet (e)'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Lair_of_Tarn_Razorlor',
        release_date: '2006-05-15',
        quest_points: 0,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Abandoned Mine (Morytania)',
        official_length: 'Medium',
        miniquest: true
    }),

    'family-pest': new QuestProperties({
        id: 'family-pest',
        name: 'Family Pest',
        difficulty: 'novice',
        description: 'Help Diango deal with his family problems.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Family_Pest/Quick_guide',
        rewards: [
            'Access to Diango\'s toy store',
            'Holiday event rewards'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Family_Pest',
        release_date: '2006-12-25',
        quest_points: 0,
        members: false,
        combat_required: false,
        length: 'very short',
        start_location: 'Draynor Village',
        official_length: 'Very short',
        miniquest: true
    }),

    'curse-of-the-empty-lord': new QuestProperties({
        id: 'curse-of-the-empty-lord',
        name: 'Curse of the Empty Lord',
        difficulty: 'intermediate',
        description: 'Investigate the mysterious curse affecting the Wilderness.',
        requirements: [
            'Desert Treasure'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Curse_of_the_Empty_Lord/Quick_guide',
        rewards: [
            'Ancient staff upgrade',
            'Ghostly robes'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Curse_of_the_Empty_Lord',
        release_date: '2005-08-22',
        quest_points: 0,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Wilderness',
        official_length: 'Medium',
        miniquest: true
    }),

    'the-generals-shadow': new QuestProperties({
        id: 'the-generals-shadow',
        name: 'The General\'s Shadow',
        difficulty: 'intermediate',
        description: 'Investigate the shadow of a fallen general in the wilderness.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/The_General%27s_Shadow/Quick_guide',
        rewards: [
            'Shadow sword',
            'Combat experience'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_General%27s_Shadow',
        release_date: '2005-10-31',
        quest_points: 0,
        members: true,
        combat_required: true,
        length: 'short',
        start_location: 'Wilderness',
        official_length: 'Short',
        miniquest: true
    }),

    'skippy-and-the-mogres': new QuestProperties({
        id: 'skippy-and-the-mogres',
        name: 'Skippy and the Mogres',
        difficulty: 'novice',
        description: 'Help Skippy investigate the mogre threat.',
        requirements: [
            'Completed Horror from the Deep',
            'Ability to defeat mogres'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Skippy_and_the_Mogres/Quick_guide',
        rewards: [
            'Flippers',
            'Access to mogres'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Skippy_and_the_Mogres',
        release_date: '2005-03-07',
        quest_points: 0,
        members: true,
        combat_required: true,
        length: 'very short',
        start_location: 'Lighthouse',
        official_length: 'Very short',
        miniquest: true
    }),

    'bear-your-soul': new QuestProperties({
        id: 'bear-your-soul',
        name: 'Bear Your Soul',
        difficulty: 'novice',
        description: 'Help the spirit of a fallen Fremennik warrior.',
        requirements: [
            'The Fremennik Trials'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Bear_Your_Soul/Quick_guide',
        rewards: [
            '2,000 Prayer experience',
            'Bear fur'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Bear_Your_Soul',
        release_date: '2007-04-23',
        quest_points: 0,
        members: true,
        combat_required: false,
        length: 'very short',
        start_location: 'Rellekka',
        official_length: 'Very short',
        miniquest: true
    }),

    'dorgeshuun-city': new QuestProperties({
        id: 'dorgeshuun-city',
        name: 'Dorgeshuun City',
        difficulty: 'intermediate',
        description: 'Explore and help establish the underground goblin city.',
        requirements: [
            'The Lost Tribe'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Dorgesh-Kaan',
        rewards: [
            'Access to Dorgesh-Kaan',
            'Underground city features'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Dorgesh-Kaan',
        release_date: '2005-03-28',
        quest_points: 0,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Lumbridge Caves',
        official_length: 'Short',
        miniquest: true
    }),

    'enchanted-key': new QuestProperties({
        id: 'enchanted-key',
        name: 'Enchanted Key',
        difficulty: 'novice',
        description: 'Find and use magical keys throughout RuneScape.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Enchanted_key/Quick_guide',
        rewards: [
            'Various treasure rewards',
            'Gold and gems'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Enchanted_key',
        release_date: '2005-11-28',
        quest_points: 0,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Various locations',
        official_length: 'Short',
        miniquest: true
    }),

    'curse-of-zaros': new QuestProperties({
        id: 'curse-of-zaros',
        name: 'Curse of Zaros',
        difficulty: 'experienced',
        description: 'Investigate ancient Zarosian ruins and artifacts.',
        requirements: [
            'Desert Treasure'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Curse_of_Zaros/Quick_guide',
        rewards: [
            'Ancient artifacts',
            'Historical knowledge'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Curse_of_Zaros',
        release_date: '2005-08-22',
        quest_points: 0,
        members: true,
        combat_required: false,
        length: 'medium',
        start_location: 'Desert',
        official_length: 'Medium',
        miniquest: true
    }),

    'daddys-home': new QuestProperties({
        id: 'daddys-home',
        name: 'Daddy\'s Home',
        difficulty: 'intermediate',
        description: 'Help renovate a player-owned house and learn Construction.',
        requirements: [],
        guide: 'https://oldschool.runescape.wiki/w/Daddy%27s_Home/Quick_guide',
        rewards: [
            '1,000 Construction experience',
            'House renovation tutorial'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Daddy%27s_Home',
        release_date: '2021-03-24',
        quest_points: 0,
        members: true,
        combat_required: false,
        length: 'short',
        start_location: 'Falador',
        official_length: 'Short',
        miniquest: true
    }),

    'hopespears-will': new QuestProperties({
        id: 'hopespears-will',
        name: 'Hopespear\'s Will',
        difficulty: 'intermediate',
        description: 'Complete tasks from a barbarian warrior\'s will.',
        requirements: [
            'Barbarian Training'
        ],
        guide: 'https://oldschool.runescape.wiki/w/Hopespear%27s_Will/Quick_guide',
        rewards: [
            'Barbarian equipment',
            'Ancient knowledge'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/Hopespear%27s_Will',
        release_date: '2006-01-09',
        quest_points: 0,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Barbarian Village',
        official_length: 'Medium',
        miniquest: true
    }),

    'the-final-dawn': new QuestProperties({
        id: 'the-final-dawn',
        name: 'The Final Dawn',
        difficulty: 'experienced',
        description: 'The final chapter in the Twilight Emissaries series.',
        requirements: [
            'The Twilight\'s Promise',
            '72 Combat level'
        ],
        guide: 'https://oldschool.runescape.wiki/w/The_Final_Dawn/Quick_guide',
        rewards: [
            '10,000 Prayer experience',
            '10,000 Combat experience (of choice)',
            'Access to enhanced prayer methods'
        ],
        wiki_url: 'https://oldschool.runescape.wiki/w/The_Final_Dawn',
        release_date: '2024-11-27',
        quest_points: 2,
        members: true,
        combat_required: true,
        length: 'medium',
        start_location: 'Zeah',
        official_length: 'Medium'
    })

    // QUEST DATABASE NOW COMPLETE WITH ALL QUESTS AND MINIQUESTS!
};

// Helper functions
function getAllQuests() {
    return Object.values(QUESTS_DATABASE).sort((a, b) => a.name.localeCompare(b.name));
}

function getQuestById(id) {
    return QUESTS_DATABASE[id] || null;
}

function getQuestsByDifficulty(difficulty) {
    return Object.values(QUESTS_DATABASE)
        .filter(quest => quest.difficulty === difficulty)
        .sort((a, b) => a.name.localeCompare(b.name));
}

function getCompletedQuests() {
    return Object.values(QUESTS_DATABASE)
        .filter(quest => quest.completed)
        .sort((a, b) => a.name.localeCompare(b.name));
}

function getIncompleteQuests() {
    return Object.values(QUESTS_DATABASE)
        .filter(quest => !quest.completed)
        .sort((a, b) => a.name.localeCompare(b.name));
}

function getMembersQuests() {
    return Object.values(QUESTS_DATABASE)
        .filter(quest => quest.members)
        .sort((a, b) => a.name.localeCompare(b.name));
}

function getFreeToPlayQuests() {
    return Object.values(QUESTS_DATABASE)
        .filter(quest => !quest.members)
        .sort((a, b) => a.name.localeCompare(b.name));
}

function getMiniquests() {
    return Object.values(QUESTS_DATABASE)
        .filter(quest => quest.miniquest)
        .sort((a, b) => a.name.localeCompare(b.name));
}

function getRegularQuests() {
    return Object.values(QUESTS_DATABASE)
        .filter(quest => !quest.miniquest)
        .sort((a, b) => a.name.localeCompare(b.name));
}

function toggleQuestCompletion(questId) {
    const quest = getQuestById(questId);
    if (quest) {
        quest.completed = !quest.completed;
        // Save to localStorage
        saveQuestProgress();
        return quest.completed;
    }
    return false;
}

function saveQuestProgress() {
    const progress = {};
    Object.entries(QUESTS_DATABASE).forEach(([id, quest]) => {
        progress[id] = quest.completed;
    });
    localStorage.setItem('osrs-quest-progress', JSON.stringify(progress));
}

function loadQuestProgress() {
    try {
        const progress = JSON.parse(localStorage.getItem('osrs-quest-progress') || '{}');
        Object.entries(progress).forEach(([id, completed]) => {
            if (QUESTS_DATABASE[id]) {
                QUESTS_DATABASE[id].completed = completed;
            }
        });
    } catch (error) {
        console.warn('Failed to load quest progress:', error);
    }
}

function getQuestProgress() {
    const total = Object.keys(QUESTS_DATABASE).length;
    const completed = getCompletedQuests().length;
    return {
        completed: completed,
        total: total,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
}

function getTotalQuestPoints() {
    return Object.values(QUESTS_DATABASE).reduce((total, quest) => {
        return total + (quest.completed ? quest.quest_points : 0);
    }, 0);
}

function getMaxQuestPoints() {
    return Object.values(QUESTS_DATABASE).reduce((total, quest) => {
        return total + quest.quest_points;
    }, 0);
}

// Initialize quest progress on load
document.addEventListener('DOMContentLoaded', function() {
    loadQuestProgress();
});

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        QUESTS_DATABASE,
        getAllQuests,
        getQuestById,
        getQuestsByDifficulty,
        getCompletedQuests,
        getIncompleteQuests,
        getMembersQuests,
        getFreeToPlayQuests,
        getMiniquests,
        getRegularQuests,
        toggleQuestCompletion,
        saveQuestProgress,
        loadQuestProgress,
        getQuestProgress,
        getTotalQuestPoints,
        getMaxQuestPoints
    };
}