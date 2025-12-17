---
name: Functional Vocabulary Integration
overview: Transform ui-registry into a neutral, composable vocabulary of UI building blocks by normalizing existing blocks, integrating Shadcn patterns, adding core primitives, and updating documentation.
todos:
  - id: rename-blocks
    content: Rename 6 existing block files to neutral functional names (login-block → credential-form-block, etc.)
    status: completed
  - id: neutralize-blocks
    content: Add comprehensive prop interfaces to all 6 renamed blocks, replacing hardcoded strings while preserving all Tailwind/theme classes
    status: completed
  - id: fetch-shadcn
    content: Fetch actual Shadcn block code from their registry (sidebar, login/signup, OTP, calendar, featured)
    status: in_progress
  - id: create-shadcn-blocks
    content: Create 5 new functional blocks (sidebar-layout, auth-form-block, otp-field-group, calendar-widget, feature-section) preserving Shadcn JSX/Tailwind verbatim
    status: pending
  - id: create-primitives
    content: Create 8 new UI primitives (FormSection, FormFieldGroup, MetricCard, EntityCard, Sidebar, ActionGroup, MetadataList, SectionWrapper)
    status: pending
  - id: update-registry-json
    content: Update registry.json with all renamed blocks, new blocks, new primitives, and corrected metadata
    status: pending
  - id: update-docs
    content: Add Functional Vocabulary Mode section and category table to docs/registry-guidelines.md
    status: pending
  - id: validate-build
    content: Run registry:validate and registry:build, verify dist/ output, commit and tag v1.1-vocabulary
    status: pending
---

# Functional Vocabulary Integration Plan

## Overview

Transform the current `ui-registry` into a neutral, composable vocabulary of UI building blocks based on functional design patterns. All blocks will be theme-agnostic and configurable via props while preserving visual fidelity.

## Step 1: Rename & Neutralize Existing Blocks

### 1.1 File Renames

Rename block files in `src/blocks/`:

- `login-block.tsx` → `credential-form-block.tsx`
- `dashboard-card.tsx` → `metric-card.tsx`
- `payment-form.tsx` → `form-block.tsx`
- `profile-card.tsx` → `entity-card.tsx`
- `settings-form.tsx` → `sectioned-form-block.tsx`
- `complex-form.tsx` → `multi-field-form-block.tsx`

### 1.2 Neutralize Blocks with Comprehensive Props

For each renamed block, create comprehensive prop interfaces and replace all hardcoded strings:

**credential-form-block.tsx** (formerly login-block.tsx):

- Props: `title`, `emailLabel`, `emailPlaceholder`, `passwordLabel`, `passwordPlaceholder`, `submitLabel`, `onSubmit`
- Preserve: All Tailwind classes, Card structure, Input/Label/Button components

**metric-card.tsx** (formerly dashboard-card.tsx):

- Props: `title`, `description`, `value`, `valueUnit`, `delta`, `deltaLabel`, `primaryAction`, `secondaryAction`
- Preserve: Badge, Card structure, icon SVG, all styling

**form-block.tsx** (formerly payment-form.tsx):

- Props: `title`, `description`, `fields` (array with `id`, `label`, `placeholder`, `type`, `gridCols`), `actions` (array with `label`, `variant`, `onClick`)
- Preserve: Card, Separator, grid layout, all Tailwind classes

**entity-card.tsx** (formerly profile-card.tsx):

- Props: `name`, `role`, `status`, `avatar` (text or src), `metadata` (array of `{label, value}`), `actions` (array)
- Preserve: Badge, Separator, Card structure, avatar styling

**sectioned-form-block.tsx** (formerly settings-form.tsx):

- Props: `title`, `description`, `sections` (array with `fields`, `separator`), `actions`
- Preserve: Card, Separator, gap spacing, all form components

**multi-field-form-block.tsx** (formerly complex-form.tsx):

- Props: `title`, `description`, `fields` (with `gridCols`, `type`, `placeholder`, `label`), `checkbox` (label), `actions`
- Preserve: Grid layout, Separator, all form styling

**Key Rule**: Never modify Tailwind classes, theme tokens (`--radius`, `--primary`, `bg-card`, `text-muted-foreground`), or component structure. Only replace literal strings with typed props.

### 1.3 Update registry.json

Update entries in `registry.json`:

- Change `name` fields to new neutral names
- Update `title` and `description` to reflect functional purpose
- Update `path` in files array to match new filenames
- Update `content` with new prop interfaces and neutralized code

## Step 2: Fetch & Integrate Shadcn Blocks

### 2.1 Fetch Shadcn Block Code

Fetch actual code from Shadcn registry for:

- **Sidebar**: `https://ui.shadcn.com/r/sidebar.json` (or similar)
- **Login/Signup**: `https://ui.shadcn.com/r/login-01.json` and related auth blocks
- **OTP**: `https://ui.shadcn.com/r/otp.json` (or similar)
- **Calendar**: `https://ui.shadcn.com/r/calendar.json`
- **Featured**: `https://ui.shadcn.com/r/featured.json` (or similar)

### 2.2 Create New Functional Blocks

Create new blocks in `src/blocks/`:

**sidebar-layout.tsx**:

- Fetch Shadcn sidebar code
- Preserve all JSX structure and Tailwind classes verbatim
- Add props: `sidebarContent`, `mainContent`, `collapsible`, `defaultOpen`
- Export as `SidebarLayout`

**auth-form-block.tsx**:

- Combine patterns from Shadcn login/signup blocks
- Preserve visual structure
- Add props: `mode` ("login" | "signup"), `title`, `fields`, `actions`, `socialProviders`
- Export as `AuthFormBlock`

**otp-field-group.tsx**:

- Fetch Shadcn OTP code
- Preserve input group structure
- Add props: `length`, `onComplete`, `autoFocus`
- Export as `OTPFieldGroup`

**calendar-widget.tsx**:

- Fetch Shadcn calendar code
- Preserve calendar grid and navigation
- Add props: `selectedDate`, `onSelect`, `mode` ("single" | "range"), `disabledDates`
- Export as `CalendarWidget`

**feature-section.tsx**:

- Fetch Shadcn featured block code
- Preserve grid/feature layout
- Add props: `title`, `description`, `features` (array with `title`, `description`, `icon`)
- Export as `FeatureSection`

**Key Rule**: Preserve imported JSX and Tailwind classes verbatim. Only generalize text/data/labels into props. Never restyle or rename classes.

### 2.3 Add Registry Entries

Add new entries to `registry.json` for each new block with:

- Proper `registryDependencies` (card, button, input, etc.)
- Complete file content with preserved Shadcn styling
- Functional descriptions

## Step 3: Create Core UI Primitives

### 3.1 Create Primitive Components

Create new files in `src/components/ui/`:

**FormSection.tsx**:

- Wrapper for grouped fields with optional header/description
- Props: `title`, `description`, `children`
- Uses `data-slot="form-section"`

**FormFieldGroup.tsx**:

- Label + Input + Message unit
- Props: `label`, `id`, `error`, `description`, `children` (input element)
- Uses `data-slot="form-field-group"`

**MetricCard.tsx**:

- Simple stat display component
- Props: `label`, `value`, `delta`, `deltaLabel`, `unit`
- Uses `data-slot="metric-card"`

**EntityCard.tsx**:

- Avatar + metadata + action buttons component
- Props: `avatar`, `name`, `role`, `metadata`, `actions`
- Uses `data-slot="entity-card"`

**Sidebar.tsx**:

- Sidebar shell with toggle support
- Props: `collapsible`, `defaultOpen`, `children`
- Uses `data-slot="sidebar"`

**ActionGroup.tsx**:

- Horizontal button group
- Props: `actions` (array), `variant`, `className`
- Uses `data-slot="action-group"`

**MetadataList.tsx**:

- Display key/value pairs
- Props: `items` (array of `{label, value}`), `className`
- Uses `data-slot="metadata-list"`

**SectionWrapper.tsx**:

- Consistent padding/margin wrapper
- Props: `padding`, `margin`, `children`
- Uses `data-slot="section-wrapper"`

### 3.2 Add Registry Entries for Primitives

Add `registry:ui` entries to `registry.json` for each primitive with:

- Proper dependencies
- Type-safe props
- Minimal Tailwind dependencies

## Step 4: Update Registry Metadata

### 4.1 Update registry.json Structure

- Rename all existing block entries to neutral names
- Add new entries for Shadcn-inspired blocks
- Add new entries for primitives
- Update all `title` and `description` fields to describe function, not theme
- Ensure all `registryDependencies` are correct

### 4.2 Example Entry Format

```json
{
  "name": "metric-card",
  "type": "registry:block",
  "title": "Metric Card",
  "description": "Card for displaying a metric value with comparison and actions.",
  "registryDependencies": ["card", "badge", "button"],
  "files": [...]
}
```

## Step 5: Update Documentation

### 5.1 Update docs/registry-guidelines.md

Add new section at top:

**"Functional Vocabulary Mode"**:

- Explain transition from thematic examples to functional patterns
- Reference vocabulary checklist
- Explain prop-based configuration

Add **Category Table**:

| Category | Example Blocks | Description |

|----------|---------------|-------------|

| Layout | `sidebar-layout`, `section-wrapper` | Structural patterns |

| Forms | `form-block`, `sectioned-form-block`, `otp-field-group`, `credential-form-block` | Input patterns |

| Display | `metric-card`, `entity-card`, `feature-section` | Information display |

| Utilities | `action-group`, `metadata-list`, `form-section` | Composable utilities |

Update validation and usage examples for new blocks.

### 5.2 Update Examples

Add code examples showing:

- How to use neutralized blocks with props
- How to compose primitives
- How blocks inherit theme tokens

## Step 6: Validation & Deployment

### 6.1 Run Validation

```bash
npm run registry:validate
```

Verify:

- All registry entries pass schema validation
- All file paths are correct
- All dependencies are declared

### 6.2 Build Registry

```bash
npm run registry:build
```

Verify `dist/` output contains:

- `dist/sidebar-layout.json`
- `dist/metric-card.json`
- `dist/form-block.json`
- `dist/credential-form-block.json`
- `dist/calendar-widget.json`
- All new primitive JSON files

### 6.3 Commit & Tag

```bash
git add .
git commit -m "Refactor: normalize blocks + add functional vocabulary patterns"
git push origin main
git tag -a v1.1-vocabulary -m "Functional UI Vocabulary refactor and Shadcn pattern integration"
git push origin v1.1-vocabulary
```

## Success Criteria

- All blocks use neutral, functional names
- All hardcoded strings replaced with typed props
- Shadcn blocks integrated with preserved styling
- New primitives available in registry
- Documentation updated with vocabulary mode
- All validation passes
- Registry builds successfully
- GitHub Pages deployment succeeds

## Files to Modify

**Blocks (rename & neutralize)**:

- `src/blocks/login-block.tsx` → `credential-form-block.tsx`
- `src/blocks/dashboard-card.tsx` → `metric-card.tsx`
- `src/blocks/payment-form.tsx` → `form-block.tsx`
- `src/blocks/profile-card.tsx` → `entity-card.tsx`
- `src/blocks/settings-form.tsx` → `sectioned-form-block.tsx`
- `src/blocks/complex-form.tsx` → `multi-field-form-block.tsx`

**New Blocks**:

- `src/blocks/sidebar-layout.tsx`
- `src/blocks/auth-form-block.tsx`
- `src/blocks/otp-field-group.tsx`
- `src/blocks/calendar-widget.tsx`
- `src/blocks/feature-section.tsx`

**New Primitives**:

- `src/components/ui/FormSection.tsx`
- `src/components/ui/FormFieldGroup.tsx`
- `src/components/ui/MetricCard.tsx`
- `src/components/ui/EntityCard.tsx`
- `src/components/ui/Sidebar.tsx`
- `src/components/ui/ActionGroup.tsx`
- `src/components/ui/MetadataList.tsx`
- `src/components/ui/SectionWrapper.tsx`

**Metadata**:

- `registry.json` (comprehensive updates)

**Documentation**:

- `docs/registry-guidelines.md` (add Functional Vocabulary Mode section and category table)