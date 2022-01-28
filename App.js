import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArticlesList from "./components/ArticlesList";
import SingleArticle from "./components/SingleArticle";

const Stack = createNativeStackNavigator();

const App = () => {
  const headerOption = {
    general: {
      headerStyle: {
        backgroundColor: "#892b2f"
      },
      headerTintColor: "white"
    },
    indexOptions: {
      title: "Yesterdays News"
    },
    singleArticleHeaderOptions(props) {
      return {
        title: props.route.params.title
      };
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={ArticlesList}
          options={{ ...headerOption.general, ...headerOption.indexOptions }}
        />
        <Stack.Screen
          name="article"
          options={(props) => ({
            ...headerOption.general,
            ...headerOption.singleArticleHeaderOptions(props)
          })}
          component={SingleArticle}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
