<template>
    <section class="col">
        <div class="img-container hide" v-for="photo of chunks[0]" :key="photo.id" >
            <img :src="photo.src"/>
        </div>
    </section>
    <section class="col">
        <div class="img-container hide" v-for="photo of chunks[1]" :key="photo.id" >
            <img :src="photo.src"/>
        </div>
    </section>
    <section class="col">
        <div class="img-container hide" v-for="photo of chunks[2]" :key="photo.id" >
            <img :src="photo.src"/>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import galeryAnimations from '../../animations/galeryAnimations'

export default {

    data(){
        return {
            chunks: [[], [], []],
        }
    },

    computed : {
        ...mapGetters({
            photos: 'data/photos',
            galery: 'home/galery',
            loading: 'home/loading',
        }),

        displayed(){
            return this.photos.filter((p) => p.galeryId === this.galery.id)
        },
    },

    watch: {
        loading(val){
            if(!val.hasChild) {
                this.chunks = this.makeChunks()
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
            this.loadGaleryImgs()
            return chunks
        },

        async loadGaleryImgs(){
            if(this.loading){
                console.log('loading imgs')
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