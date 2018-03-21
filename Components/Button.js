import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MyAppText } from './MyAppText';

const Button = ({ onPress, children, buttonStyleOveride, textStyleOveride }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, buttonStyleOveride]}>

      <MyAppText allowFontScaling={false} style={[textStyle, textStyleOveride]}>
        {children}
      </MyAppText>

    </TouchableOpacity>
  );
};

const styles = {

  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    //paddingTop: 10,
    //paddingBottom: 10,
  },

  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#21B0D3',
    borderRadius: 3,
    height: 64,
    justifyContent: 'center',
  }

};

export { Button };
