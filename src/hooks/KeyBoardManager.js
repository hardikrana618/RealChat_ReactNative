import {Colors} from '@/theme';
import {Platform, Keyboard} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableDebugging(false);
  KeyboardManager.setKeyboardDistanceFromTextField(10);
  KeyboardManager.setEnableAutoToolbar(true);
  KeyboardManager.setToolbarDoneBarButtonItemText('Done');
  KeyboardManager.setToolbarManageBehaviourBy('subviews'); // "subviews" | "tag" | "position"
  KeyboardManager.setToolbarPreviousNextButtonEnable(true);
  KeyboardManager.setToolbarTintColor(Colors.primary); // Only #000000 format is supported
  KeyboardManager.setToolbarBarTintColor('#FFFFFF'); // Only #000000 format is supported
  KeyboardManager.setShouldShowToolbarPlaceholder(true);
  KeyboardManager.setOverrideKeyboardAppearance(false);
  KeyboardManager.setKeyboardAppearance('default'); // "default" | "light" | "dark"
  KeyboardManager.setShouldResignOnTouchOutside(true);
  KeyboardManager.setShouldPlayInputClicks(false);
  KeyboardManager.resignFirstResponder();
  // KeyboardManager.isKeyboardShowing().then(isShowing => {
  //     // ...
  // });
}

export function keyboardResignOnTouchOutside(val) {
  if (Platform.OS === 'ios') {
    KeyboardManager.setShouldResignOnTouchOutside(val);
  }
}

export function keyboardManager(val) {
  if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(val);
  }
}
export function keyboardDistanceFromTextField(Distance) {
  if (Platform.OS === 'ios') {
    KeyboardManager.setKeyboardDistanceFromTextField(Distance);
  }
}

export function keyboardToolbarDoneBarButtonItemText(str) {
  if (Platform.OS === 'ios') {
    KeyboardManager.setToolbarDoneBarButtonItemText(str);
  }
}

export function keyboardPreviousNextButtonEnable(enb) {
  if (Platform.OS === 'ios') {
    KeyboardManager.setToolbarPreviousNextButtonEnable(enb);
  }
}

export function keyboardToolbarManageBehaviourBy(view = 'subviews') {
  if (Platform.OS === 'ios') {
    KeyboardManager.setToolbarManageBehaviourBy(view);
  }
}
