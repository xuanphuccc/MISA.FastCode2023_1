<template>
  <div class="page-container">
    <div class="page__header">
      <div class="page__title-wrapper">
        <h1 class="page__title">Thảo luận/Hỏi đáp</h1>
        <span class="page__title-icon ms-icon--angle-down-24" title="Dropdown"></span>
      </div>

      <div class="page__header-controls">
        <MISAButton @click="togglePopup" type="primary">Thêm thảo luận/câu hỏi</MISAButton>
      </div>
    </div>

    <div class="page__content">
      <div class="filter-container">
        <div class="filter__left">
          <MISAInputGroup for="search-input">
            <MISAInput id="search-input" />
            <MISAInputAction @click="handleSearchEmployee">
              <MISAIcon size="20" icon="search" />
            </MISAInputAction>
          </MISAInputGroup>
        </div>
        <div class="filter__right">
          <MISAButton @click="handleResetFilter" v-tooltip.left="'Tải lại'" type="secondary">
            <template #icon><MISAIcon size="20" icon="reload" /></template>
          </MISAButton>
        </div>
      </div>

      <div class="page__main-content">
        <TheHomeItem type="question" title="Cần giúp đỡ về việc sử dụng flex"></TheHomeItem>
        <TheHomeItem type="discuss"></TheHomeItem>
        <TheHomeItem type="share"></TheHomeItem>
        <TheHomeItem></TheHomeItem>
      </div>
    </div>

    <Teleport to="#app">
      <DiscussPageCreate @close="togglePopup" v-if="popupState.isShow"></DiscussPageCreate>
    </Teleport>
  </div>
</template>

<script setup>
import MISAButton from "@/components/base/button/MISAButton.vue";
import MISAIcon from "@/components/base/icon/MISAIcon.vue";
import MISAInput from "@/components/base/input/MISAInput.vue";
import MISAInputAction from "@/components/base/input/MISAInputAction.vue";
import MISAInputGroup from "@/components/base/input/MISAInputGroup.vue";
import TheHomeItem from "@/components/views/discuss/TheHomeItem.vue";

import DiscussPageCreate from "./DiscussPageCreate.vue";
import { ref } from "vue";

const popupState = ref({
  isShow: false,
});

/**
 * Description: Đóng mở form thêm
 * Author: txphuc (05/07/2023)
 */
const togglePopup = () => {
  popupState.value.isShow = !popupState.value.isShow;
};
</script>

<style scoped>
.page__main-content {
  padding: 16px;
}
</style>
