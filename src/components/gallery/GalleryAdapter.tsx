import GalleryRing from './GalleryRing'

interface GalleryAdapterProps {
  useMotionPlus?: boolean
}

/**
 * Clean decoupled swap point between Path A (Motion+ paid <Gallery>)
 * and Path B (Rotating 3D Ring Carousel + Lightbox with Framer Motion)
 */
export default function GalleryAdapter({ useMotionPlus = false }: GalleryAdapterProps) {
  if (useMotionPlus) {
    console.info('Motion+ path requested. Using GalleryRing until token is configured.')
  }

  return <GalleryRing />
}

