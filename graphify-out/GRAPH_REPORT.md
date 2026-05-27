# Graph Report - src  (2026-05-24)

## Corpus Check
- Corpus is ~2,607 words - fits in a single context window. You may not need a graph.

## Summary
- 30 nodes · 31 edges · 9 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Homepage & Animations|Homepage & Animations]]
- [[_COMMUNITY_Device Mockup|Device Mockup]]

## God Nodes (most connected - your core abstractions)
1. `LaptopZoom()` - 3 edges
2. `computeInsets()` - 2 edges
3. `derive()` - 2 edges
4. `EASE` - 1 edges
5. `MORPH` - 1 edges
6. `MORPH_SLOW` - 1 edges
7. `ALL_NAV_LINKS` - 1 edges
8. `styles` - 1 edges
9. `DESKTOP_SCREEN` - 1 edges
10. `MOBILE_SCREEN` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (9 total, 0 thin omitted)

### Community 0 - "Homepage & Animations"
Cohesion: 0.22
Nodes (5): ALL_NAV_LINKS, EASE, MORPH, MORPH_SLOW, styles

### Community 1 - "Device Mockup"
Cohesion: 0.47
Nodes (5): computeInsets(), derive(), DESKTOP_SCREEN, LaptopZoom(), MOBILE_SCREEN

## Knowledge Gaps
- **7 isolated node(s):** `EASE`, `MORPH`, `MORPH_SLOW`, `ALL_NAV_LINKS`, `styles` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `EASE`, `MORPH`, `MORPH_SLOW` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._