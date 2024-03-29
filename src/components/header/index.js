import React from 'react';
import { Title, Header, Left, Right, Body, Icon } from 'native-base';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { header } from '../../assets/styles';
import { Text } from '../Kit';
import { musicDown } from '../root/Main';
import { errorColor, mainColor } from '../../assets/variables/colors';

export default function HeaderComponent({ rightTitle, hasBlog, noPop, Inbox, Drawer }) {
  return (
    <Header hasSubtitle style={header.headerColor} androidStatusBarColor="#313131" iosBarStyle="light-content">
      <Left style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={
            !noPop ?
            () => Actions.pop({ refresh: { refresh: Math.random() } }) :
            () => musicDown()
          }
        >
          <View style={{
            display: hasBlog ? 'none' : 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 50,
            backgroundColor: !noPop ? undefined : mainColor,
            borderRadius: !noPop ? undefined : 10,
          }}
          >
            <Icon
              name={!noPop ? 'arrow-back' : 'arrow-down'}
              onPress={
                !noPop ?
                () => Actions.pop({ refresh: { refresh: Math.random() } }) :
                () => musicDown()
              }
              style={{ color: 'white', fontWeight: 500, display: hasBlog ? 'none' : 'flex', marginHorizontal: 5 }}
            />
          </View>
        </TouchableOpacity>
        {Inbox &&
        <TouchableOpacity
          onPress={() => Actions.inbox()}
        >
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 50,
          }}
          >

            <Icon
              name="mail"
              onPress={() => Actions.inbox()}
              style={{ color: 'white', fontWeight: 500, marginHorizontal: 5 }}
            />
            <View style={{
              position: 'absolute',
              top: 0,
              right: 0,
              margin: 10,
              marginTop: 12,
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: errorColor
            }}
            />
          </View>
        </TouchableOpacity>}
        <TouchableOpacity onPress={() => Actions.support()}>
          <View style={{
            display: hasBlog ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 50
          }}
          >
            <Icon name="help-circle" onPress={() => Actions.support()} style={{ color: 'white' }} fontSize={30} />
          </View>
        </TouchableOpacity>
      </Left>
      <Body style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Title style={header.bodyTitle}>
          SelFit
        </Title>
        <Text type="bold" style={header.bodySubtitle}>
          {rightTitle}
        </Text>
      </Body>
      <Right style={{ flex: 1, alignItems: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => musicDown()}
        >
          <View style={{
            display: !noPop ? 'none' : 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 50,
            backgroundColor: mainColor,
            borderRadius: 10,
          }}
          >
            <Icon
              name="arrow-down"
              onPress={() => musicDown()}
              style={{ color: 'white', fontWeight: 500, display: !noPop ? 'none' : 'flex', marginHorizontal: 5 }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.drawerOpen()}>
          <View style={{
            display: noPop || !Drawer ? 'none' : 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 50
          }}
          >
            <Icon
              name="menu"
              onPress={() => Actions.drawerOpen()}
              style={{
                display: noPop ? 'none' : 'flex',
                color: 'white',
                fontWeight: 500
              }}
            />
          </View>
        </TouchableOpacity>
      </Right>
    </Header>
  );
}
HeaderComponent.propTypes = {
  rightTitle: PropTypes.string.isRequired,
  hasBlog: PropTypes.bool,
  noPop: PropTypes.bool,
  Inbox: PropTypes.bool,
  Drawer: PropTypes.bool
};
HeaderComponent.defaultProps = {
  hasBlog: undefined,
  noPop: undefined,
  Inbox: false,
  Drawer: false,
};
