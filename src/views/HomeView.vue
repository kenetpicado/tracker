<script setup>
import axios from 'axios';
import { computed, ref } from 'vue';
import { toast } from '@/utils/toast.js';
import SearchSvg from '@/components/icons/SearchSvg.vue';
import CheckSvg from '@/components/icons/CheckSvg.vue';
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { dictionary } from '@/utils/dictionary';

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

  isLoading.value = true
  result.value = null
  message.value = null

  axios
    .post(`${BASE_URL}/api/track`, { track: track.value })
    .then(response => {
      result.value = response.data
      history.value = response.data.history.reverse()
      toast.success('Paquete encontrado')
    })
    .catch(error => {
      message.value = error.response?.data?.message || 'Error al buscar el paquete'
      toast.error(message.value)
    })
    .finally(() => {
      isLoading.value = false
    })
}

const isCompleted = computed(() => result.value?.image.includes('status_4'))

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
        <div
          class="flex items-center border border-gray-300 rounded-3xl text-gray-700 overflow-hidden bg-white px-2 py-1 mb-8">
          <input type="text" required v-model="track" placeholder="Número de rastreo"
            class="px-4 w-full focus:outline-none">
          <button type="submit" aria-label="Buscar paquete"
            class="flex p-2 items-center justify-center bg-amber-400 text-white h-full rounded-full transition select-none duration-300 transform active:scale-110">
            <SearchSvg />
          </button>
        </div>
      </form>
    </div>
  </section>
  <section class="bg-white text-gray-800 h-full mb-4">
    <div class="w-full flex items-center justify-center mb-4">
      <div v-if="result" class="text-center max-w-xl">
        <div class="space-y-2 mb-8">
          <h5 class="text-3xl font-bold mb-4">
            {{ result.status }}
          </h5>
          <div>
            {{ result.date }}
          </div>
          <div class="font-bold">
            {{ result.track }}
          </div>
          <div>
            {{ result.guide }}
          </div>
          <div>
            {{ result.info }}
          </div>
        </div>
        <div>
          <div v-for="(log, index) in history" class="mb-5" :key="index">
            <div class="flex flex-col items-center justify-center mb-2">
              <span class="font-bold flex items-center justify-center w-8 h-8 text-white rounded-full"
                :class="history.length - 1 == index && isCompleted ? 'bg-green-500' : 'bg-amber-400 '">
                <CheckSvg v-if="history.length - 1 == index && isCompleted" />
                <label v-else>
                  {{ index + 1 }}
                </label>
              </span>
            </div>
            <div class="font-bold text-lg uppercase">
              {{ dictionary[log.title] ?? log.title }}
            </div>
            <div>
              {{ log.date }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-xl max-w-xl">
        <div v-if="message" class="text-sm w-full px-4 bg-red-100 text-red-500 py-2 rounded-xl mb-5">
          {{ message }}
        </div>
        <img src="/src/assets/search.png" alt="" class="mx-auto w-40 h-auto">
      </div>
    </div>
    <footer>
      <div class="text-center py-6 text-gray-400">
        <div>
          © 2024 Envíos de Occidente
        </div>
        <small>
          Desarrollado por <a href="https://www.linkedin.com/in/kenetpicado/" class="text-gulf-blue-950">Kenet P.</a>
        </small>
      </div>
    </footer>
  </section>
</template>
