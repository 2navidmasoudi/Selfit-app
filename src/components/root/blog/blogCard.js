import React, { Component } from 'react';
import { Image , WebView, View , TouchableWithoutFeedback , StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body , Right , List , ListItem} from 'native-base';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';

export default class BlogCard extends Component {
  render() {
    const { blog } = this.props;
    const m = moment(`${blog.datesave}`,'YYYY/MM/DDTHH:mm:ss');
    const datesaveblog = moment(`${blog.datesaveblog}`,'YYYY/MM/DDTHH:mm:ss');
    
    const jM = m.format('jYYYY/jMM');
    const jS = datesaveblog.format('jYYYY/jMM');

    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth()+1;
    const ImgSrc = `${blog.httpserver}${blog.pathserver}${ImgYear}/${ImgMonth}/${blog.picblog}`;
    const htmlContent = `<div>${blog.descblog}</div>`;
    // const htmlContent = `${blog.descblog}`;
    return (
        // <Card style={{flex: 0}}>
        //     <CardItem>
        //         <Left style={{flex:1}} >
        //             <Body>
        //                 <Text style={{flex:1,marginRight:10 ,fontFamily:'IRANSansMobile'}} >{blog.titleblog}</Text>
        //                 <Text style={{flex:1,marginRight:10 ,fontFamily:'IRANSansMobile'}} note>{jS}</Text>
        //             </Body>
        //             <TouchableWithoutFeedback onPress={()=>Actions.showImage({uri:ImgSrc})}>
        //                     <Thumbnail  source={{uri: ImgSrc }}  />
        //             </TouchableWithoutFeedback>
        //         </Left>
        //     </CardItem>
        //     <CardItem>
        //     <Body style={{flex:1}}>
        //         <Image source={{uri: ImgSrc}} style={{ flex: 1 , width: 200, height: null}}/>
        //         <HTMLView 
        //             value={htmlContent} 
        //             stylesheet={{flex:1,textAlign:'right'}}
        //             />
        //     </Body>
        //     </CardItem>
        // </Card>
        // <List style={{flex: 0}}>
        <TouchableWithoutFeedback onPress={()=>this.pressBlogHandler(blog)}>
            <Card style={{flex: 0}}>
                <CardItem>
                    <Left style={{flex:1}}>
                        <TouchableWithoutFeedback onPress={()=>Actions.showImage({uri:ImgSrc})}>
                                <Thumbnail square size={80}  source={{uri: ImgSrc }}  />
                        </TouchableWithoutFeedback>
                    </Left>
                    <Right style={{flex:3}}>
                        <Text style={{flex:1,marginRight:10,textAlign:'right' ,fontFamily:'IRANSansMobile'}} >{blog.titleblog}</Text>
                        {/* <Text style={{flex:1,marginRight:10 ,fontFamily:'IRANSansMobile'}} note>{jS}</Text> */}
                        {/*<HTMLView */}
                            {/*value={htmlContent} */}
                            {/*stylesheet={styles}*/}
                        {/*/>*/}
                    </Right>
                </CardItem>
            </Card>
        </TouchableWithoutFeedback>
        // </List>
    );

  }
  pressBlogHandler(blog){
    Actions.blogWeb({blog});
  }
}
const styles = StyleSheet.create({
    div: {
        color: '#000', // make links coloured pink
    //   textOverflow: 'ellipsis',
    //   maxHeight:40,
        textAlign:'right',
        height: 35,
    },
});