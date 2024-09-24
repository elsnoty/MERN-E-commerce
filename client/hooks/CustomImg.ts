import { useState } from 'react';

export const useImage = (initialImage: string) => {
  const [currentImage, setCurrentImage] = useState(initialImage);

  const changeImage = (newImage: string) => setCurrentImage(newImage);

  return {
    currentImage,
    changeImage,
  };
};
