import { theme } from "@/constants/theme";
import { UserType } from "@/services/types";
import { View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Typo } from "@/components/ui/Typo";

type ProfileHeaderProps = {
  authUser: UserType;
};

export function ProfileHeader({ authUser }: ProfileHeaderProps) {
  return (
    <View>
      <Typo variant={theme.textVariants.title16} style={{ alignSelf: "center", marginBottom: 40 }}>
        Perfil
      </Typo>

      <Typo variant={theme.textVariants.title16} style={{ marginBottom: 16 }}>
        Informações da Conta.
      </Typo>

      <View style={{ gap: 16 }}>
        <LineItem label="Nome" value={authUser?.name || ""} />
        <LineItem label="E-mail" value={authUser?.email || ""} />
        <LineItem
          label="Membro desde"
          // value={dateUtils.formatMonthAndYear(authUser.createdAt)}
          value="01/01/2025"
        />
      </View>

      <View style={{ flexDirection: "row",  gap: 16, marginTop: 16 }}>
        <View style={{ flex: 1 }}>
          <Button
          style={{ backgroundColor: theme.colors.gray1 }}
            // onPress={() => router.navigate("/update-profile")}
          >
            <Typo variant={theme.textVariants.text14}>Editar perfil</Typo>
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            style={{ backgroundColor: theme.colors.gray1 }}
            // onPress={() => router.navigate("/profile/change-password")}
          >
            <Typo variant={theme.textVariants.text14}>Alterar senha</Typo>
          </Button>
        </View>
      </View>
    </View>
  );
}

function LineItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Typo variant={theme.textVariants.text14} color={theme.colors.gray2}>
        {label}
      </Typo>
      <Typo variant={theme.textVariants.text14} color={theme.colors.text}>
        {value}
      </Typo>
    </View>
  );
}
