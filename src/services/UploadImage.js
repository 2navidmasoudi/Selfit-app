import RNFetchBlob from 'react-native-fetch-blob';
import { Selfit, Upload } from './type';

export const uploader = async (data, path, year, month, token, tokenapi) => {
  try {
    const response = await RNFetchBlob.fetch(
      'POST',
      `${Selfit}${Upload}UploadJsonFile?path=${path}&year=${year}&month=${month}&token=${token}&tokenapi=${tokenapi}`, {
        'Content-Type': 'multipart/form-data'
      }, data
    );
    const json = response.json();
    console.log('Upload/UploadJsonFile');
    console.log(json);
    return json;
  } catch (e) {
    console.log(e);
  }
};
