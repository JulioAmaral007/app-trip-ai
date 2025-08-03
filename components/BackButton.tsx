import { colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { CaretLeft } from 'phosphor-react-native';
import { StyleSheet, TouchableOpacity, type ViewStyle } from 'react-native';

export type BackButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
};

export function BackButton({ style, iconSize = 26 }: BackButtonProps) {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} style={[styles.button, style]}>
      <CaretLeft size={iconSize} color="#fff" weight="bold" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: 5,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
});
