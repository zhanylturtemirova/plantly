import { Pressable, Text, StyleSheet, Platform } from "react-native";
import * as Haptics from "expo-haptics";
import { theme } from "@/theme";

type PlantlyButtonProps = {
  title: string;
  onPress: () => void;
};
export default function PlantlyButton({ title, onPress }: PlantlyButtonProps) {
  const handleOnPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };
  return (
    <Pressable
      onPress={handleOnPress}
      style={({ pressed }) =>
        pressed ? [styles.button, styles.buttonPressed] : styles.button
      }
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colorGreen,
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  buttonPressed: {
    backgroundColor: theme.colorLeafyGreen,
  },
});
