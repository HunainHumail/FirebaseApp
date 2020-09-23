const Colors = {
  WhiteOpacity: (opacity = '0.5') => `rgba(255, 255, 255, ${opacity})`,
  BlackOpacity: (opacity = '0.5') => `rgba(0, 0, 0, ${opacity})`,
  PlaceHolder: (opacity = '0.7') => `rgba(35, 38, 50, ${opacity})`,
  Transparent: 'transparent',
  Success: '#1cd50f',
  Danger: '#f13844',
  Shadow: '#232632',
  WhiteText: '#F5F5F5',
  TextColorOpacity: (opacity = 0.15) => `rgba(64, 81, 78, ${opacity})`,
  DisabledColor: '#2326320C',
  Black: 'black',
  Primary: '#F9B406',
  Secondary: '#172866',
  TextDark: '#172866',
  TextLight: '#3C425A',
  Background: '#F6F6F6',
  White: '#FFFFFF',
  AlertRed: '#FD5E5A',
  SuccessGreen: '#06D414',
  DisabledGrey: '#E5E6EB',
  PurpleTag: '#B75AFD',
  YellowTag: '#FDBC5A',
  PinkTag: '#FD5A86',
  BlueTag: '#763AFF',
};

export default Colors;