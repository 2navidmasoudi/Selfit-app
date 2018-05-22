import React, { Component } from 'react';
import { Image , View , StyleSheet , Modal } from 'react-native';
import { Fab , Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import ImageViewer from 'react-native-image-zoom-viewer';
export default class ShowImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            images:null
        }
    }
    componentWillMount(){
        console.log('state' , this.state , 'props' , this.props);
    }
    render() {
        const images = this.props.images ? this.props.images : [{url:this.props.uri}];
        return (
            // <View style={styles.imageWrapper}>
            //     <Image style={styles.bgContainer} resizeMode='contain' source={{uri:this.props.uri}} />
            //     <Fab
            //         style={{ backgroundColor: '#5067FF' }}
            //         position="topLeft"
            //         onPress={() => Actions.pop()}>
            //         <Icon name="md-arrow-round-back" />
            //     </Fab>
            // </View>
            <Modal animationType="slide" onRequestClose={()=>Actions.pop()}  visible={true} transparent={true}>
                <ImageViewer imageUrls={images} onSwipeDown={()=>Actions.pop()}/>
                <Fab
                    style={{ backgroundColor: '#5067FF' }}
                    position="topLeft"
                    onPress={() => Actions.pop()}>
                    <Icon name="md-arrow-round-back" />
                </Fab>
            </Modal>
        );
    }
}

