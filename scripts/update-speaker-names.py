#!/usr/bin/env python3
"""
Update speaker names in dialogue lessons from generic "Speaker X" to Dutch names.
Respects names mentioned in the dialogue text.
"""

import json
import re
from pathlib import Path

# Mapping of lesson ID to speaker names based on analysis
# Format: {lesson_id: ["Speaker 1 name", "Speaker 2 name", ...]}
SPEAKER_NAMES = {
    # Lessons with names in dialogue - RESPECT names mentioned in text
    1: ["Anna", "Maria"],  # Two women, handbag scene (no names in text)
    3: ["Jan", "Bediende"],  # Man at coat check (no names in text)
    5: ["Leraar", "Meneer Blake"],  # Teacher introducing students (Blake mentioned in text)
    7: ["Robert", "Alice"],  # Students introducing themselves (names in text)
    9: ["Meneer Ford", "Mevrouw Davis"],  # Formal conversation (names in text)
    11: ["Leraar", "Frank"],  # Teacher and student about shirt (Frank, Tim in text)
    13: ["Sophie", "Emma"],  # Two women about dress (no names in text)
    15: ["Vrouw", "Man"],  # Nationalities conversation (no names)
    17: ["Meneer Jackson", "Meneer Richards"],  # Office introductions (names in text)
    19: ["Moeder", "Kinderen"],  # Mother and children (no names)
    21: ["Tom", "Jane"],  # Giving book (Jane in text)
    23: ["Tom", "Jane"],  # Giving glasses (Jane in text)
    29: ["Mevrouw Jones", "Bessie"],  # Mrs Jones and Bessie (names in text)
    31: ["Moeder", "Tim"],  # Mother and children at park (Tim, Sally, Jack in text)
    37: ["George", "Susan"],  # Couple with flowers (names in text)
    39: ["Vader", "Mary"],  # Father and Mary (Mary in text)
    41: ["Mary", "Sam"],  # Boiling eggs scene (Mary in text)
    43: ["Mary", "John"],  # Making tea (names in text)
    45: ["Bob", "Juffrouw Jones"],  # Office scene (Jones, Bob in text)
    46: ["Dokter", "Patiënt"],  # Doctor and patient (no names)
    47: ["Mevrouw Price", "Mevrouw Young"],  # Two women gossiping (names in text)
    49: ["Mevrouw Bird", "Slager"],  # At the butcher (Bird in text)
    51: ["Man", "Vrouw"],  # Vacation plans (no names)
    53: ["Man", "Vrouw"],  # Weather discussion (no names)
    59: ["Klant", "Winkelier"],  # Shopping for fruit (no names)
    61: ["Meneer Williams", "Monteur"],  # Car trouble (Williams in text)
    63: ["Mevrouw Williams", "Jimmy"],  # Mother and son (names in text)
    65: ["Tom", "Betty"],  # Phone call (names in text)
    67: ["Mevrouw Williams", "Jimmy"],  # Mother and son school (names in text)
    71: ["Pauline", "Buurvrouw"],  # Pauline and neighbor (Pauline in text)
    75: ["Klant", "Verkoper"],  # Shoe shopping (no names)
    77: ["Meneer Croft", "Tandarts"],  # At dentist (Croft in text)
    79: ["Tom", "Peggy"],  # Couple with broken vase (names in text)
    81: ["Tom", "Peggy"],  # At holiday house (names in text)
    83: ["Tom", "Peggy"],  # When will train arrive (names in text)
    85: ["George", "Ben"],  # Paris trip (names in text)
    87: ["Jan", "Kees"],  # Two men discussing plans (no names)
    89: ["Klant", "Winkelier"],  # At electronics shop (no names)
    91: ["Mevrouw Brown", "Meneer West"],  # Poor Mr West story (names in text)
    95: ["Reiziger", "Loketbeambte"],  # Buying train tickets (no names)
    97: ["Toerist", "Voorbijganger"],  # Asking directions (no names)
    99: ["Ted", "Pat"],  # Couple trying to start car (names in text)
    101: ["Mary", "Peter"],  # Youth hostels (Mary in text)
    103: ["Harry", "Moeder"],  # Exam results (Harry in text)
    105: ["Klant", "Receptioniste"],  # Hotel booking (no names)
    107: ["Man", "Vrouw"],  # Movie discussion (no names)
    109: ["Jane", "Moeder"],  # Breakfast conversation (Jane in text)
    111: ["Mevrouw Frith", "Slager"],  # At butcher (Frith in text)
    113: ["Toerist", "Gids"],  # Sightseeing tour (no names)
    115: ["Jim", "Pat"],  # At the pub (names in text)
    121: ["Klant", "Bediende"],  # Dry cleaning (no names)
    123: ["Bill", "Karen"],  # Guessing game (names in text)
    125: ["Peter", "Collega"],  # Office conversation (Peter in text)
    127: ["Karen", "Collega"],  # About Mr Marsh (Karen in text)
    129: ["Ann", "Harry"],  # Sawing (names in text)
    131: ["Harry", "Ann"],  # Dream about Egypt (names in text)
    133: ["Alan", "Millie"],  # About Mr Marsh London trip (names in text)
    135: ["Karen", "Verslaggever"],  # Interview (Karen in text)
    137: ["Brian", "June"],  # Plans discussion (names in text)
    139: ["Mary", "Betty"],  # Comparison (names in text)
}


def update_lesson_speakers(lesson_path: Path) -> bool:
    """Update speaker names in a dialogue lesson."""
    with open(lesson_path, 'r', encoding='utf-8') as f:
        lesson = json.load(f)

    if lesson.get('type') != 'dialogue':
        return False

    lesson_id = lesson.get('id')
    if lesson_id not in SPEAKER_NAMES:
        return False

    lines = lesson.get('dialogue', {}).get('lines', [])
    if not lines:
        return False

    # Check if any line has a speaker
    has_speakers = any(line.get('speaker') for line in lines)
    if not has_speakers:
        return False

    names = SPEAKER_NAMES[lesson_id]
    speaker_map = {}

    # Build speaker mapping
    for line in lines:
        speaker = line.get('speaker', '')
        if speaker and speaker not in speaker_map:
            # Extract speaker number
            match = re.match(r'Speaker\s*(\d+)', speaker)
            if match:
                idx = int(match.group(1)) - 1
                if idx < len(names):
                    speaker_map[speaker] = names[idx]

    # Update speakers
    for line in lines:
        if line.get('speaker') in speaker_map:
            line['speaker'] = speaker_map[line['speaker']]

    # Write back
    with open(lesson_path, 'w', encoding='utf-8') as f:
        json.dump(lesson, f, ensure_ascii=False, indent=2)

    return True


def main():
    project_root = Path(__file__).parent.parent
    lessons_dir = project_root / 'src' / 'data' / 'lessons'

    lesson_files = sorted(lessons_dir.glob('lesson_*.json'))

    print(f"Processing {len(lesson_files)} lesson files")
    print("=" * 60)

    updated = 0
    skipped = 0

    for lesson_path in lesson_files:
        if update_lesson_speakers(lesson_path):
            print(f"Updated: {lesson_path.name}")
            updated += 1
        else:
            skipped += 1

    print("=" * 60)
    print(f"Updated: {updated} lessons")
    print(f"Skipped: {skipped} lessons")


if __name__ == "__main__":
    main()
