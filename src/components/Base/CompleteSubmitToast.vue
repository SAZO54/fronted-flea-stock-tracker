<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Toast } from 'bootstrap';
import ConfettiExplosion from 'vue-confetti-explosion';

const props = defineProps<{
  show: boolean;
  message: string;
}>();

const toastElement = ref<HTMLElement | null>(null);
let toast: Toast | null = null;

const showConfetti = ref(false);

onMounted(() => {
  if (toastElement.value) {
    toast = new Toast(toastElement.value, {
      delay: 3000, // トーストが表示される時間
      autohide: true, // 自動で隠す
    });
  }
});

watch(
  () => props.show,
  (newValue) => {
    if (newValue && toast) {
      toast.show(); // トーストを表示
      showConfetti.value = true;
      setTimeout(() => {
        showConfetti.value = false;
      }, 3000); // コンフェッティの非表示タイミング
    }
  }
);
</script>

<template>
  <div class="toast-container position-fixed p-3">
    <div ref="toastElement" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">TechMenagerie</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">{{ message }}</div>
    </div>
    <div class="confetti-container">
      <ConfettiExplosion v-if="showConfetti" />
    </div>
  </div>
</template>

<style scoped>
.toast-container {
  top: 10%;
  right: 10%;
}

.confetti-container {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
</style>
