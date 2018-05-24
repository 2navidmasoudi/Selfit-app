import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'انتخاب تصویر',
  takePhotoButtonTitle: 'گرفتن از دوربین',
  chooseFromLibraryButtonTitle: 'گرفتن از گالری تصویر',
  cancelButtonTitle: 'انصراف',
  customButtons: [
    { name: 'ga', title: 'گرفتن از گالری سلفیت' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export const picker = (callback) => {
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = { uri: response.uri };
      callback(source, response.data, response.type);
    }
  });
};
