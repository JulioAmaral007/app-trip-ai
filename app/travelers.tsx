import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Radio } from "@/components/Radio";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Typo } from "@/components/Typo";
import { colors, font } from "@/constants/theme";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

type TravelerType = "solo" | "couple" | "family" | "friends";

export default function TravelersScreen() {
  const [selectedType, setSelectedType] = useState<TravelerType>("solo");

  const travelerOptions = [
    {
      id: "solo" as TravelerType,
      title: "Just me",
      description: "A solo traveler in exploration",
    },
    {
      id: "couple" as TravelerType,
      title: "A couple",
      description: "Two traveler's in tandem",
    },
    {
      id: "family" as TravelerType,
      title: "Family",
      description: "A group of fun-loving adventures",
    },
    {
      id: "friends" as TravelerType,
      title: "Friends",
      description: "A bunch of thrill-seekers",
    },
  ];

  return (
    <ScreenWrapper style={styles.container}>
      <Header title="Who's going?" style={{ marginTop: 20 }} />

      <View style={styles.content}>
        <Typo size={22} fontFamily={font.semiBold} style={styles.subtitle}>
          Choose your travelers
        </Typo>

        <View style={styles.optionsContainer}>
          {travelerOptions.map((option) => (
            <Button
              key={option.id}
              style={
                [
                  styles.option,
                  selectedType === option.id && styles.selectedOption,
                ] as any
              }
              onPress={() => setSelectedType(option.id)}
            >
              <View style={styles.radioContainer}>
                <View style={{ marginRight: 16 }}>
                  <Radio selected={selectedType === option.id} />
                </View>
                <View style={styles.optionText}>
                  <Typo
                    size={18}
                    fontFamily={font.semiBold}
                    color={colors.text.primary}
                  >
                    {option.title}
                  </Typo>
                  <Typo
                    size={16}
                    fontFamily={font.regular}
                    color={
                      selectedType === option.id
                        ? colors.text.primary
                        : colors.text.secondary
                    }
                  >
                    {option.description}
                  </Typo>
                </View>
              </View>
            </Button>
          ))}
        </View>
      </View>

      <Button
        style={styles.continueButton}
        onPress={() => router.push("/travel-dates")}
      >
        <Typo size={16} fontFamily={font.semiBold} color={colors.text.inverse}>
          Continue
        </Typo>
      </Button>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  subtitle: {
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 16,
  },
  option: {
    backgroundColor: colors.background.secondary,
    padding: 20,
  },
  selectedOption: {
    backgroundColor: colors.primary.orange,
    borderColor: colors.primary.orange,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    marginBottom: 4,
  },
  selectedText: {
    color: colors.text.primary,
  },
  continueButton: {
    backgroundColor: colors.text.primary,
    paddingVertical: 16,
    marginBottom: 40,
  },
});
