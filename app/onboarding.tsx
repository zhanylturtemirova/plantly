import { StyleSheet, Text } from "react-native";
import { theme } from "@/theme";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";
import PlantlyButton from "@/components/PlantlyButton";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import PlantlyImage from "@/components/PlantlyImage";

export default function OnboardingScreen() {
  const router = useRouter();
  const toggleHasOnboarded = useUserStore(
    (state) => state.toggleFinishedOnboarding,
  );
  const handlePress = () => {
    toggleHasOnboarded();
    router.replace("/");
  };
  return (
    <LinearGradient
      start={{ x: 0.5, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[theme.colorGreen, theme.colorAppleGreen, theme.colorLimeGreen]}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Text style={styles.heading}>Plantly</Text>
      <Text style={styles.subheading}>Your personal plant care assistant</Text>
      <PlantlyImage />
      <PlantlyButton title="Onboarding complete" onPress={handlePress} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },
  heading: {
    fontSize: 48,
    fontWeight: "bold",
    color: theme.colorWhite,
  },
  subheading: {
    fontSize: 18,
    color: theme.colorWhite,
    marginBottom: 20,
  },
});
