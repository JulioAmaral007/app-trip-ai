import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Typo } from "@/components/Typo";
import { colors, font } from "@/constants/theme";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DatesScreen() {
  const [selectedStartDate, setSelectedStartDate] = useState(15);
  const [selectedEndDate, setSelectedEndDate] = useState(19);

  // Mock calendar data for March 2026
  const calendarDays = [
    { day: 27, isCurrentMonth: false },
    { day: 28, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
    { day: 2, isCurrentMonth: false },
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const isSelected = (day: number) =>
    day === selectedStartDate || day === selectedEndDate;
  const isInRange = (day: number) =>
    day > selectedStartDate && day < selectedEndDate;

  return (
    <ScreenWrapper style={styles.container}>
      <Header title="Travel dates" leftIcon={<BackButton />} />

      <View style={styles.calendarContainer}>
        <View style={styles.monthHeader}>
          <TouchableOpacity>
            <Text style={styles.monthNavIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.monthTitle}>March 2026</Text>
          <TouchableOpacity>
            <Text style={styles.monthNavIcon}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weekDaysContainer}>
          {weekDays.map((day) => (
            <Text key={day} style={styles.weekDay}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>
          {calendarDays.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayButton,
                !item.isCurrentMonth && styles.inactiveDay,
                isSelected(item.day) && styles.selectedDay,
                isInRange(item.day) && styles.rangeDay,
              ]}
              onPress={() => {
                if (item.isCurrentMonth) {
                  // Simple date selection logic
                  if (!selectedStartDate || item.day < selectedStartDate) {
                    setSelectedStartDate(item.day);
                    setSelectedEndDate(0);
                  } else if (
                    !selectedEndDate ||
                    item.day === selectedStartDate
                  ) {
                    setSelectedEndDate(item.day);
                  } else {
                    setSelectedStartDate(item.day);
                    setSelectedEndDate(0);
                  }
                }
              }}
            >
              <Text
                style={[
                  styles.dayText,
                  !item.isCurrentMonth && styles.inactiveDayText,
                  isSelected(item.day) && styles.selectedDayText,
                ]}
              >
                {item.day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.dateRangeContainer}>
          <View style={styles.dateRange}>
            <View style={styles.dateInfo}>
              <Text style={styles.dateIcon}>📅</Text>
              <View>
                <Text style={styles.dateLabel}>15 Marc 2026</Text>
                <Text style={styles.dateSubLabel}>Start at</Text>
              </View>
            </View>
            <Text style={styles.arrow}>→</Text>
            <View style={styles.dateInfo}>
              <Text style={styles.dateIcon}>📅</Text>
              <View>
                <Text style={styles.dateLabel}>19 Marc 2026</Text>
                <Text style={styles.dateSubLabel}>Ends at</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Button
        style={styles.continueButton}
        onPress={() => router.push("/budget")}
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
  calendarContainer: {
    flex: 1,
    justifyContent: "center",
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  monthNavIcon: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  monthTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  weekDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  weekDay: {
    color: "#999",
    fontSize: 14,
    fontWeight: "500",
    width: 35,
    textAlign: "center",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  dayButton: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderRadius: 18,
  },
  selectedDay: {
    backgroundColor: "#FF6B35",
  },
  rangeDay: {
    backgroundColor: "rgba(255, 107, 53, 0.2)",
  },
  inactiveDay: {
    opacity: 0.3,
  },
  dayText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  selectedDayText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inactiveDayText: {
    color: "#666",
  },
  dateRangeContainer: {
    marginBottom: 40,
  },
  dateRange: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
  },
  dateInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dateIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  dateLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dateSubLabel: {
    color: "#999",
    fontSize: 12,
  },
  arrow: {
    color: "#999",
    fontSize: 18,
    marginHorizontal: 16,
  },
  continueButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 40,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
});
