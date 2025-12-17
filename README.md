# UI Registry

A **private Shadcn-compatible component registry** that provides custom UI components and blocks for internal use. This registry mirrors the public `ui.shadcn.com` system, allowing teams to maintain their own component library while leveraging the Shadcn CLI and ecosystem.

## 🎯 Overview

This repository serves as a centralized registry for:

- **UI Components** (`registry:ui`) - Base components like buttons, cards, inputs
- **Blocks** (`registry:block`) - Composite components combining multiple primitives
- **Custom Components** (`registry:component`) - Team-specific components
- **Utilities** (`registry:lib`) - Shared utility functions
- **Hooks** (`registry:hook`) - Reusable React hooks
- **Themes** (`registry:theme`) - Theme configurations
- **Styles** (`registry:style`) - Style presets

All registry items follow the [official Shadcn schema](https://ui.shadcn.com/schema/registry-item.json) and can be installed using the standard `shadcn` CLI.

## ✨ Features

- ✅ **Shadcn-compatible** - Works seamlessly with `npx shadcn add`
- ✅ **Schema validation** - Automated validation against Shadcn schema
- ✅ **Namespace support** - Multiple registry namespaces (`@local`, `@ui`, etc.)
- ✅ **Build pipeline** - Automated registry generation with validation
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Example blocks** - Includes example composite components

## 📁 Project Structure

```
ui-registry/
├── registry.json                    # Main registry index
├── components.json                  # Registry configuration
├── schema-registry-item.json        # Local schema copy for validation
├── dist/                            # GitHub Pages deployment directory
│   ├── registry.json                # Registry index (deployed)
│   ├── button.json                  # Individual component files (deployed)
│   ├── card.json
│   ├── input.json
│   └── login-block.json
├── public/
│   └── r/                           # Generated registry files (intermediate)
│       ├── registry.json            # Registry index
│       ├── button.json              # Individual component files
│       ├── card.json
│       ├── input.json
│       └── login-block.json
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── button/
│   │       │   └── registry-item.json  # Component manifest
│   │       ├── button.tsx              # Component source
│   │       ├── card/
│   │       │   └── registry-item.json
│   │       └── card.tsx
│   └── blocks/
│       └── login-block.tsx           # Block example
├── scripts/
│   ├── validate-registry.js         # Validation script
│   └── copy-registry-to-dist.js     # Copy script for deployment
├── .github/
│   └── workflows/
│       └── deploy.yml                # GitHub Actions deployment workflow
└── docs/
    ├── registry-guidelines.md       # Integration guide
    └── registry-items.md            # Registry item examples
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Shadcn CLI (`npm install -g shadcn` or use `npx`)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ui-registry

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Validate registry items
npm run registry:validate

# Build registry
npm run registry:build

# Build project (includes validation)
npm run build
```

## 📝 Adding New Components

### Adding Atomic Components (UI Primitives)

#### 1. Create Component Source

Add your component file in `src/components/ui/`:

```tsx
// src/components/ui/my-component.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export function MyComponent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("...", className)} {...props} />
  )
}
```

#### 2. Create Registry Manifest

Create a manifest file in `src/components/ui/my-component/`:

```json
// src/components/ui/my-component/registry-item.json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "my-component",
  "type": "registry:ui",
  "description": "UI component for my-component.",
  "files": [
    {
      "path": "src/components/ui/my-component.tsx",
      "type": "registry:component"
    }
  ]
}
```

#### 3. Update Registry Index

Add the component to `registry.json`. The build process will read the file and embed its content:

```json
{
  "name": "my-component",
  "type": "registry:ui",
  "files": [
    {
      "path": "src/components/ui/my-component.tsx",
      "type": "registry:ui"
    }
  ]
}
```

#### 4. Validate and Build

```bash
# Validate the new component
npm run registry:validate

# Build the registry (reads files and embeds content)
npm run registry:build
```

### Adding Blocks (Composite Components)

#### 1. Create Block Source

Add your block file in `src/blocks/`:

```tsx
// src/blocks/payment-form.tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PaymentForm() {
  return (
    <Card>
      <CardHeader>Payment</CardHeader>
      <CardContent className="flex flex-col gap-2">
        {/* Your block implementation */}
      </CardContent>
    </Card>
  )
}
```

#### 2. Update Registry Index

Add the block entry to `registry.json` with its dependencies:

```json
{
  "name": "payment-form",
  "type": "registry:block",
  "title": "Payment Form",
  "description": "Payment form block using Card, Input, Label, Button.",
  "registryDependencies": ["card", "input", "label", "button"],
  "files": [
    {
      "path": "src/blocks/payment-form.tsx",
      "type": "registry:component"
    }
  ]
}
```

**Key points:**
- `path` points to your block file (the build process will read and embed its content)
- `registryDependencies` lists the atomic components this block depends on
- `type: "registry:block"` identifies it as a composite block

#### 3. Build and Deploy

```bash
# Build the registry (reads block file and embeds content)
npm run registry:build

# Commit and push (triggers automatic GitHub Pages deployment)
git add registry.json src/blocks/payment-form.tsx
git commit -m "Add payment-form block"
git push origin main
```

After deployment (2-3 minutes), the block will be available at:
- `https://helvetiaai.github.io/ui-registry/payment-form.json`

#### 4. Verify Installation

Test in a consuming project:

```bash
# Verify block is accessible
curl -I https://helvetiaai.github.io/ui-registry/payment-form.json

# Install the block
npx shadcn add @local/payment-form
```

## 🏗️ Building the Registry

The build process generates installable registry files in both `public/r/` and `dist/`:

```bash
# Build registry (includes automatic validation)
npm run registry:build
```

This command:

1. Validates all `registry-item.json` files (via `prebuild` hook)
2. Reads `registry.json` and component manifests
3. Generates individual JSON files in `public/r/`
4. Copies all JSON files to `dist/` for GitHub Pages deployment
5. Includes full file content, dependencies, and metadata
6. Validates output against Shadcn schema

### Generated Files

After building, both directories contain the registry files:

- **`public/r/`** - Intermediate build output (generated by `shadcn registry:build`)
- **`dist/`** - GitHub Pages deployment directory (copied from `public/r/`)

Each contains:
- `registry.json` - Master index of all items
- `{component-name}.json` - Individual component files with full content

The `dist/` directory serves as the root for GitHub Pages, so files are accessible at:
- `https://helvetiaai.github.io/ui-registry/registry.json`
- `https://helvetiaai.github.io/ui-registry/button.json`
- etc.

## ✅ Validation

All registry items are validated against the official Shadcn schema:

```bash
npm run registry:validate
```

The validation script:

- Checks all `registry-item.json` files in `src/components/ui/**/`
- Validates against `https://ui.shadcn.com/schema/registry-item.json`
- Reports detailed errors for any schema violations
- Exits with code 1 if validation fails

### Validation Output

**Success:**
```
✓ src/components/ui/button/registry-item.json valid
✓ src/components/ui/card/registry-item.json valid
...
✓ All 14 files validated successfully
```

**Failure:**
```
✗ src/components/ui/button/registry-item.json invalid
[error details...]
```

Validation runs automatically before every build via the `prebuild` hook.

## 🔧 Configuration

### components.json

The registry configuration in `components.json`:

```json
{
  "registries": {
    "@local": "https://helvetiaai.github.io/ui-registry/{name}.json",
    "@ui": "https://ui.shadcn.com/r/{name}.json"
  }
}
```

- **`@local`** - Points to this private registry on GitHub Pages
- **`@ui`** - Points to the public Shadcn registry
- **`{name}`** - Placeholder replaced by component name

**Note**: The registry URL does not include `/r/` in the path because GitHub Pages serves the `dist/` directory as the root.

### Namespace Usage

Consuming projects can install from either registry:

```bash
# Install from private registry
npx shadcn add @local/button

# Install from public registry
npx shadcn add @ui/alert-dialog
```

## 📦 Registry Items

### Current Components

- `alert` - Alert component with variants
- `alert-dialog` - Alert dialog component
- `badge` - Badge component
- `button` - Button with multiple variants and sizes
- `card` - Card container with header, content, footer
- `combobox` - Combobox component
- `dropdown-menu` - Dropdown menu
- `field` - Form field wrapper
- `input` - Text input component
- `input-group` - Input group container
- `label` - Form label component
- `select` - Select dropdown
- `separator` - Visual separator
- `textarea` - Textarea component

### Example Blocks

- `login-block` - Login form block using Card, Input, Label, Button

## 📚 Documentation

- **[Registry Guidelines](./docs/registry-guidelines.md)** - Complete integration guide for consuming projects
- **[Registry Items Examples](./docs/registry-items.md)** - Examples of different registry item types

## 🛠️ Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build project (includes validation) |
| `npm run registry:build` | Build registry files |
| `npm run registry:validate` | Validate all registry items |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## 🚢 Deployment

### GitHub Pages (Automated)

The registry is automatically deployed to GitHub Pages via GitHub Actions on every push to the `main` branch.

**The deployment workflow** (`.github/workflows/deploy.yml`):
1. Checks out the code
2. Installs dependencies (`npm ci`)
3. Builds the registry (`npm run registry:build`)
4. Verifies `dist/` contents
5. Uploads `dist/` as a GitHub Pages artifact
6. Deploys to GitHub Pages automatically

**To enable GitHub Pages**:
1. Go to repository **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow will automatically deploy on the next push to `main`

**Manual deployment** (if needed):
- Simply push changes to `main` branch - deployment happens automatically
- Or manually trigger the workflow from the Actions tab in GitHub

### Registry URL for GitHub Pages

After deployment, consuming projects should use:

```json
{
  "registries": {
    "@local": "https://helvetiaai.github.io/ui-registry/{name}.json",
    "@ui": "https://ui.shadcn.com/r/{name}.json"
  }
}
```

Replace `helvetiaai` with your GitHub username or organization name.

### Other Static Hosting

For other hosting services (Vercel, Netlify, S3, etc.):

1. **Build the registry**: `npm run registry:build`
2. **Deploy `dist/`** directory to your hosting service
3. **Update registry URL** in consuming projects' `components.json`

### Example URLs

After deployment, registry files will be accessible at:

- `https://helvetiaai.github.io/ui-registry/registry.json`
- `https://helvetiaai.github.io/ui-registry/button.json`
- `https://helvetiaai.github.io/ui-registry/card.json`

## 🔍 Troubleshooting

### Validation Failures

If validation fails:

1. Check error messages for missing required fields
2. Compare against the schema: `https://ui.shadcn.com/schema/registry-item.json`
3. Ensure `$schema` field is present and correct

### Build Issues

If build fails:

1. Run validation separately: `npm run registry:validate`
2. Check `registry.json` syntax
3. Verify all referenced component files exist

### Component Not Found

If components aren't found after deployment:

1. Verify `dist/` was deployed correctly (check GitHub Actions workflow)
2. Check registry URL in consuming projects (should not include `/r/` path)
3. Test registry endpoint: `curl https://helvetiaai.github.io/ui-registry/registry.json`
4. Wait 2-3 minutes after deployment for GitHub Pages to propagate

## 🤝 Contributing

### Adding Components

1. Create component source file in `src/components/ui/`
2. Add `registry-item.json` manifest in `src/components/ui/<name>/`
3. Update `registry.json` with component entry
4. Validate: `npm run registry:validate`
5. Build: `npm run registry:build`
6. Push to `main` branch (triggers automatic deployment)
7. Test installation in a consuming project after deployment completes

### Best Practices

- ✅ Always validate before committing
- ✅ Follow Shadcn component patterns
- ✅ Include proper TypeScript types
- ✅ Document component props and usage
- ✅ Test components in isolation
- ✅ Keep registry items schema-compliant

## 📄 License

[Add your license here]

## 🔗 Links

- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Shadcn Registry Schema](https://ui.shadcn.com/schema/registry-item.json)
- [Shadcn CLI](https://github.com/shadcn-ui/cli)

---

**Built with** React 19.2, Vite 7.2, Tailwind 4.1, and Shadcn UI 3.6
