import {Platform} from 'react-native';

const ANDROID_ELEVATION = 10;
const SHADOW_OFFSET = {
  width: 0,
  height: 5,
};
const SHADOW_RADIUS = 6;
const SHADOW_OPACITY = 0.3;

const colors = {
  black: '#000000',
  grey: '#AAAAAA',
  darkGrey: '#858585',
  white: '#FFFFFF',
  blue: '#ADD8E6',
};
const dimensions = {
  button: 40,
};
const postItColors = [
  '#FFB484',
  '#FFF484',
  '#BAFF84',
  '#84FFD8',
  '#84E1FF',
  '#849CFF',
  '#C384FF',
  '#FF84F9',
  '#FF8484',
];
export const shadow = Platform.select({
  ios: {
    shadowColor: colors.darkGrey,
    shadowOffset: SHADOW_OFFSET,
    shadowRadius: SHADOW_RADIUS,
    shadowOpacity: SHADOW_OPACITY,
  },
  android: {
    elevation: ANDROID_ELEVATION,
  },
});

export const theme = {
  colors,
  dimensions,
  shadow,
  gridUnit: 4,
  postItColors,
};
