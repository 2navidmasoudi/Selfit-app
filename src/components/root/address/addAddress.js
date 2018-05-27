import React, { Component } from 'react';
import { Button, Container, Content, Input, Item, Label, View, Form } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { form } from '../../../assets/styles/index';
import AppHeader from '../../header';
import { postAddress } from '../../../services';
import { styles } from './style';
import { Text } from '../../Kit';

const convertNumbers2English = str => str.replace(/([٠١٢٣٤٥٦٧٨٩])|([۰۱۲۳۴۵۶۷۸۹])/g, (m, $1, $2) => m.charCodeAt(0) - ($1 ? 1632 : 1776));

@connect(state => ({ user: state.user }))
export default class AddAddress extends Component {
    state = {
      desc: null,
      map: null,
      plaque: null,
      floor: null,
      titleaddress: null,

    };
    componentWillMount() {
      console.log(this.props);
      console.log(this.state);
    }
    async _addAddress() {
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
        console.log('result address: ', result);
        if (result === 1) {
          Actions.popTo('address', { refresh: { refresh: Math.random() } });
          Actions.refresh({ refresh: { refresh: Math.random() } });
        }

        // alert('آدرس با موفقیت ثبت شد!');
      } else {
        alert('خطا در ثبت آدرس جدید!');
      }
    }
    changeFloor(text) {
      this.setState({ floor: convertNumbers2English(text) });
    }
    changePlaque(text) {
      this.setState({ plaque: convertNumbers2English(text) });
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
            <Form>
              <Item floatingLabel style={styles.itemAddress} error={!this.state.desc}>
                <Label style={styles.labelAddress}>آدرس کامل:</Label>
                <Input mul onChangeText={text => this.changeAddressLocation(text)} />
              </Item>
              <Item floatingLabel error={!this.state.titleaddress}>
                <Label style={styles.labelAddress}>نام آدرس (مثلا خانه، محل کار ...)</Label>
                <Input onChangeText={text => this.changeTitle(text)} />
              </Item>
              <View style={{ flexDirection: 'row' }} >
                <Item style={{ flex: 1 }} error={!this.state.floor}>
                  <Label style={styles.labelAddress}>واحد</Label>
                  <Input onChangeText={text => this.changeFloor(text)} />
                </Item >
                <Item style={{ flex: 1, marginLeft: 20 }} error={!this.state.plaque}>
                  <Label style={styles.labelAddress}>پلاک</Label>
                  <Input onChangeText={text => this.changePlaque(text)} />
                </Item>
              </View>
            </Form>
          </Content>
          <View style={styles.btnAddress}>
            <Button block style={form.submitButton} onPress={() => this._addAddress()}>
              <Text style={styles.btnAddressText}>ثبت آدرس</Text>
            </Button>
          </View>
        </Container>
      );
    }
}

const mapStateToProps = state => ({
  user: state.user,
});

connect(mapStateToProps)(AddAddress);
