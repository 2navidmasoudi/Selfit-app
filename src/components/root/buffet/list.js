import React , { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Spinner , Header, Button, Item, Icon,Input ,Left, Body } from 'native-base';
import { connect } from 'react-redux';

import BuffetCard from './BuffetCard';
import { receiveBuffet , incrementMin , decrementMin , refreshBuffet, tokenBuffet} from '../../../redux/actions';
import { getSearchBuffet, getAllBuffet } from '../../../services/buffet';

class List extends Component {
    constructor(){
        super();
        this.state = {
            max:10,
            ssort: false,
            fsort:0,
            loading:0,
            refreshing: false,
            search:null,
            searchMode:false,
        }
    }
    componentWillMount(){
        this.props.tokenBuffet("selfit.buffet");
        this.getBuffetList();
    }

    async searchText(text){
        if(text) {
            await this.setState({
                search:text
            });
        } else {
            await this.setState({
                searchMode:false,
            })
            await this.props.refreshBuffet();
            await this.getBuffetList();
        }
    }



    render(){
        return(
            <View>
                <Header searchBar rounded style={{backgroundColor:'white'}}>
                    <Left style={{flex:1}}>
                    <Button light onPress={this.searchBuffet.bind(this)}>
                        <Text>جستجو</Text>
                    </Button>
                    </Left>
                    <Body style={{flex:5}}>
                    <Item >
                        <Icon name="ios-search" />
                        <Input placeholder="نام، آدرس..." onChangeText={(text)=>this.searchText(text)} />
                        <Icon name="ios-people" />
                        
                    </Item>
                    </Body>
                    
                </Header>
                <FlatList
                    data={this.props.buffet}
                    renderItem={(item)=>this.renderItem(item)}
                    keyExtractor={(item)=>item.buffetid}
                    ListEmptyComponent={()=><Spinner/>}
                    onRefresh={this.handleRefresh.bind(this)}
                    refreshing={this.state.refreshing}
                    onEndReached={this.handleLoadMore.bind(this)}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={this.renderFooter.bind(this)}
                />
            </View>
        )
    }

    async searchBuffet() {
        try {
            if (!this.state.search) this.refreshBuffet();
            await this.setState({
                searchMode:true
            });
            let { search , max , ssort , fsort } = await this.state;
            let { tokenmember } = await this.props.user;
            let { min , tokenapi } = await this.props;
            let json = await getSearchBuffet(search,tokenmember,tokenapi,max,min,ssort,fsort);
            let BuffetList = await json.BuffetSearch.$values;
            await this.props.receiveBuffet(BuffetList,min);
            this.setState({loading:false,refreshing:false});
        } catch (error) {
            console.log(error);
            this.props.decrementMin();
            this.setState({loading:false});  
        }
    }

    async getBuffetList(){
        try {
            let {max,ssort,fsort} = await this.state;
            let { tokenmember , latval , longval } = await this.props.user;
            let { min , tokenapi } = await this.props;
            let json = await getAllBuffet(latval,longval,tokenmember,tokenapi,max,min,ssort,fsort);
            console.log(json);
            let BuffetList = await json.BuffetMapList.$values;
            await this.props.receiveBuffet(BuffetList,min);
            this.setState({loading:false,refreshing:false});
        } catch (error) {
            console.log(error);
            this.props.decrementMin();
            this.setState({loading:false});  
        }
    }

    renderItem({item}) {
        return <BuffetCard buffet={item}/>
    }

    async handleLoadMore(){

        if (this.props.buffet.length>=10 && !this.state.loading) {
            console.log('Request Load More');
            this.props.incrementMin();
            this.setState({loading: true});
            if (!this.state.searchMode) {
                this.getBuffetList();
            } else {
                this.searchBuffet();
            }
        }
    }

    handleRefresh(){
        this.props.refreshBuffet();
        this.setState({refreshing:true});
        if (!this.state.searchMode) {
            this.getBuffetList();
        } else {
            this.searchBuffet();
        }
    }
    renderFooter(){
        if(!this.state.loading) return null;
        else
        return <Spinner/>
    }

}

const mapStateToProps = (state) => {
    return {
    buffet : state.buffet.BuffetList,
    min : state.buffet.min,
    user: state.user,
    tokenapi: state.buffet.tokenapi,
    }
} 
  
const mapDispatchToProps = (dispatch) => {
    return {
        receiveBuffet:(buffet,min)=>dispatch(receiveBuffet(buffet,min)),
        incrementMin:()=>dispatch(incrementMin()),
        decrementMin:()=>dispatch(decrementMin()),
        refreshBuffet:()=>dispatch(refreshBuffet()),
        tokenBuffet:(tokenapi)=>dispatch(tokenBuffet(tokenapi)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(List);