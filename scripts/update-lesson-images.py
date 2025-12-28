#!/usr/bin/env python3
"""
Update dialogue lesson JSON files to use correctly sorted illustration images.

This script reads each dialogue lesson, finds the corresponding sorted images
from the illustrations-sorted directory, and updates the images array.

Rules:
- If a page has only 1 image, it becomes the headerImage and images array is empty
- If a page has multiple images, they go in the images array
"""

import json
import os
import re
from pathlib import Path


def get_sorted_images_for_page(illustrations_dir: Path, page_num: int) -> list[str]:
    """Get all sorted illustration filenames for a given page number."""
    pattern = re.compile(rf'^page{page_num}_illust(\d+)\.png$')

    images = []
    for f in illustrations_dir.iterdir():
        match = pattern.match(f.name)
        if match:
            images.append((int(match.group(1)), f.name))

    # Sort by illustration number (which is now position-based)
    images.sort(key=lambda x: x[0])
    return [img[1] for img in images]


def update_lesson_images(lesson_path: Path, illustrations_dir: Path) -> bool:
    """Update a dialogue lesson's images array with sorted images."""
    with open(lesson_path, 'r', encoding='utf-8') as f:
        lesson = json.load(f)

    if lesson.get('type') != 'dialogue':
        return False

    lesson_id = lesson.get('id')
    if not lesson_id:
        print(f"  Warning: No lesson ID found in {lesson_path.name}")
        return False

    # Get sorted images for this page
    sorted_images = get_sorted_images_for_page(illustrations_dir, lesson_id)

    if not sorted_images:
        print(f"  Warning: No images found for page {lesson_id}")
        return False

    # Get current images to preserve alt text where possible
    current_images = lesson.get('dialogue', {}).get('images', [])
    current_header = lesson.get('dialogue', {}).get('headerImage')

    if len(sorted_images) == 1:
        # Single image: use as headerImage, empty images array
        img_name = sorted_images[0]

        # Try to preserve alt text from existing headerImage or first image
        alt = 'Ilustración del diálogo'
        if current_header and current_header.get('alt'):
            alt = current_header['alt']
        elif current_images and current_images[0].get('alt'):
            alt = current_images[0]['alt']

        lesson['dialogue']['headerImage'] = {
            'src': f'/illustrations-sorted/{img_name}',
            'alt': alt
        }
        lesson['dialogue']['images'] = []
    else:
        # Multiple images: update headerImage path if exists, fill images array
        if current_header:
            # Update headerImage to use sorted path (use first image)
            # Actually, headerImage might be a separate concept - let's remove it
            # if we have multiple images, unless it was explicitly set
            # For now, let's clear headerImage when we have multiple images
            lesson['dialogue']['headerImage'] = None

        # Create new images array with sorted images
        new_images = []
        for i, img_name in enumerate(sorted_images):
            # Try to find matching alt text from old images (by position if count matches)
            if len(current_images) == len(sorted_images) and i < len(current_images):
                alt = current_images[i].get('alt', f'Ilustración {i+1} del diálogo')
            else:
                alt = f'Ilustración {i+1} del diálogo'

            new_images.append({
                'src': f'/illustrations-sorted/{img_name}',
                'alt': alt
            })

        lesson['dialogue']['images'] = new_images

    # Remove None values
    if 'headerImage' in lesson['dialogue'] and lesson['dialogue']['headerImage'] is None:
        del lesson['dialogue']['headerImage']

    # Write back
    with open(lesson_path, 'w', encoding='utf-8') as f:
        json.dump(lesson, f, ensure_ascii=False, indent=2)

    return True


def main():
    project_root = Path(__file__).parent.parent
    lessons_dir = project_root / 'src' / 'data' / 'lessons'
    illustrations_dir = project_root / 'public' / 'illustrations-sorted'

    if not illustrations_dir.exists():
        print(f"Error: Illustrations directory not found: {illustrations_dir}")
        return

    # Get all lesson files
    lesson_files = sorted(lessons_dir.glob('lesson_*.json'))

    print(f"Found {len(lesson_files)} lesson files")
    print(f"Illustrations directory: {illustrations_dir}")
    print("=" * 60)

    updated = 0
    skipped = 0

    for lesson_path in lesson_files:
        lesson_num = lesson_path.stem.replace('lesson_', '')

        if update_lesson_images(lesson_path, illustrations_dir):
            print(f"Updated: {lesson_path.name}")
            updated += 1
        else:
            skipped += 1

    print("=" * 60)
    print(f"Updated: {updated} dialogue lessons")
    print(f"Skipped: {skipped} non-dialogue lessons")


if __name__ == "__main__":
    main()
