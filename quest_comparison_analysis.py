#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
OSRS Quest Comparison Analysis
Compares local quests.js file with official OSRS Wiki quest list
"""

import re
import json

def extract_local_quests(file_path):
    """Extract quest names from the local quests.js file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract quest names using regex
    quest_names = []
    lines = content.split('\n')
    
    for line in lines:
        line = line.strip()
        if 'name:' in line and ('"' in line or "'" in line):
            # Extract the name value
            match = re.search(r'name:\s*[\'\"](.*?)[\'\"],?', line)
            if match:
                name = match.group(1).strip()
                if name and len(name) > 2:
                    quest_names.append(name)
    
    # Remove duplicates
    return list(set(quest_names))

def get_official_quest_list():
    """Official quest list based on OSRS Wiki (as of 2024-2025)"""
    
    # F2P Quests (22 total)
    f2p_quests = [
        "The Restless Ghost",
        "The Knight's Sword", 
        "The Corsair Curse",
        "Cook's Assistant",
        "Sheep Shearer",
        "Below Ice Mountain",
        "X Marks the Spot",
        "Misthalin Mystery",
        "Rune Mysteries",
        "Dragon Slayer I",
        "Pirate's Treasure",
        "Goblin Diplomacy",
        "Witch's Potion",
        "Black Knights' Fortress",
        "Doric's Quest",
        "Prince Ali Rescue",
        "Imp Catcher",
        "Vampyre Slayer",
        "Ernest the Chicken",
        "Shield of Arrav",
        "Demon Slayer",
        "Romeo & Juliet"
    ]
    
    # Sample of major Members quests (partial list for analysis)
    # Note: Full list of 151 members quests would be extensive
    major_members_quests = [
        "Druidic Ritual",
        "Lost City", 
        "Witch's House",
        "Merlin's Crystal",
        "Heroes' Quest",
        "Scorpion Catcher",
        "Family Crest",
        "Fishing Contest",
        "Tribal Totem",
        "Monk's Friend",
        "Temple of Ikov",
        "Clock Tower",
        "Holy Grail",
        "Tree Gnome Village",
        "Fight Arena",
        "Hazeel Cult",
        "Sheep Herder",
        "Plague City",
        "Sea Slug",
        "Waterfall Quest",
        "Jungle Potion",
        "The Grand Tree",
        "Underground Pass",
        "Observatory Quest",
        "The Tourist Trap",
        "Watchtower",
        "Dwarf Cannon",
        "Murder Mystery",
        "The Dig Site",
        "Gertrude's Cat",
        "Legends' Quest",
        "Death Plateau",
        "Eadgar's Ruse",
        "Big Chompy Bird Hunting",
        "Elemental Workshop I",
        "Nature Spirit",
        "Priest in Peril",
        "Regicide",
        "Shilo Village",
        "Monkey Madness I",
        "Desert Treasure",
        "Recipe for Disaster",
        "Animal Magnetism",
        "Horror from the Deep",
        "Throne of Miscellania",
        "The Fremennik Trials",
        "Dragon Slayer II",
        "Monkey Madness II",
        "Song of the Elves",
        "Desert Treasure II - The Fallen Empire",
        "Sins of the Father",
        "A Taste of Hope",
        "Making Friends with My Arm",
        "Bone Voyage",
        "Client of Kourend",
        "Architectural Alliance", 
        "The Ascent of Arceuus",
        "The Depths of Despair",
        "The Forsaken Tower",
        "The Queen of Thieves",
        "Tale of the Righteous",
        "The Final Dawn"
    ]
    
    return f2p_quests, major_members_quests

def normalize_quest_name(name):
    """Normalize quest names for comparison"""
    return name.lower().replace("'", "").replace('"', '').replace(' ', '').replace('-', '')

def compare_quests():
    """Compare local quests with official list"""
    
    # Get quest lists
    local_quests = extract_local_quests(r'D:\OSRS Checklist App\quests.js')
    f2p_quests, members_quests = get_official_quest_list()
    official_quests = f2p_quests + members_quests
    
    print("=== OSRS Quest Comparison Analysis ===")
    print(f"Local quests found: {len(local_quests)}")
    print(f"Official F2P quests: {len(f2p_quests)}")
    print(f"Sample Members quests checked: {len(members_quests)}")
    print(f"Total official quests in this analysis: {len(official_quests)}")
    print("")
    
    # Normalize names for comparison
    local_normalized = {normalize_quest_name(q): q for q in local_quests}
    official_normalized = {normalize_quest_name(q): q for q in official_quests}
    
    # Find missing quests
    missing_quests = []
    found_quests = []
    
    for norm_name, official_name in official_normalized.items():
        if norm_name in local_normalized:
            found_quests.append(official_name)
        else:
            missing_quests.append(official_name)
    
    print("=== F2P QUESTS STATUS ===")
    for quest in f2p_quests:
        norm_quest = normalize_quest_name(quest)
        status = "FOUND" if norm_quest in local_normalized else "MISSING"
        print(f"{status:8} - {quest}")
    
    print("\n=== MEMBERS QUESTS STATUS (Sample) ===")
    for quest in members_quests:
        norm_quest = normalize_quest_name(quest)
        status = "FOUND" if norm_quest in local_normalized else "MISSING"
        print(f"{status:8} - {quest}")
    
    print(f"\n=== SUMMARY ===")
    print(f"Quests found in local file: {len(found_quests)}")
    print(f"Quests missing from local file: {len(missing_quests)}")
    
    if missing_quests:
        print(f"\n=== MISSING QUESTS ===")
        for i, quest in enumerate(missing_quests, 1):
            print(f"{i}. {quest}")
    
    # Check for local quests not in official list
    extra_local = []
    for norm_name, local_name in local_normalized.items():
        if norm_name not in official_normalized:
            extra_local.append(local_name)
    
    if extra_local:
        print(f"\n=== LOCAL QUESTS NOT IN OFFICIAL LIST (may be formatting issues) ===")
        for i, quest in enumerate(sorted(extra_local), 1):
            print(f"{i}. {quest}")

if __name__ == "__main__":
    compare_quests()