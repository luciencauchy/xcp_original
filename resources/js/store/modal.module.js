export const modal = {
    namespaced: true,

    state: {
        show: false,
        galery: false,
    },

    getters: {
        getType(state){
            return state.show
        },

        getGalery(state){
            return state.galery
        },
    },

    actions: {
        show({commit}, data){
            commit('show', data)
        },

        updateEditedGalery({ commit }, galery){
            commit('updateEditedGalery', galery)
        },

        hide({commit}){
            commit('hide')
        }
    },

    mutations: {
        show(state, data){
            state.show = data.type
            state.galery = data.galery
        },

        updateEditedGalery(state, galery){
            state.galery = galery
        },

        hide(state){
            state.show = false
        }
    }
}