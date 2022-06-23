import axios from 'axios'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default function usePhotos(){
    const store = useStore()
    const photos = ref([])

    const getPhotos = async () => {
        let response = await axios.get('./api/photo')
        photos.value = response.data.data

        store.dispatch('data/updatePhotos', photos)
        store.dispatch('modal/hide')
    }

    const getDividedPhotos = () => {
        const chunkSize = Math.floor(arr.length/3)
        const res = []
        for (let i = 0; i < arr.length; i += chunkSize) {s
            const chunk = arr.slice(i, i + chunkSize)
            res.push(chunk)
        }
        if(res[res.length-1].length<chunkSize){
            for(let i=0; i<res[res.length-1].length; i++){
                res[i].push(res[res.length-1][i])
            }
        }
        res.pop()
        return res;
    }

    const storePhoto = async (galeryId, file) => {
        const formData = new FormData();
        formData.append('photo', file);

        const headers = {
            'Content-Type': 'multipart/form-data',
            'galery-id': galeryId
        }
    
        await axios.post('./api/photo', formData, { headers : headers })
    }

    const displayedPhotos = (view) => {
        const store = useStore();
        const photoData = store.state.data.photos
        if(view === "home"){
            const galery = store.state.home.loading
            return photoData.filter((photo) => photo.galeryId == galery.id)
        }
        else {
            const galery = store.state.admin.targetGalery
            return photoData.filter((photo) => photo.galeryId == galery.id)
        }
    }

    const galeryChunks = () => {
        const photos = displayedPhotos();
        const chunkSize = photos.length/3;
        const chunks = [];
        for (let i = 0; i < photos.length; i += chunkSize) {
            chunks.push(photos.slice(i, i + chunkSize));
        }
        return chunks
    }

    const toggleFavourite = async (photoId, data) => {
        await axios.put('./api/photo/'+photoId, data)
    }

    return {
        photos,
        getPhotos,
        getDividedPhotos,
        storePhoto,
        displayedPhotos,
        galeryChunks,
        toggleFavourite,
    }
}