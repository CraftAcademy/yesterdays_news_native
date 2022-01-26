import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <Text testID="header">Hello world</Text>
    </View>
  );
};

export default App;
