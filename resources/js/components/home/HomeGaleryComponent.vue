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
import galeryAnimations from '../../animations/galeryAnimations'
import { mapGetters } from 'vuex'
import usePhotos from '../../composables/usePhotos'
export default {
    setup(){
        const { displayedPhotos, galeryChunks } = usePhotos()

        const photos = displayedPhotos("home");
        const chunks = galeryChunks();
        console.log(chunks)
        return { displayedPhotos, photos, chunks }
    },

    computed : {
        ...mapGetters({
            galery: 'home/galery',
            loading: 'home/loading'
        }),
    },

    watch: {
        loading(val){
            console.log('loading', val)
            if((
                ((val.children) || (val.galery && val.galery.hasChild)))
            ) {
                console.log("load...")
                this.loadGaleryImgs()
            }
        }
    },

    methods: {
        async loadGaleryImgs(){
            if(this.loading){
                const loadingImgs = [];

                this.photos.forEach( async (photo) => {
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
        }
    }
}
</script>