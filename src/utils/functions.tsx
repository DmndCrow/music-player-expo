import { Asset } from "expo-media-library";

const get_asset_title = (asset: Asset | null) => {
  if (asset) {
    let title = asset?.filename?.replace('.mp3', '');
    title.trim();

    return title;
  }
  return 'Empty title'
}

const get_duration_as_string = (duration: number) => {
  if (duration) {
    return new Date(duration * 1000).toISOString().substr(14, 5);
  } else {
    return '00:00';
  }
}

export {
  get_asset_title,
  get_duration_as_string
}
