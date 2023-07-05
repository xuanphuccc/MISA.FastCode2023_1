<template>
  <nav :class="['sidebar', { '--compact': globalStore.sidebar.isCompact }]">
    <ul @mouseleave="hideTippy" class="sidebar__menu">
      <li class="sidebar__menu-item">
        <router-link to="/" @mouseenter="showTippy" class="sidebar__link">
          <MISAIcon icon="user" />
          <span class="sidebar__link-text">Thảo luận/Hỏi đáp</span>
        </router-link>
      </li>
      <li class="sidebar__menu-item">
        <router-link to="/notfound" @mouseenter="showTippy" class="sidebar__link">
          <MISAIcon icon="report" />
          <span class="sidebar__link-text">Báo cáo</span>
        </router-link>
      </li>
      <li class="sidebar__menu-item">
        <router-link to="/notfound" @mouseenter="showTippy" class="sidebar__link">
          <MISAIcon icon="setting" />
          <span class="sidebar__link-text">Cài đặt</span>
        </router-link>
      </li>
    </ul>

    <div ref="tippyRef" class="sidebar__tippy">Tổng quan</div>
  </nav>
</template>

<script setup>
import MISAIcon from "@/components/base/icon/MISAIcon.vue";
import { ref } from "vue";
import { useGlobalStore } from "@/stores/global-store";

const tippyRef = ref(null);

const globalStore = useGlobalStore();

/**
 * Description: Hàm hiện tippy khi hover vào các sidebar item
 * khi ở chế độ thu nhỏ
 * Author: txphuc (26/06/2023)
 */
const showTippy = (e) => {
  try {
    if (tippyRef.value && globalStore.sidebar.isCompact) {
      tippyRef.value.style.display = "block";
      const linkElement = e.target;
      const linkRect = linkElement.getBoundingClientRect();
      const tippyRect = tippyRef.value.getBoundingClientRect();

      // set tippy position
      tippyRef.value.style.top =
        linkRect.top + linkRect.height / 2 - 56 - tippyRect.height / 2 + "px";

      // set tippy content
      tippyRef.value.textContent = linkElement.textContent;
    }
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Hàm ẩn tippy khi di chuột ra ngoài sidebar
 * Author: txphuc (26/06/2023)
 */
const hideTippy = () => {
  try {
    if (tippyRef.value) {
      tippyRef.value.style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
@import url("./sidebar.css");
</style>
