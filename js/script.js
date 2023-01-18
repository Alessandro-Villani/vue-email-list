console.log('VUE OK', Vue);

const app = Vue.createApp({
    data(){
        return {
            emailList: [],
            isLoading: false,
            errorMessage: ''
        }
    },
    computed:{
        emailListLength(){
            return this.emailList.length;
        }
    },
    methods:{
        getEmailAddresses(number){
            this.isLoading = true;
            for(i=0; i < number; i++){
                axios.get('https://flynn.boolean.careers/exercises/api/random/mail').then( response => {
                    const email = response.data.response;
                    this.emailList.push(email);
                }).catch(error => {
                    this.errorMessage = error.message;
                    this.isLoading = false;
                }).then(() => {
                    const wait = setInterval(() => {
                        if(this.emailList.length === number){
                            this.isLoading = false;
                            clearInterval(wait);
                        }
                    }, 10)
                })
            }
        }
    },
    mounted(){
        this.getEmailAddresses(10);
    }

});

app.mount('#root');