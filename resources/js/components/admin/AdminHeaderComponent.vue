<template>
    <header>
        <h1>XAVIER CAUCHY PHOTOGRAPHIE</h1>
        <button @click="logout()">Se déconnecter</button>
    </header>
</template>

<script>
export default {
    methods: {
        async logout(){
            let response = await axios.post('./logout')
            if(response.status === 200){
                this.$router.push('/')
            }
        }
    }
}
</script>