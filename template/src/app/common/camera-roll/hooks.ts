// import { useCallback, useEffect, useState } from 'react';
// import { AppState, EmitterSubscription, Platform } from 'react-native';
export {};
// import {
//   cameraRollEventEmitter,
//   CameraRoll as PhotoGallery,
//   PhotoIdentifier,
// } from '@react-native-camera-roll/camera-roll';

// import { GalleryLogic, GalleryOptions, Media, MediaType } from './type';

// const isAndroid = Platform.OS === 'android';
// const isAboveIOS14 = parseInt(String(Platform.Version), 10) > 14;

// const convertMedia = (edges: Array<PhotoIdentifier>): Array<Media> => {
//   return edges.map(x => ({
//     uri: x.node.image.uri,
//     type: x.node.type as MediaType,
//     playableDuration: x.node.image?.playableDuration ?? 0,
//   }));
// };

// export const useGallery = ({
//   pageSize = 30,
//   assetType,
// }: GalleryOptions): GalleryLogic => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isReloading, setIsReloading] = useState(false);
//   const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
//   const [hasNextPage, setHasNextPage] = useState(false);
//   const [nextCursor, setNextCursor] = useState<string>();
//   const [medias, setMedias] = useState<Array<Media>>([]);

//   const loadNextPage = useCallback(async () => {
//     try {
//       nextCursor ? setIsLoadingNextPage(true) : setIsLoading(true);
//       const { edges, page_info } = await PhotoGallery.getPhotos({
//         first: pageSize,
//         after: nextCursor,
//         assetType,
//         ...(isAndroid && { include: ['fileSize', 'filename'] }),
//       });
//       const newMedias = convertMedia(edges);
//       console.log(JSON.stringify(edges));
//       setMedias(prev => [...(prev ?? []), ...newMedias]);

//       setNextCursor(page_info.end_cursor);
//       setHasNextPage(page_info.has_next_page);
//     } catch (error) {
//       console.error('useGallery getPhotos error:', error);
//     } finally {
//       setIsLoading(false);
//       setIsLoadingNextPage(false);
//     }
//   }, [assetType, nextCursor, pageSize]);

//   const getUnloadedPictures = useCallback(async () => {
//     try {
//       setIsReloading(true);
//       const { edges, page_info } = await PhotoGallery.getPhotos({
//         first: !medias || medias.length < pageSize ? pageSize : medias.length,
//         assetType,
//         // Include fileSize only for android since it's causing performance issues on IOS.
//         ...(isAndroid && { include: ['fileSize', 'filename'] }),
//       });
//       const newMedias = convertMedia(edges);
//       setMedias(newMedias);
//       setNextCursor(page_info.end_cursor);
//       setHasNextPage(page_info.has_next_page);
//     } catch (error) {
//       console.error('useGallery getNewPhotos error:', error);
//     } finally {
//       setIsReloading(false);
//     }
//   }, [assetType, pageSize, medias]);

//   useEffect(() => {
//     if (medias.length <= 0) {
//       loadNextPage();
//     }
//   }, [loadNextPage, medias]);

//   useEffect(() => {
//     const subscription = AppState.addEventListener(
//       'change',
//       async nextAppState => {
//         if (nextAppState === 'active') {
//           getUnloadedPictures();
//         }
//       },
//     );

//     return () => {
//       subscription.remove();
//     };
//   }, [getUnloadedPictures]);

//   useEffect(() => {
//     let subscription: EmitterSubscription;
//     if (isAboveIOS14) {
//       subscription = cameraRollEventEmitter.addListener(
//         'onLibrarySelectionChange',
//         _event => {
//           getUnloadedPictures();
//         },
//       );
//     }

//     return () => {
//       if (isAboveIOS14 && subscription) {
//         subscription.remove();
//       }
//     };
//   }, [getUnloadedPictures]);

//   return {
//     medias,
//     loadNextPage,
//     isLoading,
//     isLoadingNextPage,
//     isReloading,
//     hasNextPage,
//   };
// };
