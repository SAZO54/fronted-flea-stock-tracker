<script setup lang="ts">
import { ref } from 'vue'

// const transactions = ref([
//   { id: '1', name: 'Item A', status: 'Packing', destination: 'USA', platform: 'Mercari' },
//   // add more items
// ]);
// const fields = ['id', 'name', 'status', 'destination', 'platform'];

/**
 * map button
 */
const messageActive = ref(true)

function msgTabSwitch(): void {
  messageActive.value = !messageActive.value
}

console.log('messageActive', messageActive.value)
</script>

<template>
  <div class="flex">
    <div>
      <div v-if="messageActive" class="msg-ctn">
        <div class="flex">
          <button class="btn btn-pink disabled" @click="msgTabSwitch">message</button>
          <button class="btn disabled-btn do-btn" @click="msgTabSwitch">TODO</button>
        </div>
        <div v-if="messageActive" class="map-container">
          <img src="../assets/world.png" alt="World Image" class="world-img" />
        </div>
      </div>
      <div v-else class="msg-ctn">
        <div class="flex">
          <button class="btn disabled-btn" @click="msgTabSwitch">message</button>
          <button class="btn btn-pink do-btn disabled" @click="msgTabSwitch">TODO</button>
        </div>
        <div class="card component-card">
          <div class="card-text">Task</div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">TransactionID</th>
                    <th scope="col">Category</th>
                    <th scope="col">Status</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">17371705</th>
                    <td>Volt Premium Bootstrap 5 Dashboard</td>
                    <td>johndoe@gmail.com</td>
                    <td>€61.11</td>
                    <td>Aug 31 2020</td>
                    <td>
                      <span class="material-symbols-outlined btn-detail">arrow_circle_right</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">17370540</th>
                    <td>Pixel Pro Premium Bootstrap UI Kit</td>
                    <td>jacob.monroe@company.com</td>
                    <td>$153.11</td>
                    <td>Aug 28 2020</td>
                    <td>
                      <span class="material-symbols-outlined btn-detail">arrow_circle_right</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">17371705</th>
                    <td>Volt Premium Bootstrap 5 Dashboard</td>
                    <td>johndoe@gmail.com</td>
                    <td>€61.11</td>
                    <td>Aug 31 2020</td>
                    <td>
                      <span class="material-symbols-outlined btn-detail">arrow_circle_right</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">17370540</th>
                    <td>Pixel Pro Premium Bootstrap UI Kit</td>
                    <td>jacob.monroe@company.com</td>
                    <td>$153.11</td>
                    <td>Aug 28 2020</td>
                    <td>
                      <span class="material-symbols-outlined btn-detail">arrow_circle_right</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">17371705</th>
                    <td>Volt Premium Bootstrap 5 Dashboard</td>
                    <td>johndoe@gmail.com</td>
                    <td>€61.11</td>
                    <td>Aug 31 2020</td>
                    <td>
                      <span class="material-symbols-outlined btn-detail">arrow_circle_right</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">17370540</th>
                    <td>Pixel Pro Premium Bootstrap UI Kit</td>
                    <td>jacob.monroe@company.com</td>
                    <td>$153.11</td>
                    <td>Aug 28 2020</td>
                    <td>
                      <span class="material-symbols-outlined btn-detail">arrow_circle_right</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.msg-ctn {
  margin: 50px 40px;
}

.flex {
  display: flex;
}

.btn {
  width: 100px;
  border-radius: 3px;
  font-size: 19px;
}

.btn-pink {
  background-color: #ecb1c4 !important;
  height: 45px;
  border: #ecb1c4;
  color: #fafcfd !important;
}

.btn-pink:hover {
  background-color: #eda3b8;
  border: #eda3b8;
  color: #fafcfd;
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

.do-btn {
  margin-left: 5px;
}

.map-container {
  background-color: #fff1fc7a;
  width: 900px;
  height: 674px;
  margin-top: 20px;
}

.world-img {
  width: 100%;
  height: 90%;
  object-fit: cover;
}

.card {
  width: 1523px;
  height: 664px;
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
</style>
