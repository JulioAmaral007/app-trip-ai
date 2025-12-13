import { theme } from "@/constants/theme";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Typo } from "@/components/ui/Typo";
import { City } from "@/components/types";

type Props = Pick<City, "id">;
export function CityDetailsRelatedCities({ id }: Props) {
  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const cardWith = width * 0.7;
  const cardHeight = cardWith * 0.9;

  return (
    <View style={{ paddingBottom: bottom }}>
      <Typo variant={theme.textVariants.title22} style={{ paddingHorizontal: 16 }}>
        Veja Também
      </Typo>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 8,
          paddingHorizontal: 16,
        }}
      >
        {/* {cities?.map((city) => (
          <CityCard key={city.id} cityPreview={city} type="small" />
        ))} */}
      </ScrollView>
    </View>
  );
}
