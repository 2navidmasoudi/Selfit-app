import EstyleSheet from 'react-native-extended-stylesheet';

export const TabsStyle= EstyleSheet.create({
    activeTab: {
        backgroundColor: '$statusBarColor',
    },
    notActiveTabs: {
        backgroundColor: '$headerColor',
    },
    text: {
        color: 'white',
    }
});