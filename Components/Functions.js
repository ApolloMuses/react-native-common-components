import { Dimensions, Platform } from 'react-native';
import moment from 'moment';

/*
Iphone x ui
 */
export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 812 || dimen.width === 812)
    );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    }
        return regularStyle;
}

/*
Naming function
*/

export function getFirstWord(str) {
      if (str.indexOf(' ') === -1) {
          return str;
      }
          return str.substr(0, str.indexOf(' '));
}

/*
joining function
*/
export function isJoining(joinTag, friendName, challengeStartTime) {
  const startTime = moment().to(challengeStartTime);

  if (joinTag) {
    return `Your challenge with ${friendName} will start in ${startTime}`;
  }
    return `Your challenge has been sent to ${friendName}! Please wait for their response!`;
}
