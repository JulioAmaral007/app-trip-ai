import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import { Image, ScrollView, View } from 'react-native'

export default function HomeScreen() {
  const router = useRouter()

  return (
    <ScreenWrapper>
      <Header title="My Trips" />

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
            onPress={() => router.push('/create-trip/destination')}
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
