# Private Registry Integration Guide

## Purpose

This document provides complete instructions for integrating and consuming components from the private `ui-registry` repository in your project. The `ui-registry` is a Shadcn-compatible component registry that provides custom UI components and blocks for internal use.

This documentation focuses on **consuming** the registry—installing components, configuring your project, and troubleshooting common issues.

---

## Functional Vocabulary Mode

The `ui-registry` follows a **Functional Vocabulary** approach, providing neutral, composable UI building blocks based on functional design patterns rather than themed examples.

### Transition to Functional Patterns

All blocks in the registry have been normalized to use **functional names** and **comprehensive prop interfaces**. This means:

- **Neutral naming**: Blocks are named by their function (e.g., `credential-form-block`, `metric-card`) rather than their theme (e.g., `login-block`, `dashboard-card`)
- **Prop-based configuration**: All hardcoded strings, labels, and data are configurable via typed props
- **Theme inheritance**: Blocks preserve all Tailwind classes and theme tokens, inheriting your project's theme automatically
- **Composable primitives**: New UI primitives enable flexible composition without modification

### Block Categories

The registry organizes blocks into functional categories:

| Category | Example Blocks | Description |
|----------|---------------|-------------|
| **Layout** | `sidebar-layout`, `section-wrapper` | Structural patterns for page organization |
| **Forms** | `form-block`, `sectioned-form-block`, `otp-field-group`, `credential-form-block`, `auth-form-block`, `multi-field-form-block` | Input patterns for data collection |
| **Display** | `metric-card`, `entity-card`, `feature-section` | Information display patterns |
| **Utilities** | `action-group`, `metadata-list`, `form-section`, `form-field-group` | Composable utility components |

### Usage Example

```tsx
import { CredentialFormBlock } from "@/blocks/credential-form-block"

// Configure the form with props instead of hardcoded values
<CredentialFormBlock
  title="Sign In"
  emailLabel="Email Address"
  emailPlaceholder="your.email@example.com"
  passwordLabel="Password"
  submitLabel="Log In"
  onSubmit={handleLogin}
/>
```

All blocks maintain visual fidelity while allowing complete customization through props.

---

## Quick Start

Verify the registry is accessible and install your first component:

```bash
# Verify registry is live
curl -I https://helvetiaai.github.io/ui-registry/registry.json

# Install a component
npx shadcn add @local/button

# Install a block
npx shadcn add @local/credential-form-block
```

Expected response from curl: `HTTP/2 200` or `HTTP/1.1 200 OK`

---

## 1. Overview

### What is `ui-registry`?

The `ui-registry` is a **private Shadcn-compatible component registry** that:

- Exposes UI components and blocks through JSON endpoints on GitHub Pages
- Follows the official Shadcn registry schema (`https://ui.shadcn.com/schema/registry-item.json`)
- Provides the same installation experience as the public Shadcn registry
- Supports multiple item types: `registry:ui`, `registry:block`, `registry:component`, etc.

### Registry Item Types

The registry provides several types of installable items:

- **`registry:ui`** - Base UI components (button, card, input, etc.)
- **`registry:block`** - Composite blocks combining multiple components (form patterns, metric displays, layout structures, etc.)
- **`registry:component`** - Custom components
- **`registry:lib`** - Utility libraries
- **`registry:hook`** - React hooks
- **`registry:theme`** - Theme configurations
- **`registry:style`** - Style presets

### Registry Location

The registry is served from GitHub Pages at:

- **Production**: `https://helvetiaai.github.io/ui-registry/{name}.json`

**Note**: Replace `helvetiaai` with your GitHub username or organization name if using a different registry.

GitHub Pages automatically updates within a few minutes of each successful workflow run; deployments are visible under the Actions → Deploy Pages job.

---

## 2. Setup

> This section explains how to configure your project to consume components from the private registry.

### Before You Begin

- ✅ Tailwind builds successfully
- ✅ `src/components/ui` folder exists
- ✅ Registry URL returns 200 OK

### Prerequisites

- Node.js 18+
- Shadcn CLI installed (`npm install shadcn -g`) or use `npx`
- TailwindCSS configured in your project
- GitHub Pages registry URL accessible (verify with `curl -I https://helvetiaai.github.io/ui-registry/registry.json`)

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
    "config": "tailwind.config.js",
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
npx shadcn add @local/credential-form-block

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
- Blocks → `src/blocks/` (or configured alias)

**For TypeScript projects**: Ensure your paths in `tsconfig.json` mirror the aliases defined in `components.json`.

---

## 4. Staying in Sync

> This section explains how to keep your installed components up to date with registry changes.

### Updating Components

When components are updated in the registry:

1. **Check for updates**: Visit `https://helvetiaai.github.io/ui-registry/registry.json` to see available components
2. **Reinstall components**: Use the `--overwrite` flag to update existing components:

```bash
npx shadcn add @local/button --overwrite
```

The `--overwrite` flag replaces the existing file while keeping your project aliases and folder structure intact.

3. **Verify changes**: Review the updated files and test your application

### Registry Deployment

The registry is automatically deployed via GitHub Actions whenever changes are pushed to the `main` branch. After a registry update:

- Wait 2-3 minutes for GitHub Pages to deploy
- Verify deployment: `curl -I https://helvetiaai.github.io/ui-registry/registry.json`
- Then reinstall components as needed

### Checking Available Components

List all available components and blocks:

```bash
curl https://helvetiaai.github.io/ui-registry/registry.json
```

This returns a JSON object with all available registry items and their metadata.

---

## 5. Troubleshooting

> This section provides solutions to common issues when setting up or using the registry.

### Quick Diagnostic

Before diving into specific issues, verify that GitHub Pages is live and responding:

```bash
curl -I https://helvetiaai.github.io/ui-registry/registry.json
```

Expected response: `HTTP/2 200` or `HTTP/1.1 200 OK`

### Troubleshooting Table

| Issue | Cause | Fix |
|-------|-------|-----|
| **404 Error** | GitHub Pages deployment delay or registry URL mismatch | Wait 2-3 min after registry push, verify URL in `components.json` |
| **Missing styles** | Tailwind config mismatch or CSS variables not loaded | Rebuild Tailwind (`npm run build`) or restart dev server |
| **Module not found** | Alias mismatch in `components.json` or TypeScript paths | Fix `components.json` aliases, check `tsconfig.json` path mapping |
| **Component not found** | Component name typo or not yet deployed | Check `registry.json` for correct name, wait for deployment |
| **CLI version mismatch** | Outdated `shadcn` CLI | Use `npx shadcn@latest add @local/button` |

### Common Issues and Solutions

#### 404 Error When Adding Component

**Symptom:**
```
Error: Failed to fetch https://helvetiaai.github.io/ui-registry/button.json
404 Not Found
```

**Solutions:**
1. Verify the registry URL in `components.json` matches the GitHub Pages deployment (format: `https://<username>.github.io/ui-registry/{name}.json`)
2. Check that the registry deployment completed (wait 2-3 minutes after a push)
3. Confirm the component name exists in the registry (check `https://helvetiaai.github.io/ui-registry/registry.json`)
4. Test the URL directly in a browser
5. Verify GitHub Pages is enabled in the registry repository settings

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

#### Component Not Found in Registry

**Symptom:**
```
Error: Component 'custom-button' not found in registry
```

**Solutions:**
1. List available components: Check the registry index (`https://helvetiaai.github.io/ui-registry/registry.json`)
2. Verify component name spelling (case-sensitive)
3. Wait for registry deployment if component was recently added
4. Check the registry index (registry.json) for component availability

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

## 6. Maintenance

> This section covers best practices for maintaining registry components in your project.

### Best Practices

#### Keep Components Updated

Regularly check for registry updates and reinstall components as needed:

```bash
# Check registry for updates
curl https://helvetiaai.github.io/ui-registry/registry.json

# Update specific component
npx shadcn add @local/button --overwrite
```

#### Version Control

Commit installed components to version control so your team stays in sync:

```bash
git add src/components/ui/
git add src/blocks/
git commit -m "Update registry components"
```

#### Customization

If you need to customize installed components:

1. **Fork the component**: Copy it to a custom location if you need significant changes
2. **Extend, don't modify**: Prefer composition over modification of registry components
3. **Document changes**: Note any customizations in your project documentation

### Dependency Management

Registry items automatically declare:
- **`dependencies`**: NPM packages required at runtime
- **`registryDependencies`**: Other registry items this depends on

The CLI installs these automatically when adding components. Keep your `package.json` dependencies up to date.

### Staying in Sync

To stay current with registry changes:

1. **Monitor registry updates**: Check the registry index (registry.json) for new components or updates
2. **Test updates**: Always test component updates in a development environment first
3. **Review changes**: Use `git diff` to review what changed when updating components
4. **Update documentation**: Keep your project docs updated when adding new registry components

---

## Quick Reference

### Essential Commands

```bash
# Verify registry is accessible
curl -I https://helvetiaai.github.io/ui-registry/registry.json

# Install component
npx shadcn add @local/button

# Install block
npx shadcn add @local/credential-form-block

# Update existing component
npx shadcn add @local/button --overwrite

# List available components
curl https://helvetiaai.github.io/ui-registry/registry.json
```

### Configuration Checklist

- [ ] `components.json` exists in project root
- [ ] `registries` section includes `@local` namespace
- [ ] Registry URL is correct and accessible
- [ ] `aliases` match project structure
- [ ] Tailwind config includes CSS variables
- [ ] TypeScript paths configured (if using TypeScript)

### File Locations

- **Registry config**: `components.json` (root)
- **Installed components**: `src/components/ui/` (or `@/components/ui`)
- **Installed blocks**: `src/blocks/` (or configured alias)
- **Registry endpoint**: `https://helvetiaai.github.io/ui-registry/{name}.json`
- **Schema reference**: `https://ui.shadcn.com/schema/registry-item.json`

### Component vs Block Quick Guide

| Type | Install Command | Location |
|------|----------------|----------|
| **Atomic Component** | `npx shadcn add @local/button` | `src/components/ui/button.tsx` |
| **Block** | `npx shadcn add @local/credential-form-block` | `src/blocks/login-block.tsx` |

### Verification Script

Run this end-to-end verification to ensure your local setup is correct:

```bash
# Verify local setup end-to-end
curl -I https://helvetiaai.github.io/ui-registry/registry.json &&
npx shadcn add @local/button --dry-run
```

Run inside your project root (where `components.json` resides).

This performs a sanity check without installing anything. Both commands should succeed if your setup is correct.

### Support

For issues or questions:

1. Check this documentation first
2. Verify registry accessibility: `curl -I https://helvetiaai.github.io/ui-registry/registry.json`
3. Review troubleshooting section above
4. Consult the [official Shadcn documentation](https://ui.shadcn.com/docs)

---

*Last updated: December 2024 — Registry integration aligned with v1.0-docs baseline*
