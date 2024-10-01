<script setup lang="ts">
// import { useRouter } from 'vue-router';

/**
 * pageTransition
 */
// const router = useRouter();

// function hisoryTransition() {
//   router.push('/hisory');
// }

// function settingTransition() {
//   router.push('/setting');
// }

// function messageTransition() {
//   router.push('/message');
// }

// function moneyTransition() {
//   router.push('/money');
// }

// function exhibitDetailTransition() {
//   router.push('/exhibit-details');
// }

// function shipTransition() {
//   router.push('/ship-status');
// }

// function analysisTransition() {
//   router.push('/analysis');
// }
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-white">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img src="../../assets/wolf.png" alt="Logo" width="40" height="40" class="d-inline-block align-top">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <h3 class="ftitle">FleaStock Tracker</h3>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <form class="d-flex" role="search">
          <div class="search-box">
            <img src="../../assets/icons/favorite.svg" alt="favorite" class="search-icon"/>
            <input class="form-control me-2 search" type="search" placeholder="Search" aria-label="Search">
          </div>
          <button class="btn a-botton" type="submit">
            <img src="../../assets/icons/search.svg" alt="search"/>
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.f-gray {
  color: #5F5D6A;
  font-weight: bold;
}

.ftitle {
  color: #D588A0;
  margin-left: 15px;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* SideBarより上に表示されるように z-index を高く設定 */
  box-shadow: 0 4px 6px #F0E7EC;
  background: linear-gradient(to right, #fff, #FAF5F9);
  height: 72px;
  margin-bottom: 0;
}

.nav-item {
  padding-right: 30px;
}

.head-item {
  padding-left: 130px;
}

.f-gray:hover, .f-gray:active, .f-gray:focus {
  color: #D7A0B0;
}

.d-flex {
  margin:0 0 0 auto
}

.search {
  padding-left: 35px;
  border-radius: 20px;
  border: #F6EEF3 solid 2.5px;
  width: 310px;
}

.search-box {
  display: flex;
  align-items: center;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 10px;
  color: #F7C4CC; /* アイコンの色を指定 */
}

.search {
  padding-left: 35px; /* アイコンのスペースを確保 */
}

.search-botton {
  color: #F1BCCE;
  padding: 5px 0 0 0;
}

.search-botton:hover {
  color: #DAA1B6;
}

.search::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #F7C4CC; /* ピンク色 */
  opacity: 1; /* プレースホルダーの透明度をフルに */
}

.search:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #F7C4CC;
}

.sarch::-ms-input-placeholder { /* Microsoft Edge */
  color: #F7C4CC;
}

.btn {
  padding-left: 0;
  margin-top: 5px;
  color: #E99CB6;
}

.btn:active, .btn:hover, .btn:focus {
  color: #C3758E;
}
</style>
