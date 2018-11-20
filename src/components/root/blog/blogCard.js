import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Left,
  Right,
} from 'native-base';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { Text } from '../../Kit';

export default class BlogCard extends Component {
  constructor() {
    super();
    this.pressBlogHandler = (blog) => {
      Actions.blogWeb({ blog });
    };
  }
  render() {
    const { blog } = this.props;
    const m = moment(`${blog.datesave}`, 'YYYY/MM/DDTHH:mm:ss');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${blog.httpserver}${blog.pathserver}${ImgYear}/${ImgMonth}/${blog.picblog}`;
    return (
      <TouchableWithoutFeedback onPress={() => this.pressBlogHandler(blog)}>
        <Card>
          <CardItem>
            <Left style={{ flex: 1 }}>
              <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
                <Thumbnail square size={80} source={{ uri: ImgSrc }} />
              </TouchableWithoutFeedback>
            </Left>
            <Right style={{ flex: 3 }}>
              <Text style={{ flex: 1, marginRight: 10 }}>
                {blog.titleblog}
              </Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}
