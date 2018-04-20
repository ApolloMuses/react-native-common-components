import React from 'react';
import { StyleSheet, Easing, Animated, PanResponder, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

//Threshold to trigger action
const SWIPE_THRESHOLD_WIDTH = 0.35 * SCREEN_WIDTH;
const SWIPE_THRESHOLD_HEIGHT = 0.35 * SCREEN_HEIGHT;
const VELOCITY_THRESHOLD = 0.3;

export const swipeDirections = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
};

//swipe helper
const isSwipeValid = (velocity, velocityThreshold, directionOffset, directionOffsetThreshold) => {
  return (
    Math.abs(velocity) > velocityThreshold && Math.abs(directionOffset) < directionOffsetThreshold
  );
};

const emptyFn = () => {};

export default class swipe extends React.PureComponent {
  static defaultProps = {
    onSwipeRight: emptyFn,
    onSwipeLeft: emptyFn,
    onSwipeUp: emptyFn,
    onSwipeDown: emptyFn,

    leftContent: null,
    rightContent: null,
    upContent: null,
    downContent: null,
  };
  componentWillMount() {
    //starting position for animation
    this.position = new Animated.ValueXY();

    //configure the panResponder to handle user actions
    const setPanResponder = this.setPanResponder.bind(this);
    const movePanResponder = this.movePanResponder.bind(this);
    const endPanResponder = this.endPanResponder.bind(this);

    this.panResponder = PanResponder.create({
      //start the responder
      onStartShouldSetPanResponder: setPanResponder,
      onMoveShouldSetPanResponder: setPanResponder,

      //when the user starts pressing and draging around the screen
      onPanResponderMove: movePanResponder,
      //(event, gesture) => {
        //console.log(gesture);

        //linking panResponder with animated module


        //dx dy = where the user is moving, how much the user has moved
        //movex movey where the user is clicking down on and moving over

      //},
      //when user lets go, this is called
      onPanResponderRelease: endPanResponder,
    });
  }

  //set panResponder if gesture is longer than 1 and not a just a tap
  setPanResponder(event, gesture) {
    return event.nativeEvent.touches.length === 1 && !this.gestureIsTap(gesture);
  }

  //if movement is less than 5 for both x and y axis, it's only a tap,
  //return false, do not set panresponder
  gestureIsTap(gesture) {
    return Math.abs(gesture.dx) < 5 && Math.abs(gesture.dy) < 5;
  }

  //when movement is detected, animate
  movePanResponder(event, gesture) {
    const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN } = swipeDirections;

    const swipeDirection = this.swipeDirectionController(gesture);
    console.log('the swipe direction is!!!', swipeDirection);

    const { dx, dy } = gesture;

    //this.position.setValue({ x: gesture.dx, y: gesture.dy });

    //animation based on direction
    switch (swipeDirection) {
      case SWIPE_LEFT:
        this.position.setValue({ x: dx });
        break;
      case SWIPE_RIGHT:
        this.position.setValue({ x: dx });
        break;
      case SWIPE_UP:
        this.position.setValue({ y: dy });
        break;
      case SWIPE_DOWN:
        this.position.setValue({ y: dy });
        break;
    }
  }

  //end panResponder
  endPanResponder(event, gesture) {
    //get swipe direction via helper method
    const swipeDirection = this.swipeDirectionController(gesture);

    //trigger swipe actions
    this.swipeActionHandlers(swipeDirection, gesture);

    //reset animation
    this.resetPosition();
  }

  swipeDirectionController(gesture) {
    const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN } = swipeDirections;
    const { dx, dy } = gesture;

    if (this.isHorizontalSwipe(gesture)) {
      return dx > 0 ? SWIPE_RIGHT : SWIPE_LEFT;
    } else if (this.isVerticalSwipe(gesture)) {
      return dy > 0 ? SWIPE_DOWN : SWIPE_UP;
    }
    return null;
  }

  isHorizontalSwipe(gesture) {
    const { vx, dy } = gesture;
    return isSwipeValid(vx, VELOCITY_THRESHOLD, dy, SWIPE_THRESHOLD_WIDTH);
  }

  isVerticalSwipe(gesture) {
    const { vy, dx } = gesture;
    return isSwipeValid(vy, VELOCITY_THRESHOLD, dx, SWIPE_THRESHOLD_HEIGHT);
  }

  swipeActionHandlers(swipeDirection, gesture) {
    const { onSwipe, onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight } = this.props;
    const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN } = swipeDirections;

    onSwipe && onSwipe(swipeDirection, gesture); //passes swipe direction and gesture details back to container componet

    switch (swipeDirection) {
      case SWIPE_LEFT:
        onSwipeLeft && onSwipeLeft(gesture);
        break;
      case SWIPE_RIGHT:
        onSwipeRight && onSwipeRight(gesture);
        break;
      case SWIPE_UP:
        onSwipeUp && onSwipeUp(gesture);
        break;
      case SWIPE_DOWN:
        onSwipeDown && onSwipeDown(gesture);
        break;
    }
  }

  resetPosition() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 }, //the resulting position // animation is going (resulting in)
      easing: Easing.back(),
      duration: 2000,
    }).start();
  }

  getAnimateViewStyle() {
    const { position } = this;

    return {
      ...position.getLayout(),
    };
  }

  render() {
    return (
      <Animated.View
        {...this.props}
        style={[this.getAnimateViewStyle(), styles.container]}
        {...this.panResponder.panHandlers}>
        {this.props.renderChart()}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
