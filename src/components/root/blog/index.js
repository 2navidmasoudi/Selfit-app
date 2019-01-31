/* eslint-disable no-console */
import React, { Component } from 'react';
import { Card, CardItem, Container, Content, Icon, Left, Right } from 'native-base';
import { FlatList, Image, Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import listToTree from 'list-to-tree-lite';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { tokenBlog, incrementMin, decrementMin, refreshBlog, receiveBlog } from '../../../redux/actions';
import { logError } from '../../../services/log';
import { getAllBlog, getCategoryBlog, getSearchBlog } from '../../../services/blog';
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
      loading: true,
      categoryLoading: true,
      refreshing: false,
      search: '',
      searchMode: false,
    };
    this.searchText = this.searchText.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
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
    const { tokenmember, tokenapi } = await this.props.user;
    putCheckToken(tokenmember, tokenapi);
    await this.props.tokenBlog('selfit.public');
    await this.getAllBlog();
    await this.getCategoryBlog();
    await this.listToTree();
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
  async getAllBlog() {
    try {
      this.setState({ loading: true });
      const { tokenmember } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const BlogList = await getAllBlog(tokenmember, tokenapi, 100, 0, 'idblog%20desc');
      console.log(BlogList);
      await this.props.receiveBlog(BlogList, min);
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
      logError(error, 'getAllBlog', 'root/blog', 'getAllBlog');
      this.setState({ loading: false });
    }
  }
  async getSearchBlog() {
    try {
      if (!this.state.search) this.refreshBlog();
      await this.setState({
        searchMode: true, loading: true
      });
      const { search } = await this.state;
      const { tokenmember } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const BlogList = await getSearchBlog(search, tokenmember, tokenapi, 250, min, 'blogid%20desc');
      console.log(BlogList);
      await this.props.receiveBlog(BlogList, min);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      logError(error, 'getSearchBlog', 'root/blog', 'getSearchBlog');
      this.setState({ loading: false });
    }
  }
  async listToTree() {
    const { blogCategory } = await this.state;
    const Tree = await listToTree(blogCategory, {
      idKey: 'idblog_category',
      parentKey: 'parentidcategory',
    });
    this.setState({ blogCategory: Tree, loading: false });
  }
  async searchText(text) {
    if (text) {
      await this.setState({
        search: text
      });
      this.getSearchBlog();
    } else {
      await this.setState({
        searchMode: false, search: ''
      });
      await this.props.refreshBlog;
      this.getAllBlog();
    }
  }
  async handleLoadMore() {
    if (this.props.BlogList.length >= 70 && !this.state.loading) {
      console.log('Request Load More');
      this.props.incrementMin();
      this.setState({ loading: true });
      if (!this.state.searchMode) {
        this.getAllBlog();
      } else {
        this.getSearchBlog();
      }
    }
  }
  handleRefresh() {
    this.props.refreshBlog();
    this.setState({ refreshing: true });
    if (!this.state.searchMode) {
      this.getAllBlog();
    } else {
      this.getSearchBlog();
    }
    this.setState({ refreshing: false });
  }
  renderItem = ({ item }) => <BlogCard blog={item} />;
  render() {
    return (
      <Container>
        <AppHeader rightTitle="آموزش" />
        <SearchBar
          showLoading
          onChangeText={this.searchText}
          placeholder="تیتر، متن و ..."
          inputStyle={{ textAlign: Platform.OS === 'ios' ? 'right' : undefined, fontFamily: 'IRANSansMobile', fontSize: 12 }}
        />
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
          <FlatList
            data={this.props.BlogList}
            renderItem={item => this.renderItem(item)}
            keyExtractor={item => item.blogid}
            ListEmptyComponent={<Loader loading={this.state.loading} />}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.5}
            scrollEnabled={false}
          />
        </Content>
      </Container>
    );
  }
}
