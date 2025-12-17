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
├── public/
│   └── r/                           # Generated registry files (deployed)
│       ├── registry.json            # Registry index
│       ├── button.json              # Individual component files
│       ├── card.json
│       ├── input.json
│       └── login-block.json
├── src/
│   └── components/
│       └── ui/
│           ├── button/
│           │   └── registry-item.json  # Component manifest
│           ├── button.tsx              # Component source
│           ├── card/
│           │   └── registry-item.json
│           └── card.tsx
├── registry/
│   └── new-york/
│       └── login-block/
│           └── login-block.tsx      # Block example
├── scripts/
│   └── validate-registry.js         # Validation script
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

### 1. Create Component Source

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

### 2. Create Registry Manifest

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
      "path": "src/components/ui/my-component/my-component.tsx",
      "type": "registry:component"
    }
  ]
}
```

### 3. Update Registry Index

Add the component to `registry.json`:

```json
{
  "name": "my-component",
  "type": "registry:ui",
  "files": [
    {
      "path": "src/components/ui/my-component.tsx",
      "content": "...",
      "type": "registry:ui"
    }
  ]
}
```

### 4. Validate and Build

```bash
# Validate the new component
npm run registry:validate

# Build the registry
npm run registry:build
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

- **`public/r/`** - Development/backup location
- **`dist/`** - GitHub Pages deployment directory

Each contains:
- `registry.json` - Master index of all items
- `{component-name}.json` - Individual component files with full content

The `dist/` folder is tracked in git and ready for GitHub Pages deployment.

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
    "@local": "http://localhost:3000/r/{name}.json",
    "@ui": "https://ui.shadcn.com/r/{name}.json"
  }
}
```

- **`@local`** - Points to this private registry
- **`@ui`** - Points to the public Shadcn registry
- **`{name}`** - Placeholder replaced by component name

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

### GitHub Pages

The registry is configured for GitHub Pages deployment using the `dist/` directory:

1. **Build the registry**: `npm run registry:build`
2. **Commit and push** the `dist/` folder:
   ```bash
   git add dist/
   git commit -m "Update registry files"
   git push
   ```
3. **Configure GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: `Deploy from branch`
   - Branch: `main` (or your default branch)
   - Folder: `/dist`
   - Click Save

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

1. Verify `public/r/` was deployed correctly
2. Check registry URL in consuming projects
3. Test registry endpoint: `curl https://your-registry.com/r/registry.json`

## 🤝 Contributing

### Adding Components

1. Create component source file
2. Add `registry-item.json` manifest
3. Update `registry.json`
4. Validate: `npm run registry:validate`
5. Build: `npm run registry:build`
6. Test installation in a consuming project

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
