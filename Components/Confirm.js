import React from 'react';
import { View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';
import { MyAppText } from './MyAppText';


const Confirm = ({ children, visible, onAccept, onDecline }) => {
    const { containerStyle, textStyle, cardSectionStyle } = styles;

    return (
      <Modal
        animationType="slide"
        onRequestClose={() => {}}
        //android requires a onrequestclose so we will pass a empty function here to satisfy that
        transparent
        visible={visible}
      >
        <View style={containerStyle}>
          <CardSection style={cardSectionStyle}>
            <MyAppText style={textStyle}>{children}</MyAppText>
          </CardSection>

          <CardSection>
            <Button onPress={onAccept}>Yes</Button>
            <Button onPress={onDecline}>No</Button>
          </CardSection>
        </View>
      </Modal>
    );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },

  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },

  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)', //0.75 is opacity
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

export { Confirm };
