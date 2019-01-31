import React from 'react';
import { Image, ScrollView, Share } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Button,
  Left,
  Body,
} from 'native-base';
import moment from 'moment-jalaali';
import HTMLView from 'react-native-htmlview';
import AppHeader from '../../header';
import { form } from '../../../assets/styles/index';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { htmlStyle } from '../../../assets/styles/html';

export default ({ blog }) => {
  const m = moment(`${blog.datesave}`, 'YYYY/MM/DDTHH:mm:ss');
  const ImgYear = m.jYear();
  const ImgMonth = m.jMonth() + 1;
  const ImgSrc = `${blog.httpserver}${blog.pathserver}${ImgYear}/${ImgMonth}/${blog.picblog}`;
  const htmlContent = blog.descblog ? persianNumber(blog.descblog.replace(/(\r\n|\n|\r)/gm, '')) : '<p>فاقد توضیحات.</p>';
  return (
    <Container>
      <AppHeader rightTitle="بیشتر بدانید" backButton="flex" />
      <Content padder>
        <Card>
          <CardItem>
            <Left style={{ flex: 1 }}>
              <Body>
                <Text type="bold" style={{ marginRight: 10, fontSize: 16, textAlign: 'center' }}>
                  {blog.titleblog}
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Image style={{ flex: 1, height: 220, width: null }} resizeMode="contain" source={{ uri: ImgSrc }} />
          </CardItem>
          <CardItem>
            <ScrollView style={{ flex: 1 }}>
              <HTMLView
                value={htmlContent}
                stylesheet={htmlStyle}
              />
            </ScrollView>
          </CardItem>
        </Card>
      </Content>
      <Button
        full
        style={form.submitButton}
        onPress={() => Share.share({
            message: ` آموزش سلفیت | selfit : ${blog.titleblog} لینک: https://selfit.ir/#/Home/SingleBlog/${blog.blogid}`,
            title: `${blog.titleblog}`
          })}
      >
        <Text style={{ color: '#FFF' }}>اشتراک با دوستان</Text>
      </Button>
    </Container>
  );
};
