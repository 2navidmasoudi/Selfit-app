import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Spinner, Header, Button, Item, Icon, Input, Left, Body} from 'native-base';
import {connect} from 'react-redux';
import CoachCard from './CoachCard';
import {receiveGym, incrementMin, decrementMin, refreshGym, tokenGym} from '../../../redux/actions/index';
import {getAllCoach, getSearchCoach} from "../../../services/coach";
import {logError} from "../../../services/log";
import {SearchBar } from 'react-native-elements';

class List2 extends Component {
    state = {
        max: 70,
        ssort: true,
        fsort: 0,
        loading: 0,
        refreshing: false,
        search: null,
        searchMode: false,
    };

    componentWillMount() {
        this.props.tokenCoach("selfit.public");
    }
    componentDidMount() {
        this._getAllCoach();
    }
    async searchText(text) {
        if (text) {
            await this.setState({
                search: text
            });
            this._getSearchCoach();
        } else {
            await this.setState({
                searchMode: false,
            });
            await this.props.refreshCoach();
            await this._getAllCoach();
        }
    }


    render() {
        return (
            <View>
                {/*<Header searchBar rounded style={{backgroundColor: 'white'}}  androidStatusBarColor='#313131' iosBarStyle="light-content">*/}
                    {/*<Left style={{flex: 2,paddingRight:5}}>*/}
                        {/*<Button block info onPress={this._getSearchCoach.bind(this)}>*/}
                            {/*<Text>جستجو</Text>*/}
                        {/*</Button>*/}
                    {/*</Left>*/}
                    {/*<Body style={{flex: 4}}>*/}
                    {/*<Item>*/}
                        {/*<Icon name="ios-search"/>*/}
                        {/*<Input placeholder="نام، مشخصات و..." onChangeText={(text) => this.searchText(text)}/>*/}
                        {/*<Icon name="ios-people"/>*/}

                    {/*</Item>*/}
                    {/*</Body>*/}

                {/*</Header>*/}
                <SearchBar
                    showLoading
                    onChangeText={this.searchText.bind(this)}
                    placeholder='نام، مشخصات و...'/>
                <FlatList
                    data={this.props.coach}
                    renderItem={(item) => this.renderItem(item)}
                    keyExtractor={(item) => item.idcoach}
                    ListEmptyComponent={() => <Spinner/>}
                    onRefresh={this.handleRefresh.bind(this)}
                    refreshing={this.state.refreshing}
                    // onEndReached={this.handleLoadMore.bind(this)}
                    onEndReachedThreshold={0.5}
                    // ListFooterComponent={this.renderFooter.bind(this)}
                />
            </View>
        )
    }

    async _getSearchCoach() {
        try {
            if (!this.state.search) this.refreshCoach();
            await this.setState({
                searchMode: true
            });
            let {search, max, ssort, fsort} = await this.state;
            let {tokenmember} = await this.props.user;
            let {min, tokenapi} = await this.props;
            let CoachList = await getSearchCoach(search, tokenmember, tokenapi, max, min, ssort, fsort);
            await this.props.receiveCoach(CoachList, min);
            this.setState({loading: false, refreshing: false});
        } catch (error) {
            console.log(error);
            this.setState({loading: false});
        }
    }

    async _getAllCoach() {
        try {
            let {max, ssort, fsort} = await this.state;
            let {tokenmember} = await this.props.user;
            let {min, tokenapi} = await this.props;
            let CoachList = await getAllCoach(tokenmember, tokenapi, max, min, ssort, fsort);
            console.log(CoachList);
            await this.props.receiveCoach(CoachList, min);
            this.setState({loading: false, refreshing: false});
        } catch (error) {
            console.log(error);
            logError(error,'_getAllCouch','Coach/List1(Comments)','getAllCoach');
            this.setState({loading: false});
        }
    }

    renderItem({item}) {
        return <CoachCard coach={item}/>
    }

    async handleLoadMore() {

        if (this.props.gym.length >= 70 && !this.state.loading) {
            console.log('Request Load More');
            await this.props.incrementMin();
            await this.setState({loading: true});
            if (!this.state.searchMode) {
                this.getGymList();
            } else {
                this.searchGym();
            }
        }
    }

    handleRefresh() {
        this.props.refreshCoach();
        this.setState({refreshing: true});
        if (!this.state.searchMode) {
            this.getGymList();
        } else {
            this.searchGym();
        }
    }

    renderFooter() {
        if (!this.state.loading) return null;
        else
            return <Spinner/>
    }

}

const mapStateToProps = (state) => {
    return {
        coach: state.gym.GymList,
        min: state.gym.min,
        user: state.user,
        tokenapi: state.gym.tokenapi,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        receiveCoach: (gym, min) => dispatch(receiveGym(gym, min)),
        incrementMin: () => dispatch(incrementMin()),
        decrementMin: () => dispatch(decrementMin()),
        refreshCoach: () => dispatch(refreshGym()),
        tokenCoach: (tokenapi) => dispatch(tokenGym(tokenapi)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(List2);