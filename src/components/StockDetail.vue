<script setup lang="ts">
import axios from 'axios'
import UploadModal from './Base/UploadModal.vue'
// import { formatNumberWithCommas } from '../util/utils.ts';
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

interface ExhibitInfo {
  current_exhibit_price: number;
  exhibit_display_name: string;
  exhibit_quantity_in_stock: number;
  exhibitor_platform_id: number | undefined;
  min_price: number;
  money_currency_id: number | undefined;
}

interface Photo {
  image_path: string;
}

interface Tag {
  tag_name: string;
}

interface ProductDetail {
  category_id: number;
  character_id: number;
  created_at: string;
  description: string;
  exhibit_infos: ExhibitInfo[];
  photos: Photo[];
  price: number;
  product_code: string;
  product_id: number
  product_name: string
  product_url: string;
  quantity_in_stock: number;
  storage_space_id: number;
  tags: Tag[];
  updated_at: string;
  work_id: number;
}

const productName = ref('')
const productCode = ref('')
const price = ref(0)
const description = ref('')
const quantityInStock = ref(0)
const productUrl = ref('')
const workId = ref<number | null>(null)
const characterId = ref<number | null>(null)
const categoryId = ref<number | null>(null)
const storageSpaceId = ref<number | null>(null)
const photos = ref<File[]>([])
const uploadPhotos = ref<Photo[]>([])
const exhibitInfo = ref<ExhibitInfo[]>([])
const URL = window.URL || window.webkitURL

/**
 *
 */
import Vue3TagsInput from 'vue3-tags-input'
import ExhibitModal from './Base/ExhibitModal.vue'
import ExhibitCard from './Base/ExhibitCard.vue'
/**
 *
 */

/**
 * pageTransition
 */
const router = useRouter()
const productId = ref<number | null>(null)
const productDetail = ref<ProductDetail | null>(null)

function backExhibitList(): void {
  router.push('/stock')
}

function editExhibit(): void {
  router.push(`/stock/edit?id=${productId.value}`)
}

async function fetchProductDetails() {
  try {
    const response = await axios.get(`http://localhost:5000/api/product-detail/${productId.value}`)
    productDetail.value = response.data.product
    console.log('productDetail', productDetail.value)
  } catch (error) {
    console.error('商品詳細の取得に失敗しました:', error)
    throw error
  }
}

/**
 * upload images modal
 */
const uploadModalRef = ref<InstanceType<typeof UploadModal> | null>(null)
const uploadedImages = ref<string[]>([])

function handleFilesUploaded(files: File[]) {
  uploadedImages.value = files.map((file) => URL.createObjectURL(file))
  photos.value = files
}

onBeforeMount(async () => {
  const route = useRoute()
  const id = route.query.id
  productId.value = id ? parseInt(id as string, 10) : null
  console.log('productId.value', productId.value)

  if (productId.value !== null) {
    await fetchProductDetails()

    if (productDetail.value !== null) {
      uploadPhotos.value = productDetail.value.photos
      productName.value = productDetail.value.product_name
      productCode.value = productDetail.value.product_code
      price.value = productDetail.value.price
      description.value = productDetail.value.description
      quantityInStock.value = productDetail.value.quantity_in_stock
      tags.value = productDetail.value.tags.map(tag => tag.tag_name)
      productUrl.value = productDetail.value.product_url
      workId.value = productDetail.value.work_id
      characterId.value = productDetail.value.character_id
      categoryId.value = productDetail.value.category_id
      storageSpaceId.value = productDetail.value.storage_space_id
      exhibitInfo.value = productDetail.value.exhibit_infos
      console.log('exhibitInfo', exhibitInfo.value)
    }
  }

  await getProductItems()
})

/**
 * tag
 */
const tags = ref<string[]>([])

const tagsJson = computed(() => JSON.stringify(tags.value))

const onTagsChanged = (newTags: string[]) => {
  tags.value = newTags
}

/**
 * 商品項目_取得
 */
interface ProductItems {
  work_data: Array<{ work_id: number; work_name: string }>
  character_data: Array<{ character_id: number; character_name: string; work_id: number }>
  storage_space_data: Array<{ storage_space_id: number; storage_space_name: string }>
  category_data: Array<{ category_id: number; category_name: string }>
  platform_data: Array<{ exhibitor_platform_id: number; exhibitor_platform_name: string }>
  currency_data: Array<{ money_currency_id: number; currency_code: string }>
}

const productItemsArray = ref<ProductItems | null>(null)

async function getProductItems(): Promise<void> {
  try {
    const response = await axios.get('http://localhost:5000/api/product-items')
    productItemsArray.value = response.data
    console.log('productItemsArray.value', productItemsArray.value)
  } catch (error) {
    console.error('商品項目の取得に失敗しました:', error)
    throw error
  }
}

/**
 * exhibit modal
 */
const exhibitModalRef = ref<InstanceType<typeof ExhibitModal> | null>(null)
const editingIndex = ref<number | null>(null)

const isModalDisabled = ref(false)

// const exhibits = ref<
//   {
//     exhibitName: string
//     minPrice: number
//     currentPrice: number
//     exhibitQuantity: number
//     platform: number
//     currency: number
//   }[]
// >([])

function openDisabledExhibitModal(index: number) {
  editingIndex.value = index
  const exhibitData = exhibitInfo.value[index] // exhibitInfo.valueからデータを取得

  // exhibitDataが正しいデータを持っているかをログで確認
  console.log('exhibitData', exhibitData)

  if (exhibitModalRef.value) {
    isModalDisabled.value = true
    exhibitModalRef.value.setData(exhibitData) // データがundefinedでないか確認
    exhibitModalRef.value.showModal()
  }
}

// function addExhibit(exhibitData: { exhibitName: any; minPrice: any; currentPrice: any; exhibitQuantity: any; platform: any; }) {
//   console.log(exhibitData);
//   exhibits.value.push({
//     exhibitName: exhibitData.exhibitName,
//     minPrice: exhibitData.minPrice,
//     currentPrice: exhibitData.currentPrice,
//     exhibitQuantity: exhibitData.exhibitQuantity,
//     platform: exhibitData.platform,
//     currecy: exhibitData.currency,
//   });
// }

function handleShow() {
  console.log('Upload modal is shown')
}

function handleHide() {
  console.log('Upload modal is hidden')
}
</script>

<template>
  <div class="detail-ctn">
    <div style="display: flex">
      <img
        src="../assets/icons/undo.svg"
        alt="undo"
        class="material-symbols-outlined back-btn"
        @click="backExhibitList()"
      />
      <button type="button" class="btn btn-pink edit-btn" @click="editExhibit()">
        <div class="edit">Edit</div>
        <img
          src="../assets/icons/arrow_outward.svg"
          alt="arrow_outward"
          class="material-symbols-outlined"
          style="font-size: 22px !important"
        />
      </button>
    </div>
    <div class="card component-card">
      <div class="card-text">Detail</div>
      <div class="card-body">
        <form>
          <div class="image-collage">
            <div class="image-collage">
              <div v-for="(photo, index) in uploadPhotos" :key="index" class="image-container">
                <img :src="photo.image_path" alt="uploaded image" class="up-img" />
              </div>
            </div>
            <!-- <div class="image-container">
              <div class="upload-placeholder">
                <img src="../assets/icons/emoji_nature.svg" alt="emoji_nature" class="material-symbols-outlined"/>
              </div>
            </div>
            <div class="image-container">
              <div class="upload-placeholder">
                <img src="../assets/icons/emoji_nature.svg" alt="emoji_nature" class="material-symbols-outlined"/>
              </div>
            </div>
            <div class="image-container">
              <div class="upload-placeholder">
                <img src="../assets/icons/emoji_nature.svg" alt="emoji_nature" class="material-symbols-outlined"/>
              </div>
            </div>
            <div class="image-container">
              <div class="upload-placeholder">
                <img src="../assets/icons/emoji_nature.svg" alt="emoji_nature" class="material-symbols-outlined"/>
              </div>
            </div> -->
          </div>
          <div class="mb-3">
            <label for="inputItemName" class="form-label">Product Name</label>
            <input
              id="inputItemName"
              v-model="productName"
              type="text"
              class="form-control"
              aria-describedby="emailHelp"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="inputProductCode" class="form-label">Product Code</label>
            <input
              id="inputProductCode"
              v-model="productCode"
              type="text"
              class="form-control"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="inputQuantityStock" class="form-label wid-175">List Price</label>
            <input
              id="inputQuantityStock"
              v-model="price"
              type="number"
              class="form-control form-30"
              min="0"
              step="10"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="inputItemDesciption" class="form-label">Description</label>
            <textarea
              id="inputItemDesciption"
              v-model="description"
              class="form-control"
              rows="3"
              disabled
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="inputQuantityStock" class="form-label wid-175">Quantity in stock</label>
            <input
              id="inputQuantityStock"
              v-model="quantityInStock"
              type="number"
              class="form-control form-30"
              min="0"
              step="1"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="inputItemTag" class="form-label">Product Tag</label>
            <input
              id="inputItemTag"
              type="hidden"
              name="tags"
              class="form-control"
              :value="tagsJson"
              :disabled="true"
            />
            <vue3-tags-input
              v-model:tags="tags"
              placeholder="タグを入力して下さい"
              class="custom-tags-input form-control"
              :disabled="true"
              @on-tags-changed="onTagsChanged"
            />
          </div>
          <div class="mb-3">
            <label for="inputItemName" class="form-label">Product URL</label>
            <input
              id="inputItemName"
              v-model="productUrl"
              type="text"
              class="form-control"
              aria-describedby="emailHelp"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="inputQuantityStock" class="form-label wid-175">Work</label>
            <select id="workSelect" v-model="workId" class="form-control form-30" disabled>
              <option
                v-for="work in productItemsArray?.work_data || []"
                :key="work.work_id"
                :value="work.work_id"
              >
                {{ work.work_name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="workSelect" class="form-label wid-175">Character</label>
            <select
              id="characterSelect"
              v-model="characterId"
              class="form-control form-30"
              disabled
            >
              <option
                v-for="character in productItemsArray?.character_data || []"
                :key="character.character_id"
                :value="character.character_id"
              >
                {{ character.character_name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="inputQuantityStock" class="form-label wid-175">Category</label>
            <select id="categorySelect" v-model="categoryId" class="form-control form-30" disabled>
              <option
                v-for="category in productItemsArray?.category_data || []"
                :key="category.category_id"
                :value="category.category_id"
              >
                {{ category.category_name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="inputQuantityStock" class="form-label wid-175">Storage Space</label>
            <select
              id="storageSpaceSelect"
              v-model="storageSpaceId"
              class="form-control form-30"
              disabled
            >
              <option
                v-for="storage_space in productItemsArray?.storage_space_data || []"
                :key="storage_space.storage_space_id"
                :value="storage_space.storage_space_id"
              >
                {{ storage_space.storage_space_name }}
              </option>
            </select>
          </div>
          <div class="exhibit-card-container">
            <div v-for="(exhibit, index) in exhibitInfo" :key="index" class="mb-3">
              <ExhibitCard
                :title="exhibit.exhibit_display_name"
                :min-price="exhibit.min_price"
                :current-price="exhibit.current_exhibit_price"
                :exhibit-quantity="exhibit.exhibit_quantity_in_stock"
                :platform="exhibit.exhibitor_platform_id"
                :curency="exhibit.money_currency_id"
                @click="openDisabledExhibitModal(index)"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
    <UploadModal
      ref="uploadModalRef"
      @show="handleShow"
      @hide="handleHide"
      @files-uploaded="handleFilesUploaded"
    />
    <ExhibitModal
      ref="exhibitModalRef"
      :disabled="isModalDisabled"
      @show="handleShow"
      @hide="handleHide"
    />
  </div>
</template>

<style scoped>
.up-img {
  width: 200px;
  border: 2px solid #869ac966;
  border-radius: 10px;
}

.image-collage {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.image-container {
  position: relative;
  width: 200px;
  height: 200px;
  margin-bottom: 60px;
}

.collage-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 2px dashed #869ac966;
  border-radius: 0.5rem;
  background-color: #c3cfeb2e;
  color: #aaa;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.upload-placeholder:hover {
  background-color: #8caaef2e;
}

.material-symbols-outlined {
  font-size: 3rem;
}
/*  */

.header,
.detail-ctn {
  margin: 40px 40px 20px;
}

.back-btn {
  font-size: 40px;
  margin-top: 0 !important;
  margin-right: 10px;
  margin-left: 0 !important;
  color: #d588a0;
  cursor: pointer;
}

.btn-set {
  margin: 2%;
}

.edit-btn {
  height: 40px !important;
  font-size: 18px !important;
  background-color: #ffb0ca !important;
}

.edit {
  padding-left: 15px;
  padding-top: 2px;
}

.edit-btn:focus,
.edit-btn:active,
.edit-btn:hover {
  background-color: #e59bb3 !important;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  /* gap: 15px; */
  margin: 0 40px 40px 40px;
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.card-body {
  padding: 38px 10px 10px;
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

.material-symbols-outlined {
  margin-top: 4px;
  margin-left: 5px;
}

.btn-pink {
  background-color: #ecb1c4;
  border: #ecb1c4;
  color: #fafcfd;
  width: 110px;
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

.exhibit-btn {
  box-shadow: 0 2px 10px #b18fa6;
  background-color: #fbb3ca !important;
  height: 45px;
  border: #fbb3ca;
  color: #fafcfd !important;
}

.exhibit-btn:hover,
.exhibit-btn:active,
.exhibit-btn:focus {
  background-color: #ff93b6 !important;
  border: #ff93b6;
}

.submit-btn {
  box-shadow: 0 2px 10px #b18fa6;
  background-color: #ff93b6 !important;
  height: 45px;
  border: #ff93b6;
  color: #fafcfd !important;
}

.submit-btn:hover,
.submit-btn:active,
.submit-btn:focus {
  background-color: #e97a9e !important;
  border: #e97a9e;
}

.btn {
  width: 100px;
  border-radius: 3px;
  font-size: 19px;
}

.disabled-btn,
.disabled-btn:hover,
.disabled-btn:active,
.disabled-btn:focus {
  background-color: #e1d1d6;
  height: 40px;
  border: #e1d1d6;
  color: #8f8f8f;
  box-shadow: 0 5px 0 #8f8f8fa1;
  padding-top: 7px;
}

.img-ctn {
  height: 300px;
  width: 40%;
  border-radius: 20px;
  border: 1px dashed #ccc;
  margin: 0 auto 38px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.imgmode {
  font-size: 80px;
  color: #ccc;
  margin: 0 !important;
}

.card {
  width: 1523px;
  height: 100%;
  margin-top: 30px;
  box-shadow: 0 4px 12px #a0a3b4;
  position: relative;
}

.card-text {
  background-color: #faf3f6;
  border-radius: 10px 10px 0 0;
  border-bottom: #b2b8c6;
  color: #bf8f9f;
  font-weight: bold;
  font-size: 25px;
  text-align: left;
  padding: 20px 15px 15px 20px;
}

.component-card {
  border-radius: 10px;
  color: #d06179;
  border: #b2b8c6;
}

.bi-heart.active {
  color: #e83e8c;
}

.btn-detail {
  color: #f78aa9;
}

.btn-detail:hover,
.btn-detail:active,
.btn-detail:focus {
  color: #f777a0;
}

.exhibit-card-container {
  display: flex;
  flex-wrap: wrap; /* 複数行に対応 */
  gap: 16px; /* 各カード間のスペースを設定 */
}

.mb-3 {
  display: flex;
  margin-bottom: 38px !important;
  line-height: 38px;
}

.form-label {
  width: 200px;
  color: #786569;
  font-size: large;
  margin-bottom: 0 !important;
  padding-left: 20px;
  text-align: left;
  line-height: 50px;
}

.wid-175 {
  width: 175px;
}

.ex-label {
  padding-left: 0 !important;
  width: 80px;
}

.ex-form {
  width: 80%;
  margin-right: 100px !important;
}

.ex-ctn {
  margin-bottom: 0 !important;
}

.ebay-form {
  margin-right: 30px !important;
  width: 242px !important;
}

.exhibit-info {
  padding-top: 5px !important;
  margin-bottom: 30px !important;
  font-weight: 600;
  font-size: larger;
}

.form-control {
  margin-right: 30px;
  line-height: inherit !important;
  font-size: large;
}

.form-control:disabled {
  background-color: #f7eff38a;
}

.form-30 {
  width: 30%;
}

.form-select {
  height: 38px;
  width: 200px;
}

.form-check {
  margin-left: 20px;
  margin-bottom: 38px !important;
  font-size: large;
  text-align: left;
  color: #786569;
}

.form-check-input:checked {
  background-color: #ecb1c4;
  border-color: #ecb1c4;
}

/* Tag css */

.custom-tags-input {
  padding: 8px;
  font-size: large;
  border: var(--bs-border-width) solid var(--bs-border-color);
}

.custom-tags-input input {
  border: none;
  outline: none;
  background-color: transparent;
  color: #333333; /* プレースホルダーテキストと入力フィールドのテキスト色 */
}

.custom-tags-input input::placeholder {
  color: #333333;
  font-size: large;
}

.custom-tags-input .tag {
  background-color: #ffa9e0 !important;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
  font-size: large;
}

.custom-tags-input .tag .remove-tag {
  margin-left: 8px;
  cursor: pointer;
  color: white; /* タグの削除ボタンの色: 白色 */
}

.custom-tags-input[disabled] {
  background-color: #f7eff38a;
}

.v3ti--focus {
  box-shadow: none;
  border-color: #86b7fe;
}
</style>

<style>
.v3ti-tag {
  background-color: #ffa9e0 !important;
}
</style>
