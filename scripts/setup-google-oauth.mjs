import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { exec } from 'node:child_process'
import readline from 'node:readline'
import { google } from 'googleapis'

const PORT = 3456
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`
const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events'
]

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve))

async function main() {
  console.log('\n=============================================================')
  console.log('  Google Calendar & Google Meet OAuth Setup for Nuxt')
  console.log('=============================================================\n')
  console.log('To automatically create Google Calendar events and real Google')
  console.log('Meet links for every booking, we need OAuth credentials from')
  console.log('your Google Cloud Console (under thefeelgoodcentre.2026@gmail.com).\n')
  console.log('If you do not have them yet:')
  console.log('1. Go to: https://console.cloud.google.com')
  console.log('2. Create/Select a Project and enable "Google Calendar API"')
  console.log('3. In "APIs & Services" > "Credentials" > "Create Credentials" > "OAuth client ID"')
  console.log('   - Application type: Web application')
  console.log('   - Name: The Feel Good Centre Booking')
  console.log(`   - Authorized redirect URIs: ${REDIRECT_URI}`)
  console.log('4. Copy the Client ID and Client Secret.\n')

  const clientId = (await question('Enter your Google Client ID: ')).trim()
  const clientSecret = (await question('Enter your Google Client Secret: ')).trim()

  if (!clientId || !clientSecret) {
    console.error('\nError: Both Client ID and Client Secret are required.')
    rl.close()
    process.exit(1)
  }

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    REDIRECT_URI
  )

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES
  })

  const server = http.createServer(async (req, res) => {
    try {
      if (req.url && req.url.startsWith('/oauth2callback')) {
        const urlParams = new URL(req.url, `http://localhost:${PORT}`)
        const code = urlParams.searchParams.get('code')

        if (code) {
          const { tokens } = await oauth2Client.getToken(code)
          const refreshToken = tokens.refresh_token

          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(`
            <html>
              <body style="font-family:sans-serif;text-align:center;padding:50px;background:#fbf6f2;">
                <h1 style="color:#1e4635;">Authorization Successful!</h1>
                <p>Google Calendar & Google Meet sync is now configured.</p>
                <p>You can close this tab and return to your terminal.</p>
              </body>
            </html>
          `)

          server.close()
          rl.close()

          console.log('\n=============================================================')
          console.log('  SUCCESS! Refresh Token Acquired')
          console.log('=============================================================\n')

          if (!refreshToken) {
            console.log('Warning: Google did not return a new refresh token because permission')
            console.log('was already granted. If you need a new one, revoke access at:')
            console.log('https://myaccount.google.com/permissions and run this script again.\n')
          }

          // Append or update .env file
          const envPath = path.resolve(process.cwd(), '.env')
          let envContent = ''
          if (fs.existsSync(envPath)) {
            envContent = fs.readFileSync(envPath, 'utf8')
          }

          const setEnvVar = (content, key, val) => {
            const regex = new RegExp(`^${key}=.*$`, 'm')
            if (regex.test(content)) {
              return content.replace(regex, `${key}=${val}`)
            }
            return content.trim() + `\n${key}=${val}\n`
          }

          envContent = setEnvVar(envContent, 'NUXT_GOOGLE_CLIENT_ID', clientId)
          envContent = setEnvVar(envContent, 'NUXT_GOOGLE_CLIENT_SECRET', clientSecret)
          if (refreshToken) {
            envContent = setEnvVar(envContent, 'NUXT_GOOGLE_REFRESH_TOKEN', refreshToken)
          }
          envContent = setEnvVar(envContent, 'NUXT_GOOGLE_CALENDAR_ID', 'primary')

          fs.writeFileSync(envPath, envContent)
          console.log('Updated .env with:')
          console.log(`NUXT_GOOGLE_CLIENT_ID=${clientId}`)
          console.log(`NUXT_GOOGLE_CLIENT_SECRET=${clientSecret}`)
          if (refreshToken) {
            console.log(`NUXT_GOOGLE_REFRESH_TOKEN=${refreshToken}`)
          }
          console.log(`NUXT_GOOGLE_CALENDAR_ID=primary\n`)
          console.log('Your Nuxt dev server will now automatically create real Google Meet')
          console.log('links and calendar events on confirmed bookings!\n')
          process.exit(0)
        }
      }
    } catch (err) {
      console.error('Error during token exchange:', err)
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      res.end('Authentication failed: ' + err.message)
      server.close()
      rl.close()
      process.exit(1)
    }
  })

  server.listen(PORT, () => {
    console.log(`\nOpening browser for authorization with Google...\n`)
    console.log(`If it doesn't open automatically, click here:\n${authUrl}\n`)
    exec(`open "${authUrl}"`)
  })
}

main().catch(console.error)
