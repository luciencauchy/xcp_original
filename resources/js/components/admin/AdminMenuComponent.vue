<template>
    <ul class="menu card">
        <li v-for="galery in galeries" :key="galery.id" class="galery">
            <i class="fa-solid fa-gear icon" @click="editGalery(galery)"></i>
            <span>{{galery.name}}</span>
            <li v-for="child in galery.children" :key="child.id" class="galery-child">
                <i class="fa-solid fa-gear icon" @click="editGalery(child)"></i>
                <span class="treebranch"><span class="vrt"></span><span class="hzt"></span></span>
                <span>{{child.name}}</span>
            </li>
        </li>
        <button @click="showModal('newGalery')">Ajouter nouvelle galerie</button>
    </ul>

    <div class="edit card" v-show="targetGalery">
        <h2>{{targetGalery.name}}</h2>
        <div class="edit-options">
            <button @click="showModal('newChildGalery')" v-if="!targetGalery.parentGaleryId">
                Ajouter une sous-galerie
            </button>
            <button @click="showModal('editName')">Modifier le nom</button>
            <button @click="showModal('addPhotos')" v-if="!targetGalery.hasChild">Ajouter des photos</button>
            <button @click="toggleEditOrder()" class='edit-order' :class="{'selected': editOrder}">Modifier l'ordre de photos</button>
            <button @click="showModal('deleteGalery')" >Supprimer</button>
        </div>
    </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {

    computed: {
        ...mapGetters({
            galeries: 'data/galeries',
            targetGalery: 'admin/targetGalery',
            editOrder: 'admin/editOrder'
        })
    },

    methods: {
        editGalery(galery){
            this.$store.dispatch('admin/selectGalery', galery)
            this.$store.dispatch('admin/load', galery)
        },

        showModal(type){
            const data = {type: type, galery: this.targetGalery}
            this.$store.dispatch('modal/show', data)
        },

        toggleEditOrder(){
            this.$store.dispatch('admin/toggleEditOrder')
        }
    },
}
</script>