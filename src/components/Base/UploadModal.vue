<script setup lang="ts">
import { ref, onMounted, defineEmits, defineExpose } from 'vue';
import * as bootstrap from 'bootstrap';

const files = ref<File[]>([]);
const uploadModal = ref<HTMLDivElement | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const emits = defineEmits(['show', 'hide', 'filesUploaded']);
let modal: bootstrap.Modal | null = null;

onMounted(() => {
  if (uploadModal.value) {
    // Bootstrap Modal インスタンスを作成
    modal = new bootstrap.Modal(uploadModal.value);
  }
});

function showModal() {
  emits('show');
  if (modal) {
    modal.show();
  }
}

function hideModal(): void {
  emits('hide');
  if (modal) {
    modal.hide();
  }
}

defineExpose({
  showModal,
  hideModal,
});

function browseFiles(): void {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement | null;
  if (!target || !target.files) {
    console.error('target or files is undefined');
    return;
  }

  // const selectedFiles = Array.from(target.files);
  // files.value = selectedFiles;

  // emits('filesUploaded', selectedFiles);

  files.value = Array.from(target.files);

  // Simulate file upload process
  // setTimeout(() => {
  //   files.value = files.value.map(file => ({ ...file, uploaded: true }));
  // }, 2000);
}

// function handleDrop(event: DragEvent) {
//   event.preventDefault();
//   if (!event.dataTransfer || !event.dataTransfer.files) {
//     console.error('dataTransfer or files is undefined');
//     return;
//   }

//   // const droppedFiles = Array.from(event.dataTransfer.files);
//   // files.value = droppedFiles;
  
//   files.value = Array.from(event.dataTransfer.files);

//   // Simulate file upload process
//   // setTimeout(() => {
//   //   files.value = files.value.map(file => ({ ...file, uploaded: true }));
//   // }, 2000);
// }

function submitFiles(): void {
  emits('filesUploaded', files.value);
  hideModal();
}
</script>

<template>
  <div>
    <div class="modal fade" ref="uploadModal" tabindex="-1" aria-labelledby="uploadModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="uploadModalLabel">Upload</h5>
            <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-center align-items-center img-ctn" @click.prevent="browseFiles">
              <div class="text-center">
                <div style="line-height: 38px;">
                  <img src="../../assets/icons/imagesmode.svg" alt="imagesmode" class="material-symbols-outlined imgmode"/>
                </div>
                <div style="color: #ccc;">Select Images</div>
              </div>
            </div>
            <div class="upload-area">
              <input type="file" @change="handleFileUpload" multiple hidden ref="fileInput" />
              <ul class="list-group mt-3">
                <li v-for="(file, index) in files" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
                  <span>{{ file.name }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="modal-footer">
            <div>
            <button type="button" class="btn btn-secondary cancel-btn" @click="hideModal">Cancel</button>
            <button type="button" class="btn btn-secondary decision-btn" @click="submitFiles">Decision</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-ctn {
  height: 250px;
  width: 80%;
  border-radius: 20px;
  border: 1px dashed #ccc;
  margin: 0 auto 38px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cancel-btn {
  margin-right: 10px;
  background-color: #89b7e1b5;
  border: #89b7e1b5;
}

.cancel-btn:hover, .cancel-btn:active, .cancel-btn:focus {
  background-color: #6690b8b5;
  border: #6690b8b5;
}

.decision-btn {
  background-color: #EDA3B8;
  border: #EDA3B8;
}

.decision-btn:hover, .decision-btn:active, .decision-btn:focus {
  background-color: #e5839f;
  border: #e5839f;
}


</style>