import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Switch_ from "./comps/Switch_";

export default function App() {
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Switch_
        isActive={isActive}
        onPress={() => setIsActive((isActive) => !isActive)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
});
