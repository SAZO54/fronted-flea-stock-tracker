<script setup lang="ts">
import HeaderTracker from './components/Base/HeaderTracker.vue'
import SideBar from './components/SideBar.vue'
</script>

<template>
  <HeaderTracker />
  <div style="display: flex; margin-top: 72px; margin-left: 300px">
    <SideBar />
    <div class="content-area">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.content-area {
  width: calc(100% - 20px); /* サイドバーを除いた残りの幅 */
  padding: 20px; /* 必要に応じて余白を追加 */
  box-sizing: border-box; /* パディングがwidthに含まれるように */
}
</style>
