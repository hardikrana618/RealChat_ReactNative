import {AppContainerView} from '@/components';
import {PageName} from '@/config';
import {navigateReplace} from '@/navigators/Navigationref';
import {Colors} from '@/theme';
import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';

function AnimatedSplash(): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      navigateReplace(PageName.AuthStack);
    }, 100);
  }, []);
  return (
    <AppContainerView style={[styles.containerView]}>
      {/* Set Splash Image */}
    </AppContainerView>
  );
}

const styles = StyleSheet.create({
  containerView: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
  },
});

export default AnimatedSplash;
