# Registry Integration Guidelines

## Purpose

This document provides complete instructions for integrating and consuming components from the private `ui-registry` repository. The `ui-registry` serves as a Shadcn-compatible registry that mirrors the public `ui.shadcn.com/blocks` system, providing custom UI components and blocks for internal use.

This documentation is self-contained and assumes no direct access to the `ui-registry` repository source code.

---

## 1. Overview

### What is `ui-registry`?

The `ui-registry` is a **private Shadcn-compatible component registry** that:

- Exposes UI components and blocks through JSON endpoints deployed to GitHub Pages
- Follows the official Shadcn registry schema (`https://ui.shadcn.com/schema/registry-item.json`)
- Provides the same installation experience as the public Shadcn registry
- Supports multiple item types: `registry:ui`, `registry:block`, `registry:component`, etc.
- Automatically deploys via GitHub Actions on every push to `main`

### Registry Item Types

The registry provides several types of installable items:

- **`registry:ui`** - Base UI components (button, card, input, etc.)
- **`registry:block`** - Composite blocks combining multiple components (login forms, dashboards, etc.)
- **`registry:component`** - Custom components
- **`registry:lib`** - Utility libraries
- **`registry:hook`** - React hooks
- **`registry:theme`** - Theme configurations
- **`registry:style`** - Style presets

### Registry Location

The registry is served from GitHub Pages. The production URL format is:

- **Production**: `https://helvetiaai.github.io/ui-registry/{name}.json`

**Note**: Replace `helvetiaai` with your GitHub username or organization name.

The registry is automatically deployed via GitHub Actions whenever changes are pushed to the `main` branch. The `dist/` directory contains the built registry files and serves as the root for GitHub Pages.

---

## 2. Setup in this Project

> This section explains how to configure your project to consume components from the private registry.

### Configuration File

Configure registry access by adding a `registries` section to your project's `components.json` file in the repository root.

### Required Configuration

Add the following to `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "radix-vega",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@local": "https://helvetiaai.github.io/ui-registry/{name}.json",
    "@ui": "https://ui.shadcn.com/r/{name}.json"
  }
}
```

### Configuration Details

- **`@local`**: Points to your private registry on GitHub Pages. Replace `helvetiaai` with your GitHub username or organization name.
- **`@ui`**: Points to the public Shadcn registry for fallback or mixed usage.
- **`{name}`**: Placeholder replaced by the Shadcn CLI with the component name during installation.

**Important**: The registry URL does not include `/r/` in the path because GitHub Pages serves the `dist/` directory as the root.

### File Location

Place `components.json` in the **root directory** of your project, alongside `package.json`.

### CLI Resolution

The `shadcn` CLI reads `components.json` to resolve component sources. When you specify `@local/button`, it:

1. Reads the `registries` section
2. Replaces `{name}` with `button`
3. Fetches `https://helvetiaai.github.io/ui-registry/button.json`
4. Installs the component according to the registry item definition

---

## 3. Usage

> This section covers how to install and use components from the registry in your projects.

### Installing Components

Install components or blocks from the registry using the `shadcn` CLI with the `@local` namespace:

```bash
# Install a UI component
npx shadcn add @local/button

# Install a block
npx shadcn add @local/login-block

# Install multiple items
npx shadcn add @local/card @local/input @local/label
```

### Installation Process

When you run `npx shadcn add @local/button`, the CLI:

1. **Fetches the registry item** from `https://helvetiaai.github.io/ui-registry/button.json`
2. **Resolves dependencies** (both NPM packages and registry dependencies)
3. **Installs files** to the paths specified in the registry item
4. **Applies Tailwind configuration** and CSS variables automatically
5. **Updates imports** according to your `components.json` aliases

### Mixed Usage

You can install components from both registries in the same project:

```bash
# Install from private registry
npx shadcn add @local/custom-button

# Install from public registry
npx shadcn add @ui/alert-dialog
```

The CLI automatically resolves the correct source based on the namespace prefix.

### Component Location

Installed components are placed according to your `components.json` aliases:

- Components → `src/components/ui/` (or `@/components/ui`)
- Utils → `src/lib/utils.ts` (or `@/lib/utils`)
- Hooks → `src/hooks/` (or `@/hooks`)

---

## 4. Updating / Syncing

> This section explains how to rebuild and redeploy the registry after adding or updating components.

### Rebuilding the Registry

When new components are added to the `ui-registry` repository, rebuild the registry:

```bash
# Navigate to the ui-registry repository
cd ../ui-registry

# Build the registry (generates files in public/r/ and copies to dist/)
npm run registry:build
```

The build process:
1. Validates all registry items before building (via `prebuild` hook)
2. Runs `shadcn registry:build` to generate JSON files in `public/r/`
3. Copies all JSON files from `public/r/` to `dist/` for GitHub Pages deployment

### Validation

Before deploying, validate all registry items:

```bash
# In the ui-registry repository
npm run registry:validate
```

Expected output:

```
✓ src/components/ui/button/registry-item.json valid
✓ src/components/ui/card/registry-item.json valid
✓ src/components/ui/input/registry-item.json valid
...
✓ All 14 files validated successfully
```

### Deployment

The registry is automatically deployed via GitHub Actions on every push to the `main` branch. The deployment workflow:

1. **Checks out the code** from the repository
2. **Installs dependencies** using `npm ci`
3. **Builds the registry** using `npm run registry:build`
4. **Verifies the build** by listing contents of `dist/`
5. **Uploads the `dist/` directory** as a GitHub Pages artifact
6. **Deploys to GitHub Pages** automatically

**Manual deployment** (if needed):
- Simply push changes to `main` branch - deployment happens automatically
- Or manually trigger the workflow from the Actions tab in GitHub

### Build Pipeline

The registry build process follows this flow:

```
src/ → validation → build → public/r/ → copy → dist/ → GitHub Pages → JSON endpoints
```

**Detailed steps:**

1. **Validation** (via `prebuild` hook): Validates all `registry-item.json` files against the Shadcn schema
2. **Registry build**: Runs `shadcn registry:build` to generate JSON files in `public/r/`
3. **Copy to dist**: Copies all JSON files from `public/r/` to `dist/` for GitHub Pages deployment
4. **Output**: The `dist/` directory contains all registry files ready for deployment

The `dist/` directory serves as the root for GitHub Pages, so files are accessible at:
- `https://helvetiaai.github.io/ui-registry/registry.json`
- `https://helvetiaai.github.io/ui-registry/button.json`
- etc.

---

## 5. Validation and Schema

> This section details the validation process and schema requirements for registry items.

### Schema Compliance

All registry items follow the official Shadcn schema:

- **Schema URL**: `https://ui.shadcn.com/schema/registry-item.json`
- **Local Schema**: A copy is stored in `schema-registry-item.json` for validation
- **Validation**: Automated via `scripts/validate-registry.js`
- **Build-time checks**: Validation runs before every build (`prebuild` hook)

### Validation Process

The validation script:

1. Loads the Shadcn registry-item schema from `schema-registry-item.json`
2. Finds all `registry-item.json` files in `src/components/ui/**/`
3. Validates each file against the schema using AJV
4. Reports validation errors with detailed messages
5. Exits with code 1 if any file fails validation

### Example Validation Output

**Success:**
```
✓ src/components/ui/button/registry-item.json valid
✓ src/components/ui/card/registry-item.json valid
✓ src/components/ui/input/registry-item.json valid
...
✓ All 14 files validated successfully
```

**Failure:**
```
✗ src/components/ui/button/registry-item.json invalid
[
  {
    "instancePath": "/files/0",
    "schemaPath": "#/properties/files/items/required",
    "keyword": "required",
    "params": { "missingProperty": "type" },
    "message": "must have required property 'type'"
  }
]
```

### Required Fields

Every registry item must include:

- `$schema` - Schema reference
- `name` - Unique component identifier
- `type` - Item type (`registry:ui`, `registry:block`, etc.)
- `files` - Array of file definitions with `path` and `type`

Optional but recommended:

- `description` - Human-readable description
- `title` - Display title
- `dependencies` - NPM package dependencies
- `registryDependencies` - Other registry items this depends on

---

## 6. Component vs Block Organization

> This section explains the difference between atomic components and composite blocks, and how they're organized in the repository.

### Atomic Components (`src/components/ui/`)

Atomic UI components (button, card, input, etc.) are stored in `src/components/ui/`:

```
src/components/ui/
├── button/
│   └── registry-item.json    # Component manifest
├── button.tsx                # Component source
├── card/
│   └── registry-item.json
└── card.tsx
```

These are **primitive components** that serve as building blocks for more complex compositions.

### Blocks (`src/blocks/`)

Composite blocks (login forms, dashboards, etc.) that combine multiple primitives are stored directly in `src/blocks/`:

```
src/blocks/
└── login-block.tsx            # Block source
```

This structure provides:
- Consistency with the existing `src/` layout
- Simplicity for a single internal block library
- Easy organization alongside atomic components

**Note**: If you need multiple themed collections (e.g., `new-york`, `miami`, `tokyo`), you can organize as `src/blocks/<collection>/<block-name>/` or use the Shadcn pattern `registry/<collection>/<block-name>/`. For a single internal library, `src/blocks/` is recommended.

### Block Manifest Configuration

In `registry.json`, blocks reference their source files:

```json
{
  "name": "login-block",
  "type": "registry:block",
  "registryDependencies": ["card", "input", "label", "button"],
  "files": [
    {
      "path": "src/blocks/login-block.tsx",
      "type": "registry:component"
    }
  ]
}
```

The build process:
1. Reads the file from `src/blocks/login-block.tsx`
2. Embeds the code content into the registry item
3. Outputs to `dist/login-block.json` (accessible as `@local/login-block`)

---

## 7. File Structure Reference

> This section provides a complete reference of the repository structure and file organization.

### Registry Repository Structure

```
ui-registry/
├── registry.json                    # Main registry index
├── components.json                  # Registry configuration
├── schema-registry-item.json        # Local schema copy
├── dist/                            # GitHub Pages deployment directory
│   ├── registry.json                # Registry index (deployed)
│   ├── button.json                  # Individual component (deployed)
│   ├── card.json
│   ├── input.json
│   └── login-block.json             # Block example (deployed)
├── public/
│   └── r/                           # Generated registry files (intermediate)
│       ├── registry.json            # Registry index
│       ├── button.json              # Individual component
│       ├── card.json
│       ├── input.json
│       └── login-block.json         # Block example
├── src/
│   ├── components/
│   │   └── ui/                      # Atomic components
│   │       ├── button/
│   │       │   └── registry-item.json  # Component manifest
│   │       ├── button.tsx              # Source file
│   │       ├── card/
│   │       │   └── registry-item.json
│   │       └── card.tsx
│   └── blocks/                      # Composite blocks
│       └── login-block.tsx          # Block source
├── scripts/
│   ├── validate-registry.js         # Validation script
│   └── copy-registry-to-dist.js     # Copy script for deployment
└── .github/
    └── workflows/
        └── deploy.yml                # GitHub Actions deployment workflow
```

### Key Directories

- **`dist/`**: GitHub Pages deployment directory (contains JSON files, auto-deployed)
- **`public/r/`**: Generated registry files (intermediate build output, DO NOT edit manually)
- **`src/components/ui/<name>/registry-item.json`**: Component manifests for atomic UI components (source of truth)
- **`src/blocks/<block-name>.tsx`**: Block definitions and composite components
- **`scripts/`**: Build and validation utilities
- **`.github/workflows/`**: GitHub Actions deployment automation

### Directory Purpose Summary

| Directory | Purpose | Example |
|-----------|---------|---------|
| `src/components/ui/` | Atomic UI components | `button.tsx`, `card.tsx` |
| `src/blocks/` | Composite blocks | `src/blocks/login-block.tsx` |
| `dist/` | Deployed registry JSON files | `dist/login-block.json` |
| `public/r/` | Intermediate build output | `public/r/login-block.json` |

### File Types

- **`registry-item.json`**: Manifest files describing components (no file content, stored in `src/components/ui/<name>/`)
- **`public/r/*.json`**: Full registry items with embedded file content (generated by `shadcn registry:build`, intermediate build output)
- **`dist/*.json`**: Same as `public/r/*.json` but copied for GitHub Pages deployment (final deployed files)
- **`registry.json`**: Master index of all registry items (root level)

---

## 8. Troubleshooting

> This section provides solutions to common issues when setting up or using the registry.

### Quick Diagnostic

Before diving into specific issues, verify that GitHub Pages is live and responding:

```bash
curl -I https://helvetiaai.github.io/ui-registry/registry.json
```

Expected response: `HTTP/2 200` or `HTTP/1.1 200 OK`

### Common Issues and Solutions

#### 404 Error When Adding Component

**Symptom:**
```
Error: Failed to fetch https://helvetiaai.github.io/ui-registry/button.json
404 Not Found
```

**Solutions:**
1. Verify the registry URL in `components.json` matches your GitHub Pages deployment (format: `https://<username>.github.io/ui-registry/{name}.json`)
2. Check that the GitHub Actions workflow completed successfully (check the Actions tab)
3. Confirm the component name exists in the registry (check `https://helvetiaai.github.io/ui-registry/registry.json`)
4. Test the URL directly in a browser
5. Verify GitHub Pages is enabled in repository settings (Settings → Pages → Source: GitHub Actions)

#### CLI Version Mismatch

**Symptom:**
```
Error: Unknown command or invalid registry format
```

**Solution:**
```bash
npm install shadcn@latest -g
# or
npx shadcn@latest add @local/button
```

#### Missing Styles or CSS Variables

**Symptom:**
Components render without proper styling or colors.

**Solutions:**
1. Ensure Tailwind config includes the registry's CSS variables
2. Verify `@theme inline` is present in your CSS file (Tailwind v4)
3. Check that `cssVariables: true` is set in `components.json`
4. Rebuild Tailwind: `npm run build` or restart dev server

#### Validation Failures

**Symptom:**
```
✗ src/components/ui/button/registry-item.json invalid
```

**Solutions:**
1. Run validation locally: `npm run registry:validate`
2. Check the error message for missing required fields
3. Compare against the schema: `https://ui.shadcn.com/schema/registry-item.json`
4. Ensure `$schema` field points to the correct schema URL

#### Component Not Found in Registry

**Symptom:**
```
Error: Component 'custom-button' not found in registry
```

**Solutions:**
1. List available components: Check `https://helvetiaai.github.io/ui-registry/registry.json`
2. Verify component name spelling (case-sensitive)
3. Confirm the component was added to `registry.json` in the source repo
4. Push changes to `main` branch to trigger automatic rebuild and deployment
5. Wait for GitHub Actions workflow to complete (check Actions tab)

#### Import Path Errors

**Symptom:**
```
Module not found: Can't resolve '@/components/ui/button'
```

**Solutions:**
1. Verify `components.json` aliases match your project structure
2. Check TypeScript/JavaScript path mapping in `tsconfig.json`
3. Ensure the component was installed to the correct location
4. Restart your development server

---

## 9. Maintenance Notes

> This section covers best practices for maintaining and extending the registry.

### Cross-Project Reuse

This registry can be cloned and adapted for other projects:

1. **Clone the repository** to create a new registry
2. **Update GitHub Pages URL** in `components.json` (change `helvetiaai` to your username/org)
3. **Update workflow** if needed (`.github/workflows/deploy.yml`)
4. **Customize components** and blocks for your project's needs

Only the GitHub username and Pages URL need to change—the build process and structure remain the same.

### Best Practices

#### Commit Only Validated Items

Always run validation before committing registry changes:

```bash
npm run registry:validate
```

The build process includes a `prebuild` hook that automatically validates, preventing invalid items from being built.

#### Semantic Versioning

Consider tagging registry releases:

```bash
# In ui-registry repository
git tag -a v1.2.0 -m "Add login-block and update button styles"
git push origin v1.2.0
```

This allows consumers to reference specific registry versions if needed.

#### Adding New Namespaces

To add additional registry namespaces (e.g., `@beta`, `@internal`):

1. Update `components.json` in consuming projects:
```json
{
  "registries": {
    "@local": "https://helvetiaai.github.io/ui-registry/{name}.json",
    "@beta": "https://helvetiaai.github.io/ui-registry-beta/{name}.json",
    "@ui": "https://ui.shadcn.com/r/{name}.json"
  }
}
```

**Note**: For additional namespaces, you would need separate GitHub Pages deployments or use path-based routing if your hosting supports it.

2. Use the new namespace:
```bash
npx shadcn add @beta/experimental-button
```

#### Registry Item Lifecycle

**For Atomic Components:**
1. **Development**: Create component in `src/components/ui/<name>/`
2. **Manifest**: Add `registry-item.json` with metadata
3. **Registry Index**: Add entry to root `registry.json`
4. **Validation**: Run `npm run registry:validate` (or let `prebuild` hook handle it)
5. **Build**: Run `npm run registry:build` (generates `public/r/` and copies to `dist/`)
6. **Deploy**: Push to `main` branch - GitHub Actions automatically deploys `dist/` to Pages
7. **Consume**: Install in projects via `npx shadcn add @local/<name>`

**For Blocks:**
1. **Development**: Create block file in `src/blocks/` (e.g., `src/blocks/login-block.tsx`)
2. **Registry Index**: Add entry to root `registry.json` with `path` pointing to the block file
3. **Dependencies**: List required components in `registryDependencies` (e.g., `["card", "input", "button"]`)
4. **Validation**: Run `npm run registry:validate` (validates `registry.json` structure)
5. **Build**: Run `npm run registry:build` (embeds block code into registry item)
6. **Deploy**: Push to `main` branch - GitHub Actions automatically deploys `dist/` to Pages
7. **Consume**: Install in projects via `npx shadcn add @local/login-block`

#### Dependency Management

Registry items automatically declare:
- **`dependencies`**: NPM packages required at runtime
- **`registryDependencies`**: Other registry items this depends on
- **`devDependencies`**: Development-only packages (if applicable)

The CLI installs these automatically when adding components.

---

## Quick Reference

### Essential Commands

**In consuming projects:**
```bash
# Install component
npx shadcn add @local/button

# Install block
npx shadcn add @local/login-block

# List available (check registry.json URL)
curl https://helvetiaai.github.io/ui-registry/registry.json
```

**In ui-registry repository:**
```bash
# Validate all items
npm run registry:validate

# Build registry (generates public/r/ and copies to dist/)
npm run registry:build

# Build with validation (automatic via prebuild hook)
npm run build

# Deploy (automatic on push to main via GitHub Actions)
git add .
git commit -m "Update registry"
git push origin main
```

### Configuration Checklist

- [ ] `components.json` exists in project root
- [ ] `registries` section includes `@local` namespace
- [ ] Registry URL is correct and accessible
- [ ] `aliases` match project structure
- [ ] Tailwind config includes CSS variables

### File Locations

- **Registry config**: `components.json` (root)
- **Atomic components**: `src/components/ui/` (or `@/components/ui`)
- **Blocks**: `src/blocks/<block-name>.tsx` (e.g., `src/blocks/login-block.tsx`)
- **Registry endpoint**: `https://helvetiaai.github.io/ui-registry/{name}.json` (replace `helvetiaai` with your GitHub username/org)
- **Schema reference**: `https://ui.shadcn.com/schema/registry-item.json`
- **Local schema**: `schema-registry-item.json` (root, used for validation)
- **Deployment directory**: `dist/` (auto-deployed via GitHub Actions)

### Component vs Block Quick Guide

| Type | Location | Example | Install |
|------|----------|---------|---------|
| **Atomic Component** | `src/components/ui/` | `button.tsx` | `npx shadcn add @local/button` |
| **Block** | `src/blocks/` | `src/blocks/login-block.tsx` | `npx shadcn add @local/login-block` |

### Support

For issues or questions:
1. Check this documentation first
2. Verify registry accessibility and component names
3. Review validation output for schema errors
4. Consult the [official Shadcn documentation](https://ui.shadcn.com/docs)

---

## 10. GitHub Actions Deployment

> This section explains the automated deployment workflow and how to configure GitHub Pages.

### Workflow Overview

The deployment workflow is defined in `.github/workflows/deploy.yml`:

```yaml
name: Deploy Registry to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    uses: actions/deploy-pages@v4
```

This simplified snippet shows the core structure. The full workflow includes build steps, verification, and artifact upload.

### Automated Deployment

The registry uses GitHub Actions to automatically deploy to GitHub Pages on every push to the `main` branch. The workflow (`.github/workflows/deploy.yml`) performs:

1. **Checkout**: Retrieves the latest code
2. **Setup Node.js**: Configures Node.js 18 environment
3. **Install dependencies**: Runs `npm ci` for clean install
4. **Build registry**: Executes `npm run registry:build`
5. **Verify build**: Lists contents of `dist/` for debugging
6. **Upload artifact**: Uploads `dist/` directory as Pages artifact
7. **Deploy**: Deploys to GitHub Pages automatically

### Workflow Configuration

The deployment workflow requires:

- **Permissions**: `contents: read`, `pages: write`, `id-token: write`
- **Environment**: `github-pages` (configured in repository settings)
- **Concurrency**: Cancels in-progress deployments when new commits are pushed

### Enabling GitHub Pages

To enable GitHub Pages deployment:

1. Go to repository **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow will automatically deploy on the next push to `main`

### Deployment Verification

After deployment completes:

1. Check the **Actions** tab to verify the workflow succeeded
2. Visit `https://helvetiaai.github.io/ui-registry/registry.json` to confirm accessibility
3. Test component installation: `npx shadcn add @local/button`

### Manual Deployment

If automatic deployment is disabled or you need to trigger manually:

1. Go to **Actions** tab in GitHub
2. Select **Deploy Registry to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

---

*Last updated: December 2024 — Production-ready documentation for Shadcn-compatible private registries*
