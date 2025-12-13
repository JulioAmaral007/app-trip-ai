import { BlackOpacity } from "@/components/ui/BlackOpacity";
import { Typo } from "@/components/ui/Typo";
import { theme } from "@/constants/theme";
import type { GeneratedTripType } from "@/services/types";
import { Link } from "expo-router";
import { ImageBackground, Pressable, StyleSheet, useWindowDimensions, View } from "react-native";

type TripCardProps = {
  trip: Partial<GeneratedTripType>;
  type?: "small" | "large";
  disableFavorite?: boolean;
};

export function TripCard({
  trip,
  type = "large",
  disableFavorite = false,
}: TripCardProps) {
  const { width } = useWindowDimensions();

  const cardWith = width * 0.7;
  const cardHeight = cardWith * 0.9;

  const style =
    type === "small" ? { width: cardWith, height: cardHeight } : undefined;

  console.log(trip);
  const imageSource = trip.destinationImageUrl
  ? { uri: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" } : { uri: trip.destinationImageUrl }

  return (
    <Link push href={`/trip-details/${trip.id}`} asChild>
      <Pressable>
        <ImageBackground
          source={imageSource}
          style={[{ width: "100%", height: 280 }, style]}
          imageStyle={{ borderRadius: theme.borderRadius.default }}
          resizeMode="cover"
        >
          <BlackOpacity />
          <View style={{ flex: 1, padding: 24, justifyContent: 'space-between' }}>
            <View style={{ alignSelf: 'flex-end' }}>
              {/* {!disableFavorite && <TripFavoriteButton trip={trip} />} */}
            </View>
            <View>
              <Typo variant={theme.textVariants.title22}>{trip.tripName || "Viagem sem nome"}</Typo>
              <Typo variant={theme.textVariants.text16}>{trip.destination || ""}</Typo>
            </View>
          </View>
        </ImageBackground>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    // borderWidth: 1,
    // borderColor: "#FF4B4B",
    // paddingHorizontal: 8,
    // paddingVertical: 16,
    // padding: 16,
  },
  title: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: 600,
    marginTop: 16,
  },
  description: {
    color: theme.colors.text,
    fontSize: 16,
    marginTop: 8,
  },
})
