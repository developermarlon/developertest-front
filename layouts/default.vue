<template lang="pug">
  v-app(id="inspire" :dark="setTheme")
    v-app-bar(app color="primary" dark)
      v-app-bar-nav-icon(@click.stop="sidebarMenu = !sidebarMenu")
      v-spacer
    
    Navigation(:sidebarMenu="sidebarMenu" v-on:closeNavbar="closeNavbar")

    v-main.mb-15
      v-container(fluid :class="['fill-height align-start', (sidebarMenu && $vuetify.breakpoint.xs) ? 'hide-router' : '']")
        v-slide-y-transition(mode="out-in")
          Nuxt

    v-footer(color="primary" :class="['', (sidebarMenu && $vuetify.breakpoint.xs) ? 'hide-router' : '']")
      v-layout(wrap).ma-5
        v-flex.xs12 
          h5.font-family-raleway-bold.white--text.text-center.text-body-2 Lorem ipsum dolor ™
        v-flex.xs12.mt-2
          h6.font-family-raleway-medium.white--text.text-center.text-caption Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      //- v-switch(:label="`Dark Theme`" v-model="goDark")
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'Default',
  opts: {
    theme: {
      dark: false
    }
  },
  data() {
    return {
      goDark: false,
      sidebarMenu: false,
    };
  },
  methods: {
    ...mapActions({
      updateCount: 'websocket/updateCount'
    }),
    closeNavbar() {
      this.sidebarMenu = false
    }
  },
  computed: {
    setTheme() {
      if (this.goDark == true) {
        return (this.$vuetify.theme.dark = true);
      } else {
        return (this.$vuetify.theme.dark = false);
      }
    }
  },
  watch: {
    $route() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  },
  sockets: {
    countClients(count) {
      this.updateCount(count)
    }
  }
}
</script>

<style style="scss" scoped>
  .hide-router {
    display: none !important;
  }
</style>