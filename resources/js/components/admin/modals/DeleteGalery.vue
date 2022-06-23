<template>
    <form class="card">
        <legend>Supprimer un galerie</legend>
        <p>Êtes-vous sûr de vouloir supprimer {{galery.name}} ?</p>
        <div class="modal-btns">
            <button @click.prevent="closeModal()">Annuler</button>
            <button @click.prevent="deleteGalery(galery.id)">Supprimer</button>
        </div>
    </form>
</template>

<script>
import { mapGetters  } from 'vuex';
import useGaleries from '../../../composables/useGaleries';

export default{
    setup(){
        const { deleteGalery } = useGaleries()
        return { deleteGalery }
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