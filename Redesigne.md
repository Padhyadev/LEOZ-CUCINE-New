Update the existing React project to match the approved Leoz Cucine website direction.
Do not rebuild the project from scratch and do not replace the existing React architecture unless technically necessary.

The website is for:

LEOZ CUCINE
Premium Kitchens & Wardrobes

The client wants the website to feel:

Premium
Modern
Architectural
Clean
Minimal
Sophisticated
Natural
Not overly descriptive
Not obviously AI-generated

The website should use strong imagery, whitespace and typography instead of large amounts of text.

1. FIRST: INSPECT THE EXISTING PROJECT

Before making changes:

Inspect the complete React project structure.
Identify:
React version
Vite / CRA / Next.js setup
Routing solution
Existing components
Existing pages
Existing CSS / SCSS / Tailwind setup
Existing assets
Existing image handling
Existing header/navigation
Existing footer
Existing responsive behaviour
Reuse existing components and styles where practical.
Do not remove working functionality unnecessarily.
Do not introduce a new UI framework unless the project already uses one.
Do not rewrite the entire application simply to implement the new design.
Preserve the existing build and deployment setup.
Check the project for existing reusable sections before creating new ones.
2. WEBSITE SCOPE

The website should focus ONLY on:

Kitchens
Wardrobes

Do not introduce unrelated interior products or services.

Do not add content for:

Living rooms
Bedrooms as a separate product
Bathrooms
Offices
Furniture
Home decor
Other interior products

Bedrooms may only be referenced in relation to wardrobes where appropriate.

3. REQUIRED PAGES

Implement/update these pages:

Home
About
Kitchens
Wardrobes
Projects
Contact

If these routes already exist, update them rather than creating duplicate routes.

Recommended routes:

/
 /about
 /kitchens
 /wardrobes
 /projects
 /contact
4. GLOBAL DESIGN DIRECTION

The website should look like a premium interior-design / kitchen studio website.

Prioritise:

Large photography
Large elegant typography
Generous whitespace
Short copy
Strong visual hierarchy
Subtle animations
Clean grids
Minimal borders
Neutral colours
Premium spacing

Avoid:

Excessive text
Large blocks of paragraphs
Too many cards
Excessive gradients
Bright colours
Heavy shadows
Generic corporate layouts
Excessive rounded cards
Excessive animations
AI-sounding marketing language

The website should feel visually premium without relying on words such as:

Luxury
Exquisite
Unparalleled
Revolutionary
Transform
Redefining
Bespoke excellence
Unmatched craftsmanship

Use these types of words sparingly or avoid them entirely.

5. TYPOGRAPHY

Use:

Heading Font
Cormorant Garamond

Weights:

400
500
600

Primary usage:

Hero headings
Page headings
Section headings
Card headings
Body Font
Manrope

Weights:

400
500
600

Primary usage:

Navigation
Body copy
Labels
Buttons
Forms
Footer
Small headings

If Google Fonts are appropriate for the existing project, import:

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Manrope:wght@400;500;600&display=swap');

If the project already has an equivalent font-loading mechanism, use that instead.

6. GLOBAL COLOUR PALETTE

Use the following variables.

:root {
    --font-heading: 'Cormorant Garamond', serif;
    --font-body: 'Manrope', sans-serif;

    --color-heading: #181818;
    --color-body: #595959;
    --color-accent: #B69A6B;

    --color-white: #FFFFFF;
    --color-light: #F7F5F1;

    --color-border: #E6E2DC;

    --color-dark-bg: #181818;
}
Colour usage

Primary heading:

#181818

Body text:

#595959

Accent / champagne:

#B69A6B

Warm background:

#F7F5F1

Dark sections:

#181818

White:

#FFFFFF

Use the accent colour sparingly.

Do not make the website predominantly gold.

7. GLOBAL TYPOGRAPHY CLASSES

Create reusable typography classes if the current project architecture allows it.

.section-label {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--color-accent);
}

.hero-title {
    font-family: var(--font-heading);
    font-size: clamp(48px, 5vw, 72px);
    font-weight: 500;
    line-height: 1.03;
    color: var(--color-heading);
}

.page-title {
    font-family: var(--font-heading);
    font-size: clamp(44px, 4.5vw, 62px);
    font-weight: 500;
    line-height: 1.05;
    color: var(--color-heading);
}

.section-title {
    font-family: var(--font-heading);
    font-size: clamp(36px, 3.5vw, 48px);
    font-weight: 500;
    line-height: 1.1;
    color: var(--color-heading);
}

.sub-title {
    font-family: var(--font-heading);
    font-size: clamp(24px, 2vw, 30px);
    font-weight: 500;
    line-height: 1.2;
    color: var(--color-heading);
}

.description {
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 400;
    line-height: 1.75;
    color: var(--color-body);
    max-width: 620px;
}

.small-description {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 400;
    line-height: 1.65;
    color: var(--color-body);
}

.hero-description {
    font-family: var(--font-body);
    font-size: 17px;
    font-weight: 400;
    line-height: 1.7;
    max-width: 620px;
}

.text-white {
    color: #FFFFFF !important;
}

.text-light {
    color: #EFEFEF !important;
}
8. RESPONSIVE TYPOGRAPHY

Desktop:

Hero: 48–72px
Page Heading: 44–62px
Section Heading: 36–48px
Card Heading: 24–30px
Label: 12px
Description: 16px
Small Description: 14px

Mobile:

Hero: 39–44px
Page Heading: 36–40px
Section Heading: 31–34px
Card Heading: 23–25px
Label: 11px
Description: 15px
Small Description: 14px

Use clamp() where practical rather than creating many breakpoint-specific typography rules.

9. COMMON BUTTON STYLE

Use a minimal premium button.

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-height: 48px;
    padding: 12px 26px;

    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.5px;

    transition: all 0.3s ease;
}

Dark button:

.btn-dark {
    background: #181818;
    color: #FFFFFF;
    border: 1px solid #181818;
}

Light button:

.btn-light {
    background: #FFFFFF;
    color: #181818;
    border: 1px solid #FFFFFF;
}

Outline:

.btn-outline {
    background: transparent;
    color: #181818;
    border: 1px solid #181818;
}

Do not make buttons excessively rounded.

10. HOME PAGE
Section 1 — Hero

Use a large full-width kitchen image.

Content:

.section-label
KITCHENS & WARDROBES
.hero-title
Designed for the Way You Live.
.hero-description
Premium kitchens and wardrobes, thoughtfully designed for modern homes.

Buttons:

Explore Kitchens
Explore Wardrobes

Hero text should be white over the image.

Add a subtle dark image overlay to maintain readability.

Do not use a large amount of text in the hero.

11. HOME — INTRODUCTION

Use an image + text two-column layout.

.section-label
LEOZ CUCINE
.section-title
Designed Around Your Space.
.description
We create kitchens and wardrobes with clean design, thoughtful planning and refined finishes.

Link:

Discover Our Story →

Keep this section spacious.

12. HOME — KITCHENS

Use a large kitchen image.

.section-label
KITCHENS
.section-title
Beautifully Planned. Effortlessly Functional.
.description
Kitchens designed around the way you cook, gather and live.

Link:

Explore Kitchens →
13. HOME — WARDROBES

Use a strong wardrobe image.

.section-label
WARDROBES
.section-title
Storage, Beautifully Considered.
.description
Personalised wardrobes created around your space and everyday needs.

Link:

Explore Wardrobes →
14. HOME — COLLECTIONS
.section-label
OUR COLLECTIONS
.section-title
Spaces Made Personal.

Use image-based cards.

Card 1

.sub-title

Contemporary Kitchens

.small-description

Clean forms, refined finishes and intelligent storage.
Card 2
Island Kitchens
A central space made for cooking and conversation.
Card 3
Sliding Wardrobes
Elegant storage designed to make better use of space.
Card 4
Walk-In Wardrobes
A personal dressing space designed around you.

Keep descriptions to one sentence.

15. HOME — WHY LEOZ
.section-label
WHY LEOZ CUCINE
.section-title
Details Make the Difference.

Create four simple feature items.

Personalised Design
Made specifically for your space.
Thoughtful Storage
Every detail has a purpose.
Refined Finishes
Materials selected with care.
Professional Installation
Completed with attention to detail.

Avoid oversized iconography.

16. HOME — PROJECTS
.section-label
SELECTED PROJECTS
.section-title
Spaces That Speak for Themselves.
.description
A selection of kitchens and wardrobes designed for modern homes.

Project cards should primarily be visual.

Example:

The Walnut Kitchen
KITCHEN
The Glass Wardrobe
WARDROBE
Warm Minimal Kitchen
KITCHEN

Do not add long project descriptions.

17. HOME — PROCESS
.section-label
OUR PROCESS
.section-title
From Idea to Installation.

Four steps:

01 — Consult
Understand your space and requirements.
02 — Design
Plan the layout, finishes and details.
03 — Create
Bring the approved design to life.
04 — Install
Complete every detail with care.
18. HOME — FINAL CTA

Use a dark background.

.section-title .text-white
Have a Space in Mind?
.description .text-light
Let’s design a kitchen or wardrobe that feels completely yours.

Button:

Book a Consultation
19. ABOUT PAGE
Hero
.section-label .text-white
ABOUT LEOZ CUCINE
.page-title .text-white
Good Design Begins with Understanding the Space.
About
.section-label
OUR STORY
.section-title
Kitchens & Wardrobes, Made Personal.
.description
Leoz Cucine creates thoughtfully designed kitchens and wardrobes for contemporary homes.

Our approach is simple — understand the space, plan it well and finish every detail with care.

Do not make this section longer.

Philosophy
.section-label
OUR PHILOSOPHY
.section-title
Less Noise. Better Design.
.description
Clean forms, useful storage and carefully selected materials create spaces that remain relevant for years.
Approach
.section-label
OUR APPROACH
.section-title
Designed with Purpose.

Four items:

Understand
Your space and requirements come first.
Plan
Every layout is carefully considered.
Select
Materials and finishes are chosen together.
Deliver
Every detail is completed with care.
20. KITCHENS PAGE
Hero
.section-label .text-white
LEOZ KITCHENS
.page-title .text-white
Designed for Cooking. Made for Living.
.hero-description .text-light
Thoughtfully planned kitchens with refined finishes and intelligent storage.
Introduction
.section-title
Your Kitchen. Your Way.
.description
Every kitchen is designed around your space, lifestyle and daily routine.
Kitchen Collections
.section-label
OUR KITCHENS
.section-title
Explore Our Kitchens.

Use visual cards.

Contemporary
Minimal lines and sophisticated finishes.
Handleless
Clean, uninterrupted and modern.
Island
Designed for cooking, gathering and conversation.
L-Shaped
Practical planning for modern homes.
U-Shaped
More workspace. More storage.
Parallel
Efficient, organised and easy to use.
21. KITCHENS — FEATURES
.section-label
THOUGHTFULLY PLANNED
.section-title
Everything in Its Place.

Show these as visual feature labels:

Smart Storage
Integrated Appliances
Premium Hardware
Internal Organisers
Ambient Lighting
Refined Finishes

Do not add paragraphs under every feature.

22. KITCHENS — MATERIALS
.section-label
MATERIALS & FINISHES
.section-title
Materials That Define the Space.
.description
A considered mix of textures, tones and finishes makes every kitchen personal.
23. KITCHENS — CTA
.section-title .text-white
Ready to Plan Your Kitchen?

Button:

Book a Design Consultation
24. WARDROBES PAGE
Hero
.section-label .text-white
LEOZ WARDROBES
.page-title .text-white
Storage Made Beautiful.
.hero-description .text-light
Wardrobes designed around your room, belongings and personal style.
Introduction
.section-title
Made for What You Keep.
.description
From the outer finish to the smallest internal detail, every wardrobe is planned around you.
Collections
.section-label
OUR WARDROBES
.section-title
Explore Our Wardrobes.

Cards:

Hinged
Timeless design with complete access.
Sliding
Smart storage with a clean profile.
Glass
Light, elegant and contemporary.
Walk-In
A personal space for dressing and storage.
Floor-to-Ceiling
Maximum storage with a seamless look.
25. WARDROBES — INTERIOR
.section-label
DESIGNED INSIDE & OUT
.section-title
A Place for Everything.

Show visual labels only:

Hanging Space
Shelving
Drawers
Shoe Storage
Accessory Trays
Trouser Racks
Integrated Lighting

Do not create long descriptions for these.

26. WARDROBES — CTA
.section-title .text-white
Make Space for Everything.

Button:

Book a Wardrobe Consultation
27. PROJECTS PAGE
Hero
.section-label .text-white
OUR PROJECTS
.page-title .text-white
Designed. Detailed. Delivered.
.hero-description .text-light
A selection of kitchens and wardrobes created for modern homes.
Project Filters

Use:

All
Kitchens
Wardrobes
Project Cards

Use large images with minimal information.

Examples:

The Walnut Kitchen
KITCHEN
Glass & Oak Wardrobe
WARDROBE
Graphite Island Kitchen
KITCHEN
The Walk-In
WARDROBE
Warm Minimal Kitchen
KITCHEN
Full-Height Wardrobe
WARDROBE

If project detail pages already exist, preserve the existing architecture.

28. CONTACT PAGE
Hero
.section-label .text-white
CONTACT
.page-title .text-white
Let’s Talk About Your Space.
.hero-description .text-light
Planning a new kitchen or wardrobe? Speak with our team and explore what works best for your home.
Contact Details
.section-label
VISIT US
.section-title
Visit Leoz Cucine.

Use actual project/contact data if it already exists in the React project.

Do not invent:

Address
Phone number
Email
Working hours
Social media URLs

If these are missing, use clearly marked placeholders:

[Studio Address]
[Phone Number]
[Email Address]
[Working Hours]
29. CONTACT FORM
.section-label
GET IN TOUCH
.section-title
Start Your Project.

Fields:

Name
Phone
Email
Location
I'm Interested In
Message

Interest options:

Kitchen
Wardrobe
Kitchen & Wardrobe

Button:

Request a Consultation

Use the project's existing form functionality if available.

Do not break existing form submission behaviour.

30. HEADER / NAVIGATION

Navigation:

Home
About
Kitchens
Wardrobes
Projects
Contact

CTA:

Book a Consultation

Typography:

Font: Manrope
Size: 14px
Weight: 500
Letter spacing: 0.4px

The header should work correctly on:

Desktop
Tablet
Mobile

On mobile, use the existing mobile navigation implementation if one exists.

Do not create a second navigation system unnecessarily.

31. FOOTER

Brand:

LEOZ CUCINE

Subtitle:

Kitchens & Wardrobes

Short description:

Thoughtfully designed for modern living.

Links:

Home
About
Kitchens
Wardrobes
Projects
Contact

Contact information should use existing project data.

Do not invent missing business details.

32. RESPONSIVE LAYOUT

The website must be fully responsive.

Desktop:

1280px+

Tablet:

768px–1024px

Mobile:

Below 768px

Use CSS Grid/Flexbox appropriately.

Recommended behaviour:

Two-column sections

Desktop:

50% / 50%

Mobile:

100%
100%
Collection cards

Desktop:

2 columns

Mobile:

1 column
Feature grid

Desktop:

4 columns

Tablet:

2 columns

Mobile:

1 column
Project grid

Desktop:

3 columns

Tablet:

2 columns

Mobile:

1 column
Process

Desktop:

4 columns

Tablet:

2 columns

Mobile:

1 column
33. IMAGE DIRECTION

Use the existing project images if they are suitable.

If image assets are already available:

Reuse them.
Do not duplicate assets unnecessarily.
Maintain consistent aspect ratios.
Use object-fit: cover.
Add meaningful alt text.

Recommended visual direction:

Kitchens
Modern contemporary kitchens
Neutral materials
Wood + stone combinations
Matte finishes
Handleless cabinetry
Kitchen islands
Architectural lighting
Minimal styling
Wardrobes
Floor-to-ceiling wardrobes
Walk-in wardrobes
Glass wardrobes
Warm wood finishes
Neutral tones
Integrated lighting
Clean interiors

Do not use generic office/furniture imagery.

34. IMAGE OVERLAY

For text over hero images, use a subtle overlay.

Example:

.hero-section::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
}

Do not make the overlay excessively dark.

The image should remain visible.

35. SPACING

Use generous spacing.

Recommended desktop section padding:

90px–110px

Mobile:

60px–70px

Do not compress sections just to fit more content.

Premium visual design requires whitespace.

36. ANIMATIONS

Use subtle animations only.

Allowed:

Fade-in
Slight upward reveal
Image hover zoom
Button hover
Navigation hover

Keep transitions around:

transition: all 0.3s ease;

Avoid:

Excessive parallax
Large movement
Continuous animation
Distracting text effects
Long loading animations

Animations should never interfere with usability.

37. ACCESSIBILITY

Maintain:

Semantic HTML
Proper heading hierarchy
Accessible buttons
Accessible navigation
Keyboard focus states
Meaningful image alt text
Sufficient colour contrast
Form labels / accessible placeholders
Mobile usability

Do not use a heading purely for visual styling if the semantic hierarchy would become incorrect.

38. SEO BASICS

Update page metadata appropriately.

Suggested titles:

Home
Leoz Cucine | Premium Kitchens & Wardrobes
About
About Leoz Cucine | Kitchens & Wardrobes
Kitchens
Premium Kitchens | Leoz Cucine
Wardrobes
Premium Wardrobes | Leoz Cucine
Projects
Kitchen & Wardrobe Projects | Leoz Cucine
Contact
Contact Leoz Cucine | Kitchens & Wardrobes

Use appropriate meta descriptions based on the short website copy.

Do not keyword-stuff.

39. CODE QUALITY

While implementing:

Reuse existing components.
Create reusable components where repeated UI exists.
Avoid duplicated markup.
Avoid inline styles unless already used by the project architecture.
Keep responsive styles centralised.
Keep content easy to edit.
Preserve existing routing.
Preserve existing dependencies unless there is a technical reason to change them.
Do not introduce unnecessary packages.
Do not remove existing working functionality.

Recommended reusable components, if they do not already exist:

Header
Footer
HeroSection
SectionHeading
Button
ImageTextSection
CollectionCard
FeatureGrid
ProjectCard
ProcessSection
CTASection
ContactForm

Only create these if they fit the existing project architecture.

40. IMPORTANT IMPLEMENTATION RULE

Do not simply append the new content below the existing website.

The final result should be a coherent redesign/update of the existing pages.

Before finishing, check:

Every page visually belongs to the same website.
Typography is consistent.
Heading classes are reused.
Body classes are reused.
Colours are consistent.
Spacing is consistent.
Images are properly cropped.
Mobile layout works.
Header works on mobile.
Footer works on mobile.
Buttons are functional.
Existing routes work.
Existing forms still work.
No console errors.
No broken images.
No broken links.
No duplicate sections.
No placeholder content unless actual business information is unavailable.
41. FINAL VISUAL CHECK

After implementation, review the website as a premium kitchen/wardrobe brand.

The final visual hierarchy should generally be:

Large Image
      ↓
Small Label
      ↓
Large Elegant Heading
      ↓
Short Description
      ↓
Simple CTA

Do not turn sections into text-heavy marketing blocks.

The website should communicate through:

Photography
+
Typography
+
Whitespace
+
Materials
+
Short Copy

The final result should feel premium, restrained and natural, not like an AI-generated template.

42. FINAL VALIDATION

Run the project's normal validation/build commands.

At minimum:

npm run build

If the project has linting:

npm run lint

Resolve any errors introduced by the implementation.

Do not leave:

Build errors
TypeScript errors
ESLint errors caused by the changes
Missing imports
Broken routes
Broken assets
Console errors

Complete the implementation within the existing React project structure.