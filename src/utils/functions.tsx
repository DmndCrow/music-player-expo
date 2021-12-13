import { Asset } from 'expo-media-library';
import { audioState } from '../models/reduxState';

const getAssetTitle = (asset: Asset | null) => {
  if (asset) {
    const title = asset?.filename?.replace('.mp3', '');
    title.trim();

    return title;
  }
  return 'Empty title';
};

const getDurationAsString = (duration: number) => {
  if (duration) {
    return new Date(duration).toISOString().substr(14, 5);
  }
  return '00:00';
};

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export {
  getAssetTitle,
  getDurationAsString,
  shuffleArray
};
