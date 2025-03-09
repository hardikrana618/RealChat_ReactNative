import React, {memo, useCallback} from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import {Colors, getResHeight} from '@/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type AreaTypes = 'top' | 'bottom' | 'left' | 'right';

export type ContainerViewProps = ViewProps &
  Partial<ScrollViewProps> & {
    safeAreaType?: AreaTypes[] | AreaTypes;
    backgroundColor?: string | 'transparent';
    ref?: React.Ref<View>;
  };

const ContainerView = ({
  children,
  safeAreaType,
  backgroundColor = Colors.backgroundView,
  bounces = false,
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
  scrollEnabled = false,
  style = {},
  ref,
  ...reset
}: ContainerViewProps) => {
  const {top, bottom, left, right} = useSafeAreaInsets();

  const {...viewStyle} = StyleSheet.flatten(style);

  const styles = StyleSheet.create({
    style: {
      backgroundColor: backgroundColor,
      ...viewStyle,
      ...(safeAreaType?.includes('top') && {
        paddingTop: top,
        ...(typeof viewStyle.height === 'number' && {
          height: viewStyle.height + top,
        }),
      }),
      ...(safeAreaType?.includes('bottom') && {
        paddingBottom: bottom ? bottom : getResHeight(20),
        ...(typeof viewStyle.height === 'number' && {
          height: viewStyle.height + bottom,
        }),
      }),
      ...(safeAreaType?.includes('left') && {
        paddingLeft: left,
      }),
      ...(safeAreaType?.includes('right') && {
        paddingRight: right,
      }),
    },
  });

  if (typeof scrollEnabled === 'boolean' && scrollEnabled) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        bounces={bounces}
        style={[styles.style]}
        scrollEnabled={scrollEnabled}
        {...reset}>
        {children}
      </ScrollView>
    );
  }
  return (
    <View style={[styles.style]} {...reset} ref={ref}>
      {children}
    </View>
  );
};

export default memo(ContainerView);
