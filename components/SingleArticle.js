import { StyleSheet, View } from "react-native";
import { Text, Card } from "react-native-elements";
import React, { useEffect, useState } from "react";
import axios from "axios";

const styles = StyleSheet.create({
  title: { fontSize: 22 },
  image: { padding: 0 },
  body: {
    paddingTop: 10,
    marginBottom: 10,
    fontSize: 20
  },
  published: {
    fontSize: 15,
    marginBottom: -17
  },
  author: {
    textAlign: 'right'
  }
});
const SingleArticle = ({ route }) => {
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
      <Card>
        <Card.Title testID="article-title" style={styles.title}>{article.title}</Card.Title>
        <Card.Divider />
        <Card.Image
          style={styles.image}
          source={{
            uri:
              "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg"
          }}
        />
        <Text testID="article-body" style={styles.body}>
          {article.body}
        </Text>
        <Text testID="article-created" style={styles.published}>
          {article.published}
        </Text>
        <Text testID="article-author" style={styles.author}>
          {article.author}
        </Text>
      </Card>
    </View>
  );
};

export default SingleArticle;
