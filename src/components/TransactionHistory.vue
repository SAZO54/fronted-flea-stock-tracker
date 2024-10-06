<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const productName = 'Product Name'
const productPrice = '4,500'

/**
 * page transition
 */
const router = useRouter()

function detailsTransition(id: number): void {
  router.push(`/stock/detail?id=${id}`)
}

/**
 * Display additional Cards every 20
 */
const totalItems = 60
const itemsToShow = ref(20)

function showMoreItems(): void {
  if (itemsToShow.value + 20 <= totalItems) {
    itemsToShow.value += 20
  } else {
    itemsToShow.value = totalItems
  }
}
</script>

<template>
  <div>
    <div class="header">
      <div class="sort-options">
        <select>
          <option value="latest" class="sort-item">Latest</option>
          <option value="alphabetical" class="sort-item">Alphabetical</option>
        </select>
      </div>
    </div>
    <div class="card-container">
      <div v-for="index in itemsToShow" :key="index" class="card component-card">
        <img src="../assets/suponnji.jpg" alt="Product Image" class="product-image" />
        <div class="card-body">
          <div class="product-info">
            <div class="product-name">{{ productName }}</div>
            <div class="product-price">¥ {{ productPrice }}</div>
          </div>
          <div class="icon-container">
            <button type="button" class="btn btn-pink" @click="detailsTransition(index)">
              <div class="check">Show Detail</div>
              <img
                src="../assets/icons/open_in_full.svg"
                alt="open_in_full"
                class="material-symbols-outlined"
              />
            </button>
            <img src="../assets/merukari.png" alt="Flea Market Icon" class="flea-market-icon" />
          </div>
        </div>
      </div>
      <div v-if="itemsToShow < totalItems" class="show-more-container">
        <button class="show-more-btn" @click="showMoreItems">
          <img
            src="../assets/icons/expand_circle_down.svg"
            alt="expand_circle_down"
            class="material-symbols-outlined more-icon"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: end;
  margin: 40px 72px 20px 60px;
}

.new-create {
  width: 160px !important;
  height: 40px !important;
  font-size: 18px !important;
  background-color: #ffb0ca !important;
}

.new-create:focus,
.new-create:active,
.new-create:hover {
  background-color: #e59bb3 !important;
}

.sort-options select {
  padding: 5px;
  border-radius: 12px;
  border-color: #ffbdd3;
  border-width: thick;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 0 40px 40px 40px;
}

.card {
  width: 250px;
  height: 300px;
  box-shadow: 0 4px 12px #ebe2e7;
  position: relative;
  text-align: center;
  border-radius: 20px;
  background: linear-gradient(to left, #ffdceaad, #fff2f66b);
  color: #7c7375;
  margin: 20px;
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.card-body {
  padding: 10px;
}

.product-name {
  font-weight: bold;
  font-size: 20px;
  text-align: left;
}

.product-price {
  color: #7d798d;
  font-weight: bold;
  text-align: right;
}

.icon-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.flea-market-icon {
  width: 25px;
  height: 25px;
}

.material-symbols-outlined {
  font-size: 16px;
  margin-top: 2px;
  margin-left: 5px;
}

.btn-pink {
  background-color: #ecb1c4;
  border: #ecb1c4;
  color: #fafcfd;
  width: 125px;
  height: 32px;
  border-radius: 10px;
  box-shadow: 0 2px 10px #b18fa6;
  font-size: 14px;
  display: flex;
}

.btn-pink:hover,
.btn-pink:active,
.btn-pink:focus {
  background-color: #eda3b8;
  border: #eda3b8;
  color: #fafcfd;
}

.show-more-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1523px;
}

.show-more-btn {
  background-color: #fff;
  border: none;
  color: #444;
  border-radius: 10px;
  cursor: pointer;
}

.more-icon {
  font-size: 30px !important;
}

.more-icon:hover {
  color: #d06179;
}
</style>
