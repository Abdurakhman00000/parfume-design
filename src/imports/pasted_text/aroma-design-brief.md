Stop what you're doing. 

The current design looks like a cheap template. 
I need you to think like a senior art director 
at a luxury brand agency — not like a template builder.

Study these references before designing:
- Byredo.com (minimal, dark, editorial)
- Aesop.com (warm cream, text-forward, confident)
- Maison Margiela fragrances site (unexpected layouts)
- Zara.com (fashion-forward, full bleed imagery)

Apply that same creative energy to AROMA.

---

HERO SECTION — rebuild from scratch:

LAYOUT: Full bleed. No split layout. No boxes.

The hero takes 100% viewport width and 95vh height.

Background treatment:
Use a dark, moody full-screen background.
Color: deep warm dark — #1A1714 (espresso black)
This is NOT a white page with a photo next to text.
This is a cinematic, immersive opening.

Right side (60% of width):
A large perfume bottle — dramatically lit
Positioned slightly off-center to the right
The bottle should appear to float
Subtle warm light source from top-right
The rest of the image fades into the dark background
(Use a perfume bottle image with transparent/dark background)

Left side — typography treatment:
Position text in the lower-left area (not center)
This creates tension and sophistication.

Small label top:
"НОВАЯ КОЛЛЕКЦИЯ 2024"
Inter 11px, letter-spacing 0.2em, color #8A8A7A
NO gold line decoration — just the text

Main headline — make it LARGE and BOLD:
"Парфюм,
который
говорит
за вас"
Inter 800 (Extra Bold), 72px
Color: #FAFAF8 (off-white on dark bg)
Line-height: 1.05
Each word/phrase on its own line
This creates vertical rhythm — like a fashion poster

Small body text below headline:
"Оригинальная парфюмерия.
Доставка по всему Кыргызстану."
Inter 400, 15px, #8A8A7A (muted, not white)
Line-height: 1.6
Margin-top: 20px

CTA buttons (margin-top: 36px):
Primary: "Смотреть коллекцию"
  Background: #FAFAF8 (white on dark — inverted)
  Text: #1A1714 (dark)
  Padding: 14px 28px, border-radius: 4px
  Inter 14px, 500
  NO border

Secondary: "Подобрать аромат"
  Background: transparent
  Border: 1px solid rgba(250,250,248,0.3)
  Text: #FAFAF8
  Same padding

Social proof (bottom-left, above fold line):
3 small avatar circles overlapping (32px each)
"+ 2 840 покупателей · ★ 4.9"
Inter 13px, #8A8A7A

Scroll indicator bottom-center:
Thin vertical line 40px + small circle
Animated: line grows downward, looping
Color: rgba(250,250,248,0.3)
"SCROLL" text below — Inter 10px, 0.15em tracking

---

NAVIGATION on dark hero:

Background: transparent (no white bar)
Logo "AROMA" — #FAFAF8
Nav links — #FAFAF8 at 70% opacity, hover 100%
Icons (search, cart) — #FAFAF8
"Заказать" button:
  Border: 1px solid rgba(250,250,248,0.4)
  Text: #FAFAF8
  Hover: background #FAFAF8, text #1A1714

When user scrolls past hero:
Nav becomes: white background, #1C1C1C text
Smooth transition 300ms

---

SECTION AFTER HERO — "Категории" redesign:

Current: cheap photo cards with pink/blue backgrounds. Delete this.

NEW APPROACH — horizontal editorial strips:

Section title:
"Коллекции" — Inter 700, 40px, #1C1C1C
Right side: "Смотреть все →" Inter 14px, #8A8A8A

Layout: 3 cards in a row, equal width, height 420px
Cards are tall, not square.

Each category card:
Background: dark, atmospheric
Border-radius: 10px
Overflow: hidden
Hover: scale 1.02, transition 300ms

Card has 2 layers:
Layer 1: moody background image (perfume, dark studio shot)
Layer 2: gradient overlay
  linear-gradient: 
  transparent top 40% → rgba(20,18,16,0.85) bottom

Card content (positioned at bottom of card):
  Category tag: "ЦВЕТОЧНЫЕ" — Inter 11px, 0.15em tracking, 
                #C9A96E (gold — used sparingly here)
  
  Name: "Нежность и свежесть"
    Inter 600, 22px, #FAFAF8
  
  Count: "47 ароматов"
    Inter 400, 13px, rgba(250,250,248,0.6)
  
  Arrow →: Inter 13px, #C9A96E
    Shows on hover with translateX animation

3 cards:
1. "ЦВЕТОЧНЫЕ · Нежность и свежесть · 47 ароматов"
2. "ВОСТОЧНЫЕ · Глубина и тайна · 38 ароматов"  
3. "СВЕЖИЕ · Лёгкость каждого дня · 52 аромата"

---

CATALOG GRID — make it editorial not marketplace:

Section header row:
  Left: "Все ароматы" Inter 600, 24px + 
        "200+ позиций" Inter 14px, #8A8A8A below
  Right: filter pills (horizontal) + sort (text only)

Product card — THE MOST IMPORTANT CHANGE:

Image treatment:
  Background: #F5F3EF (warm cream)
  Image fills the zone with padding: 16px
  Add subtle shadow under the bottle only:
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.08))
  This makes the bottle look like it's sitting in space
  NOT a flat product photo on gray background

The card should feel like:
  - A museum display case
  - Clean, considered, premium
  - The product is the hero

Remove ALL of these from cards:
  - Broken image placeholders
  - Blue/pink/orange backgrounds on any card
  - Generic stock photo collages
  - Multiple perfume bottles in one card image
  - Text overlaid directly on product image

Card content stays clean (same as before)
No changes to typography or layout

---

TRUST SECTION (add between catalog and footer):

Full-width strip, background #F5F3EF
4 columns, center-aligned content

Column 1: 
  Icon: thin line truck (24px, #1C1C1C)
  "Быстрая доставка"
  "1–2 дня по Бишкеку"

Column 2:
  Icon: shield check
  "100% оригинал"
  "Только сертифицированные бренды"

Column 3:
  Icon: rotate-left (return)
  "Возврат 14 дней"
  "Без вопросов"

Column 4:
  Icon: headphones
  "Поддержка"
  "Ежедневно 9:00–21:00"

All text: Inter. Title 14px 500 #1C1C1C. Sub 12px #8A8A8A
Dividers between columns: 1px #E2E0DC vertical

---

FOOTER:

Background: #1A1714 (dark — matches hero, bookends the page)
3 columns:

Left: 
  "AROMA" wordmark — #FAFAF8, Inter 600, 20px
  Tagline: "Парфюмерия для тех, кто знает"
  Inter 14px, #8A8A7A
  Social icons row (Instagram, WhatsApp)

Center:
  "Каталог" header + links below
  "Цветочные / Восточные / Свежие / Новинки"
  Inter 13px, #8A8A7A, hover #FAFAF8

Right:
  "Контакты"
  "+996 XXX XXX XXX"
  "г. Бишкек, Кыргызстан"
  WhatsApp button: outlined, white border

Bottom bar:
  "© 2024 AROMA. Все права защищены."
  Inter 12px, #4A4A42
  Thin divider above

---

IMPORTANT FINAL NOTES:

1. The hero MUST be dark (#1A1714 background)
   This is non-negotiable. It creates premium feel.
   White hero = cheap. Dark hero = luxury.

2. Category cards MUST have dark overlay on images.
   Not pink, not blue, not colorful backgrounds.
   All cards: dark atmospheric mood.

3. Product cards: cream (#F5F3EF) background only.
   Drop shadow on the bottle only, not on the card.

4. The page should feel like you're browsing 
   a premium brand — not a marketplace.

5. Navigation transitions from transparent+white text 
   to white background+dark text on scroll.

This is the final design direction. 
Do not simplify or genericize it.
Execute exactly as specified.