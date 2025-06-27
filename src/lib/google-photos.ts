import { Auth } from 'googleapis'
import { getTokens } from './google'

export interface Photo {
  id: string
  baseUrl: string
  filename: string
  description?: string
  creationTime: string
}

interface Album {
  id: string
  title: string
}

interface MediaItem {
  id: string
  baseUrl: string
  filename: string
  description?: string
  mediaMetadata: {
    creationTime: string
  }
}

const API_BASE_URL = 'https://photoslibrary.googleapis.com/v1'

const placeholderPhotos: Photo[] = [
    {
      id: "1",
      baseUrl: "https://picsum.photos/seed/a/1200/1800",
      filename: "Vertical Ascent",
      description: "A climber scaling a steep rock face.",
      creationTime: "2023-08-15T14:30:00Z",
    },
    {
      id: "2",
      baseUrl: "https://picsum.photos/seed/b/1600/1200",
      filename: "Forest Light",
      description: "Sunbeams filtering through a dense forest canopy.",
      creationTime: "2023-09-02T09:15:00Z",
    },
    {
      id: "3",
      baseUrl: "https://picsum.photos/seed/c/1200/1600",
      filename: "City at Dusk",
      description: "An urban skyline as day turns to night.",
      creationTime: "2023-07-21T19:45:00Z",
    },
    {
      id: "4",
      baseUrl: "https://picsum.photos/seed/d/1800/1200",
      filename: "Coastal Serenity",
      description: "Calm waves washing over a sandy shore.",
      creationTime: "2023-10-10T17:00:00Z",
    },
    {
      id: "5",
      baseUrl: "https://picsum.photos/seed/e/1200/1500",
      filename: "Mountain Majesty",
      description: "A lone hiker admires a grand mountain range.",
      creationTime: "2023-11-05T11:20:00Z",
    },
    {
      id: "6",
      baseUrl: "https://picsum.photos/seed/f/1920/1080",
      filename: "Desert Horizon",
      description: "The vast expanse of a desert under a clear sky.",
      creationTime: "2023-06-12T06:55:00Z",
    },
    {
      id: "7",
      baseUrl: "https://picsum.photos/seed/g/1200/1600",
      filename: "Abstract Architecture",
      description: "Close-up of a modern building's geometric lines.",
      creationTime: "2023-08-30T13:10:00Z",
    },
    {
      id: "8",
      baseUrl: "https://picsum.photos/seed/h/1600/1200",
      filename: "Autumn Pathway",
      description: "A leaf-strewn path in a park during autumn.",
      creationTime: "2023-10-22T15:00:00Z",
    }
];

async function findPortfolioAlbumId(
  auth: Auth.OAuth2Client,
): Promise<string | null> {
  const accessToken = (await auth.getAccessToken()).token
  if (!accessToken) {
    throw new Error('Could not retrieve access token')
  }

  let pageToken: string | undefined
  do {
    const params = new URLSearchParams()
    if (pageToken) {
      params.append('pageToken', pageToken)
    }
    const response = await fetch(
      `${API_BASE_URL}/albums?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    if (!response.ok) {
      console.error('Failed to fetch albums:', await response.text())
      throw new Error(`Failed to fetch albums: ${response.statusText}`)
    }

    const data = await response.json()
    const portfolioAlbum = data.albums?.find(
      (album: Album) => album.title === process.env.GOOGLE_ALBUM_TITLE,
    )

    if (portfolioAlbum) {
      return portfolioAlbum.id
    }

    pageToken = data.nextPageToken
  } while (pageToken)

  return null
}

export async function getPhotos(): Promise<Photo[]> {
  const auth = getTokens()

  if (!auth) {
    console.log('User not authenticated, returning placeholder photos.')
    return placeholderPhotos
  }

  try {
    const accessToken = (await auth.getAccessToken()).token
    if (!accessToken) {
      throw new Error('Could not retrieve access token')
    }

    const albumId = await findPortfolioAlbumId(auth)
    if (!albumId) {
      console.log(
        `Portfolio album "${process.env.GOOGLE_ALBUM_TITLE}" not found.`,
      )
      return []
    }

    const photos: Photo[] = []
    let pageToken: string | undefined

    do {
      const response = await fetch(`${API_BASE_URL}/mediaItems:search`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          albumId,
          pageSize: 100,
          pageToken,
        }),
      })

      if (!response.ok) {
        console.error('Failed to fetch photos:', await response.text())
        throw new Error(`Failed to fetch photos: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.mediaItems) {
        const items: Photo[] = data.mediaItems
          .filter((item: MediaItem) => item.mediaMetadata)
          .map((item: MediaItem) => ({
            id: item.id,
            baseUrl: `${item.baseUrl}=w2048`,
            filename: item.filename,
            description: item.description,
            creationTime: item.mediaMetadata.creationTime,
          }))
        photos.push(...items)
      }

      pageToken = data.nextPageToken
    } while (pageToken)

    return photos
  } catch (error) {
    console.error('Failed to get photos:', error)
    if (error instanceof Error && error.message.includes('401')) {
      // This indicates an auth issue.
      console.error("Please re-authenticate.")
    }
    return placeholderPhotos
  }
}
