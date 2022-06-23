<template>
    <form class="card">
        <fieldset>
            <legend>Ajouter une galerie à {{galery.name}}</legend>
            <label for="name">Nom</label>
            <input type="text" id='name' v-model="name">
        </fieldset>
        <div class="edit-btns">
            <button @click.prevent="closeModal()">Annuler</button>
            <button @click.prevent="storeChildGalery(galery.id, name)">Valider</button>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue'
import { mapGetters } from 'vuex'
import useGaleries from '../../../composables/useGaleries'

export default {
    setup() {
        const { storeChildGalery } = useGaleries()

        const name = ref('')

        return {
            name,
            storeChildGalery
        }
    },

    computed: {
        ...mapGetters({
            galery: 'modal/getGalery'
        }),
    },

    methods: {
        closeModal(){
            this.$store.dispatch('modal/hide')
        }
    }
}
</script>