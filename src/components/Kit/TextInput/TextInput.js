import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, TextInput, View } from 'react-native';
import { Icon } from 'native-base';
import { Text } from '../../Kit';
import { grayLight, white } from '../../../assets/variables/colors';
import { isRTL } from '../../../utils/persian';
import styles from './InputTextStyles';

export default class InputText extends Component {
  static propTypes = {
    keyboardType: PropTypes.oneOf(['default', 'email-address', 'numeric', 'phone-pad']),
    iconName: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    autoCorrect: PropTypes.bool,
    input: PropTypes.objectOf(PropTypes.any).isRequired,
    meta: PropTypes.objectOf(PropTypes.any).isRequired,
    style: PropTypes.objectOf(PropTypes.any),
    secureTextEntry: PropTypes.bool,
    autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
    placeholder: PropTypes.string,
    multiline: PropTypes.bool,
    numberOfLines: PropTypes.number,
  };

  static defaultProps = {
    keyboardType: 'default',
    iconName: '',
    autoCorrect: false,
    secureTextEntry: false,
    autoCapitalize: 'none',
    placeholderTextColor: grayLight,
    placeholder: '',
    style: {},
    multiline: false,
    numberOfLines: 1
  };

  render() {
    const {
      keyboardType,
      iconName,
      placeholder,
      label,
      autoCorrect,
      autoCapitalize,
      secureTextEntry,
      placeholderTextColor,
      style,
      multiline,
      required,
      numberOfLines,
      returnKeyType,
      onSubmitEditing,
      onChangeText,
      value,
      meta,
      rtl
    } = this.props;
    const inputStyles = [
      styles.input,
      Platform.select({
        ios: {
          textAlign: !value || rtl || isRTL(value) ? 'right' : null,
        },
        android: {
          textAlign: !value ? 'right' : null,
        }
      })
    ];

    return (
      <View>
        {
          !iconName && value && label ? (
            <Text style={{ paddingTop: 6 }}>
              {label}
              {' '}
              {required && <Text style={{ color: '#ff5475' }}>*</Text>}
            </Text>
          ) : null
        }
        <View style={[styles.container, iconName && styles.withIconContainer, style]}>
          {
            iconName ? (
              <View style={styles.iconContainer}>
                <Icon name={iconName} size={20} color={grayLight} />
              </View>
            ) : null
          }
          <View style={styles.inputContainer}>
            <TextInput
              style={inputStyles}
              keyboardType={keyboardType}
              onChangeText={onChangeText}
              value={value}
              placeholder={placeholder}
              autoCorrect={autoCorrect}
              autoCapitalize={autoCapitalize}
              secureTextEntry={secureTextEntry}
              placeholderTextColor={placeholderTextColor}
              underlineColorAndroid={white}
              multiline={multiline}
              numberOfLines={numberOfLines}
              returnKeyType={returnKeyType}
              onSubmitEditing={onSubmitEditing}
            />
          </View>
        </View>
        {meta && meta.touched && meta.error && <Text style={styles.error}>{meta.error}</Text>}
      </View>
    );
  }
}