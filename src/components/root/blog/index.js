import React, { Component } from 'react';
import {
  Container, Spinner
} from 'native-base';
import { FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { tokenBlog, incrementMin, decrementMin, refreshBlog, receiveBlog } from '../../../redux/actions';
import { logError } from '../../../services/log';
import { getAllBlog, getSearchBlog } from '../../../services/blog';
import BlogCard from './blogCard';

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
  state = {
    max: 10,
    ssort: true,
    fsort: 0,
    loading: false,
    refreshing: false,
    search: '',
    searchMode: false,
  };
  componentWillMount() {
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
    this.setInfo();
  }
  async setInfo() {
    await this.props.tokenBlog('selfit.public');
    await this._getAllBlog();
  }
  async searchText(text) {
    if (text) {
      await this.setState({
        search: text
      });
      this._getSearchBlog();
    } else {
      await this.setState({
        searchMode: false, search: ''
      });
      await this.props.refreshBlog();
      this._getAllBlog();
    }
  }
  async _getAllBlog() {
    try {
      this.setState({ loading: true });
      const { max, ssort, fsort } = await this.state;
      const { tokenmember } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const BlogList = await getAllBlog(tokenmember, tokenapi, max, min, ssort, fsort);
      console.log(BlogList);
      await this.props.receiveBlog(BlogList, min);
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
      logError(error, 'getAllBlog', 'root/blog', '_getAllBlog');
      this.props.decrementMin();
      this.setState({ loading: false });
    }
  }
  async _getSearchBlog() {
    try {
      if (!this.state.search) this.refreshBlog();
      await this.setState({
        searchMode: true, loading: true
      });
      const { search, max, ssort, fsort } = await this.state;
      const { tokenmember } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const BlogList = await getSearchBlog(search, tokenmember, tokenapi, max, min, ssort, fsort);
      console.log(BlogList);
      await this.props.receiveBlog(BlogList, min);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      logError(error, 'getSearchBlog', 'root/blog', '_getSearchBlog');
      this.props.decrementMin();
      this.setState({ loading: false });
    }
  }
  async handleLoadMore() {
    if (this.props.BlogList.length >= 10 && !this.state.loading) {
      console.log('Request Load More');
      this.props.incrementMin();
      this.setState({ loading: true });
      if (!this.state.searchMode) {
        this._getAllBlog();
      } else {
        this._getSearchBlog();
      }
    }
  }
  handleRefresh() {
    this.props.refreshBlog();
    this.setState({ refreshing: true });
    if (!this.state.searchMode) {
      this._getAllBlog();
    } else {
      this._getSearchBlog();
    }
    this.setState({ refreshing: false });
  }
  renderItem({ item }) {
    return <BlogCard blog={item} />;
  }
  renderFooter() {
    if (!this.state.loading) return null;
    return <Spinner />;
  }
  render() {
    return (
      <Container>
        <AppHeader rightTitle="بیشتر بدانید" backButton="flex" />
        <SearchBar
          showLoading
          onChangeText={this.searchText.bind(this)}
          placeholder="تیتر، متن و ..."
        />
        <FlatList
          data={this.props.BlogList}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.blogid}
          onRefresh={this.handleRefresh.bind(this)}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore.bind(this)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={this.renderFooter.bind(this)}
        />
      </Container>
    );
  }
}
