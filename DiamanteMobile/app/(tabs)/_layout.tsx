import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Define a type for the route names
type RouteName = 'index' | 'create-account' | 'payments' | 'manage-data' | 'set-options';

// Function to get icon name based on the route name
const getIconName = (routeName: RouteName): keyof typeof Ionicons.glyphMap => {
  switch (routeName) {
    case 'index':
      return 'home-outline';
    case 'create-account':
      return 'person-add-outline';
    case 'payments':
      return 'card-outline';
    case 'manage-data':
      return 'settings-outline';
    case 'set-options':
      return 'options-outline';
    default:
      return 'home-outline'; // Fallback icon
  }
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: '#000' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#aaa',
        tabBarIcon: ({ color, size, focused }) => {
          const iconSize = focused ? size + 4 : size;
          const iconName = getIconName(route.name as RouteName);
          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home' }}
      />
      <Tabs.Screen
        name="create-account"
        options={{ title: 'Create Account' }}
      />
      <Tabs.Screen
        name="payments"
        options={{ title: 'Payments' }}
      />
      <Tabs.Screen
        name="manage-data"
        options={{ title: 'Manage Data' }}
      />
      <Tabs.Screen
        name="set-options"
        options={{ title: 'Set Options' }}
      />
    </Tabs>
  );
}
