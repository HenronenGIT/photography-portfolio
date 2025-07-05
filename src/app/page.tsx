import HomeView from '@/components/HomeView';
import { GCS_FOLDERS } from '@/lib/constants';
import { getPhotosFromGCS } from '@/lib/gcs';

export default async function HomePage() {
  const [heroPhotos, galleryPhotos] = await Promise.all([
    getPhotosFromGCS(GCS_FOLDERS.HERO_PHOTO),
    getPhotosFromGCS(GCS_FOLDERS.LANDING_PAGE),
  ]);

  const heroPhoto = heroPhotos[0];

  return <HomeView heroPhoto={heroPhoto} galleryPhotos={galleryPhotos} />;
}
