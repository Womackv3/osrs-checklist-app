// OSRS Potions Database
// Complete potion data for Herblore skill

class PotionIngredient {
    constructor(name, quantity = 1) {
        this.name = name;
        this.quantity = quantity;
    }
}

class PotionProperties {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.level_required = data.level_required;
        this.xp_gained = data.xp_gained;
        this.primary_ingredient = data.primary_ingredient;
        this.secondary_ingredient = data.secondary_ingredient;
        this.additional_ingredients = data.additional_ingredients || [];
        this.wiki_url = data.wiki_url;
        this.category = data.category;
        this.effect = data.effect;
        this.dose_count = data.dose_count || 3;
        this.barbarian_herblore = data.barbarian_herblore || false;
    }

    getWikiUrl() {
        return `https://oldschool.runescape.wiki/w/${encodeURIComponent(this.name.replace(/ /g, '_'))}`;
    }

    getIngredientsList() {
        let ingredients = [this.primary_ingredient, this.secondary_ingredient];
        if (this.additional_ingredients.length > 0) {
            ingredients = ingredients.concat(this.additional_ingredients);
        }
        return ingredients;
    }
}

// Comprehensive Potions Database
const POTIONS_DATABASE = {
    // Combat Potions
    'attack-potion': new PotionProperties({
        id: 'attack-potion',
        name: 'Attack potion',
        level_required: 3,
        xp_gained: 25,
        primary_ingredient: new PotionIngredient('Guam leaf', 1),
        secondary_ingredient: new PotionIngredient('Eye of newt', 1),
        category: 'Combat',
        effect: 'Boosts Attack level by 3 + 10% of level',
        wiki_url: 'https://oldschool.runescape.wiki/w/Attack_potion'
    }),

    'antipoison': new PotionProperties({
        id: 'antipoison',
        name: 'Antipoison',
        level_required: 5,
        xp_gained: 37.5,
        primary_ingredient: new PotionIngredient('Marrentill', 1),
        secondary_ingredient: new PotionIngredient('Unicorn horn dust', 1),
        category: 'Combat',
        effect: 'Cures poison and provides immunity for 90 seconds',
        wiki_url: 'https://oldschool.runescape.wiki/w/Antipoison'
    }),

    'strength-potion': new PotionProperties({
        id: 'strength-potion',
        name: 'Strength potion',
        level_required: 12,
        xp_gained: 50,
        primary_ingredient: new PotionIngredient('Tarromin', 1),
        secondary_ingredient: new PotionIngredient('Limpwurt root', 1),
        category: 'Combat',
        effect: 'Boosts Strength level by 3 + 10% of level',
        wiki_url: 'https://oldschool.runescape.wiki/w/Strength_potion'
    }),

    'combat-potion': new PotionProperties({
        id: 'combat-potion',
        name: 'Combat potion',
        level_required: 36,
        xp_gained: 84,
        primary_ingredient: new PotionIngredient('Harralander', 1),
        secondary_ingredient: new PotionIngredient('Goat horn dust', 1),
        category: 'Combat',
        effect: 'Boosts Attack and Strength by 3 + 10% of level',
        wiki_url: 'https://oldschool.runescape.wiki/w/Combat_potion'
    }),

    'super-attack': new PotionProperties({
        id: 'super-attack',
        name: 'Super attack',
        level_required: 45,
        xp_gained: 100,
        primary_ingredient: new PotionIngredient('Irit leaf', 1),
        secondary_ingredient: new PotionIngredient('Eye of newt', 1),
        category: 'Combat',
        effect: 'Boosts Attack level by 5 + 15% of level',
        wiki_url: 'https://oldschool.runescape.wiki/w/Super_attack'
    }),

    'super-strength': new PotionProperties({
        id: 'super-strength',
        name: 'Super strength',
        level_required: 55,
        xp_gained: 125,
        primary_ingredient: new PotionIngredient('Kwuarm', 1),
        secondary_ingredient: new PotionIngredient('Limpwurt root', 1),
        category: 'Combat',
        effect: 'Boosts Strength level by 5 + 15% of level',
        wiki_url: 'https://oldschool.runescape.wiki/w/Super_strength'
    }),

    'super-defence': new PotionProperties({
        id: 'super-defence',
        name: 'Super defence',
        level_required: 66,
        xp_gained: 150,
        primary_ingredient: new PotionIngredient('Cadantine', 1),
        secondary_ingredient: new PotionIngredient('White berries', 1),
        category: 'Combat',
        effect: 'Boosts Defence level by 5 + 15% of level',
        wiki_url: 'https://oldschool.runescape.wiki/w/Super_defence'
    }),

    'super-combat-potion': new PotionProperties({
        id: 'super-combat-potion',
        name: 'Super combat potion',
        level_required: 90,
        xp_gained: 150,
        primary_ingredient: new PotionIngredient('Torstol', 1),
        secondary_ingredient: new PotionIngredient('Super attack(4)', 1),
        additional_ingredients: [
            new PotionIngredient('Super strength(4)', 1),
            new PotionIngredient('Super defence(4)', 1)
        ],
        category: 'Combat',
        effect: 'Boosts Attack, Strength, and Defence by 5 + 15% of level',
        wiki_url: 'https://oldschool.runescape.wiki/w/Super_combat_potion'
    }),

    // Prayer and Restore Potions
    'prayer-potion': new PotionProperties({
        id: 'prayer-potion',
        name: 'Prayer potion',
        level_required: 38,
        xp_gained: 87.5,
        primary_ingredient: new PotionIngredient('Ranarr weed', 1),
        secondary_ingredient: new PotionIngredient('Snape grass', 1),
        category: 'Prayer',
        effect: 'Restores Prayer points by 7 + 25% of level',
        wiki_url: 'https://oldschool.runescape.wiki/w/Prayer_potion'
    }),

    'super-restore': new PotionProperties({
        id: 'super-restore',
        name: 'Super restore',
        level_required: 63,
        xp_gained: 142.5,
        primary_ingredient: new PotionIngredient('Snapdragon', 1),
        secondary_ingredient: new PotionIngredient('Red spiders\' eggs', 1),
        category: 'Prayer',
        effect: 'Restores lowered stats by 8 + 25% of level, Prayer by 8 + 25% of level',
        wiki_url: 'https://oldschool.runescape.wiki/w/Super_restore'
    }),

    'sanfew-serum': new PotionProperties({
        id: 'sanfew-serum',
        name: 'Sanfew serum',
        level_required: 65,
        xp_gained: 160,
        primary_ingredient: new PotionIngredient('Snapdragon', 1),
        secondary_ingredient: new PotionIngredient('Unicorn horn dust', 1),
        additional_ingredients: [new PotionIngredient('Snake weed', 1)],
        category: 'Prayer',
        effect: 'Cures poison and disease, restores stats and Prayer points',
        wiki_url: 'https://oldschool.runescape.wiki/w/Sanfew_serum'
    }),

    // Skill Potions
    'antifire-potion': new PotionProperties({
        id: 'antifire-potion',
        name: 'Antifire potion',
        level_required: 69,
        xp_gained: 157.5,
        primary_ingredient: new PotionIngredient('Lantadyme', 1),
        secondary_ingredient: new PotionIngredient('Dragon scale dust', 1),
        category: 'Skill',
        effect: 'Provides protection against dragonfire for 6 minutes',
        wiki_url: 'https://oldschool.runescape.wiki/w/Antifire_potion'
    }),

    'ranging-potion': new PotionProperties({
        id: 'ranging-potion',
        name: 'Ranging potion',
        level_required: 72,
        xp_gained: 162.5,
        primary_ingredient: new PotionIngredient('Dwarf weed', 1),
        secondary_ingredient: new PotionIngredient('Wine of zamorak', 1),
        category: 'Combat',
        effect: 'Boosts Ranged level by 4 + 10% of level',
        wiki_url: 'https://oldschool.runescape.wiki/w/Ranging_potion'
    }),

    'magic-potion': new PotionProperties({
        id: 'magic-potion',
        name: 'Magic potion',
        level_required: 76,
        xp_gained: 172.5,
        primary_ingredient: new PotionIngredient('Lantadyme', 1),
        secondary_ingredient: new PotionIngredient('Potato cactus', 1),
        category: 'Combat',
        effect: 'Boosts Magic level by 4',
        wiki_url: 'https://oldschool.runescape.wiki/w/Magic_potion'
    }),

    'stamina-potion': new PotionProperties({
        id: 'stamina-potion',
        name: 'Stamina potion',
        level_required: 77,
        xp_gained: 62.5,
        primary_ingredient: new PotionIngredient('Super energy(4)', 1),
        secondary_ingredient: new PotionIngredient('Amylase crystal', 4),
        category: 'Skill',
        effect: 'Reduces run energy depletion by 70% for 2 minutes per dose',
        wiki_url: 'https://oldschool.runescape.wiki/w/Stamina_potion'
    }),

    'saradomin-brew': new PotionProperties({
        id: 'saradomin-brew',
        name: 'Saradomin brew',
        level_required: 81,
        xp_gained: 180,
        primary_ingredient: new PotionIngredient('Toadflax', 1),
        secondary_ingredient: new PotionIngredient('Crushed bird\'s nest', 1),
        category: 'Combat',
        effect: 'Boosts Hitpoints by 15% + 2, lowers Attack, Strength, Defence by 10% + 2',
        wiki_url: 'https://oldschool.runescape.wiki/w/Saradomin_brew'
    }),

    'antivenom': new PotionProperties({
        id: 'antivenom',
        name: 'Antivenom',
        level_required: 87,
        xp_gained: 120,
        primary_ingredient: new PotionIngredient('Antidote++(4)', 1),
        secondary_ingredient: new PotionIngredient('Zulrah\'s scales', 20),
        category: 'Combat',
        effect: 'Cures venom and poison, provides immunity to both',
        wiki_url: 'https://oldschool.runescape.wiki/w/Antivenom'
    }),

    'antivenom-plus': new PotionProperties({
        id: 'antivenom-plus',
        name: 'Antivenom+',
        level_required: 94,
        xp_gained: 125,
        primary_ingredient: new PotionIngredient('Antivenom(4)', 1),
        secondary_ingredient: new PotionIngredient('Torstol', 1),
        category: 'Combat',
        effect: 'Cures venom and poison, provides extended immunity',
        wiki_url: 'https://oldschool.runescape.wiki/w/Antivenom%2B'
    }),

    // Barbarian Herblore
    'barbarian-attack': new PotionProperties({
        id: 'barbarian-attack',
        name: 'Barbarian herblore (Attack)',
        level_required: 17.5,
        xp_gained: 17.5,
        primary_ingredient: new PotionIngredient('Attack potion(2)', 1),
        secondary_ingredient: new PotionIngredient('Roe', 1),
        category: 'Barbarian',
        effect: 'Barbarian herblore training - boosts Attack and heals 2 HP',
        barbarian_herblore: true,
        wiki_url: 'https://oldschool.runescape.wiki/w/Barbarian_Herblore'
    }),

    'barbarian-strength': new PotionProperties({
        id: 'barbarian-strength',
        name: 'Barbarian herblore (Strength)',
        level_required: 17.5,
        xp_gained: 17.5,
        primary_ingredient: new PotionIngredient('Strength potion(2)', 1),
        secondary_ingredient: new PotionIngredient('Roe', 1),
        category: 'Barbarian',
        effect: 'Barbarian herblore training - boosts Strength and heals 2 HP',
        barbarian_herblore: true,
        wiki_url: 'https://oldschool.runescape.wiki/w/Barbarian_Herblore'
    }),

    // Energy Potions
    'energy-potion': new PotionProperties({
        id: 'energy-potion',
        name: 'Energy potion',
        level_required: 26,
        xp_gained: 62.5,
        primary_ingredient: new PotionIngredient('Harralander', 1),
        secondary_ingredient: new PotionIngredient('Chocolate dust', 1),
        category: 'Skill',
        effect: 'Restores 10% + 3 run energy',
        wiki_url: 'https://oldschool.runescape.wiki/w/Energy_potion'
    }),

    'super-energy': new PotionProperties({
        id: 'super-energy',
        name: 'Super energy',
        level_required: 52,
        xp_gained: 117.5,
        primary_ingredient: new PotionIngredient('Avantoe', 1),
        secondary_ingredient: new PotionIngredient('Mort myre fungus', 1),
        category: 'Skill',
        effect: 'Restores 20% run energy',
        wiki_url: 'https://oldschool.runescape.wiki/w/Super_energy'
    }),

    // Special Potions
    'zamorak-brew': new PotionProperties({
        id: 'zamorak-brew',
        name: 'Zamorak brew',
        level_required: 78,
        xp_gained: 175,
        primary_ingredient: new PotionIngredient('Torstol', 1),
        secondary_ingredient: new PotionIngredient('Jangerberries', 1),
        category: 'Combat',
        effect: 'Boosts Attack and Strength by 2 + 12%, lowers Defence by 2 + 10% and HP by 10% + 2',
        wiki_url: 'https://oldschool.runescape.wiki/w/Zamorak_brew'
    }),

    'bastion-potion': new PotionProperties({
        id: 'bastion-potion',
        name: 'Bastion potion',
        level_required: 80,
        xp_gained: 155,
        primary_ingredient: new PotionIngredient('Cadantine', 1),
        secondary_ingredient: new PotionIngredient('Wine of zamorak', 1),
        category: 'Combat',
        effect: 'Boosts Ranged and Defence by 5 + 15% of level',
        wiki_url: 'https://oldschool.runescape.wiki/w/Bastion_potion'
    }),

    'battlemage-potion': new PotionProperties({
        id: 'battlemage-potion',
        name: 'Battlemage potion',
        level_required: 80,
        xp_gained: 155,
        primary_ingredient: new PotionIngredient('Lantadyme', 1),
        secondary_ingredient: new PotionIngredient('Potato cactus', 1),
        category: 'Combat',
        effect: 'Boosts Magic and Defence by 4 + 15% of level',
        wiki_url: 'https://oldschool.runescape.wiki/w/Battlemage_potion'
    })
};

// Helper functions
function getAllPotions() {
    return Object.values(POTIONS_DATABASE).sort((a, b) => a.level_required - b.level_required);
}

function getPotionsByCategory(category) {
    return Object.values(POTIONS_DATABASE)
        .filter(potion => potion.category === category)
        .sort((a, b) => a.level_required - b.level_required);
}

function getPotionById(id) {
    return POTIONS_DATABASE[id] || null;
}

function getPotionsByLevel(minLevel, maxLevel = 99) {
    return Object.values(POTIONS_DATABASE)
        .filter(potion => potion.level_required >= minLevel && potion.level_required <= maxLevel)
        .sort((a, b) => a.level_required - b.level_required);
}

function formatIngredients(potion) {
    const ingredients = potion.getIngredientsList();
    return ingredients.map(ing => `${ing.name} (${ing.quantity})`).join(' + ');
}

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        POTIONS_DATABASE,
        getAllPotions,
        getPotionsByCategory,
        getPotionById,
        getPotionsByLevel,
        formatIngredients
    };
}