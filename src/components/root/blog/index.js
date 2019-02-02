/* eslint-disable no-console */
import React, { Component } from 'react';
import { Card, CardItem, Container, Content, Icon, Left, Right } from 'native-base';
import { Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import listToTree from 'list-to-tree-lite';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { tokenBlog, incrementMin, decrementMin, refreshBlog, receiveBlog } from '../../../redux/actions';
import { logError } from '../../../services/log';
import { getCategoryBlog } from '../../../services/blog';
import BlogCard from './blogCard';
import Loader from '../../loader';
import { Text } from '../../Kit';

const MaterialSource = 'https://selfit.ir/Resource/Material/';

@connect(state => ({
  user: state.user,
  tokenapi: state.blog.tokenapi,
  BlogList: state.blog.BlogList,
  min: state.blog.min,
}), {
  tokenBlog,
  receiveBlog,
  incrementMin,
  decrementMin,
  refreshBlog,
})
export default class Blog extends Component {
  constructor() {
    super();
    this.state = {
      blogCategory: [],
      categoryLoading: true
    };
    this.onItemPress = (item) => {
      Actions.blogChildren({
        blogCategory: item.children,
        categoryTitle: item.titlecategory,
        idcategory: item.idblog_category
      });
      console.log(item);
    };
  }
  async componentWillMount() {
    await this.props.tokenBlog('selfit.public');
    await this.getCategoryBlog();
    await this.listToTree();
    const { tokenmember, tokenapi } = await this.props.user;
    putCheckToken(tokenmember, tokenapi);
  }
  componentWillUnmount() {
    this.props.refreshBlog();
  }
  async getCategoryBlog() {
    try {
      const { tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      const blogCategory = await getCategoryBlog(tokenmember, tokenapi, 70, 0);
      this.setState({ blogCategory, categoryLoading: false });
    } catch (e) {
      await logError(e, 'getCategoryBlog', 'root/blog', 'getCategoryBlog');
      this.setState({ categoryLoading: false });
    }
  }
  async listToTree() {
    const { blogCategory } = await this.state;
    const Tree = await listToTree(blogCategory, {
      idKey: 'idblog_category',
      parentKey: 'parentidcategory',
    });
    this.setState({ blogCategory: Tree, categoryLoading: false });
  }
  renderItem = ({ item }) => <BlogCard blog={item} />;
  render() {
    return (
      <Container>
        <AppHeader rightTitle="آموزش" />
        <Content padder>
          <Card style={{ flex: 0 }}>
            <CardItem style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} header bordered>
              <Left style={{ flex: 1 }} />
              <Text
                type="bold"
                style={{ flex: 5, textAlign: 'center' }}
              >
              دسته بندی آموزش
              </Text>
              <Icon active name="book" style={{ flex: 1 }} />
            </CardItem>
            {this.state.blogCategory.map(c => (
              <CardItem
                button
                key={c.idblog_category}
                bordered
                cardBody
                onPress={() => this.onItemPress(c)}
              >
                <Image
                  source={{ uri: `${MaterialSource}${c.piccategory}` }}
                  style={{ width: 50, height: 50, marginHorizontal: 10 }}
                />
                <Text style={{ flex: 5 }}>{c.titlecategory}</Text>
                <Right style={{ flex: 1, alignItems: 'center' }}>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
             ))}
          </Card>
          {this.state.categoryLoading &&
          <Loader loading={this.state.categoryLoading} />}
        </Content>
      </Container>
    );
  }
}
