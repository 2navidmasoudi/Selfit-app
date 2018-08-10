import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'انتخاب تصویر',
  takePhotoButtonTitle: 'گرفتن از دوربین',
  chooseFromLibraryButtonTitle: 'گرفتن از گالری تصویر',
  cancelButtonTitle: 'انصراف',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default (callback) => {
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const source = { uri: response.uri };
      callback(source, response.data, response.type);
    }
  });
};
