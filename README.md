# RYU — VSL Funnel Lifecycle & Automations

Internal documentation system mapping the RYU VSL (24/7 evergreen call-booking) funnel: every CRM lifecycle stage a contact moves through, the page journey the user actually sees, and the GoHighLevel automation behind each transition.

## View it live

Once GitHub Pages is enabled (Settings → Pages → Source: `main` branch, `/ (root)`), the site will be available at:

```
https://<your-username>.github.io/<repo-name>/
```

## Structure

```
index.html              ← funnel overview: page journey + 7 lifecycle stages + linked automations
assets/
  styles.css             ← shared styles
  tree-builder.js         ← reusable JS engine for rendering branching decision trees
  images/                 ← page-journey screenshots
workflows/
  crm-update-mql-dql.html         ← Stage 02/03 — MQL / Marketing Disqualified Lead
  lead-capture-followup-primary.html  ← Stage 02 — 3-email nurture sequence
  discovery-scheduled.html        ← Stage 04 — Opportunity creation on call booking
```

Each workflow page follows the same structure: **Purpose** (plain-language summary) → **Simplified overview** (ASCII flow) → **Full branching tree** (every trigger, condition, action, and end state from the original GoHighLevel automation, with expandable parameter detail).

## Important

This is a **multi-file static site** — every page depends on `assets/styles.css` and `assets/tree-builder.js` via relative paths (`../assets/...`). Do not move or rename files without updating those references. Do not upload a single `.html` file on its own; the whole folder structure must be pushed together or pages will render unstyled / broken.

## Adding a new workflow

1. Create a new file in `workflows/` (e.g. `workflows/my-new-automation.html`), copying the structure of an existing workflow page.
2. Build its tree using the shared `WorkflowTree` helpers (`T.trigger()`, `T.action()`, `T.gate()`, `T.wait()`, `T.end()`) from `assets/tree-builder.js`.
3. Link it from the relevant stage card in `index.html`.
