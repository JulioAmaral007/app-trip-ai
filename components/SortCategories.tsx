import { colors, font } from '@/constants/theme'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from './Button'
import { Typo } from './Typo'

interface SortCategoriesProps {
  sortOptions?: string[]
  onSortChange?: (sort: string) => void
  selectedSort?: string
  showHeader?: boolean
}

export function SortCategories({ 
  sortOptions, 
  onSortChange, 
  selectedSort,
  showHeader = true 
}: SortCategoriesProps) {
  const [activeSort, setActiveSort] = useState(selectedSort || 'Popular')

  const defaultSortOptions = ['Popular', 'Recomendado', 'Recente', 'Tendência']
  const sortCategoryData = sortOptions || defaultSortOptions

  useEffect(() => {
    if (selectedSort) {
      setActiveSort(selectedSort)
    }
  }, [selectedSort])

  const handleSortPress = (sort: string) => {
    setActiveSort(sort)
    onSortChange?.(sort)
  }

  return (
    <View style={styles.container}>
      {showHeader && (
        <View style={styles.header}>
          <Typo size={16} fontFamily={font.semiBold} color={colors.text.primary}>
            Ordenar por
          </Typo>
        </View>
      )}

      <View style={styles.sortContainer}>
        {sortCategoryData.map((sort, index) => {
          let isActive = sort === activeSort

          return (
            <Button
              onPress={() => handleSortPress(sort)}
              style={{
                ...styles.button,
                ...(isActive && styles.activeButton),
              }}
              key={index}>
              <Typo 
                size={12} 
                fontFamily={font.medium}
                color={isActive ? colors.text.inverse : colors.text.primary}
              >
                {sort}
              </Typo>
            </Button>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    marginBottom: 12,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: 25,
    padding: 8,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  button: {
    borderRadius: 25,
    flex: 1,
    height: 36,
  },
  activeButton: {
    backgroundColor: colors.primary.orange,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
