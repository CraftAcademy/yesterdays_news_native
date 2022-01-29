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
import RandomPictures from "../modules/RandomPictures";

const styles = StyleSheet.create({
  card: {
    paddingLeft: 5,
    paddingRight: 8,
    bottom: 8,
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  subCard: {
    width: Dimensions.get("window").width - 10,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: 5,
    paddingRight: 8,
    bottom: 8,
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  image: {
    borderRadius: 10,
    height: 250,
    width: Dimensions.get("window").width - 10
  },
  title: {
    width: Dimensions.get("window").width - 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    marginLeft: -5,
    marginTop: -60,
    paddingLeft: 5,
    paddingRight: 5,
    color: "white",
    fontSize: 26
  },
  subtitle: {
    width: Dimensions.get("window").width - 10,
    paddingLeft: 5,
    borderBottomEndRadius: 7,
    borderBottomLeftRadius: 7,
    backgroundColor: "rgba(0,0,0,0.5)",
    marginLeft: -5,
    paddingTop: 12,
    color: "white",
    fontSize: 16
  },
  small: {
    paddingTop: 5,
    paddingBottom: 5,
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
                defaultSource={RandomPictures.getPicture()}
                source={item.image}
                style={styles.image}
              />
              <View style={styles.subCard}>
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
