import { Link, Stack, Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "@/theme";
import { Pressable } from "react-native";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: () => (
            <Link href="/new" asChild>
              <Pressable hitSlop={10}>
                <AntDesign name="plus" size={24} color={theme.colorGreen} />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen name="plants/[plantId]" options={{ title: "" }} />
    </Stack>
  );
}
