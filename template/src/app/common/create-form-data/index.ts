/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Create FormData
 */
const createWithPhoto = (photo: Array<any>, body: any) => {
  const data = new FormData();

  if (Array.isArray(photo)) {
    photo.forEach(element => {
      data.append('image[]', {
        name: element.node.image.filename,
        uri: element.node.image.uri,
        type: element.node.type,
      } as any);
    });
  }

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

export { createWithPhoto };
