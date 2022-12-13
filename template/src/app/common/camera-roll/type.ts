type AssetType = 'All' | 'Videos' | 'Photos';

export interface GalleryOptions {
  pageSize?: number;
  assetType: AssetType;
}

export type MediaType = 'image' | 'video';

export interface Media {
  uri: string;
  type: MediaType;
  playableDuration?: number;
}

export interface GalleryLogic {
  medias: Array<Media>;
  loadNextPage: () => void;
  isLoading: boolean;
  isLoadingNextPage: boolean;
  isReloading: boolean;
  hasNextPage: boolean;
}
