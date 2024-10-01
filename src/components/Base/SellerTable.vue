<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  cardTitle: string;
  sellerAnalysis: () => void;
}>();

  // import { ref } from 'vue';
  
  // const isFavorited = ref(false);
  
  // function toggleFavorite() {
  //   isFavorited.value = !isFavorited.value;
  // }
</script>

<template>
  <div class="card component-card">
    <div class="card-body">
      <div class="card-text">{{ props.cardTitle }}</div>
      <button type="button" class="btn btn-pink" @click="props.sellerAnalysis">
        <div class="check">check</div>
        <img src="../../assets/icons/monitoring.svg" alt="monitoring"/>
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 400px;
  height: 260px;
  margin-left: 35px;
  margin-top: 50px;
  box-shadow: 0 4px 12px #7D7D8F;
  position: relative;
}

.card-body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.card-text {
  color: #b7a5ac;
  font-size: 25px;
  text-align: left;
  padding: 4px 0 0 4px;
}

.check {
  font-size: 16px;
  margin-right: 4px;
  margin-top: 3px;
}

.component-card {
  background-color: #dcedff75;
  border-radius: 10px;
  color: #D06179;
  border: #B2B8C6;
}

.bi-heart.active {
  color: #E83E8C;
}

.btn-pink {
  background-color: #ECB1C4;
  border: #ECB1C4;
  color: #FAFCFD;
  width: 90px;
  height: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px #b18fa6;
  font-size: 14px;
  display: flex;
}

.btn-pink:hover, .btn-pink:active, .btn-pink:focus {
  background-color: #EDA3B8;
  border: #EDA3B8;
  color: #FAFCFD;
}

</style>
