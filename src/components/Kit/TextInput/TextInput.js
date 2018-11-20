import React from 'react';
import PropTypes from 'prop-types';
import { Platform, TextInput, View } from 'react-native';
import { Icon } from 'native-base';
import { Text } from '../../Kit';
import { grayLight, white } from '../../../assets/variables/colors';
import { isRTL } from '../../../utils/persian';
import styles from './InputTextStyles';

export default function InputText(props) {
  const {
    defaultValue,
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
    rtl,
    autoFocus,
    dataDetectorTypes,
    maxLength,
  } = props;
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
            defaultValue={defaultValue}
            style={inputStyles}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            value={value}
            dataDetectorTypes={dataDetectorTypes}
            placeholder={placeholder}
            maxLength={maxLength}
            autoCorrect={autoCorrect}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={placeholderTextColor}
            underlineColorAndroid={white}
            multiline={multiline}
            autoFocus={autoFocus}
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

InputText.propTypes = {
  defaultValue: PropTypes.string,
  keyboardType: PropTypes.oneOf(['default', 'email-address', 'numeric', 'phone-pad']),
  iconName: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  label: PropTypes.string,
  autoCorrect: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
  placeholder: PropTypes.string,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.node),
  required: PropTypes.bool,
  returnKeyType: PropTypes.node,
  onSubmitEditing: PropTypes.func,
  onChangeText: PropTypes.func,
  value: PropTypes.node,
  meta: PropTypes.node,
  rtl: PropTypes.bool,
  autoFocus: PropTypes.bool,
  dataDetectorTypes: PropTypes.node,
  maxLength: PropTypes.number,
};
InputText.defaultProps = {
  defaultValue: null,
  keyboardType: 'default',
  iconName: '',
  label: '',
  autoCorrect: false,
  secureTextEntry: false,
  autoCapitalize: 'none',
  placeholderTextColor: grayLight,
  placeholder: '',
  style: {},
  multiline: false,
  numberOfLines: 1,
  required: false,
  returnKeyType: undefined,
  onSubmitEditing: () => {},
  onChangeText: () => {},
  value: null,
  meta: null,
  rtl: false,
  autoFocus: false,
  dataDetectorTypes: null,
  maxLength: undefined,
};
