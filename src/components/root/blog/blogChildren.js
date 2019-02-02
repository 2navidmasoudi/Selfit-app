import React, { Component } from 'react';
import { FlatList, Image } from 'react-native';
import {
  Card,
  CardItem,
  Container,
  Content,
  Icon,
  Left,
  Right,
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../header';
import { Text } from '../../Kit';
import Loader from '../../loader';
import BlogCard from './blogCard';
import { tokenBlog } from '../../../redux/actions';
import { getCategoryChildrenBlog } from '../../../services/blog';

const MaterialSource = 'https://selfit.ir/Resource/Material/';
@connect(state => ({
  user: state.user,
  tokenapi: state.blog.tokenapi,
  BlogList: state.blog.BlogList,
  min: state.blog.min,
}), {
  tokenBlog,
})
export default class BlogChildren extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BlogList: [],
      loading: true,
      SelectCategory: props.blogCategory || [],
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
    await this.getAllBlog();
    console.log(this.props);
    console.log(this.state);
  }
  async getAllBlog() {
    try {
      this.setState({ loading: true });
      const { tokenmember } = await this.props.user;
      const { tokenapi, idcategory } = await this.props;
      console.log('idcategory');
      console.log(idcategory);
      const BlogList = await getCategoryChildrenBlog(idcategory, tokenmember, tokenapi, 70, 0, 'idblog%20desc');
      this.setState({ BlogList });
      this.setState({ loading: false });
    } catch (e) {
      console.log(e);
      this.setState({ loading: false });
    }
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
                {this.props.categoryTitle}
              </Text>
              <Icon active name="book" style={{ flex: 1 }} />
            </CardItem>
            {this.props.blogCategory.map(c => (
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
          <FlatList
            data={this.state.BlogList}
            renderItem={item => this.renderItem(item)}
            keyExtractor={item => item.blogid}
            ListEmptyComponent={
              <Loader
                loading={this.state.loading}
                msg={this.state.SelectCategory.length > 0 ? 'دسته مورد نظر خود را انتخاب کنید.' : 'موردی یافت نشد.'}
              />
              }
            scrollEnabled={false}
          />
        </Content>
      </Container>
    );
  }
}
