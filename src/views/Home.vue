<template>
  <div class="row">
    <div class="col-md-8 offset-md-" v-if="articles.data" v-for="article in articles.data" :key="article.id">
      <Article :article="article"/>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import config from "@/config";
import Article from "@/components/Article.vue"

export default {
  components: {
    Article
  },

  data() {
    return {
      articles: [],
    }
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      Axios.get(`${config.apiUrl}/articles`).then(response => {
        console.log(response);
        this.articles = response.data.data;
      });
    }
  }
};
</script>
