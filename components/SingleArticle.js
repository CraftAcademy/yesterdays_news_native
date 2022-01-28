import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const styles = StyleSheet.create({
  header: {
    padding: 10,
    fontSize: 30,
    height: 44,
  },
  body: {
    padding: 10,
    fontSize: 20,
  },
  published: {
    padding: 10,
    fontSize: 15,
  },
});
const SingleArticle = ({ navigation, route }) => {
  const [article, setArticle] = useState({});

  const fetchArticle = async () => {
    const { data } = await axios.get(
      `https://yesterdays-news-api.herokuapp.com/api/articles/${route.params.id}`
    );
    setArticle(data.article);
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  return (
    <View>
      <View testID="article-title">
        <Text style={styles.header}>{article.title}</Text>
      </View>

      <View testID="article-body">
        <Text style={styles.body}>{article.body}</Text>
      </View>
      <View testID="article-created">
        <Text style={styles.published}>{article.published}</Text>
      </View>
    </View>
  );
};

export default SingleArticle;
