import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import { Image, ScrollView, View } from 'react-native'

export default function HomeScreen() {
  const router = useRouter()
  const transportTabs = [
    { id: 'flights', title: 'Flights', icon: '✈️', active: true },
    { id: 'hotels', title: 'Hotels', icon: '🏨', active: false },
    { id: 'trains', title: 'Trains', icon: '🚂', active: false },
    { id: 'ferry', title: 'Ferry', icon: '⛴️', active: false },
    { id: 'bus', title: 'Bus', icon: '🚌', active: false },
  ]

  const destinations = [
    {
      id: 1,
      title: 'Mount Bromo',
      subtitle: 'Volcano in East Java',
      rating: 4.9,
      price: '150',
      image: '/placeholder.svg?height=120&width=160',
    },
    {
      id: 2,
      title: 'Labengki Sombori',
      subtitle: 'Island in Sulawesi',
      rating: 4.8,
      price: '250',
      image: '/placeholder.svg?height=120&width=160',
    },
  ]

  const hotels = [
    {
      id: 1,
      name: 'Swiss-Belhotel Rainforest Kuta',
      address: 'Jl. Sunset Road No. 101, Kuta, Bali, Indonesia',
      rating: 4,
      price: 50,
      image: '/placeholder.svg?height=60&width=80',
    },
    {
      id: 2,
      name: 'Swiss-Belhotel Rainforest Kuta',
      address: 'Jl. Sunset Road No. 101, Kuta, Bali, Indonesia',
      rating: 4,
      price: 50,
      image: '/placeholder.svg?height=60&width=80',
    },
    {
      id: 3,
      name: 'Swiss-Belhotel Rainforest Kuta',
      address: 'Jl. Sunset Road No. 101, Kuta, Bali, Indonesia',
      rating: 4,
      price: 50,
      image: '/placeholder.svg?height=60&width=80',
    },
  ]

  return (
    <ScreenWrapper>
      <Header title="My Trips" />
      {/* <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.searchContainer}>
          <Input
            icon={
              <MagnifyingGlassIcon
                size={20}
                weight="bold"
                color={colors.neutral[100]}
              />
            }
            placeholder="Search destination"
            placeholderTextColor={"gray"}
            style={styles.searchInput}
          />
          <Button
            style={{
              backgroundColor: colors.primary.orange,
              borderRadius: 25,
              width: 100,
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
            onPress={() => router.push("/travelers")}
          >
            <Airplane size={24} color={colors.neutral[100]} />
            <Typo size={14} color={colors.neutral[100]}>
              New Trip
            </Typo>
          </Button>
        </View>

        <View style={styles.categoriesContainer}>
          <Categories />
        </View>

        <View style={styles.sortContainer}>
          <SortCategories />
        </View>
      </View> */}
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 25,
          // paddingTop: 55,
          paddingTop: 55,
          backgroundColor: colors.background.primary,
          // height: "100%"
        }}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 25,
          }}>
          <Typo
            style={{
              fontSize: 25,
              fontFamily: 'outfit-medium',
            }}>
            No trips planned yet
          </Typo>
          <Typo
            style={{
              fontSize: 20,
              fontFamily: 'outfit',
              textAlign: 'center',
              color: colors.neutral[500],
            }}>
            Looks like its time to plan a new travel experience! Get Started below
          </Typo>

          <Image
            source={require('@/assets/images/arrow.png')}
            style={{ width: 262, height: 150 }}
          />

          <Button
            onPress={() => router.push('/create-trip/travelers')}
            style={{
              backgroundColor: colors.primary.orange,
              paddingHorizontal: 50,
            }}>
            <Typo
              style={{
                color: colors.neutral[100],
                fontFamily: 'outfit-medium',
                fontSize: 17,
              }}>
              Start a new trip
            </Typo>
          </Button>
        </View>

        {/* {loading && <Loading size={"large"} color={Colors.PRIMARY} />} */}
        {/* {userTrips?.length == 0 ? (
          <StartNewTripCard />
        ) : (
          <UserTripList userTrips={userTrips.reverse()} />
        )} */}
      </ScrollView>
    </ScreenWrapper>
  )
}
