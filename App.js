import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArticlesList from "./components/ArticlesList";
import SingleArticle from "./components/SingleArticle";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={ArticlesList}
          options={{ title: "Yesterdays News" }}
        />
        <Stack.Screen name="article" component={SingleArticle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
