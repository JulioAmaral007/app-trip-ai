
import { CityDetailsHeader } from "@/components/city/CityDetailsHeader";
import { CityDetailsInfo } from "@/components/city/CityDetailsInfo";
import { CityDetailsMap } from "@/components/city/CityDetailsMap";
import { CityDetailsRelatedCities } from "@/components/city/CityDetailsRelatedCities";
import { CityDetailsTouristAttractions } from "@/components/city/CityDetailsTouristAttractions";
import { ScreenWrapper } from "@/components/layout/ScreenWrapper";
import { Divider } from "@/components/ui/Divider";
import { Typo } from "@/components/ui/Typo";
import { theme } from "@/constants/theme";
import { useTripFindById } from "@/hooks/useTripFindById";
import { useLocalSearchParams } from "expo-router";
import { Pressable } from "react-native";
import Animated, { FadeIn, useSharedValue } from "react-native-reanimated";

const PAGE_ANIMATION_TIME = 1000;

export default function CityDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: trip, error, isLoading } = useTripFindById(id);

  const bottomSheetIsOpen = useSharedValue(false);
  function toggleBottomSheet() {
    bottomSheetIsOpen.value = !bottomSheetIsOpen.value;
  }

  if (isLoading) {
    return (
      <ScreenWrapper style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Typo variant={theme.textVariants.text14}>Carregando dados...</Typo>
      </ScreenWrapper>
    );
  }

  if (error || !trip) {
    return (
      <ScreenWrapper style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Typo variant={theme.textVariants.text14}>Erro ao carregar cidade</Typo>
      </ScreenWrapper>
    );
  }

  return (
    <>
      <ScreenWrapper scrollable style={{ paddingHorizontal: 0 }}>
        <Animated.View entering={FadeIn.duration(PAGE_ANIMATION_TIME)}>
          <CityDetailsHeader
            id={trip.id}
            coverImage={trip.coverImage}
            categories={trip.categories}
            isFavorite={trip.isFavorite}
          />
          <CityDetailsInfo
            name={trip.name}
            country={trip.country}
            description={trip.description}
          />
          <Divider  />
          <CityDetailsTouristAttractions
            touristAttractions={trip.touristAttractions}
          />

          <Divider  />
          <Pressable onPress={toggleBottomSheet}>
            <CityDetailsMap location={trip.location} />
          </Pressable>

          <Divider  />
          <CityDetailsRelatedCities id={trip.id} />
        </Animated.View>
      </ScreenWrapper>
      {/* <Animated.View entering={FadeIn.duration(0).delay(PAGE_ANIMATION_TIME)}>
        <BottomSheetMap
          location={city.location}
          isOpen={bottomSheetIsOpen}
          onPress={toggleBottomSheet}
        />
      </Animated.View> */}
    </>
  );
}