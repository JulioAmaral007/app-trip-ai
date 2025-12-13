import { CityFilter } from "@/components/city/CityFilter";
import { ScreenWrapper } from "@/components/layout/ScreenWrapper";
import { TripCard } from "@/components/trip/TripCard";
import { Typo } from "@/components/ui/Typo";
import { theme } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { categories } from "@/data/categories";
import { useTripFindAll } from "@/hooks/useTripFindAll";
import type { GeneratedTripType } from "@/services/types";
import { useScrollToTop } from "@react-navigation/native";
import { useRef, useState } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import Animated, { FadingTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();
  const { user } = useAuth();
  const { data: trips, isLoading, error } = useTripFindAll(user?.id);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  const renderItem = ({ item }: ListRenderItemInfo<GeneratedTripType>) => (
    <View style={styles.itemContainer}>
      <TripCard trip={item} />
    </View>
  );

  const renderEmptyComponent = () => {
    const messages = {
      loading: "carregando viagens...",
      error: `erro ao carregar viagens. ${error}`,
      empty: "você ainda não tem viagens planejadas",
    };

    const message = isLoading ? messages.loading : error ? messages.error : messages.empty;

    return (
      <View style={styles.emptyContainer}>
        <Typo variant={theme.textVariants.text16} color={theme.colors.gray2} style={styles.emptyText}>
          {message}
        </Typo>
      </View>
    );
  };

  return (
    <ScreenWrapper style={{ paddingHorizontal: 0 }}>
      <Animated.FlatList
        itemLayoutAnimation={FadingTransition.duration(500)}
        ref={flatListRef}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: top, paddingBottom: 24 },
        ]}
        data={trips}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id || `trip-${index}`}
        ListEmptyComponent={renderEmptyComponent()}
        ListHeaderComponent={
          <CityFilter
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onChangeSelectedCategoryId={setSelectedCategoryId}
          />
        }
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 16,
  },
  emptyContainer: {
    alignSelf: "center",
    marginTop: 32,
  },
  emptyText: {
    textAlign: "center",
  },
  contentContainer: {
    gap: 24,
  },
});