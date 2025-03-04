import { toast } from '@/utils/toast.js'
import axios from 'axios'
import { ref } from 'vue'

export function useTrack() {
  //const BASE_URL = 'https://ft-backend-production-e6f5.up.railway.app'
  const BASE_URL = 'http://localhost:3001'
  const searching = ref(false)

  const client = ref('')
  const packages = ref([])
  const method = ref('tracking')

  const search = async () => {
    searching.value = true

    if (!client.value) return

    await axios
      .get(`${BASE_URL}/search`, {
        params: {
          client: client.value
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

  return { search, searching, resetValues, client, packages, method }
}

export default useTrack
