import React, { Component } from 'react';
import {
  Container, View, Text,
  Content, Button
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { form } from '../../../assets/styles/index';
import AppHeader from '../../header';
import { getAddress } from '../../../services';
import AddressCard from './addressCard';
import { logError } from '../../../services/log';

@connect(state => ({
  user: state.user,
  roadTo: state.basket.roadTo,
}))
export default class Address extends Component {
  state = {
    address: [],
  };
  componentWillMount() {
    this._getAddress();
  }
  componentWillReceiveProps() {
    this._getAddress();
    console.log(this.props);
  }
  async _getAddress() {
    try {
      console.log(this.props);
      const { tokenapi, tokenmember } = await this.props.user;
      const AllAddress = await getAddress(0, tokenmember, tokenapi, 30, 0, true, 0);
      console.log('Address', AllAddress, AllAddress.length);
      // let address1= await nameLocatate(35.7248623,51.3333226,null,5);
      // console.log(address1);
      this.setState({ address: AllAddress });
    } catch (error) {
      console.log(error);
      logError(error, 'GetAddress', 'Address/Index', 'line42');
    }
  }
  render() {
    const AddressContain = this.state.address.length > 0 ?
      this.state.address.map(address => (
        <AddressCard
          key={address.idaddressmember}
          address={address}
        />
      )) :
      (<Text style={form.submitText}>
        آدرسی یافت نشد، لطفا آدرس خود را اضافه کنید!
       </Text>);
    return (
      <Container>
        <AppHeader rightTitle="آدرس" backButton="flex" />
        <Text style={[form.submitText, { textAlign: 'center', marginVertical: 5 }]}>آدرس خود را انتخاب کنید.</Text>
        <Content padder>
          {AddressContain}
        </Content >
        <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
          <Button
            block
            style={[form.submitButton, { margin: 10 }]}
            onPress={() => Actions.mapAddress()}
          >
            <Text style={form.submitText}>اضافه کردن آدرس</Text>
          </Button>
          <Button
            block
            disabled={this.state.address.length === 0}
            style={[form.submitButton, { margin: 10, marginBottom: 20 }]}
            onPress={() => Actions.editAddress({ address: this.state.address })}
          >
            <Text style={form.submitText}>ویرایش آدرس</Text>
          </Button>
        </View>
      </Container>

    );
  }
}
