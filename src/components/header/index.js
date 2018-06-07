import React from 'react';
import { Title, Header, Left, Right, Body, Icon } from 'native-base';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { header } from '../../assets/styles';
import { Text } from '../Kit';

export default ({ rightTitle, hasBlog }) => (
  <Header hasSubtitle style={header.headerColor} androidStatusBarColor="#313131" iosBarStyle="light-content">
    <Left style={{ flex: 1, flexDirection: 'row' }}>
      <TouchableWithoutFeedback
        onPress={() => Actions.pop({ refresh: { refresh: Math.random() } })}
      >
        <View style={{
          display: hasBlog ? 'none' : 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          width: 50
        }}
        >
          <Icon
            name="arrow-back"
            onPress={() => Actions.pop()}
            style={{ color: 'white', fontWeight: 500, display: hasBlog ? 'none' : 'flex', marginHorizontal: 5 }}
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => Actions.blogRoot()}>
        <View style={{ display: hasBlog ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', height: 50, width: 50 }}>
          <Icon name="school" onPress={() => Actions.blogRoot()} style={{ color: 'white' }} fontSize={30} />
        </View>
      </TouchableWithoutFeedback>
    </Left>
    <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Title style={header.bodyTitle}>
        SelFit
      </Title>
      <Text type="bold" style={header.bodySubtitle}>
        {rightTitle}
      </Text>
    </Body>
    <Right style={{ flex: 1, alignItems: 'flex-end' }}>
      <TouchableWithoutFeedback onPress={() => Actions.drawerOpen()}>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 50, width: 50 }}>
          <Icon name="menu" onPress={() => Actions.drawerOpen()} style={{ color: 'white', fontWeight: 500 }} />
        </View>
      </TouchableWithoutFeedback>
    </Right>
  </Header>
);
