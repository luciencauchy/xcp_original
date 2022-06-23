<template>
    <form id="form" class="card">
        <fieldset>
            <legend>Ajouter des photos</legend>
            <input type='file' name='files' id='files' multiple @change="getFiles($event)"/>
        </fieldset>
        <div class="edit-btns">
            <button @click.prevent="closeModal()">Annuler</button>
            <button @click.prevent="uploadFiles(galery.id)">Télécharger</button>
        </div>
        <span id="loader" class="loading-bar" v-show="loading">
            <span id="progress" class="progress-bar" :style="`width: ${prog}%`"></span>
        </span>
    </form>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import usePhotos from '../../../composables/usePhotos'

export default{
    setup() {
        const { getPhotos, storePhoto } = usePhotos()
        const files = ref([])

        const store = useStore()
        const galery = computed(() => store.getters['modal/getGalery'])

        const getFiles = (e) => {
            files.value = e.target.files
        }

        const loading = ref(false)
        const prog = ref(0)

        async function uploadFiles (galeryId) {
            loading.value = true
            Array.from(files.value).forEach((file) => {
                storePhoto(galeryId, file).then(() => {
                    prog.value = prog.value + 100/files.value.length
                    if(prog.value > 99){
                        setTimeout(() => {
                            store.dispatch('modal/hide')
                        }, 1000);
                        getPhotos()
                    }
                })
            })
        }
        
        return { galery, getFiles, uploadFiles, loading, prog }
    },

    methods: {
        closeModal(){
            this.$store.dispatch('modal/hide')
        }
    }
}
</script>