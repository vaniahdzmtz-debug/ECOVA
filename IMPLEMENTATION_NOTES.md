# Implementation Notes — Week 2

## How the real /research page differs from the mockup

The final page closely follows the original mockup, with a few real
differences that came from actually building and testing it:

- The dashboard stats (items tracked, competitors, substitutes) are
  calculated live from real Supabase data, instead of the static
  placeholder numbers shown in the mockup.
- The mockup's separate "Refine research topic" search box was dropped —
  the existing search and filter controls over the competitors table
  already serve that purpose, so a second input would have been
  redundant.
- Mobile-specific fixes were added after testing that weren't part of the
  original mockup: preventing iOS auto-zoom on the search input, and
  hiding the less critical "Category" column on narrow screens to keep
  the table readable on phones.
