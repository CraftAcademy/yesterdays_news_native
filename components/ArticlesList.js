import {
  StyleSheet,
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width,
    paddingLeft: 5,
    paddingRight: 8,
    bottom: 8,
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  image: {
    height: 250,
    width: Dimensions.get("window").width - 10
  },
  title: {
    marginTop: -60,
    color: "white",
    fontSize: 26
  },
  subtitle: {
    paddingTop: 12,
    color: "white",
    fontSize: 16
  },
  small: {
    paddingBottom: 10,
    color: "white",
    fontSize: 12
  }
});

const ArticlesList = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [message, setMessage] = useState();

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://yesterdays-news-api.herokuapp.com/api/articles"
      );
      setArticles(response.data.articles);
    } catch (error) {
      setMessage(
        "We don't have articles available at the moment, please try again later."
      );
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <View testID="flash-message">{message}</View>
      <View testID="article-collection" style={styles.container}>
        <FlatList
          data={articles}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              testID={`article-${index}`}
              style={styles.card}
              onPress={() => {
                navigation.navigate("article", {
                  id: item.id,
                  title: item.title
                });
              }}
            >
              <Image
                source="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                style={styles.image}
              />
              <View style={styles.card}>
                <Text
                  testID="article-title"
                  style={styles.title}
                  keyExtractor={(item) => item.id}
                >
                  {item.title}
                </Text>
                <Text style={styles.subtitle}>{item.teaser}</Text>
                <Text style={styles.small}>{item.published}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default ArticlesList;
