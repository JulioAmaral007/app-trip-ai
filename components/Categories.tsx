import { colors, font } from '@/constants/theme'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button } from './Button'
import { Typo } from './Typo'

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
  showHeader = true 
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
          <Typo size={16} fontFamily={font.semiBold} color={colors.text.primary}>
            Categorias
          </Typo>
          <Button onPress={() => {}}>
            <Typo size={14} color={colors.text.link}>
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
              style={[
                styles.categoryItem,
                isSelected && styles.selectedCategoryItem
              ]}
              onPress={() => onCategoryPress?.(cat)}
            >
              <View style={[
                styles.categoryIcon,
                isSelected && styles.selectedCategoryIcon
              ]}>
                <Typo size={24}>{cat.icon}</Typo>
              </View>
              <Typo 
                size={12} 
                fontFamily={font.medium}
                color={isSelected ? colors.text.primary : colors.text.secondary}
              >
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
    backgroundColor: colors.primary.orangeAlpha,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  selectedCategoryIcon: {
    backgroundColor: colors.primary.orange,
    borderColor: colors.primary.orange,
  },
  categoryImage: {
    width: 80,
    height: 76,
    borderRadius: 24,
    marginBottom: 8,
  },
})
