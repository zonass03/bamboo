<template>
  <q-page padding>
    <!-- content -->
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et accusamus nostrum sed ea, recusandae eligendi odio aspernatur minima molestiae consectetur sint, reiciendis excepturi alias voluptatibus velit! Odit enim molestiae facilis!
   <q-btn flat dense label="Logout" @click="logout"/>
  </q-page>
</template>

<script setup>
import { onMounted /*  computed */ } from 'vue'
import { store, storeSchoolState } from 'stores/all'
import { useRouter } from 'vue-router'

const $router = useRouter()
const $schoolStore = storeSchoolState()
const $store = store()

//  const isAuthenticated = computed(() => $store.isAuthenticated)

const logout = () => {
  $store.SIGN_OUT()
  $router.push('/')
}

onMounted(() => {
  $schoolStore._getSchoolInfo()
  $store.GET_LOGIN_STATUS()
  $store.CHECK_TOKEN()
  $store.LOAD_SESSION()
})

</script>
