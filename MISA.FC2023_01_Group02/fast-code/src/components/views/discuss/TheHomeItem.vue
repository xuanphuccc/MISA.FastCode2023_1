<template>
  <router-link to="/discuss/0" class="ms-home-item">
    <div :class="['ms-home-item__icon', `--${props.type}`]"></div>
    <div class="ms-home-item__content">
      <p class="ms-home-item__title">{{ props.title }}</p>
      <div class="ms-home-item__desc-wrap">
        <div class="ms-home-item__name">{{ props.name }}</div>
        <div class="ms-home-item__count">Đã trả lời: {{ props.count }}</div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  // Loại trò chuyện (question, discuss, share)
  type: {
    type: String,
    default: "question",
  },

  // Tiêu đề
  title: {
    type: String,
    default: "Tiêu đề",
  },

  // Tên người gửi
  name: {
    type: String,
    default: "Người dùng ẩn danh",
  },

  // Số câu trả lời
  count: {
    type: [String, Number],
    default: "100",
  },
});
</script>

<style scoped>
.ms-home-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  text-decoration: none;
  color: var(--primary-text-color);
}

.ms-home-item:hover {
  background-color: var(--background-color);
}

.ms-home-item__icon {
  width: 38px;
  height: 38px;
  background-repeat: no-repeat;
}

.ms-home-item__icon.--question {
  background: url("../../../assets/icon/question-48.png");
  background-size: contain;
}
.ms-home-item__icon.--discuss {
  background: url("../../../assets/icon/discuss-32.png");
  background-size: contain;
}
.ms-home-item__icon.--share {
  background: url("../../../assets/icon/share-64.png");
  background-size: contain;
}

.ms-home-item__content {
  margin-left: 16px;
}

.ms-home-item__title {
  font-size: 14px;
  font-weight: 500;
  color: var(--primary-color-500);
  text-decoration: none;
}

.ms-home-item__desc-wrap {
  margin-top: 4px;
  display: flex;
  text-decoration: none;
}

.ms-home-item__count {
  margin-left: 16px;
}
</style>
