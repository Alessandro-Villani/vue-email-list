console.log('VUE OK', Vue);

const app = Vue.createApp({
    data(){
        return {
            emailList: [],
            emailNumber: 10,
            errorMessage: ''
        }
    },
    computed:{
        emailListLength(){
            return this.emailList.length;
        },
        isLoading(){
            return this.emailListLength < this.emailNumber;
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
                })
            }
        }
    },
    mounted(){
        this.getEmailAddresses(this.emailNumber);
    }

});

app.mount('#root');