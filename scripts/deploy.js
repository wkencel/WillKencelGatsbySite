const { execSync } = require('child_process')

const BUCKET = process.env.S3_BUCKET || 'willkencelhome2024'

function run(cmd) {
  console.log(`> ${cmd}`)
  execSync(cmd, { stdio: 'inherit' })
}

// Build
run('npm run build')

// Sync hashed assets with long cache (1 year, immutable)
run(
  `aws s3 sync out/_next/ s3://${BUCKET}/_next/ --delete --cache-control "public, max-age=31536000, immutable"`
)

// Sync HTML and other files with short cache (revalidate immediately)
run(
  `aws s3 sync out/ s3://${BUCKET}/ --delete --exclude "_next/*" --cache-control "public, max-age=0, must-revalidate"`
)

console.log('Deploy complete.')
