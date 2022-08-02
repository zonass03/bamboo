// import { defineStore } from 'pinia'
// import { api } from 'src/boot/axios'
// import adminConfig from 'src/boot/configService/admin.config'
// // import * as storage from './storage'

// export const useSchoolState = defineStore('siteStatus', {
//   state: () => ({
//     siteStatus: {},
//     subDomain: '',
//     schoolID: ''
//   }),
//   getters: {
//     getSiteStatus: state => state.siteStatus,
//     getSubdomain: state => state.subDomain,
//     getSchoolID: state => state.schoolID
//   },
//   actions: {
//     async _getSchoolInfo () {
//       if (adminConfig.SUBDOMAIN) {
//         this.subDomain = adminConfig.SUBDOMAIN
//       } else {
//         const currentUrl = window.location.hostname
//         const filterUrl = currentUrl.split('.')[0]
//         this.subDomain = filterUrl
//       }
//       await api.get(adminConfig.APIPATH + '/getSchoolId' + '/' + this.subDomain).then(async response => {
//         // this.SET_TOKEN(response.data)
//         this.schoolID = response.data.school._id
//         this.siteStatus = response.data
//         // console.log(this.schoolID, 'red')
//         // await this.GET_LOGIN_STATUS(this.schoolID)
//       })
//     }
//     // async GET_LOGIN_STATUS (token) {
//     //   await api.post(adminConfig.UIPATH + '/' + token + '/loginstatus', { withCredentials: true }).then(response => {
//     //     storage.setUser(response.data.data)
//     //     this.user = response.data.data
//     //     console.log(this.user, 'this.user')
//     //   })
//     // }
//   }
// })
