<script setup lang="ts">
import CardItem from './Base/CardItem.vue'
import SellerTable from './Base/SellerTable.vue'
import StockStatus from './Base/StockStatus.vue'
import { useRouter } from 'vue-router'

/**
 * pageTransition
 */
const router = useRouter()

function analysisTransition() {
  router.push('/analysis')
}
</script>

<template>
  <div>
    <div style="display: flex">
      <StockStatus />
      <div>
        <SellerTable card-title="Average Sales" :seller-analysis="analysisTransition" />
        <SellerTable
          card-title="Trade Trends"
          class="exhibit-item"
          :seller-analysis="analysisTransition"
        />
      </div>
    </div>
    <div class="card-all">
      <CardItem title="Total Items (総出品数)" card-transition="/exhibit-details" />
      <CardItem title="Transacted (取引済み)" card-transition="/exhibit-details" />
      <CardItem title="Dealing (取引中)" card-transition="/exhibit-details" />
      <CardItem title="Earnings (売上金額)" card-transition="/money" />
      <CardItem title="Favarite (お気に入り数)" card-transition="/exhibit-details" />
      <CardItem title="Expense (経費)" card-transition="/money" />
    </div>
  </div>
</template>

<style scoped>
.exhibit-item {
  margin-top: 30px !important;
}

.card-all {
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 34px;
  display: flex;
}
</style>
