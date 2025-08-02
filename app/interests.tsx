import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Typo } from "@/components/Typo";
import { colors, font } from "@/constants/theme";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function InterestsScreen() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "adventure",
    "camp",
  ]);

  const interests = [
    { id: "food", title: "Food & Drinks", icon: "🍔" },
    { id: "urban", title: "Urban Areas", icon: "🏢" },
    { id: "adventure", title: "Adventure", icon: "🏔️" },
    { id: "educational", title: "Educational", icon: "🎓" },
    { id: "beach", title: "Beach", icon: "🏖️" },
    { id: "wildlife", title: "Wildlife", icon: "🦁" },
    { id: "pool", title: "Pool", icon: "🏊" },
    { id: "relax", title: "Relax", icon: "😌" },
    { id: "camp", title: "Camp", icon: "🏕️" },
  ];

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) => {
      // Se já está selecionado, remove
      if (prev.includes(interestId)) {
        return prev.filter((id) => id !== interestId);
      }

      // Se não está selecionado e já tem 3 itens, não adiciona
      if (prev.length >= 3) {
        return prev;
      }

      // Adiciona o novo item
      return [...prev, interestId];
    });
  };

  const isSelected = (interestId: string) =>
    selectedInterests.includes(interestId);

  return (
    <ScreenWrapper style={styles.container}>
      <Header title="Interest" leftIcon={<BackButton />} />

      <View style={styles.selectionInfo}>
        <Typo size={14} color={colors.text.secondary}>
          {selectedInterests.length}/3 interesses selecionados
        </Typo>
      </View>

      <View style={styles.interestsContainer}>
        {interests.map((interest) => {
          const isCurrentlySelected = isSelected(interest.id);
          const isDisabled =
            !isCurrentlySelected && selectedInterests.length >= 3;

          return (
            <Button
              key={interest.id}
              style={
                [
                  styles.interestButton,
                  isCurrentlySelected && styles.selectedInterest,
                  isDisabled && styles.disabledInterest,
                ] as any
              }
              onPress={() => toggleInterest(interest.id)}
            >
              <Typo size={20}>{interest.icon}</Typo>
              <Typo
                size={18}
                fontFamily={font.semiBold}
                color={colors.text.primary}
              >
                {interest.title}
              </Typo>
            </Button>
          );
        })}
      </View>

      <Button
        style={styles.continueButton}
        onPress={() => router.push("/review-trip")}
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
  selectionInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  interestsContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
  },
  interestButton: {
    backgroundColor: colors.background.secondary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  selectedInterest: {
    backgroundColor: colors.primary.orange,
    borderColor: colors.primary.orange,
  },
  disabledInterest: {
    opacity: 0.5,
  },
  interestIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  continueButton: {
    backgroundColor: colors.text.primary,
    paddingVertical: 16,
    marginBottom: 40,
  },
});
