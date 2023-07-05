<template>
  <div
    class="sidebar"
    :class="$store.state.isExpandSidebar ? '' : 'sidebar--collapse'"
  >
    <div class="sidebar__logo-container">
      <misa-icon
        icon="sidebar__control--white"
        tooltip="Mở rộng sidebar"
        @click="expandSidebar"
        v-if="!$store.state.isExpandSidebar"
        height="fit-content"
        width="fit-content"
      ></misa-icon>
      <a
        href="https://amisapp.misa.vn/home"
        class="toggle-icon"
        title="Misa App"
        v-else
      ></a>

      <router-link
        class="logo"
        to="/dashboard"
        title="Tổng quan"
        v-if="$store.state.isExpandSidebar"
      ></router-link>
    </div>

    <div class="sidebar__nav">
      <div class="sidebar__menu-item-container">
        <router-link
          to="/dashboard"
          class="menu-item"
          exact
          activeClass="menu-item--selected"
          title="Tổng quan"
        >
          <misa-icon icon="sidebar__overview" />
          <div class="sidebar__text">Tổng quan</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheSidebar",
  methods: {
    /**
     * bắt sự kiện mở rộng sidebar
     * @author: TTANH (25/06/2023)
     */
    expandSidebar() {
      try {
        this.$store.commit("toggleSidebar");
      } catch (error) {
        console.log(
          "🚀 ~ file: TheSidebar.vue:129 ~ expandSidebar ~ error:",
          error
        );
      }
    },
  },
};
</script>

<style>
@import url(./sidebar.css);
</style>
