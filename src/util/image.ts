import { Asset } from 'contentful';

export const getImageDimensions = (image?: Asset) => {
  if (!image || !image.fields.file.details.image) {
    return { width: 100, height: 100 };
  }
  const {
    width: imageWidth,
    height: imageHeight,
  } = image.fields.file.details.image;
  const width = Math.min(imageWidth, 2048);
  const height = (imageHeight / imageWidth) * width;
  return { width, height };
};
