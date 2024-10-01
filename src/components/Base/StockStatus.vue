<script setup lang="ts">
import { useRouter } from 'vue-router';

/**
 * pageTransition
 */
const router = useRouter();

function stockDetailTransition(): void {
  router.push('/stock');
}

</script>

<template>
  <div class="card component-card">
    <div class="card-text">Stock Status</div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table">
          <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Product</th>
                <th scope="col">Customer</th>
                <th scope="col">Total</th>
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
              <td><img src="../../assets/icons/arrow_circle_right.svg" alt="arrow_circle_right" class="btn-detail"/></td>
            </tr>
            <tr>
              <th scope="row">17370540</th>
              <td>Pixel Pro Premium Bootstrap UI Kit</td>
              <td>jacob.monroe@company.com</td>
              <td>$153.11</td>
              <td>Aug 28 2020</td>
              <td><img src="../../assets/icons/arrow_circle_right.svg" alt="arrow_circle_right" class="btn-detail"/></td>
            </tr>
            <tr>
              <th scope="row">17371705</th>
              <td>Volt Premium Bootstrap 5 Dashboard</td>
              <td>johndoe@gmail.com</td>
              <td>€61.11</td>
              <td>Aug 31 2020</td>
              <td><img src="../../assets/icons/arrow_circle_right.svg" alt="arrow_circle_right" class="btn-detail"/></td>
            </tr>
            <tr>
              <th scope="row">17370540</th>
              <td>Pixel Pro Premium Bootstrap UI Kit</td>
              <td>jacob.monroe@company.com</td>
              <td>$153.11</td>
              <td>Aug 28 2020</td>
              <td><img src="../../assets/icons/arrow_circle_right.svg" alt="arrow_circle_right" class="btn-detail"/></td>
            </tr>
            <tr>
              <th scope="row">17371705</th>
              <td>Volt Premium Bootstrap 5 Dashboard</td>
              <td>johndoe@gmail.com</td>
              <td>€61.11</td>
              <td>Aug 31 2020</td>
              <td><img src="../../assets/icons/arrow_circle_right.svg" alt="arrow_circle_right" class="btn-detail"/></td>
            </tr>
            <tr>
              <th scope="row">17370540</th>
              <td>Pixel Pro Premium Bootstrap UI Kit</td>
              <td>jacob.monroe@company.com</td>
              <td>$153.11</td>
              <td>Aug 28 2020</td>
              <td><img src="../../assets/icons/arrow_circle_right.svg" alt="arrow_circle_right" class="btn-detail"/></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card-body">
      <button type="button" class="btn btn-pink" @click="stockDetailTransition">Confirm All Stock</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 1100px;
  height: 550px;
  margin-left: 40px;
  margin-top: 50px;
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

.btn-pink {
  background-color: #ECB1C4;
  border: #ECB1C4;
  color: #FAFCFD;
  width: 91%;
  height: 42px;
  font-size: 18px;
  border-radius: 15px;
  box-shadow: 0 2px 10px #a17584;
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin: 0 20px;
}

.btn-pink:hover, .btn-pink:active, .btn-pink:focus {
  background-color: #EDA3B8;
  border: #EDA3B8;
}

.btn-detail {
  color: #f78aa9;
}

.btn-detail:hover, .btn-detail:active, .btn-detail:focus {
  color: #f777a0;
}
</style>
