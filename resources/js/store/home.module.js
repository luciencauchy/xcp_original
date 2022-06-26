export const home = {

    namespaced: true,

    state: {
        openMenu: false,
        galery: false,
        loading: false
    },

    getters: {
        menu(state){
            return state.openMenu
        },

        galery(state){
            return state.galery
        },

        loading(state){
            return state.loading
        }
    },

    actions: {
        openMenu({ commit }, galery){
            commit('openMenu', galery)
        },

        setGalery({ commit }, galery){
            commit('setGalery', galery)
        },

        load({ commit }, galery){
            commit('load', galery)
        },

        endLoad({ commit }){
            commit('endLoad')
        }
    },

    mutations: {
        openMenu(state, galery){
            state.openMenu = galery
        },

        setGalery(state, galery){
            state.galery = galery
        },

        load(state, galery){
            state.loading = galery
        },
        
        endLoad(state){
            state.galery = state.loading
            state.loadGalery = false
        }
    }
}