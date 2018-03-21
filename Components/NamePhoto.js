import React from 'react';
import { View, Image } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { MyAppText } from './MyAppText';
import { getFirstWord } from './Functions';

const NamePhoto = (props) => {
  //const { userName, userPhoto, participantName, participantPhoto } = props.children;
  //{ userName, userPhoto, nameStyle, photoStyle, iconStyle, iconColor } = props;

  const { photoStyleDefault, iconStyleDefault, nameStyleDefault, containerDefault, } = styles;

  //For first name only
    if (!props.fullName || props.fullName === false) {
      if (props.userName || props.userPhoto) {
      //if photo exist display it else return icon
      if (props.userPhoto) {
        return (
          <View style={[containerDefault, props.containerStyle]}>
            <MyAppText style={[nameStyleDefault, props.nameStyle]}>
              {getFirstWord(props.userName)}
            </MyAppText>

            <Image
            style={[photoStyleDefault, props.photoStyle]}
            source={{ uri: `${props.userPhoto}` }}
            />
          </View>
        );
      } return (
        <View style={[containerDefault, props.containerStyle]}>
          <MyAppText style={[nameStyleDefault, props.nameStyle]}>
           {getFirstWord(props.userName)}
          </MyAppText>

          <EvilIcons
          style={[iconStyleDefault, props.iconStyle]}
          name="user"
          size={props.iconSize}
          />
        </View>
      );
    }
  }

  //displaying full name
  if (props.fullName) {
    if (props.userName || props.userPhoto) {
      //if photo exist display it else return icon
      if (props.userPhoto) {
        return (
          <View style={[containerDefault, props.containerStyle]}>
            <MyAppText style={[nameStyleDefault, props.nameStyle]}>
              {props.userName}
            </MyAppText>

            <Image
            style={[photoStyleDefault, props.photoStyle]}
            source={{ uri: `${props.userPhoto}` }}
            />
          </View>
        );
      } return (
        <View style={[containerDefault, props.containerStyle]}>
          <MyAppText style={[nameStyleDefault, props.nameStyle]}>
           {props.userName}
          </MyAppText>

          <EvilIcons
          style={[iconStyleDefault, props.iconStyle]}
          name="user"
          size={props.iconSize}
          />
        </View>
      );
    }
  }
};

const styles = {

  containerDefault: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameStyleDefault: {
    textAlign: 'center',
    color: '#21B0D3'

  },
  photoStyleDefault: {
    width: 55,
    height: 55,
    //marginLeft: 4,
    borderRadius: 28
  },
  iconStyleDefault: {
    color: '#21B0D3',
    alignSelf: 'center'
  },
};

export { NamePhoto };
