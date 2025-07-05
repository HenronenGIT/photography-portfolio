import HomeView from '@/components/HomeView'
import { GCS_FOLDERS } from '@/lib/constants'
import { getPhotosFromGCS } from '@/lib/gcs'

export default async function HomePage() {
  const allPhotos = await getPhotosFromGCS(GCS_FOLDERS.LANDING_PAGE)
  const featuredPhotos = allPhotos.slice(0, 3)

  return <HomeView featuredPhotos={featuredPhotos} />
}
