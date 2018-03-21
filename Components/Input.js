import React from 'react';
import { TextInput, View } from 'react-native';
import { MyAppText } from './MyAppText';

const Input = ({ label, value, onChangeText,
  placeholder,
  secureTextEntry, keyboardType }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <MyAppText style={labelStyle}>{label}</MyAppText>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid={'white'}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#21B0D3',
    //paddingLeft: 5,
    fontSize: 16,
    textAlign: 'right',
    flexDirection: 'row',
    flex: 2,

  },

  labelStyle: {
    fontSize: 16,
    color: '#71767F',
    textAlign: 'left',
    flexDirection: 'row',
    flex: 2,
    marginLeft: 10,
  },

  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
