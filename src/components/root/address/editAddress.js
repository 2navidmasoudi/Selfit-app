import React from 'react';
import { 
    Container,View, Text, Title ,Header,Left,Right,
    Content,Button, Body , Icon,Form , Item  ,ListItem,Radio , List, CardItem
} from 'native-base';
import { ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { form , header } from '../../../assets/styles/index';
import AppHeader from '../../header';
import { connect } from 'react-redux';
import { getAddress, deleteAddress } from '../../../services';

class EditAddress extends React.Component {
    constructor(props) {
        super(props);
        // this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
          listViewData: this.props.address,
        };
    }
    async deleteRow(data,index,rowId) {
        
        const newData = [...this.state.listViewData];
        console.log(newData);
        const deleted = newData.splice(rowId, 1);
        let json = await this._deleteAddress(deleted);
        console.log('deleted?',json);
        
        if (json == 1) {
            this.setState({ listViewData: newData });
        } else {
            alert('خطا در حذف باشگاه!');
        }
        

    }
    async _deleteAddress(deleted) {
        console.log('deleted address:' ,deleted);
        let {tokenmember,tokenapi} = this.props.user;
        let id = deleted[0].idaddressmember;
        let result = await deleteAddress(id,tokenmember,tokenapi);
        console.log('deleted?',result);
        return result;
    }
    componentWillMount(){
        console.log(this.props);
        
    }
    render(){
        const { address} = this.props;
        // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return(
        <Container>
            <AppHeader rightTitle="آدرس"/>
            <Text style={[form.submitText,{textAlign:'center', marginVertical:5}]}>آدرس مورد نظر خود را </Text>
            <Content padder>
                <List
                    dataArray={this.state.listViewData}
                    renderRow={(data,index,rowId) =>
                    // <ListItem >
                    //     <Left style={{flex:1,marginLeft:20}}>
                    //         <Icon name="backspace" />
                    //     </Left>
                    //     <Right style={{flex:1}}>
                    //         <Text style={[form.submitText,{textAlign:'right'}]}> {data.titleaddressmember?Base64.decode(data.titleaddressmember):'نام وارد نشده.'} </Text>
                            
                    //     </Right >
                        
                        
                    // </ListItem>
                    <ListItem >
                        <Left style={{flex:1,marginLeft:20}}>
                            <Button bordered danger onPress={_ => this.deleteRow(data,index,rowId)}>
                                <Icon active name="trash" />
                            </Button>
                        </Left>
                        <Right style={{flex:1}}>
                            <Text style={[form.submitText,{textAlign:'right'}]}> {data.titleaddressmember?Base64.decode(data.titleaddressmember):'نام وارد نشده.'} </Text>
                            
                        </Right >
                        
                        
                    </ListItem>
                    }
                    // renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                    // <Button full danger onPress={_ => this.deleteRow(data,secId, rowId, rowMap)}>
                    //     <Icon active name="trash" />
                    // </Button>}
                    // leftOpenValue={75}
                    // rightOpenValue={-75}
                    // disableRightSwipe={true}
                />
                {/* {address.map((address)=>(
                    <ListItem>
                    <Text style={[form.submitText,{textAlign:'center', marginVertical:5}]}>خانه</Text>
                    <Right style={{flex:1}}>
                      <Radio selected={false} />
                    </Right>
                    </ListItem>
                ))} */}
            </Content >
            <View style = {{flexDirection:'column',justifyContent:'flex-end'}}> 
                    <Button  block style={[form.submitButton , {margin:10}]} onPress={()=>{Actions.pop({refresh:{refresh:Math.random()}});}} danger>
                        <Text style={form.submitText}>بازگشت</Text>
                    </Button>
            </View>
        </Container>

        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditAddress);