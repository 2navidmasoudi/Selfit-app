import { StyleSheet } from 'react-native';
import { mainColor } from '../../../assets/variables/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: mainColor
  },
  background: {
    width: '100%',
    resizeMode: 'stretch'
  },
  mainRowWrapper: { flex: 1, flexDirection: 'row' },
  wrapper: { flex: 1 },
});
export { styles };
