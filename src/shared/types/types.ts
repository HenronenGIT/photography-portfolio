export interface Photo {
  id: number
  src: string
  title: string
  category: string
  location?: string
  createdAt?: string
  size?: number
}

export interface Album {
  id: string
  title: string
}

export interface MediaItem {
  id: string
  baseUrl: string
  filename: string
  description?: string
  mediaMetadata: {
    creationTime: string
  }
}
