import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { MotiTransitionProp, MotiView } from "moti";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Switch_Props = {
  isActive: boolean;
  onPress: () => void;
  width?: number;
  aspectRatio?: number;
};

const transition: MotiTransitionProp = {
  type: "timing",
  duration: 350,
};

const colors = {
  active: "#2c2c2c",
  inactive: "#cdcdcd",
};

export default function Switch_({
  isActive,
  onPress,
  width = 90,
  aspectRatio = 2.7,
}: Switch_Props) {
  const SIZE = width;
  const OUTER_SIZE = width * 0.5;
  const INNER_SIZE = width * 0.3;

  const derivedValue = useDerivedValue(
    () => withTiming(isActive ? 1 : 0, { duration: 450 }),
    [isActive]
  );

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      derivedValue.value,
      [0, 1],
      [colors.active, colors.inactive]
    );

    return {
      backgroundColor,
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={[
          styles.switch,
          {
            width: SIZE,
            aspectRatio,
            borderRadius: SIZE,
          },
          rStyle,
        ]}
      >
        <MotiView
          style={[styles.outer, { width: OUTER_SIZE, borderRadius: SIZE }]}
          transition={transition}
          animate={{
            translateX: isActive ? SIZE / 4 : -SIZE / 4,
            rotate: isActive ? `${Math.PI / 2}rad` : `${-Math.PI / 2}rad`,
          }}
          // animate={{ translateX: isActive ? SIZE * (3 / 4) : -SIZE * (1 / 4) }}
        >
          {isActive ? (
            <MaterialCommunityIcons name="repeat-off" size={24} color="black" />
          ) : (
            <MaterialCommunityIcons name="repeat" size={24} color="black" />
          )}
        </MotiView>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  switch: {
    justifyContent: "center",
    alignItems: "center",
  },
  outer: {
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    backgroundColor: "gold",
  },
  inner: {
    aspectRatio: 1,
    borderColor: colors.active,
    borderWidth: 1,
  },
});
