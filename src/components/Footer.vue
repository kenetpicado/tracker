<template>
  <footer>
    <div class="text-center py-6 text-gray-400">
      <div>© {{ CURRENT_YEAR }} Envíos de Occidente</div>
      <small>
        Desarrollado por
        <a href="https://strain-team.com" target="_blank" class="text-gulf-blue-950">StrainTeam Developers</a>
      </small>
    </div>
  </footer>
</template>

<script setup>
const CURRENT_YEAR = new Date().getFullYear()
</script>
