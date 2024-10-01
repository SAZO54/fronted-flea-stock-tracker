<script setup lang="ts">
import CardItem from './Base/CardItem.vue';
import SellerTable from './Base/SellerTable.vue';
import StockStatus from './Base/StockStatus.vue';
import { useRouter } from 'vue-router';

/**
 * pageTransition
 */
const router = useRouter();

function analysisTransition() {
  router.push('/analysis');
}

</script>

<template>
  <div>
    <div style="display: flex;">
      <StockStatus />
      <div>
        <SellerTable cardTitle="Average Sales" :sellerAnalysis="analysisTransition"/>
        <SellerTable cardTitle="Trade Trends" class="exhibit-item" :sellerAnalysis="analysisTransition"/>
      </div>
    </div>
    <div class="card-all">
      <CardItem title="Total Items (総出品数)" cardTransition="/exhibit-details" />
      <CardItem title="Transacted (取引済み)" cardTransition="/exhibit-details" />
      <CardItem title="Dealing (取引中)" cardTransition="/exhibit-details" />
      <CardItem title="Earnings (売上金額)" cardTransition="/money" />
      <CardItem title="Favarite (お気に入り数)" cardTransition="/exhibit-details" />
      <CardItem title="Expense (経費)" cardTransition="/money" />
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