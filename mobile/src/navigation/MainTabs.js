// Bottom tab navigator — Home · Workout · Food · Social · Goals (matches Figma).
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme';
import HomeScreen from '../screens/HomeScreen';
import WorkoutsListScreen from '../screens/WorkoutsListScreen';
import FoodLogScreen from '../screens/FoodLogScreen';
import SocialFeedScreen from '../screens/SocialFeedScreen';
import ChallengesScreen from '../screens/ChallengesScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarStyle: { height: 60, paddingBottom: 8, paddingTop: 6, borderTopColor: colors.border },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutsListScreen}
        options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="dumbbell" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Food"
        component={FoodLogScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="restaurant-outline" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Social"
        component={SocialFeedScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Goals"
        component={ChallengesScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="trophy-outline" size={size} color={color} /> }}
      />
    </Tab.Navigator>
  );
}
