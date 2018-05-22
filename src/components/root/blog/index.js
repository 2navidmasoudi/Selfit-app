import React , { Component } from 'react';
import {
    Container,
    Text, Item, Icon, Input,
    Content, Header, Left, Button, Spinner
} from 'native-base';
import { Image , FlatList , List} from 'react-native';
import AppHeader from '../../header';
import { connect } from 'react-redux';
import { putCheckToken } from '../../../services/index';
import { tokenBlog, incrementMin, decrementMin, refreshBlog, receiveBlog } from '../../../redux/actions';
import { logError } from '../../../services/log';
import { getAllBlog, getSearchBlog } from '../../../services/blog';
import Loader from '../../loader';
import BlogCard from './blogCard';
class Blog extends Component {
    constructor(){
        super();
        this.state = {
            max:10,
            ssort: true,
            fsort:0,
            loading:false,
            refreshing: false,
            search:'',
            searchMode:false,
        }
    }
    componentWillMount(){
        this.setInfo();
        let {tokenmember,tokenapi} = this.props.user;
        putCheckToken(tokenmember,tokenapi);
    }
    async setInfo(){
        await this.props.tokenBlog('selfit.public');
        await this._getAllBlog();
    }
    async searchText(text){
        if(text) {
            await this.setState({
                search:text
            });
        } else {
            await this.setState({
                searchMode:false,search:''
            })
            await this.props.refreshBlog();
            this._getAllBlog();
        }
    }

    render() {
        const searchHeader = 
            <Header searchBar rounded style={{backgroundColor:'white'}}  androidStatusBarColor='#313131' iosBarStyle="light-content">
                <Left style={{flex:2}}>
                    <Button block info 
                        disabled={this.state.search===''} 
                        onPress={this._getSearchBlog.bind(this)}>
                        <Text>جستجو</Text>
                    </Button>
                </Left>
                <Item style={{flex:5}}>
                    <Icon name="search" />
                    <Input 
                        placeholder="تیتر، متن و ..." 
                        onChangeText={(text)=>this.searchText(text)}/>
                    <Icon name="people" />
                </Item>
            </Header>
        return(
            <Container>
                <Loader
                    loading={this.state.loading}/>
                <AppHeader rightTitle="بیشتر بدانید" backButton={"flex"}/>
                {searchHeader}
                <Content padder>
                    <FlatList
                        data={this.props.BlogList}
                        renderItem={(item)=>this.renderItem(item)}
                        keyExtractor={(item)=>item.blogid}
                        ListEmptyComponent={()=><Spinner/>}
                        onRefresh={this.handleRefresh.bind(this)}
                        refreshing={this.state.refreshing}
                        onEndReached={this.handleLoadMore.bind(this)}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={this.renderFooter.bind(this)}
                    />
                </Content>
            </Container>
        )
    }
    async _getAllBlog(){
        try {
            this.setState({loading:true});
            let {max,ssort,fsort} = await this.state;
            let {tokenmember} = await this.props.user;
            let {min,tokenapi} = await this.props;
            let BlogList = await getAllBlog(tokenmember,tokenapi,max,min,ssort,fsort);
            console.log(BlogList);
            await this.props.receiveBlog(BlogList,min);
            this.setState({loading:false});

        } catch (error) {
            console.log(error);
            logError(error,'getAllBlog','root/blog','_getAllBlog'); 
            this.props.decrementMin();
            this.setState({loading:false}); 
        }
    }
    async _getSearchBlog(){
        try {
            if (!this.state.search) this.refreshBlog();
            await this.setState({
                searchMode:true,loading:true
            });
            let {search,max,ssort,fsort} = await this.state;
            let {tokenmember} = await this.props.user;
            let {min,tokenapi} = await this.props;
            let BlogList = await getSearchBlog(search,tokenmember,tokenapi,max,min,ssort,fsort);
            console.log(BlogList);
            await this.props.receiveBlog(BlogList,min);
            this.setState({loading:false,refreshing:false});
        } catch (error) {
            console.log(error);
            logError(error,'getSearchBlog','root/blog','_getSearchBlog'); 
            this.props.decrementMin();
            this.setState({loading:false}); 
        }
    }
    renderItem({item}) {
        return <BlogCard blog={item}/>
    }
    async handleLoadMore(){

        if (this.props.BlogList.length>=10 && !this.state.loading) {
            console.log('Request Load More');
            this.props.incrementMin();
            this.setState({loading: true});
            if (!this.state.searchMode) {
                this._getAllBlog();
            } else {
                this._getSearchBlog();
            }
        }
    }
    handleRefresh(){
        this.props.refreshBlog();
        this.setState({refreshing:true});
        if (!this.state.searchMode) {
            this._getAllBlog();
        } else {
            this._getSearchBlog();
        }
    }
    renderFooter(){
        if(!this.state.loading) return null;
        else
        return <Spinner/>
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        tokenBlog:(tokenapi)=>dispatch(tokenBlog(tokenapi)),
        receiveBlog:(blog,min)=>dispatch(receiveBlog(blog,min)),
        incrementMin:()=>dispatch(incrementMin()),
        decrementMin:()=>dispatch(decrementMin()),
        refreshBlog:()=>dispatch(refreshBlog()),
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        tokenapi: state.blog.tokenapi,
        BlogList: state.blog.BlogList,
        min: state.blog.min,
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Blog);