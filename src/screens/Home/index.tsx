import { useState, useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import BottomSheetChat from "../../components/BottomSheetChat";
import { styles } from "./styles";

export function HomeScreen({isDarkMode}: {isDarkMode: boolean}) {
  const [sheetIndex, setSheetIndex] = useState(1);

  const openChat = () => {
    setSheetIndex(1);
  };
  const backgroundStyle = useMemo(
    () => ({
      backgroundColor: isDarkMode ? '#020617' : '#e4dcf7ff',
    }),
    [isDarkMode],
  );

return (
    <View style={[styles.container, backgroundStyle]}>
      <Pressable style={styles.CTAbutton} onPress={openChat}>
        <Text style={styles.CTAbuttonText}>Let's talk with Andrica!</Text>
      </Pressable>
      <BottomSheetChat index={sheetIndex} onIndexChange={setSheetIndex} />
    </View>
  );
}