import { theme } from "@/constants/theme";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { type IconName } from "./Icon";
import { IconButton } from "./IconButton";

type SearchInputProps = {} & Pick<
  TextInputProps,
  "value" | "onChangeText" | "placeholder"
>;
export function SearchInput({
  value,
  onChangeText,
  placeholder,
}: SearchInputProps) {
  const [showSearch, setShowSearch] = useState(false);

  const iconName: IconName = value!.length > 0 ? "Close" : "Search-outline";

  function onPressIconButton() {
    if (value!.length > 0) {
      onChangeText?.("");
    }
    setShowSearch(!showSearch);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, {  borderColor: showSearch ? theme.colors.primary : theme.colors.transparent, justifyContent: showSearch ? "flex-end" : "space-between" }]}>
        {showSearch ? (
          <TextInput
            testID="search-input"
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.gray2}
            onFocus={() => setShowSearch(true)}
            style={styles.input}
          />
        ) :      
          <Image
            style={styles.logo}
            contentFit="contain"
            source={require('@/assets/images/logo.png')}
          /> 
        }
        
       <TouchableOpacity
        onPress={onPressIconButton}
        style={styles.iconButton}
       >
        <IconButton iconName={value!.length > 0 ? "Close" : "Search-outline"} onPress={onPressIconButton} />
       </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    position: "relative",
    zIndex: 50,
  },
  inputContainer: {
    borderRadius: theme.borderRadius.rounded,
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 60,
  },
  input: {
    flex: 1,
    paddingLeft: 24,
    color: theme.colors.text,
    fontSize: 16,
    fontFamily: "PoppinsBold",
    lineHeight: 22,
  },
  iconButton: {
    borderRadius: theme.borderRadius.rounded,
    padding: 8,
  },
});
