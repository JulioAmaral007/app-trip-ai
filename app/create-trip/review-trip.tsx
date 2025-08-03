import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Typo } from "@/components/Typo";
import { colors, font } from "@/constants/theme";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function ReviewScreen() {
  return (
    <ScreenWrapper style={styles.container}>
      <Header title="Review your trip" leftIcon={<BackButton />} />

      <View style={styles.content}>
        <View style={styles.tripNameSection}>
          <Typo fontFamily={font.semiBold} style={styles.sectionLabel}>
            Trip Name
          </Typo>
          <Input value="Goes to Bali" placeholder="Enter trip name" />
        </View>

        <View style={styles.reviewSection}>
          <View style={styles.reviewItem}>
            <View style={styles.reviewItemHeader}>
              <Typo size={20}>📍</Typo>
              <View style={styles.reviewItemContent}>
                <Typo size={14} color={colors.text.secondary}>
                  Destination
                </Typo>
                <Typo size={16} fontFamily={font.semiBold}>
                  Bali, Indonesia
                </Typo>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Typo size={16}>✏️</Typo>
            </TouchableOpacity>
          </View>

          <View style={styles.reviewItem}>
            <View style={styles.reviewItemHeader}>
              <Typo size={20}>👥</Typo>
              <View style={styles.reviewItemContent}>
                <Typo size={14} color={colors.text.secondary}>
                  Choose your travelers
                </Typo>
                <Typo size={16} fontFamily={font.semiBold}>
                  Just me
                </Typo>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Typo size={16}>✏️</Typo>
            </TouchableOpacity>
          </View>

          <View style={styles.reviewItem}>
            <View style={styles.reviewItemHeader}>
              <Typo size={20}>📅</Typo>
              <View style={styles.reviewItemContent}>
                <Typo size={14} color={colors.text.secondary}>
                  Travel dates
                </Typo>
                <Typo size={16} fontFamily={font.semiBold}>
                  15 Marc 2026 - 19 Marc 2026
                </Typo>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Typo size={16}>✏️</Typo>
            </TouchableOpacity>
          </View>

          <View style={styles.reviewItem}>
            <View style={styles.reviewItemHeader}>
              <Typo size={20}>💰</Typo>
              <View style={styles.reviewItemContent}>
                <Typo size={14} color={colors.text.secondary}>
                  Budget
                </Typo>
                <Typo size={16} fontFamily={font.semiBold}>
                  Cheap
                </Typo>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Typo size={16}>✏️</Typo>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.interestsSection}>
          <Typo fontFamily={font.semiBold} style={styles.sectionLabel}>
            Interest
          </Typo>
          <View style={styles.interestTags}>
            <View style={styles.interestTag}>
              <Typo size={20}>🏔️</Typo>
              <Typo size={16} fontFamily={font.semiBold}>
                Adventure
              </Typo>
            </View>
            <View style={styles.interestTag}>
              <Typo size={20}>🏕️</Typo>
              <Typo size={16} fontFamily={font.semiBold}>
                Camp
              </Typo>
            </View>
            <TouchableOpacity style={styles.addInterestButton}>
              <Typo size={16}>+</Typo>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Button
        style={styles.searchButton}
        onPress={() => router.push("/generating")}
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
  tripNameSection: {
    marginBottom: 30,
  },
  sectionLabel: {
    marginBottom: 8,
  },
  reviewSection: {
    marginBottom: 30,
  },
  reviewItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  reviewItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  reviewItemContent: {
    flex: 1,
    gap: 4,
    marginLeft: 16,
  },
  editButton: {
    padding: 8,
  },
  interestsSection: {
    marginBottom: 40,
  },
  interestTags: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  interestTag: {
    backgroundColor: "#FF6B35",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  addInterestButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#444",
  },
  searchButton: {
    backgroundColor: colors.text.primary,
    paddingVertical: 16,
    marginBottom: 40,
  },
});
