import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from './Button';
import { Typo } from './Typo';

export function Categories() {
  const categoriesData = [
    {
      id: 1,
      title: 'Beach',
      image: require('../assets/images/beach.png'),
    },
    {
      id: 2,
      title: 'Mountain',
      image: require('../assets/images/beach.png'),
    },
    {
      id: 3,
      title: 'City',
      image: require('../assets/images/beach.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typo>Categories</Typo>
        <Button onPress={() => {}}>
          <Typo size={14}>See all</Typo>
        </Button>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}>
        {categoriesData.map((cat, index) => {
          return (
            <TouchableOpacity key={index} style={styles.categoryItem}>
              <Image source={cat.image} style={styles.categoryImage} />
              <Typo size={14}>{cat.title}</Typo>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
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
    paddingHorizontal: 15,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryImage: {
    width: 80,
    height: 76,
    borderRadius: 24,
    marginBottom: 8,
  },
});
