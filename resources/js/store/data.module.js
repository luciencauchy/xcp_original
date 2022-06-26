export const data = {

    namespaced: true,

    state: {
        galeries: [],
        photos: []
    },

    getters: {
        galeries(state){
            const sorted = state.galeries
                .filter((galery) => !galery.parentGaleryId)
                .map((galery) => {
                    const children = state.galeries.filter((g) => {
                        return g.parentGaleryId == galery.id
                    })

                    return ({
                        ...galery,
                        children: children
                    })
                })
            return sorted
        },
        
        photos(state){
            return state.photos
        },
    },

    actions: {
        getData({commit}, data){
            commit('getData', data)
        },

        updateGaleries({ commit }, galeries){
            commit('updateGaleries', galeries)
        },

        updatePhotos({ commit }, photos){
            commit('updatePhotos', photos)
        },

        deletePhoto({ commit }, photo){
            commit('deletePhoto', photo)
        },

        reset({ commit }) {
            commit('reset')
        },
    },

    mutations: {
        getData(state, data){
            state.galeries = data.galeries
            state.photos = data.photos
        },

        updateGaleries(state, galeries){
            state.galeries = galeries
        },

        updatePhotos(state, photos){
            state.photos = photos
        },
        
        deletePhoto(state, photo){
            const wDeleted = state.photos.filter((p) => p.id !== photo.id)
            state.photos = wDeleted
        },

        reset(state){
            state.galery = false
        },
    }

};
