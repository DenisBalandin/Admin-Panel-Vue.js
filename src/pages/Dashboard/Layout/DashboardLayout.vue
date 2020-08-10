<template>
  <div
    class="wrapper"
    :class="[
      { 'nav-open': $sidebar.showSidebar },
      { rtl: $route.meta.rtlActive }
    ]"
  >
    <notifications></notifications>
    <side-bar
      :active-color="sidebarBackground"
      :data-background-color="sidebarBackgroundColor"
    >
      <!-- <user-menu></user-menu> -->
      <!-- <mobile-menu></mobile-menu> -->
      <template slot="links">
        <sidebar-item :link="{ name: 'Dashboard', icon: 'dashboard', path:'/dashboard' }">
          <sidebar-item
            :link="{ name: 'Dashboard', path: '/dashboard' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item :link="{ name: 'Kiosk Management', icon: 'laptop' }">
          <sidebar-item
            :link="{ name: 'Kiosks', path: '/Kiosks' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item :link="{ name: 'Page Visits', icon: 'person' }">
          <sidebar-item
            :link="{ name: 'All Pages', path: '/pagevisits' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item :link="{ name: 'Emails', icon: 'email' }">
          <sidebar-item
            :link="{ name: 'All Emails', path: '/emails/all' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Memory Game', path: '/emails/matchingEmails' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Page Share', path: '/emails/pageSends' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item :link="{ name: 'Referrals', icon: 'emoji_people' }">
          <sidebar-item
            :link="{ name: 'Referrals', path: '/referrals' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item :link="{ name: 'Register', icon: 'add_circle_outline' }">
          <sidebar-item
            :link="{ name: 'Register', path: '/register' }"
          ></sidebar-item>
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <div
        :class="{ content: !$route.meta.hideContent }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
// import MobileMenu from "./Extra/MobileMenu.vue";
import { ZoomCenterTransition } from "vue2-transitions";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    // MobileMenu,
    ZoomCenterTransition
  },
  data() {
    return {
      sidebarBackgroundColor: "black",
      sidebarBackground: "green",
      sidebarBackgroundImage: "./img/sidebar-2.jpg",
      sidebarMini: true,
      sidebarImg: true
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    }
  },
  mounted() {
    let docClasses = document.body.classList;
    let isWindows = navigator.platform.startsWith("Win");
    if (isWindows) {
      // if we are on windows OS we activate the perfectScrollbar function
      initScrollbar("sidebar");
      initScrollbar("sidebar-wrapper");
      initScrollbar("main-panel");

      docClasses.add("perfect-scrollbar-on");
    } else {
      docClasses.add("perfect-scrollbar-off");
    }
  },
  watch: {
    sidebarMini() {
      this.minimizeSidebar();
    }
  }
};
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}
.main-panel .zoomIn {
  animation-name: zoomIn95;
}
@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}
.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>
