import { theme } from "@/constants/theme";
import { View } from "react-native";
import { Accordion } from "@/components/ui/Accordion";
import { City } from "@/components/types";
import { Typo } from "@/components/ui/Typo";

type Props = Pick<City, "touristAttractions">;
export function CityDetailsTouristAttractions({ touristAttractions }: Props) {
  return (
    <View style={{ padding: 16 }}>
      <Typo variant={theme.textVariants.title22}>
        Pontos turísticos 
      </Typo>
      <View style={{ gap: 8 }}>
        {touristAttractions.map((attraction) => (
          <Accordion
            key={attraction.id}
            title={attraction.name}
            description={attraction.description}
          />
        ))}
      </View>
    </View>
  );
}
