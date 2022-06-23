<template>
    <aside class="modal" :class="{'show': modalType}">
        <new-galery v-if="modalType === 'newGalery'"/>
        <new-child-galery v-if="modalType === 'newChildGalery'"/>
        <edit-name v-if="modalType === 'editName'"/>
        <delete-galery v-if="modalType === 'deleteGalery'"/>
        <add-photos v-if="modalType === 'addPhotos'"/>
    </aside>
</template>

<script>
import NewGalery from './modals/NewGalery.vue'
import NewChildGalery from './modals/NewChildGalery.vue'
import EditName from './modals/EditName.vue'
import DeleteGalery from './modals/DeleteGalery.vue'
import AddPhotos from './modals/AddPhotos.vue'

import { mapGetters } from 'vuex'

export default {

    components: {
        NewGalery,
        NewChildGalery,
        EditName,
        DeleteGalery,
        AddPhotos
    },

    computed: {
        ...mapGetters({
            modalType: 'modal/getType'
        })
    },
}
</script>