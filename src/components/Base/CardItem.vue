<script setup lang="ts">
  // import { ref } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  cardTransition: String
});
  
  // const isFavorited = ref(false);
  
  // function toggleFavorite() {
  //   isFavorited.value = !isFavorited.value;
  // }
</script>

<template>
  <div class="card-item component-card-item">
    <div class="card-item-body">
      <div class="card-top-icons">
        <a class="dropdown-item" :href="props.cardTransition">
          <img class="heart_img" src="../../assets/icons/heart_plus.svg" alt="heart_plus"/>
        </a>
      </div>
      <div class="card-item-text">{{ props.title }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>
