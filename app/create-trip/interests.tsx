import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { Typo } from '@/components/Typo';
import { colors, font } from '@/constants/theme';
import { router } from 'expo-router';
import {
  Buildings,
  ForkKnife,
  GraduationCap,
  Mountains,
  Smiley,
  SwimmingPool,
  Tent,
  Umbrella,
} from 'phosphor-react-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function InterestsScreen() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['adventure', 'camp']);

  const interests = [
    { id: 'food', title: 'Food & Drinks', icon: ForkKnife },
    { id: 'urban', title: 'Urban Areas', icon: Buildings },
    { id: 'adventure', title: 'Adventure', icon: Mountains },
    { id: 'educational', title: 'Educational', icon: GraduationCap },
    { id: 'beach', title: 'Beach', icon: Umbrella },
    { id: 'pool', title: 'Pool', icon: SwimmingPool },
    { id: 'relax', title: 'Relax', icon: Smiley },
    { id: 'camp', title: 'Camp', icon: Tent },
  ];

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) => {
      // Se já está selecionado, remove
      if (prev.includes(interestId)) {
        return prev.filter((id) => id !== interestId);
      }

      // Se não está selecionado e já tem 3 itens, não adiciona
      if (prev.length >= 3) {
        return prev;
      }

      // Adiciona o novo item
      return [...prev, interestId];
    });
  };

  const isSelected = (interestId: string) => selectedInterests.includes(interestId);

  return (
    <ScreenWrapper>
      <Header title="Interest" leftIcon={<BackButton />} />

      <View style={styles.selectionInfo}>
        <Typo size={14} color={colors.text.secondary}>
          {selectedInterests.length}/3 interesses selecionados
        </Typo>
      </View>

      <View style={styles.interestsContainer}>
        {interests.map((interest) => {
          const isCurrentlySelected = isSelected(interest.id);
          const isDisabled = !isCurrentlySelected && selectedInterests.length >= 3;
          const IconComponent = interest.icon;

          return (
            <Button
              key={interest.id}
              style={
                [
                  styles.interestButton,
                  isCurrentlySelected && styles.selectedInterest,
                  isDisabled && styles.disabledInterest,
                ] as any
              }
              onPress={() => toggleInterest(interest.id)}>
              <IconComponent
                size={20}
                color={isCurrentlySelected ? colors.text.inverse : colors.text.primary}
                weight="fill"
              />
              <Typo size={16} fontFamily={font.semiBold} color={colors.text.primary}>
                {interest.title}
              </Typo>
            </Button>
          );
        })}
      </View>

      <Button style={styles.continueButton} onPress={() => router.push('/create-trip/review-trip')}>
        <Typo size={16} fontFamily={font.semiBold} color={colors.text.inverse}>
          Continue
        </Typo>
      </Button>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  selectionInfo: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  interestsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 24,
  },
  interestButton: {
    backgroundColor: colors.background.card,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  selectedInterest: {
    backgroundColor: colors.primary.orange,
    borderColor: colors.primary.orange,
  },
  disabledInterest: {
    opacity: 0.5,
  },
  interestIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  continueButton: {
    backgroundColor: colors.text.primary,
    paddingVertical: 16,
    marginBottom: 40,
    marginHorizontal: 24,
  },
});
