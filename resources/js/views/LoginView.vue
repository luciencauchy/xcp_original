<template>
    <form>
        <label for="email">Email</label>
        <input type="text" id="email" v-model="email"/>

        <label for="password">Mot de passe</label>
        <input type="text" id="password" v-model="password"/>

        <button @click.prevent="connect()">Se connecter</button>
    </form>

    <p v-show="errorMessage">{{errorMessage}}</p>
</template>

<script>

export default {

    data(){
        return {
            email: '',
            password: '',
            errorMessage: ''
        }
    },

    methods: {
        connect(){
            const logs = {
                email: this.email,
                password: this.password
            }
            axios.post('/login', logs)
                .then((res) => {
                    if(res.status === 200){
                        this.$router.push('/admin')
                    }
                })
                .catch((err) => {
                    this.errorMessage = err.response.data.message
                })
        }
    }
}

</script>