<template>
<section class="menu-container">
    <ul class="menu card" v-if="!editMode">
        <h2 class="underline txt-center">MENU</h2>
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

    <div class="edit card" v-else>
        <h2><span v-if="targetGalery.parentGaleryId>0">{{parentGaleryName(targetGalery)}} > </span><span class="underline">{{targetGalery.name}}</span></h2>
        <div class="edit-options">
            <button @click="showModal('newChildGalery')" v-if="!targetGalery.parentGaleryId">
                Ajouter une sous-galerie
            </button>
            <button @click="showModal('editName')">Modifier le nom</button>
            <button @click="showModal('addPhotos')" v-if="!targetGalery.hasChild">Ajouter des photos</button>
            <!-- <button @click="toggleEditOrder()" class='edit-order' :class="{'selected': editOrder}">Modifier l'ordre de photos</button> -->
            <button @click="showModal('deleteGalery')" >Supprimer</button>
            <button @click="backToMenu()" >Retour menu</button>
        </div>
    </div>
</section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

    computed: {
        ...mapGetters({
            galeries: 'data/galeries',
            targetGalery: 'admin/targetGalery',
            editOrder: 'admin/editOrder',
            editMode: 'admin/editMode'
        }),
    },

    methods: {
        editGalery(galery){
            this.$store.dispatch('admin/toggleEditMode')
            this.$store.dispatch('admin/selectGalery', galery)
            this.$store.dispatch('admin/load', galery)
        },

        showModal(type){
            const data = {type: type, galery: this.targetGalery}
            this.$store.dispatch('modal/show', data)
        },

        parentGaleryName(galery){
            return this.galeries.filter((g) => g.id === galery.parentGaleryId)[0].name
        },

        backToMenu(){
            this.$store.dispatch('admin/toggleEditMode')
            this.$store.dispatch('admin/selectGalery', false)
        }

        // toggleEditOrder(){
        //     this.$store.dispatch('admin/toggleEditOrder')
        // }
    },
}
</script>