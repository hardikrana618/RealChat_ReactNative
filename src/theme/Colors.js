import Color from '@/utils/Color';

const ColorsName = {
  transparent: 'rgba(0, 0, 0, 0)',
  transperntGreen: 'rgba(77, 201, 57, 0.2)',

  vividRed: '#e70f14', //Primary
  lightGrayish: '#F2CECF',
  darkRed: '#FF0000',
  white: '#ffffff', //Accent
  black: '#000000',
  gainsboro: '#D9D9D9',
  valhalla: '#2E2B43',
  lightpurple: '#A9A4D1',
  grayish: '#4D5055D9',

  blue: '#4A7BDC',
  lavenderBlue: '#BDD3FF',
  black: '#272727',

  royalBlue: '#5E57E1',
  firebrick: '#B3261E',
  emerald: '#61C478',
  ghost: '#CFCFD0',
  gainsboro: '#dddddd',
  yellow: '#FFD941',
  selectiveYellow: '#FDD835',

  pink: '#FF66C4',
  lightGrey: '#CBCBCB',
  whitesmoke: '#F2F2F2',
  whitesmoke2: '#F0F0F0',
  dimgray: '#5E5E5E',
  dimLight: '#999',
  athensgrey: '#DCDFDF',
  light: '#ededed',
  red: '#FF1744',
  bg: '#FFFFFF',
  black: '#000000',
  purple: '#4E387E',
  matterhorn: '#4F4F4F',
  silver: '#C4C4C4',
  eclipse: '#3B3B3B',

  grey: '#4D5055',
  grey2: '#7F7F7F',
  suvaGrey: '#949090',
  charcoal: '#3F3F3F',
  comet: '#626074',
  athensgrey: '#DCDFDF',
  spunpearl: '#AFAEB6',
  mirage: '#343A40',
  green: '#00C853',
  shadegray: '#93939314',
  lightGray: '#D9D9D933',
  tuna: '#4D5055',
  eerieBlack: '#121127',
  slateBlue: '#444BD3',
  lavenderBlue: '#F2F3FF',
  oliveDrab: '#4D50552B',
  charcoalGray: '#4D505580',
  charcoalGray1: '#323232',
  cornflowerBlue: '#4A7BDC1A',
  solitude: '#F3F4F7',
  aliceBlue: '#F6F8FD',
  offWhite: '#F3F4F766',
  brightBlue: '#4A7BDC0D',
  darkgray: '#4D505599',
  verylightgray: '#D9D9D900',
  kettleman: '#636161',
  coldGrey: '#9f9f9f',
  redSalsa: '#D91F11 ',
  paleGray: '#DADADA',
  ceruleanBlue: '#3767C599',
  palePeriwinkle: '#E5EDFF',
  pastelBlue: '#BDD3FF',
  softWhiteBlue: '#F9FBFF',
  semitransparentBlack: '#00000099',
  softBlue: '#4A7BDC33',
  malachite: '#00C8531A',
  limeGreen: '#4dc939',
  modalOverlay: 'rgba(0,0,0,0.6)',
};
const textColors = {
  txtPrimary: ColorsName.black,
  txtSecondary: ColorsName.white,
  placeholder: ColorsName.spunpearl,
};

const buttonColor = {
  btnPrimary: ColorsName.vividRed,
  btnBackground: ColorsName.vividRed,
  btnDisable: ColorsName.lightGrayish,
  titleColor: ColorsName.white,
  iconColor: ColorsName.white,
};

const rgbColor = {
  // rgbPrimary: (alpha = 0.4) => `rgba(43,41,61,${alpha})`, //#2E2B43
  rgbPrimary: (alpha = 0.4) => Color(Colors.primary).alpha(alpha).toString(),
  rgbSecondary: (alpha = 0.4) =>
    Color(Colors.secondPrimary).alpha(alpha).toString(),
  rgbBlack: (alpha = 0.4) => `rgba(0, 0, 0, ${alpha})`, //#000
  rgbWhite: (alpha = 0.4) => `rgba(255, 255, 255, ${alpha})`, //#fff
  rgbBlue: (alpha = 1) => `rgba(0, 176, 255, ${alpha})`, //#00B0FF
  rgbGreen: (alpha = 1) => `rgba(0, 200, 83, ${alpha})`, //#00C853
  rgbYellow: (alpha = 1) => `rgba(241, 178, 56, ${alpha})`, //#F1B238
  rgbRoyalBlue: (alpha = 1) => `rgba(75, 95, 235, ${alpha})`, //#4B5FEB
  rgbBlack: (alpha = 1) => `rgba(39, 39, 39, ${alpha})`, //#272727
  rgbRed: (alpha = 1) => `rgba(255, 0, 0, ${alpha})`, //#272727
  rgbGrey: (alpha = 1) => `rgba(rgba(137, 138, 141, ${alpha})`,
};

const AppColors = {
  primary: ColorsName.vividRed,
  secondPrimary: ColorsName.lightGrayish,
  accent: ColorsName.white,
  background: ColorsName.white,
  borderColor: ColorsName.athensgrey,

  disabled: ColorsName.gainsboro,
  text: ColorsName.black,

  success: ColorsName.emerald,
  error: ColorsName.firebrick,
  ...buttonColor,
  ...textColors,
};

export const Colors = {
  ...ColorsName,
  ...rgbColor,
  ...AppColors,
};
