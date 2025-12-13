import { theme } from "@/constants/theme";
import createIconSetFromIcoMoon from "@expo/vector-icons/createIconSetFromIcoMoon";

const IconFromIcoMoon = createIconSetFromIcoMoon(
  require("@/assets/icons/selection.json"),
  "IcoMoon",
  require("@/assets/icons/icomoon.ttf")
);

export type IconProps = {
  name: IconName;
  color?: keyof typeof theme.colors;
  size?: number;
};
export function Icon({ name, color = "primary", size = 24 }: IconProps) {
  return <IconFromIcoMoon name={name} size={size} color={theme.colors[color]} />;
}

export type IconName =
  | "Adventure"
  | "Beach"
  | "Chevron-down"
  | "Chevron-left"
  | "Chevron-right"
  | "Chevron-up"
  | "Close"
  | "Culture"
  | "Explore"
  | "Favorite-fill"
  | "Favorite-outline"
  | "Gastronomy"
  | "Group"
  | "History"
  | "Home-fill"
  | "Home-outline"
  | "Luxury"
  | "Nature"
  | "Search-outline"
  | "Shopping"
  | "Star"
  | "Urban"
  | "Person-fill"
  | "Person-outline"
  | "Logout";