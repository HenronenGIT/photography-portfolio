import { oAuth2Client, saveTokens } from '@/lib/google'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { error: 'Missing authorization code' },
      { status: 400 },
    )
  }

  try {
    const { tokens } = await oAuth2Client.getToken(code)
    oAuth2Client.setCredentials(tokens)
    saveTokens(tokens)

    // Redirect to portfolio or a success page
    const redirectUrl = new URL('/portfolio', request.nextUrl.origin)
    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('Error exchanging authorization code for tokens:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve access token' },
      { status: 500 },
    )
  }
}
