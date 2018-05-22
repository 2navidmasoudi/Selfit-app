import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#9DD6EB',
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    nonActive: {
        // backgroundColor: 'rgba(0,0,0,0.7)',
        backgroundColor: 'rgba(255,255,255,0.7)',
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 20,
    },
    activeDot: {
        width: 30, height: 30,
        // marginHorizontal: 15,
        justifyContent: 'center', alignItems: 'center'
    },
    btn: {
        paddingHorizontal: 5,
        fontSize: 50,
        color: '#fff',
        fontFamily: 'Arial'
    }

})