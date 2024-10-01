<script setup lang="ts">
import { ref } from 'vue';

// const transactions = ref([
//   { id: '1', name: 'Item A', status: 'Packing', destination: 'USA', platform: 'Mercari' },
//   // add more items
// ]);
// const fields = ['id', 'name', 'status', 'destination', 'platform'];

/**
 * map button
 */
const messageActive = ref(true);

function msgTabSwitch():void {
  messageActive.value = !messageActive.value;
}

console.log("messageActive", messageActive.value);

</script>

<template>
  <div class="flex">
    <div>
      <div class="msg-ctn" v-if="messageActive">
        <div class="flex">
          <button class="btn btn-pink disabled" @click="msgTabSwitch">message</button>
          <button class="btn disabled-btn do-btn" @click="msgTabSwitch">TODO</button>
        </div> 
        <div class="map-container" v-if="messageActive">
          <img src="../assets/world.png" alt="World Image" class="world-img"/>
        </div>
      </div>
      <div class="msg-ctn" v-else>
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
                    <td><span class="material-symbols-outlined btn-detail">arrow_circle_right</span></td>
                  </tr>
                  <tr>
                    <th scope="row">17370540</th>
                    <td>Pixel Pro Premium Bootstrap UI Kit</td>
                    <td>jacob.monroe@company.com</td>
                    <td>$153.11</td>
                    <td>Aug 28 2020</td>
                    <td><span class="material-symbols-outlined btn-detail">arrow_circle_right</span></td>
                  </tr>
                  <tr>
                    <th scope="row">17371705</th>
                    <td>Volt Premium Bootstrap 5 Dashboard</td>
                    <td>johndoe@gmail.com</td>
                    <td>€61.11</td>
                    <td>Aug 31 2020</td>
                    <td><span class="material-symbols-outlined btn-detail">arrow_circle_right</span></td>
                  </tr>
                  <tr>
                    <th scope="row">17370540</th>
                    <td>Pixel Pro Premium Bootstrap UI Kit</td>
                    <td>jacob.monroe@company.com</td>
                    <td>$153.11</td>
                    <td>Aug 28 2020</td>
                    <td><span class="material-symbols-outlined btn-detail">arrow_circle_right</span></td>
                  </tr>
                  <tr>
                    <th scope="row">17371705</th>
                    <td>Volt Premium Bootstrap 5 Dashboard</td>
                    <td>johndoe@gmail.com</td>
                    <td>€61.11</td>
                    <td>Aug 31 2020</td>
                    <td><span class="material-symbols-outlined btn-detail">arrow_circle_right</span></td>
                  </tr>
                  <tr>
                    <th scope="row">17370540</th>
                    <td>Pixel Pro Premium Bootstrap UI Kit</td>
                    <td>jacob.monroe@company.com</td>
                    <td>$153.11</td>
                    <td>Aug 28 2020</td>
                    <td><span class="material-symbols-outlined btn-detail">arrow_circle_right</span></td>
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
  background-color: #ECB1C4 !important;
  height: 45px;
  border: #ECB1C4;
  color: #FAFCFD !important;
}

.btn-pink:hover {
  background-color: #EDA3B8;
  border: #EDA3B8;
  color: #FAFCFD;
}

.disabled-btn, .disabled-btn:hover, .disabled-btn:active, .disabled-btn:focus {
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
  box-shadow: 0 4px 12px #A0A3B4;
  position: relative;
}

.card-text {
  background-color: #FAF3F6;
  border-radius: 10px 10px 0 0;
  border-bottom: #B2B8C6;
  color:	#bf8f9f;
  font-weight: bold;
  font-size: 25px;
  text-align: left;
  padding: 20px 15px 15px 20px;
}

.component-card {
  border-radius: 10px;
  color: #D06179;
  border: #B2B8C6;
}

.bi-heart.active {
  color: #E83E8C;
}

.btn-detail {
  color: #f78aa9;
}

.btn-detail:hover, .btn-detail:active, .btn-detail:focus {
  color: #f777a0;
}
</style>