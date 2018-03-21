//purpose: have a header

//import library for making component

import React from 'react';
import { Text,
        View,
        StatusBar,
        //TouchableOpacity,
      } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { ifIphoneX } from './Functions';
import { MyAppText } from './MyAppText';


//create component
const onSettingPress = () => {
  Actions.settingPage();
};

const onPlusPress = () => {
  Actions.challengeCreate();
};

const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (

    <View style={viewStyle}>

      <StatusBar
      backgroundColor="#21B0D3"
      barStyle="light-content"
      />

      <Ionicons.Button
      style={{ left: 9, }}
      name="ios-settings"
      backgroundColor="#21B0D3"
      color="white"
      size={30}
      onPress={onSettingPress}
      />

      <MyAppText style={textStyle}>{props.headerText}</MyAppText>

      <SimpleLineIcons.Button
      name="plus"
      backgroundColor="#21B0D3"
      color="white"
      size={26}
      onPress={onPlusPress}
      />

    </View>
  );
};

const styles = {
viewStyle: {
  backgroundColor: '#21B0D3',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  //removing shadow for header
  //shadowColor: '#000',
  //  shadowOffset: { width: 0, height: 2 },
  //  shadowOpacity: 0.2,
  elevation: 2,
  position: 'relative',
  ...ifIphoneX({
      paddingTop: 35,
      height: 84,
    }, {
      paddingTop: 25,
      height: 74,
    })
  },

  textStyle: {
    fontSize: 18,
    color: '#FFFFFF',
  }

};
//make the component available to other parts of the app

export { Header };
