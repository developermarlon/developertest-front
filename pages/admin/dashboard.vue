<template lang="pug">
  v-container
    v-layout.flex-column.flex-sm-row.pa-0
      v-flex.xs12.sm4
        v-card(color="#678ecf" :rounded="'xl'" :elevation="15" dark).pa-7
          v-layout(wrap)
            v-flex.xs12 
              h5.text-truncate.text-uppercase.font-family-raleway-bold.d-flex.align-center
                div(class="online")
                div Connected Web Socket
            v-flex.xs12 
              h1.text-truncate.font-family-raleway-bold {{countClients}}

      v-flex.xs12.my-4.sm4.my-sm-0.mx-sm-4
        v-card(color="#e2bb68" :rounded="'xl'" :elevation="15" dark).pa-7
          v-layout(wrap)
            v-flex.xs12 
              h5.text-truncate.text-uppercase.font-family-raleway-bold Example
            v-flex.xs12 
              h1.text-truncate.font-family-raleway-bold 23%

      v-flex.xs12.sm4
        v-card(color="#52b992" :rounded="'xl'" :elevation="15" dark).pa-7
          v-layout(wrap)
            v-flex.xs12 
              h5.text-truncate.text-uppercase.font-family-raleway-bold Example 2
            v-flex.xs12 
              h1.text-truncate.font-family-raleway-bold 213
    
    v-layout.flex-column.flex-sm-row.mt-4
      v-flex.xs12.sm6.pr-sm-2
        v-card(:rounded="'xl'" :elevation="15")
          ChartLine

      v-flex.xs12.sm6.pl-sm-2.mt-4.mt-sm-0
        v-card(:rounded="'xl'" :elevation="15").pa-4
          ChartDoughnut
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'Dashboard',
    middleware: ['authenticated'],
    computed: {
      ...mapGetters({
        countClients: 'websocket/count'
      })
    },
    data() {
      return {
      }
    }
}
</script>

<style lang="scss" scoped>
  .online {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-right: 5px;
    box-shadow: 0px 2px 2px -2px rgba(0,0,0,.5);
    background: var(--v-secondary-base)
  }
</style>