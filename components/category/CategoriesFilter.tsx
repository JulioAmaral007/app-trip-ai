import { theme } from '@/constants/theme'
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'

interface Category {
  id: string
  name: string
  icon: any
}

interface CategoriesFilterProps {
  categories: Category[]
  activeCategory: string
  onCategoryPress: (categoryId: string) => void
}

export function CategoriesFilter({
  categories,
  activeCategory,
  onCategoryPress,
}: CategoriesFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesContainer}
      contentContainerStyle={styles.categoriesContent}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryButton,
            activeCategory === category.id && styles.categoryButtonActive,
          ]}
          onPress={() => onCategoryPress(category.id)}>
          <category.icon
            size={16}
            color={theme.colors.text}
            weight={activeCategory === category.id ? 'fill' : 'regular'}
          />
          <Text
            style={[
              styles.categoryText,
              activeCategory === category.id && styles.categoryTextActive,
            ]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingRight: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    minWidth: 100,
    justifyContent: 'center',
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: theme.textVariants.defaults.fontFamily,
    color: theme.colors.text,
    marginLeft: 6,
  },
  categoryTextActive: {
    color: theme.colors.text,
  },
})
