export const admin = {

    namespaced: true,

    state: {
        targetGalery: false,
        loading: false,
        editOrder: false
    },

    getters: {
        targetGalery(state){
            return state.targetGalery
        },

        loading(state){
            return state.loading
        },

        editOrder(state){
            return state.editOrder
        }
    },

    actions: {
        selectGalery({ commit }, galery){
            commit('selectGalery', galery)
        },

        load({ commit }, galery){
            commit('load', galery)
        },

        endLoad({ commit }){
            commit('endLoad')
        },

        toggleEditOrder({ commit }){
            commit('toggleEditOrder')
        }
    },

    mutations: {
        selectGalery(state, galery){
            state.targetGalery = galery
        },

        load(state, galery){
            state.loading = galery
        },
        
        endLoad(state){
            state.galery = state.loading
            state.loadGalery = false
        },

        toggleEditOrder(state){
            state.editOrder = !state.editOrder
        }
    }
}