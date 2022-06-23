import { createStore } from "vuex"
import { data } from './data.module'
import { modal } from './modal.module'
import { home } from './home.module'
import { admin } from './admin.module'

export default createStore({
  modules: {
    data,
    modal,
    home,
    admin
  },
});
