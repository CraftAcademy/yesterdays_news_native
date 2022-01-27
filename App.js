import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainView from "./components/MainView";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={MainView}
          options={{ title: "Yesterdays News" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
