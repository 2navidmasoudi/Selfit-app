import RNFetchBlob from 'react-native-fetch-blob';
import {Selfit, Upload} from './type';

export const uploader = async (data, path, year, month, token, tokenapi) => {
    try {
        let response = await RNFetchBlob.fetch('POST',
            `${Selfit}${Upload}UploadJsonFile?path=${path}&year=${year}&month=${month}&token=${token}&tokenapi=${tokenapi}`, {
                'Content-Type': 'multipart/form-data'
            }, data);
        let json = response.json();
        return json;
    } catch (e) {
        console.log(e);
    }
};