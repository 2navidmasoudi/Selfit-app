import React, { Component } from 'react';
import {
  StyleSheet,
  Platform
} from 'react-native';
import { RichTextEditor, RichTextToolbar } from 'react-native-zss-rich-text-editor';
import { Button, Container } from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { Text } from '../../Kit';
import { mainColor, white } from '../../../assets/variables/colors';
import { receiveGym } from '../../../redux/actions';

@connect(null, {
  receiveGym,
})
export default class HtmlEditor extends Component {
  constructor(props) {
    super(props);
    this.getHTML = this.getHTML.bind(this);
    this.setFocusHandlers = this.setFocusHandlers.bind(this);
  }
  onEditorInitialized() {
    this.setFocusHandlers();
    this.getHTML();
  }
  async getHTML() {
    const titleHtml = await this.richtext.getTitleHtml();
    const contentHtml = await this.richtext.getContentHtml();
    // alert(titleHtml + ' ' + contentHtml)
  }
  setFocusHandlers() {
    this.richtext.setTitleFocusHandler(() => {
      // alert('title focus');
    });
    this.richtext.setContentFocusHandler(() => {
      // alert('content focus');
    });
  }
  async submitHandler() {
    const contentHtml = await this.richtext.getContentHtml();
    console.log('contentHtml');
    console.log(contentHtml);
    const gym = await { ...this.props.gym, descgym: contentHtml };
    console.log(gym);
    this.props.receiveGym(gym, 0);
    Actions.pop();
  }
  render() {
    const htmlContent = this.props.gym.descgym ? this.props.gym.descgym : '<p dir=\'rtl\'>توضیحات خود را ویرایش کنید.</p>';
    return (
      <Container>
        <AppHeader rightTitle="ویرایش توضیح" />
        <RichTextEditor
          ref={r => this.richtext = r}
          style={styles.richText}
          hiddenTitle
          // initialTitleHTML="Title!!"
          initialContentHTML={htmlContent}
          editorInitializedCallback={() => this.onEditorInitialized()}
          customCSS={'#zss_editor_content{ width: 100%; height: 100%; -webkit-overflow-scrolling: touch; overflow:auto; }'}
        />
        <RichTextToolbar
          getEditor={() => this.richtext}
        />
        {Platform.OS === 'ios' && <KeyboardSpacer />}
        <Button
          full
          style={{ backgroundColor: mainColor }}
          onPress={this.submitHandler.bind(this)}
        >
          <Text style={{ color: white }}>
            ثبت تغیرات
          </Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingTop: 40
  },
  richText: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
