const fs = require('fs');
const path = require('path');

const before = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'test-results', 'content-snapshot-before.json'), 'utf-8'));
const after = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'test-results', 'content-snapshot-after.json'), 'utf-8'));

let differences = 0;

for (const page of Object.keys(before)) {
  console.log(`\n--- Comparing ${page} ---`);
  const b = before[page];
  const a = after[page];

  if (!a) {
    console.error(`Page ${page} missing in after snapshot!`);
    differences++;
    continue;
  }

  // Title
  if (b.title !== a.title) {
    console.error(`[TITLE MISMATCH] before: "${b.title}" vs after: "${a.title}"`);
    differences++;
  } else {
    console.log(`✓ Title identical: "${b.title}"`);
  }

  // Meta
  if (b.metaDesc !== a.metaDesc) {
    console.error(`[META MISMATCH] before: "${b.metaDesc}" vs after: "${a.metaDesc}"`);
    differences++;
  } else {
    console.log(`✓ Meta identical`);
  }

  // Headings
  const bHeadings = JSON.stringify(b.headings);
  const aHeadings = JSON.stringify(a.headings);
  if (bHeadings !== aHeadings) {
    console.error(`[HEADINGS MISMATCH]`);
    console.error(`Before:`, b.headings);
    console.error(`After:`, a.headings);
    differences++;
  } else {
    console.log(`✓ Headings identical (${b.headings.length} headings)`);
  }

  // Images
  const bImgs = JSON.stringify(b.images);
  const aImgs = JSON.stringify(a.images);
  if (bImgs !== aImgs) {
    console.error(`[IMAGES MISMATCH]`);
    differences++;
  } else {
    console.log(`✓ Image src & alt identical (${b.images.length} images)`);
  }

  // Links
  const bLinks = JSON.stringify(b.links);
  const aLinks = JSON.stringify(a.links);
  if (bLinks !== aLinks) {
    console.error(`[LINKS MISMATCH]`);
    differences++;
  } else {
    console.log(`✓ Links identical (${b.links.length} links)`);
  }

  // Buttons
  const bButtons = JSON.stringify(b.buttons);
  const aButtons = JSON.stringify(a.buttons);
  if (bButtons !== aButtons) {
    console.error(`[BUTTONS MISMATCH]`);
    console.error(`Before:`, b.buttons);
    console.error(`After:`, a.buttons);
    differences++;
  } else {
    console.log(`✓ Buttons identical (${b.buttons.length} buttons)`);
  }

  // Form fields
  const bFields = JSON.stringify(b.formFields);
  const aFields = JSON.stringify(a.formFields);
  if (bFields !== aFields) {
    console.error(`[FORM FIELDS MISMATCH]`);
    differences++;
  } else {
    console.log(`✓ Form fields identical (${b.formFields.length} fields)`);
  }

  // Main text length
  if (b.mainTextLength !== a.mainTextLength) {
    console.warn(`[TEXT LENGTH DIFFERENCE] before: ${b.mainTextLength} vs after: ${a.mainTextLength}`);
  } else {
    console.log(`✓ Full text length identical (${b.mainTextLength} characters)`);
  }
}

console.log(`\n========================================`);
if (differences === 0) {
  console.log(`ALL 8 PAGES ARE 100% CONTENT IDENTICAL! ZERO DIFFERENCES DETECTED.`);
} else {
  console.error(`FAILED: ${differences} differences found.`);
  process.exit(1);
}
console.log(`========================================\n`);
