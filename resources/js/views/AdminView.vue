<template>
    <div class="app-container-admin">
        <admin-header />
        <main>
            <admin-menu />
            <admin-galery />
        </main>
        <admin-modal />
    </div>

</template>

<script>
import AdminHeader from '../components/admin/AdminHeaderComponent.vue'
import AdminMenu from '../components/admin/AdminMenuComponent.vue'
import AdminGalery from '../components/admin/AdminGaleryComponent.vue'
import AdminModal from '../components/admin/AdminModalComponent.vue'

import useGaleries from '../composables/useGaleries'
import usePhotos from '../composables/usePhotos'
import { onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    components: {
        AdminHeader,
        AdminMenu,
        AdminGalery,
        AdminModal
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
        
        return {
            galeries,
            photos,
        }
    },
}
</script>