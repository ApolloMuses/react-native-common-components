import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );

const styles = {
  containerStyle: {
      borderBottomWidth: 1,
      padding: 10,
      paddingLeft: 15,
      paddingRight: 15,
      backgroundColor: 'white',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      borderColor: '#ddd',
      position: 'relative',
      alignItems: 'center'
  }
};

export { CardSection };
