import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import * as storage from './storage'
import adminConfig from 'src/boot/configService/admin.config'
import { storeSchoolState } from './all'
import { useRouter } from 'vue-router'
import md5 from 'md5'

export const useLoginStore = defineStore('auth', {
  state: () => ({
    user: {},
    token: '',
    authenticated: false
  }),
  getters: {
    getUser: state => state.user,
    getUserToken: state => state.token,
    isAuthenticated: state => state.authenticated
  },
  actions: {
    SET_TOKEN (payload) {
      storage.setLocalToken(payload)
      storage.setHeaderToken(payload)
      this.token = payload
      this.authenticated = true
    },
    async DO_LOGIN (payload) {
      const username = payload.username
      const password = payload.password
      const $schoolInfoStore = storeSchoolState()
      const schoolId = $schoolInfoStore.getSchoolID
      await api.post(adminConfig.UIPATH + '/' + schoolId + '/login', { name: username, hashPass: md5(password) }).then(async response => {
        this.SET_TOKEN(response.data.data.access_token)
        console.log(response.data.data, 'reds')
        await this.GET_LOGIN_STATUS(schoolId)
      })
    },
    async GET_LOGIN_STATUS (token) {
      await api.post(adminConfig.UIPATH + '/' + token + '/loginstatus').then(response => {
        storage.setUser(response.data.data)
        this.user = response.data.data
        console.log(this.user, 'this.testgg')
      })
    },
    LOAD_SESSION () {
      return new Promise((resolve, reject) => {
        try {
          this.user = storage.getUser()
          resolve()
        } catch (error) {
          this.SIGN_OUT()
          reject(error)
        }
      })
    },
    SIGN_OUT () {
      storage.deleteLocalToken()
      storage.deleteHeaderToken()
      storage.deleteUser()
      this.user = {}
      this.token = ''
      this.authenticated = false
    },
    async CHECK_TOKEN () {
      if (this.token) return Promise.resolve(this.token)
      const token = storage.getLocalToken()
      console.log(token, 'check token')
      //   if (!token) return Promise.reject(new Error('Token invalid!'))
      if (!token) {
        const $router = useRouter()
        $router.push('/')
        return Promise.reject(new Error('Token invalid!'))
      }
      this.SET_TOKEN(token)
      console.log(token, 'set token')
      return this.LOAD_SESSION()
    }
  }
})
