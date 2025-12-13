import { theme } from "@/constants/theme";
import { View } from "react-native";
// import MapView from "react-native-maps";
import { City } from "../types";
import { Typo } from "../ui/Typo";

type CityDetailsMapProps = Pick<City, "location">;

export function CityDetailsMap({ location }: CityDetailsMapProps) {
  return (
    <View style={{ padding: 16 }}>
      <Typo variant={theme.textVariants.title22}>
        Mapa
      </Typo>
      {/* <MapView
        style={{
          width: "100%",
          height: 200,
          borderRadius: theme.borderRadius.default,
        }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
    </View>
  );
}
