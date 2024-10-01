<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Propsの定義
const props = defineProps<{
  title?: string;
  minPrice?: number;
  currentPrice?: number;
  exhibitQuantity?: number;
  platform?: number;
  curency?: number;
}>();

// emit関数を定義
const emit = defineEmits<{
  (e: 'editExhibit', payload: { title?: string; minPrice?: number; currentPrice?: number; exhibitQuantity?: number; platform?: number; curency?: number }): void;
}>();

// モーダルを開く処理
const openEditModal = () => {
  emit('editExhibit', {
    title: props.title,
    minPrice: props.minPrice,
    currentPrice: props.currentPrice,
    exhibitQuantity: props.exhibitQuantity,
    platform: props.platform,
    curency: props.curency,
  });
};
</script>

<template>
  <div class="card-item component-card-item" @click="openEditModal">
    <div class="card-item-body">
      <div>
        <!-- プラットフォームのアイコン表示 -->
        <div v-if="platform === 1" class="card-top-icons">
          <a class="dropdown-item">
            <img src="../../assets/merukari.png" alt="Flea Market Icon" class="flea-market-icon"/>
          </a>
        </div>
        <div v-else-if="platform === 2" class="card-top-icons">
          <a class="dropdown-item">
            <img src="../../assets/ebay.png" alt="Flea Market Icon" class="flea-market-icon"/>
          </a>
        </div>
        <div v-else-if="platform === 4" class="card-top-icons">
          <a class="dropdown-item">
            <img src="../../assets/rakuten.png" alt="Flea Market Icon" class="flea-market-icon"/>
          </a>
        </div>
        <div v-else-if="platform === 5" class="card-top-icons">
          <a class="dropdown-item">
            <img src="../../assets/rakuma.png" alt="Flea Market Icon" class="flea-market-icon"/>
          </a>
        </div>
        <div v-else-if="platform === 6" class="card-top-icons">
          <a class="dropdown-item">
            <img src="../../assets/yahuoku.png" alt="Flea Market Icon" class="flea-market-icon"/>
          </a>
        </div>
        <div v-else class="card-top-icons">
          <a style="height: 24px;" class="dropdown-item">
            <img src="../../assets/icons/favorite.svg" alt="heart"/>
          </a>
        </div>
      </div>
      <!-- カードの情報表示 -->
      <div style="text-align: center!important" class="exhibit-card-text card-item-text">{{ title }}</div>
      <div class="exhibit-card-text card-item-text">Min Price: {{ minPrice }}</div>
      <div class="exhibit-card-text card-item-text">Current Exhibit Price: {{ currentPrice }}</div>
      <div class="exhibit-card-text card-item-text">Number of Exhibits: {{ exhibitQuantity }}</div>
    </div>
  </div>
</template>

<style scoped>
.exhibit-card-text {
  color: #7D798D;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  text-align: left;
}

.card-item {
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.card-item-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-item-text {
  font-size: 14px;
  line-height: 1.5;
}
</style>
