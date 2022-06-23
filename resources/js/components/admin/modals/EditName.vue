<template>
    <form class="card">
        <fieldset>
            <legend>Changer de nom</legend>
            <label for="name">Nom</label>
            <input type="text" id='name' v-model="newName">
        </fieldset>
        <div class="edit-btns">
            <button @click.prevent='closeModal()'>Annuler</button>
            <button @click.prevent='editGaleryName(galery.id, newName)'> Valider</button>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue'
import { mapGetters } from 'vuex'
import useGaleries from '../../../composables/useGaleries'

export default {
    setup() {
        const { editGaleryName } = useGaleries()
        const newName = ref('')

        return {
            newName,
            editGaleryName
        }
    },

    computed: {
        ...mapGetters({
            galery: 'modal/getGalery'
        })
    },

    methods: {
        closeModal(){
            this.$store.dispatch('modal/hide')
        }
    }
}
</script>