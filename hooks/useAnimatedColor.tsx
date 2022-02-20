import {
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import Animated, {
  AnimatedStyleProp,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

export default function useAnimatedColor(
  derivedValue: Readonly<Animated.SharedValue<number>>,
  styleProp: keyof AnimatedStyleProp<ViewStyle | ImageStyle | TextStyle>,
  colors: (string | number)[]
) {
  const rStyle = useAnimatedStyle(() => {
    return {
      [styleProp]: interpolateColor(derivedValue.value, [0, 1], colors),
    };
  });

  return rStyle;
}
