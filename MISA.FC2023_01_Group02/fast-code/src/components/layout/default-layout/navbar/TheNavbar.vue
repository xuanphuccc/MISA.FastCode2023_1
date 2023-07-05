<template>
  <header :class="['navbar', { '--compact': globalStore.sidebar.isCompact }]">
    <div class="navbar__left">
      <div class="navbar__menu-icon" title="Menu">
        <MISAIcon icon="dashboard" />
      </div>
      <div class="navbar__logo-container">
        <div class="navbar__logo">MISA QA</div>
      </div>
    </div>
    <div class="navbar__right">
      <div class="navbar__title-wrap"></div>
      <div class="navbar__controls">
        <div class="navbar__avatar-wrap">
          <img
            class="navbar__avatar"
            src="../../../../assets/img/avatar-default.png"
            title="Tài khoản"
            alt=""
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import MISAIcon from "@/components/base/icon/MISAIcon.vue";
import { useGlobalStore } from "@/stores/global-store";

const globalStore = useGlobalStore();
</script>

<style scoped>
@import url("./navbar.css");
</style>
