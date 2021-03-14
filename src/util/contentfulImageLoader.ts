import { ImageLoader } from 'next/image';

const contentfulImageLoader: ImageLoader = ({ src, width, quality }) => {
  return `https:${src}?w=${width}&q=${quality || 75}&fm=webp`;
};

export default contentfulImageLoader;
