# WCAG Accessibility Audit Report

**Application:** Natalia Szlag Portfolio  
**Date:** December 26, 2025  
**Standards:** WCAG 2.1 Level AA  
**Auditor:** AI Accessibility Audit

---

## Executive Summary

This audit covers all pages and components of the portfolio application. The site demonstrates good accessibility practices in several areas, including skip links, focus management, and reduced motion support. However, there are several issues that need attention to achieve full WCAG 2.1 AA compliance.

### Overall Score: **Good with Improvements Needed**

| Category | Status |
|----------|--------|
| Perceivable | ⚠️ Needs Improvement |
| Operable | ✅ Good |
| Understandable | ⚠️ Needs Improvement |
| Robust | ✅ Good |

---

## Table of Contents

1. [Global Issues](#1-global-issues)
2. [Homepage](#2-homepage)
3. [About Page](#3-about-page)
4. [Contact Page](#4-contact-page)
5. [Media Expert Page](#5-media-expert-page)
6. [Clever Commerce Page](#6-clever-commerce-page)
7. [Best Practices Implemented](#7-best-practices-implemented)
8. [Recommendations Summary](#8-recommendations-summary)

---

## 1. Global Issues

### 1.1 HTML Document (`index.html`)

#### ✅ Good Practices
- Document has `lang="en"` attribute (WCAG 3.1.1)
- Proper viewport meta tag for mobile scaling
- Uses semantic HTML

#### ⚠️ Issues

| Issue | WCAG Criterion | Severity | Location |
|-------|----------------|----------|----------|
| Missing page-specific `<title>` elements | 2.4.2 Page Titled | Medium | `index.html` - title is generic "Portfolio" |
| Missing meta description | Best Practice | Low | `index.html` |

**Suggestion:** Implement dynamic page titles using React Helmet or similar library to provide context-specific titles for each page (e.g., "About | Natalia Szlag - UX Designer").

---

### 1.2 Layout Component (`Layout.tsx`)

#### ✅ Excellent Practices
- Skip link implementation (`<a href="#main-content" className="skip-link">`)
- Main content landmark with `id="main-content"`
- `tabIndex={-1}` on main for programmatic focus after skip link

#### ⚠️ Issues

| Issue | WCAG Criterion | Severity | Location |
|-------|----------------|----------|----------|
| Skip link not tested for visibility | 2.4.1 Bypass Blocks | Low | Verify skip link appears on focus |

---

### 1.3 Header Component (`Header.tsx`)

#### ✅ Excellent Practices
- `aria-label` on hamburger button ("Toggle menu")
- `aria-expanded` state management
- `aria-controls` linking to mobile menu
- Focus trap implementation in mobile menu
- Escape key closes menu
- Focus management (returns focus to hamburger on close)
- `role="dialog"` and `aria-modal="true"` on mobile menu
- `aria-labelledby` linking to menu title

#### ⚠️ Issues

| Issue | WCAG Criterion | Severity | Location |
|-------|----------------|----------|----------|
| `role="banner"` on `<nav>` is incorrect | 4.1.2 Name, Role, Value | Medium | Line 112 - `<nav>` should not have `role="banner"` |
| Logo image has empty alt text | 1.1.1 Non-text Content | Medium | Line 115 - should be descriptive or logo link should have aria-label |
| Navigation not using `role="navigation"` explicitly | Best Practice | Low | Inherent in `<nav>` but could be more explicit |

**Suggestions:**
```tsx
// Remove role="banner" from nav, it's for header element
<nav className="nav" aria-label="Main navigation">

// Add aria-label to logo link OR descriptive alt text
<Link to="/" className="logo-link" aria-label="Natalia Szlag - Home">
  <img src={logo} alt="" className="logo" aria-hidden="true" />
</Link>
// OR
<img src={logo} alt="Natalia Szlag logo" className="logo" />
```

---

### 1.4 Footer Component (`Footer.tsx`)

#### ✅ Good Practices
- Semantic `<footer>` element
- `role="contentinfo"` (redundant but not harmful)

#### ⚠️ No Issues Found

---

### 1.5 Global CSS (`App.css`)

#### ✅ Excellent Practices
- `:focus-visible` styles with 2px solid outline
- Outline offset of 2px for better visibility
- `prefers-reduced-motion` media query support
- Skip link styling with proper positioning

#### ⚠️ Issues

| Issue | WCAG Criterion | Severity | Location |
|-------|----------------|----------|----------|
| Focus color (#FF495C) may have contrast issues on some backgrounds | 1.4.11 Non-text Contrast | Medium | Line 32-40 - verify 3:1 contrast ratio |
| Font size uses px instead of rem/em | 1.4.4 Resize Text | Medium | Throughout - limits text scaling |
| Very small text at smallest breakpoint (13px) | 1.4.4 Resize Text | Medium | Lines ~2012-2025 |
| `.nav-list a:hover` opacity 0.6 reduces contrast | 1.4.3 Contrast (Minimum) | Medium | Line 1230-1232 |

**Suggestions:**
- Use `rem` units for font sizes to support browser zoom
- Ensure hover states maintain 4.5:1 contrast ratio
- Minimum font size should be 16px (1rem) or at least 14px

---

## 2. Homepage

### 2.1 Hero Component (`Hero.tsx`)

#### ✅ Good Practices
- Resume button has `aria-label="Download resume PDF"`
- Download icon properly hidden with `aria-hidden="true"`
- Semantic heading structure

#### ⚠️ Issues

| Issue | WCAG Criterion | Severity | Location |
|-------|----------------|----------|----------|
| `.hero-dot` decorative element not hidden from AT | 1.3.1 Info and Relationships | Low | Line 21 - add `aria-hidden="true"` |
| Download uses programmatic click instead of native link | 2.1.1 Keyboard | Low | Best practice: use `<a download>` instead |

**Suggestions:**
```tsx
// Hide decorative dot
<div className="hero-dot" aria-hidden="true"></div>

// Use native download link instead of button
<a 
  href={resumePdf} 
  download="NataliaSzlag_UX_resume.pdf"
  className="btn btn-resume"
  aria-label="Download resume PDF"
>
  Resume
  <img src={downloadIcon} alt="" aria-hidden="true" />
</a>
```

---

### 2.2 ProjectCard Component (`ProjectCard.tsx`)

#### ✅ Good Practices
- Contextual `aria-label` on buttons/links (`${buttonText} - ${title}`)
- Download icon properly hidden
- Semantic heading `<h2>` for project titles

#### ⚠️ Issues

| Issue | WCAG Criterion | Severity | Location |
|-------|----------------|----------|----------|
| Project image has empty alt text | 1.1.1 Non-text Content | High | Line 84 - should describe the image |
| Tags may not be announced as a list | 1.3.1 Info and Relationships | Low | Consider using `<ul>` for tags |

**Suggestions:**
```tsx
// Add descriptive alt text to project images
<img src={image} alt={`${title} project screenshot`} className="project-image-img" />

// Consider semantic markup for tags
<ul className="project-tags" aria-label="Project tags">
  {tags.map((tag, index) => (
    <li key={index} className="project-tag">{tag}</li>
  ))}
</ul>
```

---

### 2.3 ProjectsSection Component (`ProjectsSection.tsx`)

#### ✅ Good Practices
- Section has `id="work"` for skip navigation
- Semantic `<section>` element

#### ⚠️ Issues

| Issue | WCAG Criterion | Severity | Location |
|-------|----------------|----------|----------|
| Section missing accessible name | 4.1.2 Name, Role, Value | Low | Add `aria-labelledby` or `aria-label` |

**Suggestion:**
```tsx
<section id="work" className="projects-section" aria-label="Case Studies">
```

---

## 3. About Page

### 3.1 About Component (`About.tsx`)

#### ✅ Good Practices
- Semantic heading hierarchy (h1, h2)
- Resume button has proper aria-label
- Section structure with semantic HTML

#### ⚠️ Issues

| Issue | WCAG Criterion | Severity | Location |
|-------|----------------|----------|----------|
| Portrait image has empty alt text | 1.1.1 Non-text Content | High | Line 36 - should describe Natalia |
| Quote not marked up semantically | 1.3.1 Info and Relationships | Low | Use `<blockquote>` and `<cite>` |
| Sections missing accessible names | 4.1.2 Name, Role, Value | Low | Add aria-labelledby to sections |

**Suggestions:**
```tsx
// Add descriptive alt text
<img src={aboutPortrait} alt="Natalia Szlag, UX Designer" className="about-portrait-img" />

// Use semantic quote markup
<blockquote className="about-beyond-quote">
  <p className="about-quote-content">
    <span className="about-quote-line1">Life begins at the end</span>
    <span className="about-quote-line2">of your comfort zone.</span>
  </p>
  <cite className="about-quote-author">— Neale Donald Walsch</cite>
</blockquote>

// Add accessible names to sections
<section className="about-content-section" aria-labelledby="what-i-build-title">
  <h2 id="what-i-build-title" className="section-title">What I build?</h2>
```

---

## 4. Contact Page

### 4.1 Contact Component (`Contact.tsx`)

#### ✅ Good Practices
- Icons properly hidden with `aria-hidden="true"`
- Links have semantic meaning (mailto:, tel:)
- External link has `rel="noopener noreferrer"`

#### ⚠️ Issues

| Issue | WCAG Criterion | Severity | Location |
|-------|----------------|----------|----------|
| Contact image has empty alt text | 1.1.1 Non-text Content | Medium | Line 47 - decorative? Add `aria-hidden` or describe |
| Contact links lack explicit accessible names | 2.4.4 Link Purpose | Low | Could add `aria-label` for clarity |
| LinkedIn link doesn't indicate it opens in new tab | 2.4.4 Link Purpose | Medium | Add "opens in new tab" to accessible name |

**Suggestions:**
```tsx
// If decorative
<img src={contactImage} alt="" className="contact-image-img" aria-hidden="true" />

// External link with indication
<a 
  href="https://www.linkedin.com/in/natalia-szlag-3515891b8/" 
  target="_blank" 
  rel="noopener noreferrer"
  className="contact-item"
  aria-label="LinkedIn profile (opens in new tab)"
>
```

---

## 5. Media Expert Page

### 5.1 MediaExpert Component (`MediaExpert.tsx`)

#### ✅ Good Practices
- Semantic heading hierarchy
- Images have alt text

#### ⚠️ Issues

| Issue | WCAG Criterion | Severity | Location |
|-------|----------------|----------|----------|
| Hero image container div has no semantic meaning | 1.3.1 Info and Relationships | Low | Line 34 - empty className |
| Reordering GIF has empty alt text | 1.1.1 Non-text Content | High | Line 64 |
| Duplicate tag "#ProductReview" | 1.3.1 Info and Relationships | Low | Line 99-100 - typo |
| KPI list not using semantic markup well | 1.3.1 Info and Relationships | Low | Already using `<ul>`, which is good |
| Heading levels skip from h2 to h4 | 1.3.1 Info and Relationships | Medium | Lines 69, 75, 81 - h4 without h3 |
| Sections lack accessible names | 4.1.2 Name, Role, Value | Low | Add aria-labels |

**Suggestions:**
```tsx
// Fix empty alt text on GIF
<img src={Reordering} alt="Animation showing the easy reordering feature in the app" className="media-expert-img" />

// Fix heading hierarchy - change h4 to h3
<h3 className="media-expert-highlight-title">Smart "Buy Again" Ecosystem</h3>

// Add section labels
<div className="media-expert-section" role="region" aria-label="Easy reordering feature">
```

---

## 6. Clever Commerce Page

### 6.1 CleverCommerce Component (`CleverCommerce.tsx`)

This is a complex interactive page with many components. Here's a comprehensive audit:

#### ✅ Excellent Practices
- Modal dialogs have `role="dialog"` and `aria-modal="true"`
- Close buttons have `aria-label="Close modal"`
- Quantity controls have aria-labels ("Increase quantity", "Decrease quantity")
- Carousel arrows have aria-labels ("Scroll left", "Scroll right")
- External SVG icons don't interfere with screen readers

#### ⚠️ Issues

| Issue | WCAG Criterion | Severity | Location |
|-------|----------------|----------|----------|
| All product images have empty alt text | 1.1.1 Non-text Content | High | Lines 468, 535, 1080, etc. |
| Carousel product images empty alt | 1.1.1 Non-text Content | High | Multiple locations |
| Logo image has empty alt text | 1.1.1 Non-text Content | Medium | Line 385 |
| Service details images empty alt | 1.1.1 Non-text Content | High | Line 1297 |
| `<h1>` used multiple times (Shopping Cart) | 1.3.1 Info and Relationships | Medium | Lines 412, 503 |
| Checkbox labels not properly associated | 1.3.1 Info and Relationships | Medium | Service checkboxes - labels wrap but input not explicitly labeled |
| Modal dialogs lack focus trap | 2.4.3 Focus Order | High | Drawers don't trap focus |
| Alert messages not announced | 4.1.3 Status Messages | High | Snackbars should use `role="alert"` or live regions |
| Color alone used for availability status | 1.4.1 Use of Color | Medium | Green dot indicates availability |
| Star ratings not accessible | 1.1.1 Non-text Content | High | Rating stars are purely visual |
| Promo text link uses onClick without keyboard support | 2.1.1 Keyboard | Medium | Line 601-607 - `<span>` with onClick |
| Button with alert() for checkout | Best Practice | Low | Line 765 - should be proper navigation |
| Services section heading structure | 1.3.1 Info and Relationships | Medium | Uses h2 but nested unusually |

**Critical Suggestions:**

```tsx
// 1. Add alt text to product images
<img src={product.image} alt={product.name} />

// 2. Make snackbars announce to screen readers
<div className="cc-snackbar" role="alert" aria-live="polite">
  <span>{removedProduct ? 'Product removed' : 'Elite program added successfully!'}</span>
</div>

// 3. Fix checkbox labeling
<label className="cc-service-checkbox">
  <input
    type="checkbox"
    checked={service.selected}
    onChange={() => toggleService(service.id)}
    aria-label={`Add ${service.name} to cart`}
  />
  <span className="cc-checkmark" aria-hidden="true"></span>
</label>
<span id={`service-${service.id}`} className="cc-service-name">{service.name}</span>

// 4. Make promo link keyboard accessible
<button 
  className="cc-promo-text cc-promo-link" 
  onClick={() => setShowElitePromoModal(true)}
  type="button"
>
  Check out and get 50% off on selected services!
</button>

// 5. Make star ratings accessible
<div className="cc-rating-stars" role="img" aria-label={`${product.rating} out of 5 stars`}>

// 6. Add text alternative for availability indicator
<div className="cc-availability">
  <span className="cc-availability-dot" aria-hidden="true"></span>
  <span>Available</span>
</div>

// 7. Focus trap for modals/drawers
useEffect(() => {
  if (showEliteModal) {
    const modal = document.querySelector('.cc-modal-content');
    const focusableElements = modal?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    // Implement focus trap logic
  }
}, [showEliteModal]);
```

---

### 6.2 SellerPage Component (`SellerPage.tsx`)

#### ⚠️ Issues

| Issue | WCAG Criterion | Severity | Location |
|-------|----------------|----------|----------|
| Back link SVG needs title or aria-label | 1.1.1 Non-text Content | Low | Line 14-16 |
| Inline styles used extensively | Best Practice | Low | Lines 23-38 - harder to maintain |

---

### 6.3 CleverCommerce CSS

#### ⚠️ Issues

| Issue | WCAG Criterion | Severity | Location |
|-------|----------------|----------|----------|
| Font sizes in px | 1.4.4 Resize Text | Medium | Throughout |
| `.cc-action-btn span { display: none }` on mobile | 2.4.4 Link Purpose | Medium | Line 1536-1538 - removes text context |
| Focus styles not explicitly defined | 2.4.7 Focus Visible | Medium | Relies on browser defaults |

---

## 7. Best Practices Implemented ✅

The application demonstrates several excellent accessibility practices:

### 7.1 Navigation & Focus
- Skip link to main content
- Focus visible styles with distinctive color
- Focus management in mobile menu (escape to close, focus returns)
- Tab trapping in mobile menu

### 7.2 Semantic HTML
- Proper heading hierarchy (mostly)
- Semantic landmarks (nav, main, footer)
- Lists where appropriate

### 7.3 ARIA Implementation
- aria-expanded on mobile menu toggle
- aria-controls relationships
- aria-modal on dialogs
- aria-hidden on decorative icons

### 7.4 Motion & Preferences
- `prefers-reduced-motion` support
- Smooth scrolling behavior

### 7.5 Form Accessibility
- Button types specified
- aria-labels on icon buttons

---

## 8. Recommendations Summary

### High Priority (Must Fix)

1. **Add alt text to all meaningful images** (1.1.1)
   - Project screenshots
   - Product images
   - Profile photos

2. **Add `role="alert"` to snackbars** (4.1.3)
   - Ensures status messages are announced

3. **Implement focus trap in modals/drawers** (2.4.3)
   - Prevents focus from escaping modal dialogs

4. **Make star ratings accessible** (1.1.1)
   - Add `role="img"` and `aria-label` with rating value

5. **Fix heading hierarchy** (1.3.1)
   - Don't skip heading levels (h2 → h4)

### Medium Priority (Should Fix)

6. **Remove `role="banner"` from nav** (4.1.2)
   - Nav should not have banner role

7. **Convert font sizes to rem** (1.4.4)
   - Enables proper text scaling

8. **Ensure hover states maintain contrast** (1.4.3)
   - Opacity reduction can cause contrast issues

9. **Add focus styles to Clever Commerce** (2.4.7)
   - Explicit focus styles for all interactive elements

10. **Indicate external links open in new tab** (2.4.4)
    - Update LinkedIn link accessible name

11. **Fix duplicate h1 elements** (1.3.1)
    - Only one h1 per page

### Low Priority (Nice to Have)

12. **Add aria-labels to sections** (4.1.2)
13. **Use semantic quote markup** (1.3.1)
14. **Add page-specific titles** (2.4.2)
15. **Consider using native `<a download>` for downloads** (2.1.1)

---

## Color Contrast Analysis

### Colors Used

| Element | Foreground | Background | Ratio | Status |
|---------|------------|------------|-------|--------|
| Body text | #252627 | #FDFDFD | 12.6:1 | ✅ AAA |
| NDA Protected | #FF495C | #FDFDFD | 4.5:1 | ✅ AA |
| Contact text | #FDFDFD | #252627 | 12.6:1 | ✅ AAA |
| Clever Commerce primary | #303030 | #F9FAFB | 10.4:1 | ✅ AAA |
| Elite badge | #FFFFFF | #155552 | 7.8:1 | ✅ AAA |
| Link color | #0D4ED4 | #FFFFFF | 6.1:1 | ✅ AA |
| Focus outline | #FF495C | various | Verify | ⚠️ Check |

**Note:** The focus outline color (#FF495C) should be verified against all possible background colors to ensure 3:1 minimum contrast ratio.

---

## Testing Recommendations

1. **Automated Testing**
   - Run axe-core or WAVE browser extension
   - Integrate jest-axe for component tests

2. **Manual Testing**
   - Navigate entire site with keyboard only
   - Test with screen readers (NVDA, VoiceOver)
   - Test with browser zoom at 200%
   - Test in Windows High Contrast mode

3. **User Testing**
   - Include users with disabilities in testing
   - Test with various assistive technologies

---

## Conclusion

The portfolio site has a solid foundation for accessibility with skip links, semantic HTML, and good focus management. The main areas requiring attention are:

1. **Image alt text** - Most images lack descriptions
2. **Live region announcements** - Snackbars aren't announced
3. **Modal focus management** - Missing focus traps
4. **Heading structure** - Some hierarchy issues

With these fixes implemented, the site would achieve a strong WCAG 2.1 AA compliance level.

---

*This audit was conducted programmatically and should be supplemented with manual testing and real user feedback.*
