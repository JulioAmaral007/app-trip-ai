import { FavoriteCityList } from "@/components/city/FavoriteCityList";
import { ScreenWrapper } from "@/components/layout/ScreenWrapper";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { Icon } from "@/components/ui/Icon";
import { Typo } from "@/components/ui/Typo";
import { theme } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { UserType } from "@/services/types";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <ScreenWrapper>
      <FavoriteCityList
        ListHeaderComponent={user && <ProfileHeader authUser={user as UserType} />}
        ListFooterComponent={
          <Pressable onPress={handleSignOut}>
            <View
              style={{ marginTop: 24, flexDirection: "row", alignItems: "center", alignSelf: "center" }}
            >
              <Icon name="Logout" color="fbErrorSurface" />
              <Typo variant={theme.textVariants.text14} color={theme.colors.fbErrorSurface}>Sair</Typo>
            </View>
          </Pressable>
        }
      />
    </ScreenWrapper>
  );
}