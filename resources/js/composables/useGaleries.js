import axios from 'axios'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default function useGaleries(){
    const store = useStore()
    const galeries = ref([])

    const getGaleries = async () => {
        let response = await axios.get('./api/galery')
        galeries.value = response.data.data

        store.dispatch('data/updateGaleries', galeries)
        store.dispatch('modal/hide')
    }
    
    const storeGalery = async (data) => {
        const newGalery = await axios.post('./api/galery', {name: data})
        await getGaleries()
        store.dispatch('admin/selectGalery', newGalery.data.data)
    }

    const storeChildGalery = async (galeryId, data) => {
        const toSend = {
            galeryId: galeryId,
            name: data
        }
        const newGalery = await axios.post('./api/galery', toSend)
        await getGaleries()
        store.dispatch('admin/selectGalery', newGalery.data.data)
    }

    const changeType = async (galeryId, newType) => {
        const modified = await axios.put('./api/galery/'+galeryId, {hasChild: newType})
        await getGaleries()
        store.dispatch('admin/selectGalery', modified.data.data)
        store.dispatch('modal/hide')
    }

    const editGaleryName= async (galeryId, newName) => {
        const modified = await axios.put('./api/galery/'+galeryId, {name: newName})
        await getGaleries()
        store.dispatch('admin/selectGalery', modified.data.data)
        store.dispatch('modal/hide')
    }
    
    const deleteGalery = async (galeryId) => {
        await axios.delete('./api/galery/'+galeryId)
        await getGaleries()
        store.dispatch('admin/selectGalery', false)
        store.dispatch('modal/hide')
        store.dispatch('admin/toggleEditOrder')
    }

    return {
        galeries,
        getGaleries,
        storeGalery,
        storeChildGalery,
        changeType,
        editGaleryName,
        deleteGalery,
    }
}