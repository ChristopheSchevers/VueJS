new Vue({
    el: '#app',
    data: {
        link: 'http://www.google.com'
    },
    methods: {
        changeLink: function(){
            this.link = 'http://www.android.com';
        }
    }
});