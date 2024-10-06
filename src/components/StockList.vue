<script setup lang="ts">
import axios from 'axios'
import { ref, onBeforeMount, watch, computed } from 'vue'
import { useRouter } from 'vue-router'

const productInfoArray = ref<any[]>([])
const productPhotos = ref('')
const totalItems = ref(0)

watch(productInfoArray, (newValue) => {
  totalItems.value = newValue.length
  console.log('totalItems', totalItems.value)
})

onBeforeMount(async () => {
  await getProductInfo()
})

/**
 * sort
 */
const selectedSort = ref('idorder')
const idOrderFlg = ref(true)
const latestFlg = ref(false)
const alphabeticalFlg = ref(false)

// ソートを実行するcomputedプロパティ
const sortedProducts = computed(() => {
  // 配列のコピーを作成してからソート
  const sortedArray = [...productInfoArray.value]

  if (idOrderFlg.value) {
    sortedArray.sort((a, b) => a.product_id - b.product_id)
  } else if (latestFlg.value) {
    sortedArray.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
  } else if (alphabeticalFlg.value) {
    sortedArray.sort((a, b) => a.product_name.localeCompare(b.product_name))
  }

  return sortedArray
})

// ソート条件を更新するメソッド
function updateSortFlags() {
  idOrderFlg.value = selectedSort.value === 'idorder'
  latestFlg.value = selectedSort.value === 'latest'
  alphabeticalFlg.value = selectedSort.value === 'alphabetical'
}

function pricePrefix(price: number) {
  return price.toLocaleString()
}

/**
 * page transition
 */
const router = useRouter()

function detailsTransition(id: number): void {
  router.push(`/stock/detail?id=${id}`)
}

function createTransition(): void {
  router.push(`/stock/create`)
}

/**
 * 商品情報_取得
 */
async function getProductInfo(): Promise<void> {
  try {
    const response = await axios.get('http://localhost:5000/api/fetch-products')
    productInfoArray.value = response.data.products
    console.log('response', productInfoArray.value)
    console.log('productPhotos', productPhotos.value)
  } catch (error) {
    console.error('商品の取得に失敗しました:', error)
    throw error
  }
}

/**
 * Display additional Cards every 20
 */
// const totalItems = productInfoArray.value.length;
const itemsToShow = ref(20)

function showMoreItems(): void {
  if (itemsToShow.value + 20 <= totalItems.value) {
    itemsToShow.value += 20
  } else {
    itemsToShow.value = totalItems.value
  }
}
</script>

<template>
  <div>
    <div class="header">
      <button type="button" class="btn btn-pink new-create" @click="createTransition()">
        <div style="padding-left: 5px">New Create</div>
        <img
          src="../assets/icons/add_box.svg"
          alt="add_box"
          class="material-symbols-outlined plus-btn"
        />
      </button>
      <div class="sort-options">
        <select v-model="selectedSort" @change="updateSortFlags">
          <option value="idorder" class="sort-item">ID order</option>
          <option value="latest" class="sort-item">Latest</option>
          <option value="alphabetical" class="sort-item">Alphabetical</option>
        </select>
      </div>
    </div>
    <!-- 取得APIから表示させる -->
    <div class="card-container">
      <div v-for="info in sortedProducts" :key="info.product_id" class="card component-card">
        <img
          v-if="info.photos.length > 0"
          :src="info.photos[0].image_path"
          alt="Product Image"
          class="product-image"
        />
        <img v-else src="../assets/icons/kitty.jpg" alt="Product Image" class="product-image" />
        <div class="card-body">
          <div class="product-info">
            <div class="product-name">{{ info.product_name }}</div>
            <div class="product-price">¥ {{ pricePrefix(info.price) }}</div>
          </div>
          <div class="icon-container">
            <button type="button" class="btn btn-pink" @click="detailsTransition(info.product_id)">
              <img
                src="../assets/icons/open_in_full.svg"
                alt="open_in_full"
                class="material-symbols-outlined"
              />
            </button>
            <div v-if="info.exhibit_infos.length > 0">
              <img
                v-if="info.exhibit_infos[0].exhibitor_platform_id === 1"
                src="../assets/merukari.png"
                alt="Flea Market Icon"
                class="flea-market-icon"
              />
              <img
                v-else-if="info.exhibit_infos[0].exhibitor_platform_id === 2"
                src="../assets/ebay.png"
                alt="Flea Market Icon"
                class="flea-market-icon"
              />
              <img
                v-else-if="info.exhibit_infos[0].exhibitor_platform_id === 4"
                src="../assets/rakuten.png"
                alt="Flea Market Icon"
                class="flea-market-icon"
              />
              <img
                v-else-if="info.exhibit_infos[0].exhibitor_platform_id === 5"
                src="../assets/rakuma.png"
                alt="Flea Market Icon"
                class="flea-market-icon"
              />
              <img
                v-else-if="info.exhibit_infos[0].exhibitor_platform_id === 6"
                src="../assets/yahuoku.png"
                alt="Flea Market Icon"
                class="flea-market-icon"
              />
              <img
                v-else
                src="../assets/icons/favorite.svg"
                alt="Flea Market Icon"
                class="flea-market-icon"
              />
            </div>
            <div v-else>
              <img
                src="../assets/icons/favorite.svg"
                alt="Flea Market Icon"
                class="flea-market-icon"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 保存用 -->
      <!-- <div class="card component-card" v-for="index in itemsToShow" :key="index">
        <img src="../assets/001_l.jpg" alt="Product Image" class="product-image"/>
        <div class="card-body">
          <div class="product-info">
            <div class="product-name">{{ productName }}</div>
            <div class="product-price">¥ {{ productPrice }}</div>
          </div>
          <div class="icon-container">
            <button type="button" class="btn btn-pink" @click="detailsTransition(index)">
              <div class="check">Show Detail</div>
              <img src="../assets/icons/open_in_full.svg" alt="open_in_full" class="material-symbols-outlined"/>
            </button>
            <img src="../assets/merukari.png" alt="Flea Market Icon" class="flea-market-icon"/>
          </div>
        </div>
      </div> -->
      <!--  -->
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
  justify-content: space-between;
  align-items: center;
  margin: 40px 72px 20px 60px;
}

.new-create {
  width: 160px !important;
  height: 40px !important;
  font-size: 18px !important;
  background-color: #ffb0ca !important;
  border-radius: 10px !important;
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
  row-gap: 15px;
  margin: 0 40px 40px 40px;
}

.card {
  width: 250px;
  height: 330px;
  box-shadow: 0 4px 12px #ebe2e7;
  position: relative;
  text-align: center;
  border-radius: 20px;
  background: linear-gradient(to left, #ffdceaad, #fff2f66b);
  color: #d06179;
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
  height: 60px;
}

.product-price {
  color: #7d798d;
  font-weight: bold;
  text-align: right;
  font-size: 20px;
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
  margin-left: -4px;
}

.plus-btn {
  font-size: 22px !important;
  margin-left: 2px !important;
  margin-top: 0;
}

.btn-pink {
  background-color: #ecb1c4;
  border: #ecb1c4;
  color: #fafcfd;
  width: 35px;
  height: 35px;
  border-radius: 50%;
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
