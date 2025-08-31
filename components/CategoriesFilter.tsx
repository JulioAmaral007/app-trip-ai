import { colors } from '@/constants/theme'
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
            color={colors.text.primary}
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
    backgroundColor: colors.background.card,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    minWidth: 100,
    justifyContent: 'center',
  },
  categoryButtonActive: {
    backgroundColor: colors.primary.orange,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'outfit-medium',
    color: colors.text.primary,
    marginLeft: 6,
  },
  categoryTextActive: {
    color: colors.text.primary,
  },
})
