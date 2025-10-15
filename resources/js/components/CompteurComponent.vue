<template>
  <div class="text-center mt-5">
    <p class="bg-dark text-white fw-bold w-25 fs-2 mx-auto p-5">{{ count }}</p>
    <p class="text-muted mb-5">Compteur</p>
    <button @click="count++" class="btn btn-primary">Incrémenter</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>

<style scoped>
h2 {
  color: #42b983;
}
</style>
