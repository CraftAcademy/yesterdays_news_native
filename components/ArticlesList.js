import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { shouldUseActivityState } from "react-native-screens";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 30,
    height: 44,
  },
  teaser: {
    padding: 10,
    fontSize: 20,
  },
  published: {
    padding: 10,
    fontSize: 15,
  },
  card: {
    border: "solid #dbdbdb",
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#e8e8e8",
  },
});

const ArticlesList = ({ navigation }) => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://yesterdays-news-api.herokuapp.com/api/articles"
      );
      setArticles(response.data.articles);
    } catch (error) {
      debugger;
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <TouchableOpacity testID="articles" style={styles.card}>
              <Text
                testId="article"
                style={styles.item}
                keyExtractor={(item) => item.id}
              >
                {item.title}
              </Text>
              <Text style={styles.teaser}>{item.teaser}</Text>
              <Text style={styles.published}>{item.published}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default ArticlesList;