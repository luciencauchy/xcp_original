export const admin = {

    namespaced: true,

    state: {
        targetGalery: false,
        loading: false,
        editOrder: false,
        editMode: false
    },

    getters: {
        editMode(state){
            return state.editMode
        },

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
        toggleEditMode({ commit }){
            commit('toggleEditMode')
        },

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
        toggleEditMode(state){
            state.editMode = !state.editMode
        },

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