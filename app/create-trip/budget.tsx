import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Radio } from "@/components/Radio";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Typo } from "@/components/Typo";
import { colors, font } from "@/constants/theme";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type SpendingHabit = "cheap" | "moderate" | "luxury";

export default function BudgetScreen() {
  const [minBudget, setMinBudget] = useState("5200");
  const [maxBudget, setMaxBudget] = useState("55,200");
  const [selectedHabit, setSelectedHabit] = useState<SpendingHabit>("cheap");

  const spendingOptions = [
    {
      id: "cheap" as SpendingHabit,
      title: "Cheap",
      description: "Stay conscious of costs",
    },
    {
      id: "moderate" as SpendingHabit,
      title: "Moderate",
      description: "Keep costs on the average side",
    },
    {
      id: "luxury" as SpendingHabit,
      title: "Luxury",
      description: "Don't worry about it- live a little!",
    },
  ];

  return (
    <ScreenWrapper style={styles.container}>
      <Header title="Budget" leftIcon={<BackButton />} />

      <View style={styles.priceRangeSection}>
        <Text style={styles.sectionTitle}>Price range</Text>
        <Text style={styles.averagePrice}>
          The average nightly price is $5,200
        </Text>

        {/* Price Chart Visualization */}
        <View style={styles.chartContainer}>
          <View style={styles.chart}>
            {/* Mock chart bars */}
            {[
              20, 40, 60, 80, 100, 85, 70, 90, 75, 65, 45, 55, 35, 25, 15, 30,
              20, 10, 5,
            ].map((height, index) => (
              <View key={index} style={[styles.chartBar, { height: height }]} />
            ))}
          </View>
          <View style={styles.chartLabels}>
            <Text style={styles.chartLabel}>Minimum</Text>
            <Text style={styles.chartLabel}>Maximum</Text>
          </View>
        </View>

        <View style={styles.budgetInputs}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.budgetInput}
              value={`USD $${minBudget}`}
              onChangeText={(text) => setMinBudget(text.replace("USD $", ""))}
            />
          </View>
          <Text style={styles.inputSeparator}>→</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.budgetInput}
              value={`USD $${maxBudget}`}
              onChangeText={(text) => setMaxBudget(text.replace("USD $", ""))}
            />
          </View>
        </View>
      </View>

      <View style={styles.spendingSection}>
        <Text style={styles.sectionTitle}>
          Choose spending habits for you trip
        </Text>

        <View style={styles.optionsContainer}>
          {spendingOptions.map((option) => (
            <Button
              key={option.id}
              style={
                [
                  styles.option,
                  selectedHabit === option.id && styles.selectedOption,
                ] as any
              }
              onPress={() => setSelectedHabit(option.id)}
            >
              <View style={styles.radioContainer}>
                <View style={{ marginRight: 16 }}>
                  <Radio selected={selectedHabit === option.id} />
                </View>
                <View style={styles.optionText}>
                  <Typo
                    size={16}
                    fontFamily={font.semiBold}
                    color={colors.text.primary}
                  >
                    {option.title}
                  </Typo>
                  <Typo
                    size={16}
                    fontFamily={font.regular}
                    color={
                      selectedHabit === option.id
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
        onPress={() => router.push("/interests")}
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
  priceRangeSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  averagePrice: {
    fontSize: 14,
    color: "#999",
    marginBottom: 20,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 100,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  chartBar: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 1,
    borderRadius: 1,
  },
  chartLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  chartLabel: {
    color: "#666",
    fontSize: 12,
  },
  budgetInputs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  inputContainer: {
    flex: 1,
  },
  budgetInput: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  inputSeparator: {
    color: "#666",
    fontSize: 18,
  },
  spendingSection: {
    flex: 1,
  },
  optionsContainer: {
    gap: 16,
    marginTop: 20,
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
