import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

import {AppFonts, Colors, getResFont} from '@/theme';

export type FontWeight = keyof typeof AppFonts | string;

export interface AppTextProps extends TextProps {
  children: React.ReactNode;
  fontWeight?: FontWeight;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  gradientColors?: string[];
  isGradientText?: boolean;
  lineHeightRatio?: number;
  lineHeight?: number;
  letterSpacing?: number;
  style?: StyleProp<TextStyle>;
  align?: 'left' | 'center' | 'right';
}

export default ({
  children,
  fontWeight = 400,
  fontFamily,
  /**
   * Defult text color is black
   */
  color = Colors.txtPrimary,
  fontSize = 14,
  lineHeightRatio,
  lineHeight = fontSize + 2.5,
  letterSpacing,
  style,
  align = 'left',
  ...restProps
}: AppTextProps) => {
  const textStyles: Object = {
    ...(typeof fontWeight === 'string'
      ? {fontWeight}
      : typeof fontFamily === 'string'
      ? {fontFamily}
      : {fontFamily: AppFonts[fontWeight]}),
    color: color,
    fontSize: getResFont(fontSize),
    ...(lineHeightRatio && {
      lineHeight: getResFont(fontSize * lineHeightRatio),
    }),
    ...(lineHeight && {lineHeight: getResFont(lineHeight)}),
    ...(letterSpacing && {letterSpacing: getResFont(letterSpacing)}),
    textAlign: align,
  };
  return (
    <Text {...restProps} style={[styles.base, textStyles, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: Colors.txtPrimary,
  },
});
