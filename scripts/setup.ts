import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'

const execAsync = promisify(exec)

async function setupProject() {
  console.log('🚀 Setting up dynamic portfolio with MongoDB integration...\n')

  // Check if .env.local exists
  const envPath = path.join(process.cwd(), '.env.local')
  try {
    await fs.access(envPath)
    console.log('✅ .env.local file exists')
  } catch {
    console.log('⚠️  .env.local file not found')
    console.log('📝 Creating .env.local from example...')
    
    try {
      const exampleEnv = await fs.readFile(path.join(process.cwd(), '.env.example'), 'utf-8')
      await fs.writeFile(envPath, exampleEnv)
      console.log('✅ Created .env.local file')
      console.log('🔧 Please update the MONGODB_URI in .env.local with your database connection string')
    } catch (error) {
      console.error('❌ Failed to create .env.local:', error)
      return
    }
  }

  // Check if MongoDB URI is configured
  try {
    const envContent = await fs.readFile(envPath, 'utf-8')
    if (envContent.includes('your_mongodb_connection_string_here')) {
      console.log('\n⚠️  MongoDB URI is not configured!')
      console.log('Please update MONGODB_URI in .env.local with your actual database connection string')
      console.log('\nExample MongoDB URIs:')
      console.log('- Local: mongodb://localhost:27017/portfolio')
      console.log('- Atlas: mongodb+srv://username:password@cluster.mongodb.net/portfolio')
      console.log('\nAfter updating the URI, run: npm run migrate')
      return
    }
  } catch (error) {
    console.error('❌ Failed to read .env.local:', error)
    return
  }

  // Run migration
  console.log('\n📊 Running database migration...')
  try {
    const { stdout, stderr } = await execAsync('npx tsx scripts/migrate.ts')
    console.log(stdout)
    if (stderr) console.error(stderr)
    console.log('✅ Database migration completed successfully!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    console.log('\nTroubleshooting:')
    console.log('1. Ensure MongoDB is running and accessible')
    console.log('2. Check your MONGODB_URI in .env.local')
    console.log('3. Verify network connectivity to your database')
    return
  }

  console.log('\n🎉 Setup completed successfully!')
  console.log('\nNext steps:')
  console.log('1. Run "npm run dev" to start the development server')
  console.log('2. Visit http://localhost:3000 to see your portfolio')
  console.log('3. Visit http://localhost:3000/admin to manage content')
  console.log('\nFeatures enabled:')
  console.log('✅ Dynamic content from MongoDB')
  console.log('✅ SEO optimization with ISR')
  console.log('✅ Admin panel for content management')
  console.log('✅ API routes for data management')
}

setupProject().catch(console.error)