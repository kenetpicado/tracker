<script setup>
import SearchInput from '@/components/SearchInput.vue'
import useTrack from '@/composables/useTrack'

const { search, packages, searching, client, track, method, searchInput } = useTrack()

function pasteFrom() {
  navigator.clipboard.readText().then((text) => {
    client.value = text
  })
}

function switchTo(m) {
  method.value = m
  track.value = ''
  client.value = ''
  searchInput.value = ''
  packages.value = []
}
</script>

<template>
  <section class="bg-gulf-blue-950 text-white">
    <header class="px-4 lg:px-10 py-6">
      <a href="https://enviosdeoccidente.com/">
        <img src="/src/assets/logo.png" alt="" class="w-10 h-auto" />
      </a>
    </header>
    <div class="w-full flex flex-col items-center justify-center mb-6">
      <form @submit.prevent="search" class="text-center py-6 px-4 max-w-xl">
        <h5 class="text-5xl lg:text-4xl font-bold mb-8">¡Rastrea tu paquete!</h5>
        <div class="text-sm font-light mb-10 leading-relaxed">
          Rastrea tu paquete fácilmente con nuestro servicio de seguimiento de envíos. ¡Ingresa el
          criterio de búsqueda y mantente al tanto del progreso de tu paquete en tiempo real!
        </div>

        <div class="grid grid-cols-2 mb-8">
          <button
            @click="switchTo('name')"
            type="button"
            class="border border-amber-400 rounded-l-3xl py-3"
            :class="method === 'name' ? 'bg-amber-400' : ''"
          >
            Buscar por nombre
          </button>
          <button
            @click="switchTo('tracking')"
            type="button"
            class="border border-amber-400 rounded-r-3xl py-3"
            :class="method === 'tracking' ? 'bg-amber-400' : ''"
          >
            Buscar por tracking
          </button>
        </div>

        <SearchInput v-model="searchInput" :loading="searching" />

        <div class="w-full flex justify-between">
          <button
            type="button"
            @click="pasteFrom"
            class="transition select-none duration-300 transform active:scale-110"
          >
            <div class="flex gap-0.5 items-center">
              <span>Pegar</span>
              <img src="/src/assets/clipboard.svg" alt="" class="w-4" />
            </div>
          </button>
        </div>
      </form>
    </div>
  </section>
  <section class="bg-white text-gray-800 h-full mb-4">
    <div class="w-full flex flex-col items-center justify-center mb-4">
      <div v-if="packages.length" class="max-w-xl flex flex-col gap-4 w-full p-4">
        <div
          v-for="item in packages"
          :key="item.id"
          class="w-full bg-white border rounded-lg p-4 flex flex-col gap-2"
        >
          <div class="flex justify-between items-center mb-2">
            <span class="font-bold truncate">{{ item.tracking }}</span>
            <span class="font-light text-sm text-gray-400">{{
              new Date(item.createdAt).toLocaleDateString('es-NI')
            }}</span>
          </div>
          <div class="uppercase font-bold">
            {{ item.client }}
          </div>
          <div class="text-sm">
            {{ item.type }}, {{ item.grossWeight }} lb(s), {{ item.pieces }} pieza(s)
          </div>
          <div class="text-sm text-gray-400">
            {{ item.description }}
          </div>
        </div>
      </div>
      <div class="text-center text-xl max-w-xl px-4">
        <img src="/src/assets/brand.jpeg" alt="" class="mx-auto w-full h-auto rounded-lg" />
      </div>
    </div>
  </section>
</template>
