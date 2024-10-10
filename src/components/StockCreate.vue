<script setup lang="ts">
import axios from 'axios'
import * as yup from 'yup'
import Vue3TagsInput from 'vue3-tags-input'
import UploadModal from './Base/UploadModal.vue'
import ExhibitModal from './Base/ExhibitModal.vue'
import ExhibitCard from './Base/ExhibitCard.vue'
import { ref, computed, onBeforeMount, watch } from 'vue'
import { useRouter } from 'vue-router'

onBeforeMount(async () => {
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
 * pageTransition
 */
const router = useRouter()

function backExhibitList(): void {
  router.push('/stock')
}

/**
 * 商品項目_取得
 */
interface ProductItems {
  work_data: Array<{ work_id: number; work_name: string }>
  character_data: Array<{ character_id: number; character_name: string; work_id: number }>
  storage_space_data: Array<{ storage_space_id: number; storage_space_name: string }>
  category_data: Array<{ category_id: number; category_name: string }>
  platform_data: Array<{
    exhibitor_platform_id: number
    exhibitor_platform_name: string
    money_currency_id: number
  }>
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
 * upload images modal
 */
const uploadModalRef = ref<InstanceType<typeof UploadModal> | null>(null)
const uploadedImages = ref<string[]>([])

function openUploadModal(): void {
  if (uploadModalRef.value) {
    uploadModalRef.value.showModal()
  }
}

function handleFilesUploaded(files: File[]) {
  uploadedImages.value = files.map((file) => URL.createObjectURL(file))
  photos.value = files
}

/**
 * exhibit modal
 */
const exhibitModalRef = ref<InstanceType<typeof ExhibitModal> | null>(null)

function openExhibitModal(): void {
  if (exhibitModalRef.value) {
    exhibitModalRef.value.showModal()
  }
}

const exhibits = ref<
  {
    exhibitName: string
    minPrice: number
    currentPrice: number
    exhibitQuantity: number
    platform: number
    currency: number
  }[]
>([])

function addExhibit(exhibitData: {
  exhibitName: string
  minPrice: number
  currentPrice: number
  exhibitQuantity: number
  platform: number
  currency: number
}) {
  console.log(exhibitData)
  exhibits.value.push({
    exhibitName: exhibitData.exhibitName,
    minPrice: exhibitData.minPrice,
    currentPrice: exhibitData.currentPrice,
    exhibitQuantity: exhibitData.exhibitQuantity,
    platform: exhibitData.platform,
    currency: exhibitData.currency,
  })

  console.log('exhibits.value', exhibits.value)
}

function handleShow() {
  console.log('Upload modal is shown')
}

function handleHide() {
  console.log('Upload modal is hidden')
}

/**
 * validation
 */
const productNameError = ref('')
const productCodeError = ref('')
const priceError = ref('')
const descriptionError = ref('')
const quantityInStockError = ref('')
const productUrlError = ref('')
const workIdError = ref('')
const characterIdError = ref('')
const categoryIdError = ref('')
const storageSpaceIdError = ref('')
const uploadedImagesError = ref('')

const scheme = yup.object({
  productName: yup
    .string()
    .max(256, 'Enter no more than 256 characters.')
    .required('Product Name is required.'),
  productCode: yup.string().max(64, 'Enter no more than 64 characters.'), // 修正：256文字の代わりに64文字制限
  price: yup.number().typeError('Product Price must be a number.').required('Price is required.'),
  description: yup.string().max(1000, 'Enter no more than 1000 characters.'),
  quantityInStock: yup
    .number()
    .typeError('Quantity in stock must be a number.')
    .max(300, 'Enter no more than 300.')
    .required('Quantity in stock is required.'),
  productUrl: yup.string().url('Specify the URL in the correct format.'),
  workId: yup.number().required('Work is a required selection.'),
  characterId: yup.number().required('Character is a required selection.'),
  categoryId: yup.number().required('Category is a required selection.'),
  storageSpaceId: yup.number().required('Storage Space is a required selection.'),
  uploadedImages: yup.array().min(1, 'At least one image is required.'),
})

async function onSubmitValidate(): Promise<boolean> {
  // Reset error message
  productNameError.value = ''
  productCodeError.value = ''
  priceError.value = ''
  descriptionError.value = ''
  quantityInStockError.value = ''
  productUrlError.value = ''
  workIdError.value = ''
  characterIdError.value = ''
  categoryIdError.value = ''
  storageSpaceIdError.value = ''
  uploadedImagesError.value = ''

  try {
    // Validate input values
    await scheme.validate(
      {
        productName: productName.value,
        productCode: productCode.value,
        price: price.value,
        description: description.value,
        quantityInStock: quantityInStock.value,
        productUrl: productUrl.value,
        workId: workId.value,
        characterId: characterId.value,
        categoryId: categoryId.value,
        storageSpaceId: storageSpaceId.value,
        uploadedImages: uploadedImages.value,
      },
      { abortEarly: false }
    )

    return true // バリデーション成功
  } catch (err) {
    // Check if error is an instance of Yup.ValidationError
    if (err instanceof yup.ValidationError) {
      // Set error messages for each field
      err.inner.forEach((validationError) => {
        switch (validationError.path) {
          case 'productName':
            productNameError.value = validationError.message
            break
          case 'productCode':
            productCodeError.value = validationError.message
            break
          case 'price':
            priceError.value = validationError.message
            break
          case 'description':
            descriptionError.value = validationError.message
            break
          case 'quantityInStock':
            quantityInStockError.value = validationError.message
            break
          case 'productUrl':
            productUrlError.value = validationError.message
            break
          case 'workId':
            workIdError.value = validationError.message
            break
          case 'characterId':
            characterIdError.value = validationError.message
            break
          case 'categoryId':
            categoryIdError.value = validationError.message
            break
          case 'storageSpaceId':
            storageSpaceIdError.value = validationError.message
            break
          case 'uploadedImages':
            uploadedImagesError.value = validationError.message
            break
          default:
            console.error('Unexpected validation path:', validationError.path)
        }
      })
    } else {
      console.error('Unexpected error:', err)
    }
    return false // バリデーション失敗
  }
}

/**
 * 画像をS3にアップロード
 */
async function uploadImageToS3(file: File) {
  try {
    const formData = new FormData()
    formData.append('photo', file)
    console.log('image_response', formData)

    const response = await axios.post('http://localhost:5000/api/upload-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (response.data && response.data.s3Url) {
      return response.data.s3Url
    } else {
      throw new Error('S3 URLが返されませんでした')
    }
  } catch (error) {
    console.error('画像のアップロードに失敗しました:', error)
    throw error
  }
}

// async function testUploadImageToS3() {
//   try {
//     // photosにファイルが含まれているか確認
//     if (photos.value.length === 0) {
//       alert('アップロードする画像を選択してください。');
//       return;
//     }

//     // 1枚目の画像をS3にアップロード
//     const s3Url = await uploadImageToS3(photos.value[0]);

//     if (s3Url) {
//       console.log('画像がS3にアップロードされました:', s3Url);
//       alert(`画像がアップロードされました: ${s3Url}`);
//     } else {
//       alert('画像のアップロードに失敗しました。');
//     }
//   } catch (error) {
//     console.error('画像のアップロード中にエラーが発生しました:', error);
//     alert('画像のアップロードに失敗しました。');
//   }
// }

async function setProducts(): Promise<void> {
  try {
    const isValid: boolean = await onSubmitValidate()
    if (!isValid) {
      // バリデーションエラーがある場合は、処理を終了する
      console.log('Validation failed.')
      return
    }

    // まず、全ての画像をS3にアップロード
    const uploadedImageUrls = []
    for (const photo of photos.value) {
      const s3Url = await uploadImageToS3(photo) // S3にアップロード
      uploadedImageUrls.push(s3Url) // アップロードされたURLを格納
    }

    // S3アップロードが完了したら、productSubmitを呼び出す
    await productSubmit();

    alert('商品の登録が完了しました！')
    backExhibitList()
  } catch (error) {
    console.error('商品の登録に失敗しました:', error)
    alert('商品の登録に失敗しました。')
  }
}

/**
 *  商品登録APIの定義
 */
const productName = ref('')
const productCode = ref('')
const price = ref(0)
const description = ref('')
const quantityInStock = ref(0)
const productUrl = ref('')
const workId = ref(null)
const characterId = ref(null)
const categoryId = ref(null)
const storageSpaceId = ref(null)
const photos = ref<File[]>([])

async function productSubmit() {
  try {
    // 全ての画像をS3にアップロード
    const uploadedImageUrls = []
    for (const photo of photos.value) {
      const s3Url = await uploadImageToS3(photo)
      uploadedImageUrls.push(s3Url)
    }

    // JSON形式でリクエストデータを構築
    const requestData = {
      product_name: productName.value,
      product_code: productCode.value,
      price: price.value.toString(),
      description: description.value,
      quantity_in_stock: quantityInStock.value.toString(),
      product_url: productUrl.value,
      work_id: workId.value,
      character_id: characterId.value,
      category_id: categoryId.value,
      storage_space_id: storageSpaceId.value,
      product_tags: tags.value, // 配列に変換
      photo_urls: uploadedImageUrls, // S3から取得したURLを配列に追加
      exhibit_info: exhibits.value.map((exhibit) => ({
        exhibitor_platform_id: exhibit.platform,
        money_currency_id: exhibit.currency,
        exhibit_display_name: exhibit.exhibitName,
        min_price: exhibit.minPrice.toString(),
        current_exhibit_price: exhibit.currentPrice.toString(),
        exhibit_quantity_in_stock: exhibit.exhibitQuantity.toString(),
      })),
    }

    // JSON形式でリクエストを送信
    const response = await axios.post('http://localhost:5000/api/products', requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('API response:', response)
    alert('商品の登録が完了しました！')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response?.data)
      alert(`商品の登録に失敗しました。エラー: ${error.response?.data?.message || '詳細不明'}`)
    } else {
      console.error('Error submitting form:', error)
      alert('商品の登録に失敗しました。')
    }
  }
}

const filteredCharacters = computed(() => {
  if (productItemsArray.value) {
    return productItemsArray.value.character_data.filter(
      (character) => character.work_id === workId.value
    )
  }

  return []
})

// watchを使ってcharacterIdをリセット
watch(workId, () => {
  characterId.value = null
})
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
    </div>
    <div class="card component-card">
      <div class="card-text">Create</div>
      <div class="card-body">
        <form>
          <span class="error-message" style="text-align: center">{{ uploadedImagesError }}</span>
          <div class="image-collage">
            <div class="image-container" @click="openUploadModal">
              <div class="upload-placeholder">
                <img
                  src="../assets/icons/add_circle.svg"
                  alt="add_circle"
                  class="material-symbols-outlined"
                />
                <p>Upload Image</p>
              </div>
            </div>
            <div class="image-collage">
              <div v-for="(image, index) in uploadedImages" :key="index" class="image-container">
                <img :src="image" alt="uploaded image" class="up-img" />
              </div>
            </div>
            <div class="image-container">
              <div class="upload-placeholder">
                <img
                  src="../assets/icons/emoji_nature.svg"
                  alt="emoji_nature"
                  class="material-symbols-outlined"
                />
              </div>
            </div>
            <div class="image-container">
              <div class="upload-placeholder">
                <img
                  src="../assets/icons/emoji_nature.svg"
                  alt="emoji_nature"
                  class="material-symbols-outlined"
                />
              </div>
            </div>
            <div class="image-container">
              <div class="upload-placeholder">
                <img
                  src="../assets/icons/emoji_nature.svg"
                  alt="emoji_nature"
                  class="material-symbols-outlined"
                />
              </div>
            </div>
            <div class="image-container">
              <div class="upload-placeholder">
                <img
                  src="../assets/icons/emoji_nature.svg"
                  alt="emoji_nature"
                  class="material-symbols-outlined"
                />
              </div>
            </div>
          </div>
          <span class="error-message">{{ productNameError }}</span>
          <div class="mb-3">
            <label for="inputItemName" class="form-label"
              >Product Name<span class="asterisk">*</span></label
            >
            <input
              id="inputItemName"
              v-model="productName"
              type="text"
              class="form-control"
              aria-describedby="emailHelp"
              :class="{ 'is-invalid': productNameError }"
            />
          </div>
          <span class="error-message">{{ productCodeError }}</span>
          <div class="mb-3">
            <label for="inputDisplayName" class="form-label">Product Code</label>
            <input
              id="inputDisplayName"
              v-model="productCode"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': productCodeError }"
            />
          </div>
          <span class="error-message">{{ priceError }}</span>
          <div class="mb-3">
            <label for="inputQuantityStock" class="form-label wid-175"
              >List Price<span class="asterisk">*</span></label
            >
            <input
              id="inputQuantityStock"
              v-model="price"
              type="number"
              class="form-control form-30"
              min="0"
              step="10"
              :class="{ 'is-invalid': priceError }"
            />
          </div>
          <span class="error-message">{{ descriptionError }}</span>
          <div class="mb-3">
            <label for="inputItemDesciption" class="form-label">Description</label>
            <textarea
              id="inputItemDesciption"
              v-model="description"
              class="form-control"
              rows="3"
              :class="{ 'is-invalid': descriptionError }"
            ></textarea>
          </div>
          <span class="error-message">{{ quantityInStockError }}</span>
          <div class="mb-3">
            <label for="inputQuantityStock" class="form-label wid-175"
              >Quantity in stock<span class="asterisk">*</span></label
            >
            <input
              id="inputQuantityStock"
              v-model="quantityInStock"
              type="number"
              class="form-control form-30"
              min="0"
              step="1"
              :class="{ 'is-invalid': quantityInStockError }"
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
            />
            <vue3-tags-input
              v-model:tags="tags"
              placeholder="タグを入力して下さい"
              class="custom-tags-input form-control"
              @on-tags-changed="onTagsChanged"
            />
          </div>
          <span class="error-message">{{ productUrlError }}</span>
          <div class="mb-3">
            <label for="inputItemName" class="form-label">Product URL</label>
            <input
              id="inputItemName"
              v-model="productUrl"
              type="text"
              class="form-control"
              aria-describedby="emailHelp"
              :class="{ 'is-invalid': productUrlError }"
            />
          </div>
          <span class="error-message">{{ workIdError }}</span>
          <div class="mb-3">
            <label for="inputQuantityStock" class="form-label wid-175"
              >Work<span class="asterisk">*</span></label
            >
            <select
              id="workSelect"
              v-model="workId"
              class="form-control form-30"
              :class="{ 'is-invalid': workIdError }"
            >
              <option
                v-for="work in productItemsArray?.work_data || []"
                :key="work.work_id"
                :value="work.work_id"
              >
                {{ work.work_name }}
              </option>
            </select>
          </div>
          <span class="error-message">{{ characterIdError }}</span>
          <div class="mb-3">
            <label for="workSelect" class="form-label wid-175"
              >Character<span class="asterisk">*</span></label
            >
            <select
              id="characterSelect"
              v-model="characterId"
              class="form-control form-30"
              :class="{ 'is-invalid': characterIdError }"
            >
              <option
                v-for="character in filteredCharacters"
                :key="character.character_id"
                :value="character.character_id"
              >
                {{ character.character_name }}
              </option>
            </select>
          </div>
          <span class="error-message">{{ categoryIdError }}</span>
          <div class="mb-3">
            <label for="inputQuantityStock" class="form-label wid-175"
              >Category<span class="asterisk">*</span></label
            >
            <select
              id="categorySelect"
              v-model="categoryId"
              class="form-control form-30"
              :class="{ 'is-invalid': categoryIdError }"
            >
              <option
                v-for="category in productItemsArray?.category_data || []"
                :key="category.category_id"
                :value="category.category_id"
              >
                {{ category.category_name }}
              </option>
            </select>
          </div>
          <span class="error-message">{{ storageSpaceIdError }}</span>
          <div class="mb-3">
            <label for="inputQuantityStock" class="form-label wid-175"
              >Storage Space<span class="asterisk">*</span></label
            >
            <select
              id="storageSpaceSelect"
              v-model="storageSpaceId"
              class="form-control form-30"
              :class="{ 'is-invalid': storageSpaceIdError }"
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
            <div v-for="(exhibit, index) in exhibits" :key="index" class="mb-3">
              <ExhibitCard
                :title="exhibit.exhibitName"
                :min-price="exhibit.minPrice"
                :current-price="exhibit.currentPrice"
                :exhibit-quantity="exhibit.exhibitQuantity"
                :platform="exhibit.platform"
                :curency="exhibit.currency"
              />
            </div>
          </div>
          <div class="btn-set">
            <button
              type="submit"
              class="btn btn-primary exhibit-btn"
              style="margin-right: 5%; width: auto"
              @click.prevent="openExhibitModal()"
            >
              Add Exhibit Detail
            </button>
            <button type="submit" class="btn btn-primary submit-btn" @click.prevent="setProducts">
              Submit
            </button>
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
      @show="handleShow"
      @hide="handleHide"
      @add-exhibit="addExhibit"
    />
  </div>
</template>

<style scoped>
.up-img {
  width: 200px;
  border: 2px solid #869ac966;
  border-radius: 10px;
}

/* test用 */
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
