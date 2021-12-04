import { Asset } from 'expo-media-library';

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

export {
  getAssetTitle,
  getDurationAsString,
};
