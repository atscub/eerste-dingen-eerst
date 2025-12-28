#!/usr/bin/env python3
"""
Extract illustrations from scanned textbook pages, sorted by vertical position.

This script extracts illustration boxes from PDF pages and saves them
numbered by their vertical position (top to bottom) on each page.
"""

import cv2
import numpy as np
import os
import subprocess
import tempfile
from pathlib import Path


def extract_illustrations_sorted(page_path: str, output_dir: str, page_num: int,
                                  min_area: int = 5000, max_area: int = 500000) -> list[str]:
    """
    Extract illustration boxes from a scanned textbook page, sorted by y-coordinate.

    Args:
        page_path: Path to the page image
        output_dir: Directory to save extracted illustrations
        page_num: Page number for naming
        min_area: Minimum area for a valid illustration box
        max_area: Maximum area for a valid illustration box

    Returns:
        List of paths to extracted illustration files
    """
    img = cv2.imread(page_path)
    if img is None:
        print(f"Could not read {page_path}")
        return []

    height, width = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Apply thresholding to get binary image
    _, binary = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)

    # Find contours
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Collect valid illustration bounding boxes
    illustration_boxes = []

    for contour in contours:
        area = cv2.contourArea(contour)

        if min_area < area < max_area:
            x, y, w, h = cv2.boundingRect(contour)
            aspect_ratio = w / h if h > 0 else 0

            # Filter by aspect ratio and position (skip edges)
            if 0.3 < aspect_ratio < 5 and x > 10 and y > 10:
                illustration_boxes.append((x, y, w, h))

    # Sort by y-coordinate (top to bottom), then by x-coordinate (left to right)
    illustration_boxes.sort(key=lambda box: (box[1], box[0]))

    extracted_paths = []
    padding = 5

    for idx, (x, y, w, h) in enumerate(illustration_boxes, start=1):
        x1 = max(0, x - padding)
        y1 = max(0, y - padding)
        x2 = min(width, x + w + padding)
        y2 = min(height, y + h + padding)

        illustration = img[y1:y2, x1:x2]

        # Use zero-padded index based on sorted position
        output_path = os.path.join(output_dir, f'page{page_num}_illust{idx:03d}.png')
        cv2.imwrite(output_path, illustration)
        extracted_paths.append(output_path)

        print(f"  [{idx}] {w}x{h} at y={y}")

    return extracted_paths


def convert_pdf_to_images(pdf_path: str, output_dir: str) -> list[str]:
    """Convert a single-page PDF to a PNG image."""
    output_pattern = os.path.join(output_dir, 'page')
    subprocess.run(
        ['pdftoppm', pdf_path, output_pattern, '-png', '-r', '150'],
        check=True,
        capture_output=True
    )
    # pdftoppm creates files like page-1.png for single page PDFs
    return sorted(Path(output_dir).glob('page-*.png'))


def main():
    project_root = Path(__file__).parent.parent
    pdf_dir = project_root / 'public' / 'orginal-book-pages'
    output_dir = project_root / 'public' / 'illustrations-sorted'

    # Create output directory
    output_dir.mkdir(parents=True, exist_ok=True)

    # Get all PDF files sorted by page number
    pdf_files = sorted(pdf_dir.glob('part-*.pdf'),
                       key=lambda p: int(p.stem.split('-')[1]))

    print(f"Found {len(pdf_files)} PDF pages to process")
    print(f"Output directory: {output_dir}")
    print("=" * 60)

    total_illustrations = 0
    results = {}

    with tempfile.TemporaryDirectory() as temp_dir:
        for pdf_file in pdf_files:
            page_num = int(pdf_file.stem.split('-')[1])
            print(f"\nPage {page_num}: {pdf_file.name}")

            # Convert PDF to PNG
            png_files = convert_pdf_to_images(str(pdf_file), temp_dir)

            if not png_files:
                print(f"  Warning: No PNG generated for {pdf_file.name}")
                continue

            # Extract illustrations from the converted image
            illustrations = extract_illustrations_sorted(
                str(png_files[0]),
                str(output_dir),
                page_num
            )

            results[page_num] = len(illustrations)
            total_illustrations += len(illustrations)

            # Clean up temp PNG for this page
            for png_file in png_files:
                png_file.unlink()

    print("\n" + "=" * 60)
    print(f"EXTRACTION COMPLETE")
    print(f"Total illustrations: {total_illustrations}")
    print(f"Output directory: {output_dir}")
    print("=" * 60)

    # Summary by page
    print("\nIllustrations per page:")
    for page_num, count in sorted(results.items()):
        print(f"  Page {page_num:3d}: {count} illustrations")


if __name__ == "__main__":
    main()
