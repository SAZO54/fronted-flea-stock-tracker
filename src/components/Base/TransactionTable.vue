<template>
  <div class="card component-card">
    <div class="card-text">Exhibit Status</div>
    <div class="card-body">
      <div class="table-wrapper">
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
</template>

<style scoped>
.card {
  width: 600px;
  height: 740px;
  margin-top: 50px;
  box-shadow: 0 4px 12px #A0A3B4;
  position: relative;
}

.card-text {
  background-color: #FAF3F6;
  border-radius: 10px 10px 0 0;
  border-bottom: #B2B8C6;
  color: #bf8f9f;
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

.table-wrapper {
  width: 100%;
  max-height: 635px;
  overflow-x: auto;
  overflow-y: auto;
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
