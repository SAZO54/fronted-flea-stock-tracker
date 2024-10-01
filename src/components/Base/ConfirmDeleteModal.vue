<script setup lang="ts">
import { ref, onMounted, defineEmits, defineExpose } from 'vue';
import * as bootstrap from 'bootstrap';

const confirmDeleteModal = ref<HTMLDivElement | null>(null);

const emits = defineEmits(['show', 'hide', 'submitDeletion']);
let modal: bootstrap.Modal | null = null;

onMounted(() => {
  if (confirmDeleteModal.value) {
    // Bootstrap Modal インスタンスを作成
    modal = new bootstrap.Modal(confirmDeleteModal.value);
  }
});

function submitDeletion(): void {
  emits('submitDeletion'); // イベントを親コンポーネントに発火
}   

function showModal() {
  emits('show');
  if (modal) {
    modal.show(); // モーダルを表示
  }
}

function hideModal():void {
  emits('hide');
  if (modal) {
    modal.hide(); // モーダルを非表示
  }
}

defineExpose({
  showModal,
  hideModal,
});
</script>

<template>
  <div>
    <div class="modal fade" ref="confirmDeleteModal" tabindex="-1" aria-labelledby="confirmDeleteModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmDeleteModal">Confirm Delete</h5>
            <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">Are you sure you want to delete it?</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary cancel-btn" @click="hideModal">Cancel</button>
            <button type="button" class="btn btn-secondary add-btn" @click="submitDeletion">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-dialog {
  margin-top: 20%;
}

.cancel-btn {
  background-color: #8dacc9b5;
  border: #8dacc9b5;
  height: 20%;
  width: 20%;
  margin-right: 5%;
  padding: 10px;
}

.cancel-btn:hover, .cancel-btn:active, .cancel-btn:focus {
  background-color: #95a9bcb5;
  border: #95a9bcb5;
}

.add-btn {
  background-color: #e19bc4b5;
  border: #e19bc4b5;
  height: 20%;
  width: 35%;
  padding: 10px;
}

.add-btn:hover, .cancel-btn:active, .cancel-btn:focus {
  background-color: #df87bab5;
  border: #df87bab5;
}
</style>