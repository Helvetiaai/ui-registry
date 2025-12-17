import { existsSync } from 'fs'
import { copyFile, mkdir, readdir } from 'fs/promises'
import { join } from 'path'

const sourceDir = join(process.cwd(), 'public', 'r')
const targetDir = join(process.cwd(), 'dist')

async function copyRegistryFiles() {
  try {
    // Create dist directory if it doesn't exist
    if (!existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true })
      console.log('✓ Created dist/ directory')
    }

    // Read all files from public/r/
    const files = await readdir(sourceDir)
    const jsonFiles = files.filter(file => file.endsWith('.json'))

    if (jsonFiles.length === 0) {
      console.warn('⚠ No JSON files found in public/r/')
      return
    }

    // Copy each JSON file
    let copiedCount = 0
    for (const file of jsonFiles) {
      const sourcePath = join(sourceDir, file)
      const targetPath = join(targetDir, file)
      await copyFile(sourcePath, targetPath)
      copiedCount++
    }

    console.log(`✓ Copied ${copiedCount} registry file(s) to dist/`)
  } catch (error) {
    console.error('✗ Error copying registry files:', error.message)
    process.exit(1)
  }
}

copyRegistryFiles()
