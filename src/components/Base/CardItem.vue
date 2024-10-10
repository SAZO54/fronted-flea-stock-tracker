<script setup lang="ts">
interface Props {
  title?: string
  cardTransition?: string
}

// propsを変数に代入せずに直接定義
const props = withDefaults(defineProps<Props>(), {
  title: '',
  cardTransition: 'fade',
});
</script>

<template>
  <div class="card-item component-card-item">
    <div class="card-item-body">
      <div class="card-top-icons">
        <a class="dropdown-item" :href="props.cardTransition">
          <img class="heart_img" src="../../assets/icons/heart_plus.svg" alt="heart_plus" />
        </a>
      </div>
      <div class="card-item-text">{{ props.title }}</div>
    </div>
  </div>
</template>

<style scoped></style>
