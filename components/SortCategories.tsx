import { colors } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "./Button";
import { Typo } from "./Typo";

export function SortCategories() {
  const [activeSort, setActiveSort] = useState("Popular");

  const sortCategoryData = ["Popular", "Recommended", "Recent", "Trending"];

  return (
    <View style={styles.container}>
      {sortCategoryData.map((sort, index) => {
        let isActive = sort == activeSort;

        return (
          <Button
            onPress={() => setActiveSort(sort)}
            style={{
              ...styles.button,
              ...(isActive && styles.activeButton),
            }}
            key={index}
          >
            <Typo
              size={12}
              color={isActive ? colors.text.secondary : colors.text.primary}
            >
              {sort}
            </Typo>
          </Button>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.background.secondary,
    borderRadius: 25,
    padding: 8,
    gap: 10,
  },
  button: {
    borderRadius: 25,
    flex: 1,
  },
  activeButton: {
    backgroundColor: colors.background.tertiary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
