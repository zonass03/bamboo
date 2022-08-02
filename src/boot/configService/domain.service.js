import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import adminConfig from 'src/boot/configService/admin.config'
// import * as storage from './storage'

export const useSchoolState = defineStore('domainServices', {
  state: () => ({
    siteStatus: {},
    subDomain: '',
    schoolID: ''
  }),
  getters: {
    getSiteStatus: state => state.siteStatus,
    getSubdomain: state => state.subDomain,
    getSchoolID: state => state.schoolID
  },
  actions: {
    async _getSchoolInfo () {
      if (adminConfig.SUBDOMAIN) {
        this.subDomain = adminConfig.SUBDOMAIN
      } else {
        const currentUrl = window.location.hostname
        const filterUrl = currentUrl.split('.')[0]
        this.subDomain = filterUrl
      }
      await api.get(adminConfig.APIPATH + '/getSchoolId' + '/' + this.subDomain).then(async response => {
        this.schoolID = response.data.school._id
        this.siteStatus = response.data
      })
    }
  }
})
