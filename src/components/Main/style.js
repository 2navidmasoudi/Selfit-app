import {Platform} from 'react-native';
import {MainWidth} from "./Window";
import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: -50,
        left: -50,
        bottom: -50,
        right: -50,
    },
    bgImg: {
        flex: 1,
        width: MainWidth
    },
    animationView: {
        flex: 1,
        marginTop: 40,
        marginBottom:60,
        marginHorizontal:50,
    },
    bgView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
    },
    animationTitle: {
        flex: 2,
        fontFamily: '$IS',
        color: 'white',
        fontSize: 36,
        textAlign: 'center',
        marginBottom: 20
    },
    animationDetail: {
        flex: 7,
        fontFamily: '$IS',
        color: 'white',
        fontSize: 18,
        marginHorizontal: 10,
        textAlign: (Platform.OS == 'ios') ? 'justify' : 'center',
    },
    animationClick: {
        flex: 1,
        fontFamily: '$IS',
        justifyContent: 'flex-end',
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 5
    }
});