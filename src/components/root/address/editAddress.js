import React from 'react';
import {
  Container, View, Text, Left, Right,
  Content, Button, Icon, ListItem, List
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { form } from '../../../assets/styles/index';
import AppHeader from '../../header';
import { deleteAddress } from '../../../services';

@connect(state => ({ user: state.user }))
export default class EditAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listViewData: this.props.address,
    };
  }
  componentWillMount() {
    console.log(this.props);
  }
  async deleteRow(data, index, rowId) {
    const newData = [...this.state.listViewData];
    console.log(newData);
    const deleted = newData.splice(rowId, 1);
    const json = await this._deleteAddress(deleted);
    console.log('deleted?', json);
    if (json === 1) {
      this.setState({ listViewData: newData });
    } else {
      alert('خطا در حذف باشگاه!');
    }
  }
  async _deleteAddress(deleted) {
    console.log('deleted address:', deleted);
    const { tokenmember, tokenapi } = this.props.user;
    const id = deleted[0].idaddressmember;
    const result = await deleteAddress(id, tokenmember, tokenapi);
    console.log('deleted?', result);
    return result;
  }
  render() {
    return (
      <Container>
        <AppHeader rightTitle="آدرس" />
        <Text style={[form.submitText, { textAlign: 'center', marginVertical: 5 }]}>آدرس مورد نظر خود را </Text>
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
                  <Text style={[form.submitText, { textAlign: 'right' }]}>
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
            <Text style={form.submitText}>بازگشت</Text>
          </Button>
        </View>
      </Container>

    );
  }
}
