<script setup lang="ts">
import { ref, onMounted, defineEmits, defineExpose, onBeforeMount } from 'vue';
import * as bootstrap from 'bootstrap';
import axios from 'axios';
import * as yup from 'yup';

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
 * validation
 */
const exhibitNameError = ref('');
const minPriceError = ref('');
const currentPriceError = ref('');
const exhibitQuantityError = ref('');
const platformError = ref('');
const currencyError = ref('');

const scheme = yup.object({
  exhibitName: yup.string().max(256, 'Enter no more than 256 characters.').required('Display Name is required.'),
  minPrice: yup.number().typeError('Min Price is a required selection.'),
  currentPrice: yup.number().typeError('Current Exhibit Price is a required selection.'),
  exhibitQuantity: yup.number().typeError('Exhibit Quantity in stock must be a number.').max(100, 'Enter no more than 100.').required('Exhibit Quantity in stock is required.'),
  platform: yup.number().required('Storage Space is a required selection.'),
  currency: yup.number().typeError('Currency is a required selection.'),
});

async function onSubmitValidate(): Promise<boolean> {
  // Reset error message
  exhibitNameError.value = '';
  minPriceError.value = '';
  currentPriceError.value = '';
  exhibitQuantityError.value = '';
  platformError.value = '';
  currencyError.value = '';

  try {
    // Validate input values
    await scheme.validate({
      exhibitName: exhibitName.value,
      minPrice: minPrice.value,
      currentPrice: currentPrice.value,
      exhibitQuantity: exhibitQuantity.value,
      platform: platform.value,
      currency: currency.value,
    }, { abortEarly: false });

    return true; // バリデーション成功
  } catch (err) {
    // Check if error is an instance of Yup.ValidationError
    if (err instanceof yup.ValidationError) {
      // Set error messages for each field
      err.inner.forEach((validationError) => {
        switch (validationError.path) {
          case 'exhibitName':
            exhibitNameError.value = validationError.message;
            break;
          case 'minPrice':
            minPriceError.value = validationError.message;
            break;
          case 'currentPrice':
            currentPriceError.value = validationError.message;
            break;
          case 'exhibitQuantity':
            exhibitQuantityError.value = validationError.message;
            break;
          case 'platform':
            platformError.value = validationError.message;
            break;
          case 'currency':
            currencyError.value = validationError.message;
            break;
          default:
            console.error('Unexpected validation path:', validationError.path);
        }
      });
    } else {
      console.error('Unexpected error:', err);
    }
    return false; // バリデーション失敗
  }
}

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

async function addExhibit(): Promise<void> {
  const isValid: boolean = await onSubmitValidate();
    if (!isValid) {
      // バリデーションエラーがある場合は、処理を終了する
      console.log('Validation failed.');
      return;
    }

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
                <label for="inputQuantityStock" class="form-label wid-175">Exhibit Platform<span class="asterisk">*</span></label>
                <select v-model="platform" class="form-control" id="platformSelect" :disabled="disabled" :class="{ 'is-invalid': platformError }">
                  <option v-for="platformItem in productItemsArray?.platform_data" 
                          :value="platformItem.exhibitor_platform_id" 
                          :key="platformItem.exhibitor_platform_id">
                    {{ platformItem.exhibitor_platform_name }}
                  </option>
                </select>
              </div>
              <span class="error-message-modal">{{ platformError }}</span>
              <div class="mb-3">
                <label for="exhibitName" class="form-label">Display Name<span class="asterisk">*</span></label>
                <textarea v-model="exhibitName" rows="3" class="form-control" id="exhibitName" :disabled="disabled" placeholder="Enter exhibit name" :class="{ 'is-invalid': exhibitNameError }"></textarea>
              </div>
              <span class="error-message-modal">{{ exhibitNameError }}</span>
              <div class="mb-3">
                <label for="currency" class="form-label">Currency</label>
                <select v-model="currency" class="form-control" id="currencySelect" :disabled="disabled" :class="{ 'is-invalid': currencyError }">
                  <option v-for="currencyItem in productItemsArray?.currency_data" 
                          :value="currencyItem.money_currency_id" 
                          :key="currencyItem.money_currency_id">
                    {{ currencyItem.currency_code }}
                  </option>
                </select>
              </div>
              <span class="error-message-modal">{{ currencyError }}</span>
              <div class="mb-3">
                <label for="minPrice" class="form-label">Min Price</label>
                <input v-model="minPrice" type="number" class="form-control" id="minPrice" :disabled="disabled" placeholder="Enter min price" min="0" :class="{ 'is-invalid': minPriceError }" />
              </div>
              <span class="error-message-modal">{{ minPriceError }}</span>
              <div class="mb-3">
                <label for="currentPrice" class="form-label">Current Exhibit Price</label>
                <input v-model="currentPrice" type="number" class="form-control" id="currentPrice" :disabled="disabled" placeholder="Enter current exhibit price" min="0" :class="{ 'is-invalid': currentPriceError }" />
              </div>
              <span class="error-message-modal">{{ currentPriceError }}</span>
              <div class="mb-3">
                <label for="exhibitQuantity" class="form-label">Number of Exhibits<span class="asterisk">*</span></label>
                <input v-model="exhibitQuantity" type="number" class="form-control" id="exhibitQuantity" :disabled="disabled" placeholder="Enter exhibit quantity" min="1" :class="{ 'is-invalid': exhibitQuantityError }" />
              </div>
              <span class="error-message-modal">{{ exhibitQuantityError }}</span>
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