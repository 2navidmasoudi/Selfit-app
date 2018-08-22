import React, { Component } from 'react';
import { Container } from 'native-base';
import { FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { tokenBlog, incrementMin, decrementMin, refreshBlog, receiveBlog } from '../../../redux/actions';
import { logError } from '../../../services/log';
import { getAllBlog, getSearchBlog } from '../../../services/blog';
import BlogCard from './blogCard';
import Loader from '../../loader';

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
      max: 70,
      loading: false,
      refreshing: false,
      search: '',
      searchMode: false,
    };
    this.searchText = this.searchText.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }
  componentWillMount() {
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
    this.setInfo();
  }
  componentWillUnmount() {
    this.props.refreshBlog();
  }
  async setInfo() {
    await this.props.tokenBlog('selfit.public');
    await this.getAllBlog();
  }
  async getAllBlog() {
    try {
      this.setState({ loading: true });
      const { max } = await this.state;
      const { tokenmember } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const BlogList = await getAllBlog(tokenmember, tokenapi, max, min, null);
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
      const { search, max } = await this.state;
      const { tokenmember } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const BlogList = await getSearchBlog(search, tokenmember, tokenapi, max, min, null);
      console.log(BlogList);
      await this.props.receiveBlog(BlogList, min);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      logError(error, 'getSearchBlog', 'root/blog', 'getSearchBlog');
      this.setState({ loading: false });
    }
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
  renderItem = ({ item }) => <BlogCard blog={item} />
  render() {
    return (
      <Container>
        <AppHeader rightTitle="بیشتر بدانید" backButton="flex" />
        <SearchBar
          showLoading
          onChangeText={this.searchText}
          placeholder="تیتر، متن و ..."
        />
        <FlatList
          data={this.props.BlogList}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.blogid}
          ListEmptyComponent={<Loader loading={this.state.loading} />}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      </Container>
    );
  }
}
