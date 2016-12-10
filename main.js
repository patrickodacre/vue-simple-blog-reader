new Vue({
  name: 'MainApp',
  el: '#app',
  data: {
    posts: [],
    selectedPost: {
      title: 'Select a Post',
      content: 'Once you select a post on the left, the content will display here.'
    }
  },
  created() {
    this.$http.get('https://public-api.wordpress.com/rest/v1.1/sites/stearns.wordpress.com/posts/')
      .then((resp) => {

        this.posts = resp.body.posts
      })
  },
  methods: {
    selectPost(postID) {
      this.$http.get('https://public-api.wordpress.com/rest/v1.1/sites/stearns.wordpress.com/posts/' + postID)
        .then((resp) => {

          this.selectedPost = resp.body
        })
    }
  }
})
