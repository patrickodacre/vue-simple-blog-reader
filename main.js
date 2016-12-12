new Vue({
    name   : 'MainApp', // naming your Vue components and instances helps with debugging. Get in the habit.
    el     : '#app', // we're mounting this instance to the ID app
    data   : {
        posts       : [],
        selectedPost: {
            title  : 'Select a Post',
            content: 'Once you select a post on the left, the content will display here.'
        }
    },
    // Step 1: Life cycle hook, 'created' fires
    created() {

        // Step 2: Request posts from WordPress.com
        axios.get('https://public-api.wordpress.com/rest/v1.1/sites/stearns.wordpress.com/posts/')
             .then(( resp ) => {

                  // debugger

                 // Step 3: Save posts array to our data object.
                 this.posts = resp.data.posts
             })
    },
    methods: {

        // Step 4: Click on a post title to activate this function.
        selectPost( postID ) {
            axios.get('https://public-api.wordpress.com/rest/v1.1/sites/stearns.wordpress.com/posts/' + postID)
                 .then(( resp ) => {

                    // debugger

                     // Step 5: Save our data to the selectedPost property to update the view.
                     this.selectedPost = resp.data
                 })
        }
    }
})
