import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Spinner, Separator} from 'native-base';
import {connect} from 'react-redux';
//PARDAKHT NASHODE!!!!
class List1 extends Component {
    state = {
        max: 70,
        ssort: true,
        fsort: 0,
    };

    componentWillMount() {
    }
    componentDidMount() {
    }


    render() {
        return (
            <View>
                <Separator>
                    <Text style={{flex:1,textAlign:'center',fontSize:24}}>تایید شده توسط بوفه دار</Text>
                </Separator>
                <FlatList
                    data={this.props.order}
                    renderItem={(item) => this.renderItem(item)}
                    keyExtractor={(item) => item.idcoach}
                    ListEmptyComponent={() => <Spinner/>}
                    scrollEnabled={false}
                    onEndReachedThreshold={0.5}
                />
                <Separator>
                    <Text style={{flex:1,textAlign:'center',fontSize:24}}>تایید نشده توسط بوفه دار</Text>
                </Separator>
                <FlatList
                    data={this.props.order}
                    renderItem={(item) => this.renderItem(item)}
                    keyExtractor={(item) => item.idcoach}
                    ListEmptyComponent={() => <Spinner/>}
                    scrollEnabled={false}
                    onEndReachedThreshold={0.5}
                />
            </View>
        )
    }

    renderItem({item}) {
        // return <CoachCard coach={item}/>
    }
}

const mapStateToProps = (state) => {
    return {
        tokenapi:state.buffet.tokenapi,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(List1);