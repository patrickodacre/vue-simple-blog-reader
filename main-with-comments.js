/*
 * new Vue() creates a new Vue instance.
 *
 * Next we pass in an object {} which is the options obj.
 * Vue uses these options to configure the Vue instance.
 * It would be equally valid for us to first create the
 * options obj, save it in a variable and pass that into the
 * new Vue instance, like so:
 *
 * var options = {}
 *
 * new Vue(options)
 * */
new Vue({
  name: 'MainApp', // Naming your Vue instance / component makes debugging easier.
  el: '#app', // connects our Vue instance to the element with id="app"

  /**
   * When using new Vue() the 'data' property can be a simple object.
   * Here is where you want to initialize any data properties in your
   * instance. Even if you are only creating an empty array (like we do with posts)
   * you need to initialize the properties here.
   *
   * These properties are given values after we receive our data from the server.
   *
   * @link https://vuejs.org/v2/guide/instance.html#Properties-and-Methods
   */
  data: {
    posts: [], // this will hold the array of posts we receive from our ajax call.
    selectedPost: { // selected post is the single post we request from the server when we click on the post title in the left menu
      title: 'Select a Post',
      content: 'Once you select a post on the left, the content will display here.'
    }
  },

  /**
   * The 'created' property is a life-cycle hook
   * and a good one to use for requesting data
   * you need to when the component starts up.
   *
   * @link https://vuejs.org/v2/api/#Options-Lifecycle-Hooks
   */
  created() {
    this.$http.get('https://public-api.wordpress.com/rest/v1.1/sites/stearns.wordpress.com/posts/')
      .then((resp) => {

        // if you want to see the data we get from the server, uncomment the debugger statements:
        // debugger

        /*
         * here we're taking the list of posts we just received
         * and saving it to the posts array data property.
         * */
        this.posts = resp.body.posts
      })
  },

  /**
   * The 'methods' property is an object
   * that holds any functions you want to use in your file.
   *
   * These functions can be called in a variety of ways.
   * In our example, we're calling it with the @click directive,
   * which can also be written as v-on:click=""
   */
  methods: {
    selectPost(postID) {
      this.$http.get('https://public-api.wordpress.com/rest/v1.1/sites/stearns.wordpress.com/posts/' + postID)
        .then((resp) => {

          // debugger

          /*
           * here we're taking the data we just received
           * and saving it to the selectedPost data property.
           * */
          this.selectedPost = resp.body
        })
    }
  }
})
