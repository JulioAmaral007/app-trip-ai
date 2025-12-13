import { theme } from "@/constants/theme";
import { View } from "react-native";
import { Typo } from "@/components/ui/Typo";
import { City } from "@/components/types";

type CityDetailsInfoProps = Pick<City, "name" | "country" | "description">;

export function CityDetailsInfo({
  name,
  country,
  description,
}: CityDetailsInfoProps) {
  return (
    <View style={{ padding: 16 }}>
      <Typo variant={theme.textVariants.title28}>
        {name}
      </Typo>
      <Typo variant={theme.textVariants.text18}>
        {country}
      </Typo>
      <Typo variant={theme.textVariants.text14}>{description}</Typo>
    </View>
  );
}
