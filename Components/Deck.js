import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.30 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;


class Deck extends Component {
  //default props if user doesn't passing in the necessary prop/values
  //this avoids unnecessary type checking
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
  }

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();


    const panResponder = PanResponder.create({
      //what happens when the user clicks down
      onStartShouldSetPanResponder: () => true,

      //what happens when user starts to drag around
      //for the purpose of this card, only the dx and dy object are relevant
      //in addition to the rotation of the card
      onPanResponderMove: (event, gesture) => {
        //update the current position object
        //this links gesture and animation modules
        position.setValue({ x: gesture.dx , y: gesture.dy });
      },

      //what happens when user release
      onPanResponderRelease: (event, gesture) => {
        //compare to SWIPE_THRESHOLD
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
            this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });

    //normally should not be updating state manually
    //but here its going along with the documentation
    //can use assign panResponder with this instead.
    this.state = { panResponder, position, index: 0 };
  }


  componentWillReceiveProps(nextProps) {
    //compares existing data to new data
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }


  componentWillUpdate() {
      //compatibility for android
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

      LayoutAnimation.spring();
  }


  forceSwipe(direction) {
    const { position } = this.state;
    const x = direction === 'right' ? SCREEN_WIDTH * 1.25 : -SCREEN_WIDTH * 1.25;

    //use timing when you don't need 'bouncyness' to the animation
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => {
      //After the swipe duration is complete
      this.onSwipeComplete(direction);
    })
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

    //reseting the position value prior to loading next card
    this.state.position.setValue({ x: 0, y: 0 }); //this is breaking state convention as mentioned earlier


    //reseting state, NOT modifying it
    this.setState({ index: this.state.index + 1 });

  }


  //Resets the position helper function
  resetPosition() {
    const { position } = this.state;

    Animated.spring(position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    //helper method for rotation that returns a single object

    const { position } = this.state;

    //interpolation: associating the input ranges to the output ranges
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2], //the * 2 decreases the amount of rotation
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(), //take all the properties returned
      transform: [{ rotate }] //Add in the transform and return the result
      //need to use interpolation system to help relate the rotation and changes in x and y direction (dx, dy)
    }
  }


  renderCards() {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    return this.props.data.map((item, dataIndex) => {
      if (dataIndex < this.state.index) { return null; }

      if (dataIndex === this.state.index) {

        return (
            <Animated.View
            key={item.id}
            style={[this.getCardStyle(), styles.cardStyle]}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }
      return (
        <Animated.View
          key={item.id}
          //the dataIndex - this.state.index allows relative stacking display to the # of remaining cards in the dec
          style={[styles.cardStyle, { top: 10 * (dataIndex - this.state.index) }]}
        >
        {this.props.renderCard(item)}
        </Animated.View>
      )
    }).reverse(); //reverse to resolve the issue of styling absolute that stacks the last card ontop
  }


  render() {
    return (
      <View>
          {this.renderCards()}
      </View>
    )
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
  },

}
export default Deck;
