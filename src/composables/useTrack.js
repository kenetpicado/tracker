import { toast } from '@/utils/toast.js'
import axios from 'axios'
import { ref } from 'vue'

export function useTrack() {
  //const BASE_URL = 'https://agency-api-production-883f.up.railway.app'
  const BASE_URL = 'http://localhost:3001'
  const searching = ref(false)

  const searchInput = ref('')
  const client = ref('')
  const track = ref('')
  const packages = ref([])
  const method = ref('name')

  const search = async () => {
    searching.value = true

    if (!searchInput.value) return

    if (method.value === 'tracking') {
      track.value = searchInput.value
      client.value = ''
    } else {
      client.value = searchInput.value
      track.value = ''
    }

    await axios
      .get(`${BASE_URL}/search`, {
        params: {
          client: client.value,
          track: track.value
        }
      })
      .then(({ data }) => {
        packages.value = data

        if (data.length === 0) {
          toast.info('No se encontraron paquetes')
        }
      })
      .catch(() => {
        toast.error('Error al buscar el paquete')
      })
      .finally(() => {
        searching.value = false
      })
  }

  function resetValues() {
    packages.value = []
  }

  return { search, searching, resetValues, client, track, packages, method, searchInput }
}

export default useTrack
