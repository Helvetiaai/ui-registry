import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { readFileSync } from 'fs'
import { glob } from 'glob'
import { resolve } from 'path'

const ajv = new Ajv({ 
  allErrors: true, 
  strict: false,
  validateSchema: false // Skip meta-schema validation
})
addFormats(ajv)

// Load schema
const schemaPath = resolve(process.cwd(), 'schema-registry-item.json')
const schemaContent = readFileSync(schemaPath, 'utf8')
const schema = JSON.parse(schemaContent)

// Remove $schema to avoid meta-schema issues
delete schema.$schema

const validate = ajv.compile(schema)

// Find all registry-item.json files
const files = glob.sync('src/components/ui/**/registry-item.json', { cwd: process.cwd() })

let allValid = true

for (const file of files) {
  const filePath = resolve(process.cwd(), file)
  const data = JSON.parse(readFileSync(filePath, 'utf8'))
  
  const valid = validate(data)
  
  if (valid) {
    console.log(`✓ ${file} valid`)
  } else {
    console.error(`✗ ${file} invalid`)
    console.error(validate.errors)
    allValid = false
  }
}

if (allValid) {
  console.log(`\n✓ All ${files.length} files validated successfully`)
  process.exit(0)
} else {
  console.error(`\n✗ Validation failed`)
  process.exit(1)
}
