<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { toast } from '@/utils/toast.js';
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import PackageDetails from '@/components/PackageDetails.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import SearchInput from '@/components/SearchInput.vue';

const BASE_URL = "https://donut.strain-team.com"

const track = ref("")
const isLoading = ref(false)
const result = ref(null)
const history = ref([])
const message = ref(null)

function searchPachage() {
  if (!track.value) {
    toast.error('Ingresa un número de rastreo')
    return
  }

  result.value = null
  message.value = null

  isLoading.value = true

  axios
    .post(`${BASE_URL}/api/track`, { track: track.value })
    .then(response => {
      result.value = response.data
      history.value = response.data.history.reverse()
    })
    .catch(error => {
      message.value = error.response?.data?.message || 'Error al buscar el paquete'
      toast.error(message.value)
    })
    .finally(() => {
      isLoading.value = false
    })
}

</script>

<template>
  <section class="bg-gulf-blue-950 text-white">
    <Loading v-model:active="isLoading" :is-full-page="true" />
    <header class="px-4 lg:px-10 py-6">
      <a href="https://enviosdeoccidente.com/">
        <img src="/src/assets/logo.png" alt="" class="w-10 h-auto">
      </a>
    </header>
    <div class="w-full flex items-center justify-center mb-6">
      <form @submit.prevent="searchPachage" class="text-center py-6 px-4 max-w-xl">
        <h5 class="text-5xl lg:text-4xl font-bold mb-8">
          ¡Rastrea tu paquete!
        </h5>
        <div class="text-sm font-light mb-10 leading-relaxed">
          Rastrea tu paquete fácilmente con nuestro servicio de seguimiento de envíos. ¡Ingresa el número de
          seguimiento y mantente al tanto del progreso de tu paquete en tiempo real!
        </div>
        <SearchInput v-model="track" />
      </form>
    </div>
  </section>
  <section class="bg-white text-gray-800 h-full mb-4">
    <div class="w-full flex items-center justify-center mb-4">
      <PackageDetails :result="result" :history="history" />

      <div v-if="!result" class="text-center text-xl max-w-xl">
        <ErrorMessage v-if="message" :message="message" />
        <img src="/src/assets/search.png" alt="" class="mx-auto w-40 h-auto">
      </div>
    </div>
  </section>
</template>
