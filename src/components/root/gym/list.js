import React, {Component} from 'react';
import {FlatList, Text, View} from 'react-native';
import {Body, Button, Fab, Header, Icon, Input, Item, Left, Spinner} from 'native-base';
import {connect} from 'react-redux';
import {getAllGym, getSearchGym} from '../../../services/gym';
import GymCard from './GymCard';
import {decrementMin, incrementMin, receiveGym, refreshGym, tokenGym} from '../../../redux/actions/index';
import {SearchBar} from 'react-native-elements';

class List extends Component {
    state = {
        max: 10,
        ssort: false,
        fsort: 0,
        loading: 0,
        refreshing: false,
        search: null,
        searchMode: false,
    };

    componentWillMount() {
        this.setInfo();
    }

    async setInfo() {
        await this.props.tokenGym("selfit.gym");
        await this.getGymList();
    }

    // async searchText(text) {
    //     //     if (text) {
    //     //         await this.setState({
    //     //             search: text
    //     //         });
    //     //         await this.searchGym();
    //     //     } else {
    //     //         await this.setState({
    //     //             searchMode: false,
    //     //         });
    //     //         await this.props.refreshGym();
    //     //         await this.getGymList();
    //     //     }
    //     // }
    async searchText(text) {
        if (text) {
            await this.setState({
                search: text
            });
            await this.searchGym();
        } else {
            await this.setState({
                searchMode: false,
            });
            await this.props.refreshGym();
            await this.getGymList();
        }
    }


    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                // alignItems: 'center',
            }}>
                <SearchBar
                    showLoading
                    onChangeText={this.searchText.bind(this)}
                    placeholder='نام، آدرس...'/>
                <FlatList
                    data={this.props.gym}
                    renderItem={(item) => this.renderItem(item)}
                    keyExtractor={(item) => item.idgym}
                    ListEmptyComponent={() => <Spinner/>}
                    onRefresh={this.handleRefresh.bind(this)}
                    refreshing={this.state.refreshing}
                    onEndReached={this.handleLoadMore.bind(this)}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={this.renderFooter.bind(this)}
                />


            </View>
        )
    }

    async searchGym() {
        try {
            if (!this.state.search) this.refreshGym();
            await this.setState({
                searchMode: true
            });
            let {search, max, ssort, fsort} = await this.state;
            let {tokenmember} = await this.props.user;
            let {min, tokenapi} = await this.props;
            let GymList = await getSearchGym(search, tokenmember, tokenapi, max, min, ssort, fsort);
            await this.props.receiveGym(GymList, min);
            this.setState({loading: false, refreshing: false});
        } catch (error) {
            console.log(error);
            this.setState({loading: false});
        }
    }

    async getGymList() {
        try {
            let {max, ssort, fsort} = await this.state;
            let {tokenmember, latval, longval} = await this.props.user;
            let {min, tokenapi} = await this.props;
            let GymList = await getAllGym(latval, longval, tokenmember, tokenapi, 10, min, ssort, fsort);
            console.log(GymList);
            await this.props.receiveGym(GymList, min);
            this.setState({loading: false, refreshing: false});
        } catch (error) {
            console.log(error);
        }
    }

    renderItem({item}) {
        return <GymCard gym={item}/>
    }

    async handleLoadMore() {
        if (this.props.gym.length >= 10 && !this.state.loading) {
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
        this.props.refreshGym();
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
        gym: state.gym.GymList,
        min: state.gym.min,
        user: state.user,
        tokenapi: state.gym.tokenapi,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        receiveGym: (gym, min) => dispatch(receiveGym(gym, min)),
        incrementMin: () => dispatch(incrementMin()),
        decrementMin: () => dispatch(decrementMin()),
        refreshGym: () => dispatch(refreshGym()),
        tokenGym: (tokenapi) => dispatch(tokenGym(tokenapi)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(List);