export const home = {

    namespaced: true,

    state: {
        openMenu: false,
        openGalery: false,
        loading: false
    },

    getters: {
        menu(state){
            return state.openMenu
        },

        galery(state){
            return state.openGalery
        },

        loading(state){
            return state.loading
        }
    },

    actions: {
        openMenu({ commit }, galery){
            commit('openMenu', galery)
        },

        load({ commit }, galery){
            console.log('galery')
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

        load(state, galery){
            state.loading = galery
        },
        
        endLoad(state){
            state.galery = state.loading
            state.loadGalery = false
        }
    }
}