<template>
  <div class="text-center mt-5">
    <h2>Composant Vue sans routeur ✅</h2>
    <p>Compteur : {{ count }}</p>
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
