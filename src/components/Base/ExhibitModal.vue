<script setup lang="ts">
import { ref, onMounted, defineEmits, defineExpose, onBeforeMount } from 'vue';
import * as bootstrap from 'bootstrap';
import axios from 'axios';

const exhibitName = ref('');
const minPrice = ref(0);
const currentPrice = ref(0);
const exhibitQuantity = ref(1);
const platform = ref<number | null>(null);
const currency = ref<number | null>(null);

const exhibitModal = ref<HTMLDivElement | null>(null);
const emits = defineEmits(['show', 'hide', 'addExhibit']);
let modal: bootstrap.Modal | null = null;

onMounted(() => {
  if (exhibitModal.value) {
    modal = new bootstrap.Modal(exhibitModal.value);
  }
});

onBeforeMount(async () => {
  await getProductItems();
});

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  }
})

/**
 * 商品項目_取得
 */
interface ProductItems {
  platform_data: Array<{ exhibitor_platform_id: number; exhibitor_platform_name: string; money_currency_id: number }>;
  currency_data: Array<{ money_currency_id: number; currency_code: string }>;
}

const productItemsArray = ref<ProductItems | null>(null);

async function getProductItems(): Promise<void> {
  try {
    const response = await axios.get('http://localhost:5000/api/product-items');
    productItemsArray.value = response.data;
  } catch (error) {
    console.error('商品項目の取得に失敗しました:', error);
    throw error;
  }
}

function addExhibit(): void {
  emits('addExhibit', {
    exhibitName: exhibitName.value,
    currency: currency.value,
    minPrice: minPrice.value,
    currentPrice: currentPrice.value,
    exhibitQuantity: exhibitQuantity.value,
    platform: platform.value
  });

  clearInputs();
  hideModal();
}

// 新たに追加: モーダルにデータを設定するためのメソッド
function setData(data: any) {
  exhibitName.value = data?.exhibitName || data?.exhibit_display_name || '';
  minPrice.value = data?.minPrice || data?.min_price || 0;
  currentPrice.value = data?.currentPrice || data?.current_exhibit_price || 0;
  exhibitQuantity.value = data?.exhibitQuantity || data?.exhibit_quantity_in_stock || 1;
  platform.value = data?.platform || data?.exhibitor_platform_id || null;
  currency.value = data?.currency || data?.money_currency_id || null;
}


function clearInputs() {
  exhibitName.value = '';
  minPrice.value = 0;
  currentPrice.value = 0;
  exhibitQuantity.value = 1;
  platform.value = null;
  currency.value = null;
}

function showModal() {
  emits('show');
  if (modal) {
    modal.show();
  }
}

function hideModal(): void {
  emits('hide');
  if (modal) {
    modal.hide();
  }
}

defineExpose({
  showModal,
  hideModal,
  setData, // 親コンポーネントからアクセスできるようにsetDataを追加
});
</script>

<template>
  <div>
    <div class="modal fade" ref="exhibitModal" tabindex="-1" aria-labelledby="exhibitModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exhibitModalLabel">Exhibit Info</h5>
            <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="inputQuantityStock" class="form-label wid-175">Exhibit Platform</label>
                <select v-model="platform" class="form-control" id="platformSelect" :disabled="disabled">
                  <option v-for="platformItem in productItemsArray?.platform_data" 
                          :value="platformItem.exhibitor_platform_id" 
                          :key="platformItem.exhibitor_platform_id">
                    {{ platformItem.exhibitor_platform_name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="exhibitName" class="form-label">Display Name</label>
                <textarea v-model="exhibitName" rows="3" class="form-control" id="exhibitName" :disabled="disabled" placeholder="Enter exhibit name"></textarea>
              </div>
              <div class="mb-3">
                <label for="currency" class="form-label">Currency</label>
                <select v-model="currency" class="form-control" id="currencySelect" :disabled="disabled">
                  <option v-for="currencyItem in productItemsArray?.currency_data" 
                          :value="currencyItem.money_currency_id" 
                          :key="currencyItem.money_currency_id">
                    {{ currencyItem.currency_code }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="minPrice" class="form-label">Min Price</label>
                <input v-model="minPrice" type="number" class="form-control" id="minPrice" :disabled="disabled" placeholder="Enter min price" min="0" />
              </div>
              <div class="mb-3">
                <label for="currentPrice" class="form-label">Current Exhibit Price</label>
                <input v-model="currentPrice" type="number" class="form-control" id="currentPrice" :disabled="disabled" placeholder="Enter current exhibit price" min="0" />
              </div>
              <div class="mb-3">
                <label for="exhibitQuantity" class="form-label">Number of Exhibits</label>
                <input v-model="exhibitQuantity" type="number" class="form-control" id="exhibitQuantity" :disabled="disabled" placeholder="Enter exhibit quantity" min="1" />
              </div>
            </form>
          </div>
          <div class="modal-footer" v-if="!disabled">
            <button type="button" class="btn btn-secondary cancel-btn" @click="hideModal">Cancel</button>
            <button type="button" class="btn btn-secondary add-btn" @click="addExhibit">Add Exhibit Info</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-control:disabled {
  background-color: #f7eff38a;
}

.cancel-btn {
  background-color: #8dacc9b5;
  border: #8dacc9b5;
  height: 20%;
  width: 20%;
  margin-right: 5%;
  padding: 10px;
}

.cancel-btn:hover, .cancel-btn:active, .cancel-btn:focus {
  background-color: #95a9bcb5;
  border: #95a9bcb5;
}

.add-btn {
  background-color: #e19bc4b5;
  border: #e19bc4b5;
  height: 20%;
  width: 35%;
  padding: 10px;
}

.add-btn:hover, .cancel-btn:active, .cancel-btn:focus {
  background-color: #df87bab5;
  border: #df87bab5;
}
</style>