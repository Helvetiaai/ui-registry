# Registry Integration Guidelines

## Purpose

This document provides complete instructions for integrating and consuming components from the private `ui-registry` repository. The `ui-registry` serves as a Shadcn-compatible registry that mirrors the public `ui.shadcn.com/blocks` system, providing custom UI components and blocks for internal use.

This documentation is self-contained and assumes no direct access to the `ui-registry` repository source code.

---

## 1. Overview

### What is `ui-registry`?

The `ui-registry` is a **private Shadcn-compatible component registry** that:

- Exposes UI components and blocks through JSON endpoints at `/public/r/{name}.json`
- Follows the official Shadcn registry schema (`https://ui.shadcn.com/schema/registry-item.json`)
- Provides the same installation experience as the public Shadcn registry
- Supports multiple item types: `registry:ui`, `registry:block`, `registry:component`, etc.

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

The registry is served from a static hosting endpoint. Common configurations:

- **Development**: `http://localhost:3000/r/{name}.json`
- **Production**: `https://registry.myteam.dev/r/{name}.json` (or your team's registry URL)

Replace the placeholder URL with your actual registry deployment URL.

---

## 2. Setup in this Project

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
    "@local": "https://registry.myteam.dev/r/{name}.json",
    "@ui": "https://ui.shadcn.com/r/{name}.json"
  }
}
```

### Configuration Details

- **`@local`**: Points to your private registry. Replace `https://registry.myteam.dev/r/{name}.json` with your actual registry URL.
- **`@ui`**: Points to the public Shadcn registry for fallback or mixed usage.
- **`{name}`**: Placeholder replaced by the Shadcn CLI with the component name during installation.

### File Location

Place `components.json` in the **root directory** of your project, alongside `package.json`.

### CLI Resolution

The `shadcn` CLI reads `components.json` to resolve component sources. When you specify `@local/button`, it:

1. Reads the `registries` section
2. Replaces `{name}` with `button`
3. Fetches `https://registry.myteam.dev/r/button.json`
4. Installs the component according to the registry item definition

---

## 3. Usage

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

1. **Fetches the registry item** from `https://registry.myteam.dev/r/button.json`
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

### Rebuilding the Registry

When new components are added to the `ui-registry` repository, rebuild the registry:

```bash
# Navigate to the ui-registry repository
cd ../ui-registry

# Build the registry (generates /public/r/*.json files)
npm run registry:build
```

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

After validation passes:

1. **Build the registry**: `npm run registry:build`
2. **Deploy `/public/r/` directory** to your static hosting (Vercel, Netlify, S3, etc.)
3. **Verify accessibility** by checking `https://registry.myteam.dev/r/registry.json`

### Build Pipeline

The registry build process:

- Reads `registry.json` and component manifests
- Generates individual JSON files in `public/r/`
- Includes full file content, dependencies, and metadata
- Validates against the Shadcn schema automatically (via `prebuild` hook)

---

## 5. Validation and Schema

### Schema Compliance

All registry items follow the official Shadcn schema:

- **Schema URL**: `https://ui.shadcn.com/schema/registry-item.json`
- **Validation**: Automated via `scripts/validate-registry.js`
- **Build-time checks**: Validation runs before every build (`prebuild` hook)

### Validation Process

The validation script:

1. Loads the Shadcn registry-item schema
2. Finds all `registry-item.json` files in `src/components/ui/**/`
3. Validates each file against the schema
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

## 6. File Structure Reference

### Registry Repository Structure

```
ui-registry/
├── registry.json                    # Main registry index
├── components.json                  # Registry configuration
├── schema-registry-item.json        # Local schema copy
├── public/
│   └── r/                           # Deployed registry files
│       ├── registry.json            # Registry index
│       ├── button.json              # Individual component
│       ├── card.json
│       ├── input.json
│       └── login-block.json         # Block example
├── src/
│   └── components/
│       └── ui/
│           ├── button/
│           │   └── registry-item.json  # Component manifest
│           ├── button.tsx              # Source file
│           ├── card/
│           │   └── registry-item.json
│           └── card.tsx
├── registry/
│   └── new-york/
│       └── login-block/
│           └── login-block.tsx      # Block source
└── scripts/
    └── validate-registry.js         # Validation script
```

### Key Directories

- **`public/r/`**: Generated registry files (DO NOT edit manually)
- **`src/components/ui/<name>/registry-item.json`**: Component manifests (source of truth)
- **`registry/`**: Block definitions and composite components
- **`scripts/`**: Build and validation utilities

### File Types

- **`registry-item.json`**: Manifest files describing components (no file content)
- **`public/r/*.json`**: Full registry items with embedded file content (generated)
- **`registry.json`**: Master index of all registry items

---

## 7. Troubleshooting

### Common Issues and Solutions

#### 404 Error When Adding Component

**Symptom:**
```
Error: Failed to fetch https://registry.myteam.dev/r/button.json
404 Not Found
```

**Solutions:**
1. Verify the registry URL in `components.json` matches your deployment
2. Check that `npm run registry:build` was run and deployed
3. Confirm the component name exists in the registry (check `https://registry.myteam.dev/r/registry.json`)
4. Test the URL directly in a browser

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
1. List available components: Check `https://registry.myteam.dev/r/registry.json`
2. Verify component name spelling (case-sensitive)
3. Confirm the component was added to `registry.json` in the source repo
4. Rebuild and redeploy the registry

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

## 8. Maintenance Notes

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
    "@local": "https://registry.myteam.dev/r/{name}.json",
    "@beta": "https://beta.registry.myteam.dev/r/{name}.json",
    "@ui": "https://ui.shadcn.com/r/{name}.json"
  }
}
```

2. Use the new namespace:
```bash
npx shadcn add @beta/experimental-button
```

#### Registry Item Lifecycle

1. **Development**: Create component in `src/components/ui/<name>/`
2. **Manifest**: Add `registry-item.json` with metadata
3. **Validation**: Run `npm run registry:validate`
4. **Build**: Run `npm run registry:build`
5. **Deploy**: Upload `public/r/` to hosting
6. **Consume**: Install in projects via `npx shadcn add @local/<name>`

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
curl https://registry.myteam.dev/r/registry.json
```

**In ui-registry repository:**
```bash
# Validate all items
npm run registry:validate

# Build registry
npm run registry:build

# Build with validation (automatic)
npm run build
```

### Configuration Checklist

- [ ] `components.json` exists in project root
- [ ] `registries` section includes `@local` namespace
- [ ] Registry URL is correct and accessible
- [ ] `aliases` match project structure
- [ ] Tailwind config includes CSS variables

### File Locations

- **Registry config**: `components.json` (root)
- **Installed components**: `src/components/ui/` (or `@/components/ui`)
- **Registry endpoint**: `https://registry.myteam.dev/r/{name}.json`
- **Schema reference**: `https://ui.shadcn.com/schema/registry-item.json`

### Support

For issues or questions:
1. Check this documentation first
2. Verify registry accessibility and component names
3. Review validation output for schema errors
4. Consult the [official Shadcn documentation](https://ui.shadcn.com/docs)

---

*Last updated: 2024*
