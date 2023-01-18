console.log('VUE OK', Vue);

const app = Vue.createApp({
    data(){
        return {
            emailList: [],
            emailNumber: 10,
            emailToAdd: null,
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
            for(i=0; i < number; i++){
                axios.get('https://flynn.boolean.careers/exercises/api/random/mail').then( response => {
                    const email = response.data.response;
                    this.emailList.push(email);
                }).catch(error => {
                    this.errorMessage = error.message;
                    this.isLoading = false;
                })
            }
        },
        addEmail(number){
            if(number < 1){
                this.$refs.emailField.focus();
                return
            } else{
                this.emailNumber += number;
                this.getEmailAddresses(number);
                this.emailToAdd = 1;
            }
        },
        removeEmail(i){
            this.emailNumber--
            this.emailList.splice(i, 1);
        }
    },
    mounted(){
        this.getEmailAddresses(this.emailNumber);
    },
    watch: {
        isLoading(Value) {
            if (!Value) {
                this.$nextTick(() => {
                    this.$refs.emailField.focus();
                });
            }
        }
    }

});

app.mount('#root');