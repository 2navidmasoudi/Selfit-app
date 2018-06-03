import { StyleSheet, Dimensions } from 'react-native';
import { mainColor } from '../../../assets/variables/colors';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: mainColor
  },
  background: {
    width,
    height: undefined,
    resizeMode: 'stretch'
  },
  mainRowWrapper: { flex: 1, flexDirection: 'row' },
  wrapper: { flex: 1 },
});
export { styles };
