import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Button, Container, Content, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { form } from '../../../assets/styles/index';
import AppHeader from '../../header';
import { postAddress } from '../../../services';
import styles from './style';
import { Text, TextInput } from '../../Kit';
import { latinNumber } from '../../../utils/persian';
import { errorColor } from '../../../assets/variables/colors';

@connect(state => ({ user: state.user }))
export default class AddAddress extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
    region: PropTypes.objectOf(PropTypes.node).isRequired,
  };
  constructor() {
    super();
    this.state = {
      desc: null,
      plaque: null,
      floor: null,
      titleaddress: null,
    };
    this.addAddress = this.addAddress.bind(this);
  }
  async addAddress() {
    const { tokenapi, tokenmember } = await this.props.user;
    const { plaque, floor, titleaddress, desc } = await this.state;
    const { latitude, longitude } = await this.props.region;
    if (plaque && floor && titleaddress && desc) {
      const result = await postAddress(
        titleaddress,
        desc,
        plaque,
        floor,
        latitude,
        longitude,
        1,
        tokenmember,
        tokenapi
      );
      if (result === 1) {
        Actions.popTo('address', { refresh: { refresh: Math.random() } });
        Actions.refresh({ refresh: { refresh: Math.random() } });
        return;
      }
      Alert.alert('خطا', 'خطا در ثبت آدرس جدید! با پشتیبانی تماس بگیرید.', [{ text: 'باشه' }]);
    } else {
      Alert.alert('خطا', 'خطا در ثبت آدرس جدید! پر کردن تمام فیلد ها اجباریست.', [{ text: 'باشه' }]);
    }
  }
  changeFloor(text) {
    this.setState({ floor: latinNumber(text) });
  }
  changePlaque(text) {
    this.setState({ plaque: latinNumber(text) });
  }
  changeTitle(text) {
    this.setState({ titleaddress: text });
  }
  changeAddressLocation(text) {
    this.setState({ desc: text });
  }
  render() {
    return (
      <Container>
        <AppHeader rightTitle="آدرس" backButton="flex" />
        <Content scrollEnabled={false} padder>
          <Text style={styles.titleAddress}>
            اضافه کردن آدرس جدید:
          </Text>
          <View>
            <TextInput
              onChangeText={text => this.changeTitle(text)}
              label="نام آدرس (مثلا خانه، محل کار ...)"
              value={this.state.titleaddress}
              placeholder="نام آدرس (مثلا خانه، محل کار ...)"
              required
              autoFocus
              placeholderTextColor={errorColor}
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <TextInput
              onChangeText={text => this.changeAddressLocation(text)}
              label="آدرس کامل:"
              value={this.state.desc}
              placeholder="آدرس کامل:"
              required
              placeholderTextColor={errorColor}
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <View style={{ flexDirection: 'row' }} >
              <View style={{ flex: 1 }}>
                <TextInput
                  onChangeText={text => this.changeFloor(text)}
                  label="واحد:"
                  value={this.state.floor}
                  placeholder="واحد:"
                  required
                  placeholderTextColor={errorColor}
                  keyboardType="numeric"
                  onSubmitEditing={this.addAddress}
                  returnKeyType="done"
                  blurOnSubmit={false}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 20 }}>
                <TextInput
                  onChangeText={text => this.changePlaque(text)}
                  label="پلاک:"
                  value={this.state.plaque}
                  placeholder="پلاک:"
                  required
                  placeholderTextColor={errorColor}
                  keyboardType="numeric"
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>
        </Content>
        <View style={styles.btnAddress}>
          <Button block style={form.submitButton} onPress={this.addAddress}>
            <Text style={styles.btnAddressText}>ثبت آدرس</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
