import React from 'react';
import { Image, View, TouchableWithoutFeedback, ScrollView, Share } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Left,
  Body,
} from 'native-base';
import moment from 'moment-jalaali';
import HTMLView from 'react-native-htmlview';
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../header';
import { form } from '../../../assets/styles/index';
import { Text } from '../../Kit';

export default ({ blog }) => {
  const m = moment(`${blog.datesave}`, 'YYYY/MM/DDTHH:mm:ss');
  const ImgYear = m.jYear();
  const ImgMonth = m.jMonth() + 1;
  const ImgSrc = `${blog.httpserver}${blog.pathserver}${ImgYear}/${ImgMonth}/${blog.picblog}`;
  const htmlContent = `<div>${blog.descblog}</div>`;
  return (
    <Container>
      <AppHeader rightTitle="بیشتر بدانید" backButton="flex" />
      <Content>
        <Card>
          <CardItem>
            <Left style={{ flex: 1 }}>
              <Body>
                <Text style={{ marginRight: 10 }}>
                  {blog.titleblog}
                </Text>
              </Body>
              <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
                <Thumbnail source={{ uri: ImgSrc }} />
              </TouchableWithoutFeedback>
            </Left>
          </CardItem>
          <CardItem>
            <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
              <Image style={{ flex: 1, height: 220, width: null }} resizeMode="contain" source={{ uri: ImgSrc }} />
            </TouchableWithoutFeedback>
          </CardItem>
          <CardItem>
            <ScrollView style={{ flex: 1 }}>
              <HTMLView
                value={htmlContent}
                stylesheet={{ flex: 1, fontFamily: 'IRANSansMobile' }}
              />
            </ScrollView>
          </CardItem>
        </Card>
      </Content>
      <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
        <Button
          block
          style={[form.submitButton, { margin: 10, marginBottom: 20 }]}
          onPress={() => Share.share({
            message: ` بیشتر بدانید سلفیت | selfit : ${blog.titleblog} لینک: https://selfit.ir/#/Home/SingleBlog/${blog.blogid}`,
            title: `${blog.titleblog}`
          })}
        >
          <Text style={{ color: '#FFF' }}>اشتراک با دوستان</Text>
        </Button>
      </View>
    </Container>
  );
};
