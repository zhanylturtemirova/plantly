import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { theme } from "@/theme";
import PlantlyImage from "@/components/PlantlyImage";
import { useState } from "react";
import PlantlyButton from "@/components/PlantlyButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { usePlantStore } from "@/store/plantsStore";
import { useRouter } from "expo-router/build/exports";
import { launchImageLibraryAsync } from "expo-image-picker";

type NewPlantProps = {
  name: string;
  frequency: number;
};
export default function NewScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const addPlant = usePlantStore((state) => state.addPlant);
  const handleSubmit = () => {
    if (name.trim() === "")
      return Alert.alert("Validation Error", "Give your plant a name");
    if (frequency.trim() === "")
      return Alert.alert("Validation Error", "Specify the watering frequency");
    if (isNaN(Number(frequency)))
      return Alert.alert(
        "Validation Error",
        "Watering frequency should be a number",
      );
    const newPlant: NewPlantProps = {
      name: name.trim(),
      frequency: Number(frequency),
    };
    addPlant({
      name: newPlant.name,
      wateringFrequencyDays: newPlant.frequency,
      imageUri: imageUri ?? undefined,
    });
    router.navigate("/");
  };
  const handleChooseImage = async () => {
    if (Platform.OS === "web") {
      return;
    } else {
      const result = await launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={styles.centered}
        activeOpacity={0.8}
        onPress={handleChooseImage}
      >
        <PlantlyImage imageUri={imageUri ?? undefined} />
      </TouchableOpacity>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="E.g Casper the Cactus"
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        returnKeyType="done"
        autoCapitalize={"words"}
      />
      <Text style={styles.label}>Watering Frequency (every x days)</Text>
      <TextInput
        placeholder="E.g. 6"
        style={styles.textInput}
        value={frequency}
        onChangeText={setFrequency}
        returnKeyType="done"
        keyboardType="number-pad"
      />
      <PlantlyButton title="Add plant" onPress={handleSubmit} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  textInput: {
    borderWidth: 2,
    borderColor: theme.colorLightGrey,
    padding: 12,
    borderRadius: 6,
    marginBottom: 24,
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  centered: {
    alignItems: "center",
    marginBottom: 24,
  },
});
