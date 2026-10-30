# Luxe Beauty Website

## Student Information
- Name: Welhemina Malesa
- Student Number: ST10469381
- Module: WEDE5020 Web Development (Introduction)
- Assessment: POE Part 3
- Date: October 2026

## About This Project
This is a 5-page website for Luxe Beauty, a South African cosmetics and skincare brand. The site has Home, About, Products, Enquiry, and Contact pages.

Part 1 built the HTML. Part 2 added CSS and responsive design. Part 3 added JavaScript interactivity, SEO, form validation, and a live deployment.

## Live Website
https://luxebeautyy.netlify.app
## Pages
| Page | File | What's On It |
|------|------|---------------|
| Home | index.html | Hero banner, welcome, why choose, order steps, testimonial |
| About | about.html | Story, mission, vision, goals, values, founder, FAQ accordion |
| Products | products.html | Search bar, 4 product cards, comparison table |
| Enquiry | enquiry.html | Enquiry form with live validation and price estimate |
| Contact | contact.html | Two branches, hours, Leaflet map, contact form |

## Folder Structure
<img width="789" height="357" alt="image" src="https://github.com/user-attachments/assets/f350156b-b8d8-47b5-8e32-d1b2f3422d9c" />

## Part 3 Features

### Interactive Elements
- FAQ accordion on About page with 4 questions
- Lightbox for images on Home, About, and Products pages
- Hover effects on cards, buttons, table rows, and nav links

### Interactive Map
- Leaflet map on Contact page showing both branches
- Two markers with popups for Johannesburg and Pretoria
- Uses free OpenStreetMap tiles, no API key needed
- Replaced the broken iframe from Part 1 with a working map

### Dynamic Content and Search
- Search bar on Products page filters cards as you type
- Shows a "no results" message when nothing matches
- Works with keyboard and screen readers

### SEO
- Unique title tags on every page
- Meta descriptions on every page
- Meta keywords on every page
- Descriptive alt text on all images
- Semantic HTML5 tags throughout
- Skip links for keyboard users

### Enquiry Form
- Validates interest dropdown, shopping method, quantity, date, and message
- Shows clear error messages under each invalid field
- On valid submit, calculates an estimated price based on category and quantity
- Shows a success message with the estimate
- Clears the form after a successful submit

### Contact Form
- Validates name, email, phone, message type, subject, and message
- Shows clear error messages under each invalid field
- On valid submit, builds a mailto link with all details pre-filled
- Opens the user's email app automatically
- Shows a success message with a backup link

## Responsive Design
The site works on desktop, tablet, and mobile.

| Breakpoint | Screen Size | Main Changes |
|------------|-------------|--------------|
| Desktop | Above 768px | Multi-column grid, full horizontal nav |
| Tablet | 768px and below | Nav wraps, cards shrink, grid adjusts |
| Mobile | 480px and below | Nav stacks, single column, images scale down |
| Small phones | 360px and below | Smaller headings, tighter spacing |

Images use max-width 100% with object-fit cover so they never overflow. Headings use clamp() so text scales smoothly.

## Changelog

### Part 1
- Built 5 HTML pages with semantic tags
- Added content, navigation, tables, forms, and images
- Added comments explaining each section

### Part 2
- Created css/style.css and linked to all pages
- Added Google Fonts, CSS reset, and base styles
- Styled header, nav, hero, cards, tables, forms, footer
- Added hover and focus states
- Added box shadows
- Added media queries at 768px and 480px
- Made layout, typography, nav, and images responsive

### Part 2 Feedback Fixes
Lecturer said default styles and responsive pieces could be improved. Here is what I fixed:

- Default styles: cleaned up base font, spacing, and colour values so nothing is inconsistent between pages
- Responsive layout: changed product grid to auto-fit minmax so it adapts to any width
- Responsive typography: switched headings to clamp() so text scales smoothly instead of jumping
- Responsive navigation: nav now stacks vertically on mobile with full-width tap targets
- Responsive images: added max-width 100%, object-fit cover, and fixed heights on product images so they never stretch or overflow
- Added a 360px breakpoint for extra small phones
- Made the lightbox fit small screens properly

### Part 3
- Added meta description and keywords to all 5 pages
- Rewrote all title tags to be unique and SEO-friendly
- Added descriptive alt text to every image
- Added skip links on all pages for keyboard users
- Added FAQ accordion on About page with 4 questions
- Added lightbox for hero and product images
- Added search bar on Products page with live filtering
- Added Leaflet interactive map on Contact page with two branch markers
- Removed the broken iframe map from Part 1
- Added full enquiry form validation with error messages
- Added dynamic price estimate after valid enquiry submit
- Added contact form on Contact page with full validation
- Added mailto email generation on contact form submit
- Added success messages that display after valid submits
- Added ARIA labels and keyboard support for accessibility
- Deployed the site on Netlify

## Deployment
The site is deployed on Netlify. The link is at the top of this file under "Live Website".



## References
W3Schools. (2026). HTML Tutorial. https://www.w3schools.com/html/ (Accessed: 20 October 2026)

W3Schools. (2026). CSS Tutorial. https://www.w3schools.com/css/ (Accessed: 20 October 2026)

W3Schools. (2026). CSS Media Queries. https://www.w3schools.com/css/css_rwd_mediaqueries.asp (Accessed: 20 October 2026)

W3Schools. (2026). CSS Flexbox. https://www.w3schools.com/css/css3_flexbox.asp (Accessed: 20 October 2026)

W3Schools. (2026). CSS Grid. https://www.w3schools.com/css/css_grid.asp (Accessed: 20 October 2026)

W3Schools. (2026). JavaScript Form Validation. https://www.w3schools.com/js/js_validation.asp (Accessed: 20 October 2026)

W3Schools. (2026). HTML Forms. https://www.w3schools.com/html/html_forms.asp (Accessed: 20 October 2026)

Mozilla Developer Network. (2026). CSS: Cascading Style Sheets. https://developer.mozilla.org/en-US/docs/Web/CSS (Accessed: 20 October 2026)

Mozilla Developer Network. (2026). Form Validation. https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation (Accessed: 20 October 2026)

Mozilla Developer Network. (2026). Responsive Design. https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design (Accessed: 20 October 2026)

Mozilla Developer Network. (2026). Document Object Model. https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model (Accessed: 20 October 2026)

Leaflet. (2026). Leaflet Documentation. https://leafletjs.com/reference.html (Accessed: 20 October 2026)

OpenStreetMap. (2026). OpenStreetMap. https://www.openstreetmap.org/ (Accessed: 20 October 2026)

Google Fonts. (2026). Playfair Display. https://fonts.google.com/specimen/Playfair+Display (Accessed: 20 October 2026)

Google Fonts. (2026). Open Sans. https://fonts.google.com/specimen/Open+Sans (Accessed: 20 October 2026)

Netlify. (2026). Netlify Documentation. https://docs.netlify.com/ (Accessed: 20 October 2026)

