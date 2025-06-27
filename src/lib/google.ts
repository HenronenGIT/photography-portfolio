import { google } from 'googleapis'

export const SCOPES = ['https://www.googleapis.com/auth/photoslibrary.readonly']

export const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
)

let tokens: any = null

/**
 * Saves the user's tokens to a secure in-memory store.
 * In a real-world application, this should be a secure, persistent store like a database or a secret manager.
 * @param newTokens The tokens to save.
 */
export function saveTokens(newTokens: any) {
  tokens = newTokens
  oAuth2Client.setCredentials(tokens)
  console.log('Tokens saved in-memory.')
}

/**
 * Reads previously saved credentials from the in-memory store.
 * @return {Promise<OAuth2Client|null>}
 */
export function getTokens() {
  if (tokens) {
    oAuth2Client.setCredentials(tokens)
    return oAuth2Client
  }
  return null
}

// Listen for token updates and save them in-memory
oAuth2Client.on('tokens', (newTokens) => {
  if (newTokens.refresh_token) {
    console.log('Got a new refresh token:', newTokens.refresh_token)
  }
  const updatedTokens = { ...tokens, ...newTokens }
  saveTokens(updatedTokens)
})
