<template>
    <div class="menu">
        <h2 @click="closeMenu()">XAVIER CAUCHY<br/>PHOTOGRAPHIE</h2>
        <ul>
            <li v-for="galery in galeries" :key="galery.id" class="galery">
                <span @click="openMenu(galery)" :class="{'underline': selectedMenu.id == galery.id}">{{galery.name}}</span>
                <li v-for="child in galery.children" :key="child.id" class="galery-child"
                    @click="openMenu(child)" 
                    v-show="selectedMenu.id == galery.id"
                >
                    <span :class="{'underline': targetGalery.id == child.id}">{{child.name}}</span>
                </li>
            </li>
            <!-- <li>CONTACT</li> -->
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

    computed: {
        ...mapGetters({
            galeries: 'data/galeries',
            selectedMenu: 'home/menu',
            loading: 'home/loading',
            targetGalery: 'home/galery'
        }),
    },

    methods: {
        async openMenu(galery){
            if(!galery.parentGaleryId){
                this.$store.dispatch('home/openMenu', galery)
            }
            if(!galery.hasChild){
                this.$store.dispatch('home/load', galery)
            }
        },

        closeMenu(){
            this.$store.dispatch('home/load', false)
            this.$store.dispatch('home/openMenu', false)
        },
    }
}
</script>