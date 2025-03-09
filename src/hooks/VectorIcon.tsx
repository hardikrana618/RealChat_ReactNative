import React, {memo} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome6Pro from 'react-native-vector-icons/FontAwesome6Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
// import {IconProps} from 'react-native-vector-icons/Icon';
import {getResFont} from '@/theme';

type VectorTypes =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'FontAwesome6'
  | 'FontAwesome6Pro'
  | 'Fontisto'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';
interface VectorIconProps {
  type: VectorTypes;
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const VectorIcon = ({
  type,
  size = 20,
  color = 'black',
  ...restProps
}: VectorIconProps) => {
  size = getResFont(size);
  switch (type) {
    case 'AntDesign':
      return <AntDesign size={size} color={color} {...restProps} />;
    case 'Entypo':
      return <Entypo size={size} color={color} {...restProps} />;
    case 'EvilIcons':
      return <EvilIcons size={size} color={color} {...restProps} />;
    case 'Feather':
      return <Feather size={size} color={color} {...restProps} />;
    case 'FontAwesome':
      return <FontAwesome size={size} color={color} {...restProps} />;
    case 'FontAwesome6':
      return <FontAwesome6 size={size} color={color} {...restProps} />;
    case 'FontAwesome6Pro':
      return <FontAwesome6Pro size={size} color={color} {...restProps} />;
    case 'FontAwesome5':
      return <FontAwesome5 size={size} color={color} {...restProps} />;
    case 'Fontisto':
      return <Fontisto size={size} color={color} {...restProps} />;
    case 'Foundation':
      return <Foundation size={size} color={color} {...restProps} />;
    case 'Ionicons':
      return <Ionicons size={size} color={color} {...restProps} />;
    case 'Zocial':
      return <Zocial size={size} color={color} {...restProps} />;
    case 'MaterialCommunityIcons':
      return (
        <MaterialCommunityIcons size={size} color={color} {...restProps} />
      );
    case 'MaterialIcons':
      return <MaterialIcons size={size} color={color} {...restProps} />;
    case 'Octicons':
      return <Octicons size={size} color={color} {...restProps} />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons size={size} color={color} {...restProps} />;
  }
};

export default memo(VectorIcon);
