import { font } from '@/constants/theme';
import { type ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { Typo } from './Typo';

export type HeaderProps = {
  title?: string;
  style?: ViewStyle;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function Header({ title = '', leftIcon, rightIcon, style }: HeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
          <View style={styles.titleContainer}>
            <Typo size={48} fontFamily={font.bold} style={styles.title}>
              {title}
            </Typo>
          </View>
        </View>

        {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '20%',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  leftSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  leftIconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'left',
  },
  rightIconContainer: {
    width: 40,
  },
});
