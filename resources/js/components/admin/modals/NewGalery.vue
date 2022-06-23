<template>
    <form class="card">
        <fieldset>
            <legend>Ajouter une galerie</legend>
            <label for="name" class="hidden">Nom</label>
            <input type="text" id='name' v-model="name" placeholder="Nom...">
        </fieldset>
        <div class="edit-btns">
            <button @click.prevent="closeModal()">Annuler</button>
            <button @click.prevent="storeGalery(name)">Valider</button>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue'
import useGaleries from '../../../composables/useGaleries'

export default {
    setup() {
        const { storeGalery } = useGaleries()

        const name = ref('')

        return {
            name,
            storeGalery
        }
    },

    methods: {
        closeModal(){
            this.$store.dispatch('modal/hide')
        }
    }
}
</script>