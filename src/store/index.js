import {
  createStore
} from 'vuex'
import axios from 'axios'
import {
  toast
} from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
/* import {
  applyToken
} from '@/service/AuthenticateUser'
import {
  useCookies
} from 'vue3-cookies' */

const apiURL = 'https://eshopdb-90jy.onrender.com/'


export default createStore({
  state: {
    users: null,
    user: null,
    products: null,
    product: null,
    recentProducts: null
  },

  getters: {},

  mutations: {
    setUsers(state, value) {
      state.users = value
    },

    setUser(state, value) {
      state.user = value
    },

    setProducts(state, value) {
      state.products = value
    },

    setProduct(state, value) {
      state.product = value
    },

    setRecentProducts(state, value) {
      state.recentProducts  = value
    }
  },

  actions: {
    async fetchRecentProducts(context) {
      try {
        const { results, msg } = await (await axios.get(`${apiURL}products/recent`)).data
        if (results) {
          context.commit('setRecentProducts', results)
        } else {
          toast.error(`${msg}`, {
            autoClose: 3000
          })
        }

      } catch (e) {
        toast.error(`${e.msg}`, {
          autoClose: 3000
        })
      }

    }
  },

  modules: {}
})