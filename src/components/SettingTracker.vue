<script setup lang="ts"></script>

<template>
  <div class="set-container">
    <div class="card-container">
      <div class="card">
        <div class="set-title">Slack</div>
      </div>
    </div>
    <div class="card-container">
      <div class="card">
        <div class="set-title">LINE</div>
      </div>
    </div>
    <div class="card-container" style="margin-bottom: 0 !important">
      <div class="card secu">
        <div class="set-title">Security</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.set-container {
  margin: 31px 40px;
}

.set-title {
  border-bottom: 2px solid #8c8a9945;
  font-size: 20px;
  padding-left: 20px;
  text-align: left;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 31px;
}

.secu {
  height: 315px !important;
}

.card {
  width: 250px;
  height: 200px;
  box-shadow: 2px -1px 12px #ebe2e7;
  position: relative;
  text-align: center;
  border-radius: 10px;
  color: #5c5658;
  border: 2px solid #8c8a9945;
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
  width: 120px;
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
