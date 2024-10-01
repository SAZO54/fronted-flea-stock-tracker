<script setup lang="ts">
import { ref } from 'vue';
import TransactionTable from './Base/TransactionTable.vue';

// const transactions = ref([
//   { id: '1', name: 'Item A', status: 'Packing', destination: 'USA', platform: 'Mercari' },
//   // add more items
// ]);
// const fields = ['id', 'name', 'status', 'destination', 'platform'];

/**
 * map button
 */
const worldActive = ref(true);

function mapTabSwitch(): void {
  worldActive.value = !worldActive.value;
}

console.log("worldActive", worldActive.value);

</script>

<template>
  <div class="flex">
    <div>
      <div class="ship-container" v-if="worldActive">
        <div class="flex">
          <button class="btn btn-pink disabled" @click="mapTabSwitch">world</button>
          <button class="btn disabled-btn jp-btn" @click="mapTabSwitch">japan</button>
        </div> 
        <div class="map-container" v-if="worldActive">
          <img src="../assets/world.png" alt="World Image" class="world-img"/>
        </div>
      </div>
      <div class="ship-container" v-else>
        <div class="flex">
          <button class="btn disabled-btn" @click="mapTabSwitch">world</button>
          <button class="btn btn-pink jp-btn disabled" @click="mapTabSwitch">japan</button>
        </div> 
        <div class="map-container">
          <img src="../assets/japan.png" alt="Japan Image" class="japan-img"/>
        </div>
      </div>
    </div>
    <TransactionTable />
  </div>
</template>

<style scoped>
.ship-container {
  margin: 50px 40px;
}

.flex {
  display: flex;
}

.btn {
  width: 80px;
  border-radius: 3px;
  font-size: 19px;
}

.btn-pink {
  background-color: #ECB1C4 !important;
  height: 45px;
  border: #ECB1C4;
  color: #FAFCFD !important;
}

.btn-pink:hover {
  background-color: #EDA3B8;
  border: #EDA3B8;
  color: #FAFCFD;
}

.disabled-btn, .disabled-btn:hover {
  background-color: #e1d1d694;
  height: 40px;
  border: #e1d1d6;
  color: #8f8f8f;
  box-shadow: 0 5px 0 #8f8f8fa1;
  padding-top: 7px;
}

.jp-btn {
  margin-left: 5px;
}

.map-container {
  background-color: #fff1fc7a;
  width: 900px;
  height: 674px;
  margin-top: 20px;
}

.world-img {
  width: 100%;
  height: 90%;
  object-fit: cover;
}

.japan-img {
  width: 70%;
  height: 100%;
  object-fit: cover;
}
</style>
