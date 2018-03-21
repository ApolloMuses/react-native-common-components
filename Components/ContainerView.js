import React from 'react';
import { View } from 'react-native';
import { ifIphoneX } from './Functions';


const ContainerView = ({ children, style }) => {
  const { viewStyle } = styles;

  return (
    <View style={[viewStyle, style]}>
      {children}
    </View>
  );
};

const styles = {
//complete arbitrary names for the Styles
    viewStyle: {
      flex: 1,
      marginTop: 5,
      marginBottom: 5,
  }
};

export { ContainerView };
