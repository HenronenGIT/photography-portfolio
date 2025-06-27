import { oAuth2Client, SCOPES } from '@/lib/google'
import { NextResponse } from 'next/server'

export async function GET() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent', // This will always ask for consent, which is good for getting a refresh token
  })

  return NextResponse.redirect(authUrl)
}
