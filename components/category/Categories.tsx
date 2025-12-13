import { theme } from '@/constants/theme'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button } from '@/components/ui/Button'
import { Typo } from '@/components/ui/Typo'

interface Category {
  id: string
  title: string
  icon: string
  image?: any
}

interface CategoriesProps {
  categories?: Category[]
  onCategoryPress?: (category: Category) => void
  selectedCategory?: string
  showHeader?: boolean
}

export function Categories({
  categories,
  onCategoryPress,
  selectedCategory,
  showHeader = true,
}: CategoriesProps) {
  const defaultCategories = [
    {
      id: 'all',
      title: 'Todos',
      icon: '🌍',
      image: require('../assets/images/beach.png'),
    },
    {
      id: 'beach',
      title: 'Praia',
      icon: '🏖️',
      image: require('../assets/images/beach.png'),
    },
    {
      id: 'mountain',
      title: 'Montanha',
      icon: '🏔️',
      image: require('../assets/images/beach.png'),
    },
    {
      id: 'city',
      title: 'Cidade',
      icon: '🏙️',
      image: require('../assets/images/beach.png'),
    },
    {
      id: 'cultural',
      title: 'Cultural',
      icon: '🏛️',
      image: require('../assets/images/beach.png'),
    },
    {
      id: 'adventure',
      title: 'Aventura',
      icon: '🧗',
      image: require('../assets/images/beach.png'),
    },
  ]

  const categoriesData = categories || defaultCategories

  return (
    <View style={styles.container}>
      {showHeader && (
        <View style={styles.header}>
          <Typo variant={theme.textVariants.text16} color={theme.colors.pureWhite}>
            Categorias
          </Typo>
          <Button onPress={() => {}}>
            <Typo variant={theme.textVariants.text14} color={theme.colors.primary}>
              Ver todas
            </Typo>
          </Button>
        </View>
      )}

      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}>
        {categoriesData.map((cat, index) => {
          const isSelected = selectedCategory === cat.id
          return (
            <TouchableOpacity
              key={index}
              style={[styles.categoryItem, isSelected && styles.selectedCategoryItem]}
              onPress={() => onCategoryPress?.(cat)}>
              <View style={[styles.categoryIcon, isSelected && styles.selectedCategoryIcon]}>
                <Typo variant={theme.textVariants.title22}>{cat.icon}</Typo>
              </View>
              <Typo
                variant={theme.textVariants.text12}
                color={isSelected ? theme.colors.pureWhite : theme.colors.gray2}>
                {cat.title}
              </Typo>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  scrollContent: {
    paddingHorizontal: 0,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  selectedCategoryItem: {
    backgroundColor: theme.colors.primary,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.gray1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  selectedCategoryIcon: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryImage: {
    width: 80,
    height: 76,
    borderRadius: 24,
    marginBottom: 8,
  },
})
