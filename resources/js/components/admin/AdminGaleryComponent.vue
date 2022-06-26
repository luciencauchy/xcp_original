<template>
<div class="galery-container">
    <section class="col">
        <div class="img-container hide" v-for="photo of chunks[0]" :key="photo.id" >
        <div class="edit-div">
            <i class="fa-solid fa-star" v-show="photo.favourite" @click="editFavourite(photo)"></i>
            <i class="fa-regular fa-star" v-show="!photo.favourite" @click="editFavourite(photo)"></i>
            <i class="fa-regular fa-hand"></i>
            <i class="fa-solid fa-trash-can" @click="deletePhoto(photo)"></i>
        </div>
            <img :src="photo.src"/>
        </div>
    </section>
    <section class="col">
        <div class="img-container hide" v-for="photo of chunks[1]" :key="photo.id" >
        <div class="edit-div">
            <i class="fa-solid fa-star" v-show="photo.favourite" @click="editFavourite(photo)"></i>
            <i class="fa-regular fa-star" v-show="!photo.favourite" @click="editFavourite(photo)"></i>
            <i class="fa-regular fa-hand"></i>
            <i class="fa-solid fa-trash-can" @click="deletePhoto(photo)"></i>
        </div>
            <img :src="photo.src"/>
        </div>
    </section>
    <section class="col">
        <div class="img-container hide" v-for="photo of chunks[2]" :key="photo.id" >
        <div class="edit-div">
            <i class="fa-solid fa-star" v-show="photo.favourite" @click="editFavourite(photo)"></i>
            <i class="fa-regular fa-star" v-show="!photo.favourite" @click="editFavourite(photo)"></i>
            <i class="fa-regular fa-hand"></i>
            <i class="fa-solid fa-trash-can" @click="deletePhoto(photo)"></i>
        </div>
            <img :src="photo.src"/>
        </div>
    </section>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import usePhotos from '../../composables/usePhotos'
import galeryAnimations from '../../animations/galeryAnimations'

export default {

    setup(){
        const { toggleFavourite, deletePhoto } = usePhotos()

        function editFavourite(photo){
            const data = {
                photoId: photo.id,
                favourite: true,
            }
            toggleFavourite(photo, data)
        }

        return { editFavourite, deletePhoto }
    },

    data(){
        return {
            chunks: [[], [], []],
            showImgs: false
        }
    },

    computed : {
        ...mapGetters({
            photos: 'data/photos',
            galery: 'admin/targetGalery',
            loading: 'admin/loading',
            editOrder: 'admin/editOrder'
        }),

        displayed(){
            return this.photos.filter((p) => p.galeryId === this.galery.id)
        },
    },

    watch: {
        loading(val){
            if(!val.hasChild) {
                this.chunks = this.makeChunks()
                this.loadGaleryImgs()
            }
        },

        photos(){
            this.chunks = this.makeChunks()
        },

        galery(){
            this.chunks = this.makeChunks()
        }
    },

    methods: {

        makeChunks(){
            const chunks = [[], [], []]
            let counter = 0;
            this.displayed.forEach((p) => {
                chunks[counter].push(p)
                counter++
                if(counter>2) counter = 0
            })
            return chunks
        },

        async loadGaleryImgs(){
            if(this.loading){
                const loadingImgs = []

                this.displayed.forEach( async (photo) => {
                    const p = new Image()
                    p.src = photo.src
                    loadingImgs.push(await p.decode())
                })

                Promise.all(loadingImgs)
                    .then(()=>{
                        this.$store.dispatch('home/endLoad')
                        galeryAnimations.showGalery()
                    })
            }
            else {
                this.$store.dispatch('home/endLoad')
            }
        },
    }
}
</script>