<template>

    <div class="app-container">
        <div class="menu-container">
            <home-menu></home-menu>
        </div>

        <div class="galery-container">
            <home-galery></home-galery>
        </div>
    </div>

</template>

<script>
import HomeMenu from '../components/home/HomeMenuComponent.vue'
import HomeGalery from '../components/home/HomeGaleryComponent.vue'

import { onMounted } from 'vue'
import { useStore } from 'vuex'
import useGaleries from '../composables/useGaleries'
import usePhotos from '../composables/usePhotos'

export default {
    components: {
        HomeMenu,
        HomeGalery
    },

    setup(){
        const store = useStore()
        const { galeries, getGaleries } = useGaleries()
        const { photos, getPhotos } = usePhotos()

        onMounted(async ()=>{
            await getGaleries()
            await getPhotos()
            store.dispatch('data/getData', {galeries: galeries.value, photos: photos.value})
        })

    }
}
</script>