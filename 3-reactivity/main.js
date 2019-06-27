new VTTCue({
    el: '#app',
    data: {
        counter: 0,
        result: '',
    },
    methods: {
        increase: function(){
            this.counter++;
            this.result = this.counter > 5 ? 'Greater than 5' : 'Smaller than 5';
        }
    }
});