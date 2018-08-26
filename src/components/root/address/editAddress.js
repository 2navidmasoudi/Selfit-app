import React, { Component } from 'react';
import {
  Container, View, Left, Right,
  Content, Button, Icon, ListItem, List
} from 'native-base';
import { Alert } from 'react-native';
import { Base64 } from 'js-base64';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { form } from '../../../assets/styles/index';
import AppHeader from '../../header';
import { deleteAddress } from '../../../services';
import { Text } from '../../Kit';

@connect(state => ({ user: state.user }))
export default class EditAddress extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
    address: PropTypes.objectOf(PropTypes.node),
  }
  static defaultProps = {
    address: [],
  }
  constructor(props) {
    super(props);
    this.state = {
      listViewData: props.address,
    };
  }
  async deleteRow(data, index, rowId) {
    const newData = [...this.state.listViewData];
    const deleted = newData.splice(rowId, 1);
    const json = await this.deleteAddress(deleted);
    if (json === 1) {
      this.setState({ listViewData: newData });
    } else {
      Alert.alert('خطا', 'خطا در حذف آدرس!', [{ text: 'باشه' }]);
    }
  }
  async deleteAddress(deleted) {
    const { tokenmember, tokenapi } = this.props.user;
    const id = deleted[0].idaddressmember;
    const result = await deleteAddress(id, tokenmember, tokenapi);
    return result;
  }
  render() {
    return (
      <Container>
        <AppHeader rightTitle="آدرس" backButton="flex" />
        <Text style={[form.submitText, { textAlign: 'center', marginVertical: 5 }]}>
          آدرس مورد نظر خود را حذف نمایید.
        </Text>
        <Content padder>
          <List
            dataArray={this.state.listViewData}
            renderRow={(data, index, rowId) => (
              <ListItem >
                <Left style={{ flex: 1, marginLeft: 20 }}>
                  <Button bordered danger onPress={() => this.deleteRow(data, index, rowId)}>
                    <Icon active name="trash" />
                  </Button>
                </Left>
                <Right style={{ flex: 1 }}>
                  <Text>
                    {data.titleaddressmember ? Base64.decode(data.titleaddressmember) : 'نام وارد نشده.'}
                  </Text>
                </Right >
              </ListItem>
            )}
          />
        </Content>
        <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
          <Button
            block
            style={[form.submitButton, { margin: 10 }]}
            onPress={() => { Actions.pop({ refresh: { refresh: Math.random() } }); }}
            danger
          >
            <Text style={{ color: 'white' }}>بازگشت</Text>
          </Button>
        </View>
      </Container>

    );
  }
}
