import React, {forwardRef, memo} from 'react';
import {
  ImageBackground,
  ImageRequireSource,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import FastImage, {FastImageProps, Source} from 'react-native-fast-image';

import {useSharedValue, withTiming} from 'react-native-reanimated';

export interface AppImageProps extends FastImageProps {
  source?: Source | ImageRequireSource;
  svgIcon?: React.ReactNode;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  overlapRender?: React.ReactNode;
  key?: React.Key | null | undefined;
}
const AppImage = ({
  source = {},
  children,
  svgIcon,
  resizeMode = 'cover',
  style,
  containerStyle,
  onLayout,
  overlapRender,
  key,
}: AppImageProps) => {
  const fadingAnim = useSharedValue(1);

  return (
    <>
      <View
        key={key}
        style={[styles.baseContainer, containerStyle]}
        onLayout={onLayout}>
        {overlapRender}
        {svgIcon ? (
          <View style={[styles.image, style]}>{svgIcon}</View>
        ) : (
          <FastImage
            onLoadEnd={() => {
              fadingAnim.value = withTiming(0);
            }}
            style={[styles.image, style]}
            resizeMode={resizeMode}
            source={
              source instanceof Object
                ? {
                    priority: FastImage.priority.normal,
                    cache: 'immutable',
                    ...source,
                  }
                : source
            }
          />
        )}
      </View>
    </>
  );
};

export default memo(AppImage);

const styles = StyleSheet.create({
  blurhashView: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  baseContainer: {},
});
