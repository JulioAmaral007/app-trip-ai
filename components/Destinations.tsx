import { colors } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "./Button";
import { Typo } from "./Typo";

export function Destinations() {
  const navigation = useNavigation();

  const destinationData = [
    {
      id: 1,
      title: "Mount Bromo",
      shortDescription: "Volcano in East Java",
      image: require("../assets/images/beach.png"),
    },
    {
      id: 2,
      title: "Labengki Sombori",
      shortDescription: "Island in Sulawesi",
      image: require("../assets/images/beach.png"),
    },
  ];

  return (
    <View style={styles.container}>
      {destinationData.map((item, index) => {
        return (
          <DestinationCard item={item} key={index} navigation={navigation} />
        );
      })}
    </View>
  );
}

const DestinationCard = ({
  item,
  navigation,
}: {
  item: any;
  navigation: any;
}) => {
  const [isFavorite, setFavorite] = useState(false);

  return (
    <Button
      onPress={() =>
        navigation.navigate("Destination", { ...item, isFavorite })
      }
      style={{
        ...styles.card,
        ...(isFavorite && styles.activeCard),
      }}
    >
      {/* <Image
        source={item.image}
        style={[styles.cardImage, { width: 100, height: 100 }]}
      /> */}

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={[styles.gradient, { width: 100, height: 15 }]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <View style={styles.cardContent}>
        <Typo size={14}>{item.title}</Typo>
        <Typo size={12}>{item.shortDescription}</Typo>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  card: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
    padding: 16,
    marginBottom: 20,
  },
  activeCard: {
    backgroundColor: colors.background.tertiary,
  },
  cardImage: {
    borderRadius: 35,
    position: "absolute",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  favoriteButton: {
    position: "absolute",
    top: 4,
    right: 12,
    padding: 12,
    borderRadius: 25,
  },
  activeFavoriteButton: {
    backgroundColor: colors.background.tertiary,
  },
  cardContent: {
    gap: 4,
  },
});
