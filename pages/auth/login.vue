<template lang="pug">
    v-container.fill-height.pa-0
        v-layout.fill-height.align-center.justify-center
            v-flex.xs12.sm6.md5.xl3
                v-card.pa-5(:rounded="'xl'" :elevation="15")
                    v-col.pa-0
                        h1.text--secondary.font-family-raleway-black.text-truncate.text-h4.text-center.mb-5 Login
                        v-alert(dismissible dark :color="colorAlert" v-model="alert.value").font-family-raleway-bold {{ alert.message }}

                        v-text-field(v-model="email" v-on:keyup.enter="login" type="email" label="Email" placeholder="Enter your email" filled rounded append-icon="email" hide-details).mb-4.font-family-raleway-medium
                        v-text-field(v-model="password" v-on:keyup.enter="login" :append-icon="typeInputPassword ? 'visibility_off' : 'visibility'" @click:append="() => (typeInputPassword = !typeInputPassword)" :type="typeInputPassword ? 'password' : 'text'" label="Password" placeholder="Enter your password" filled rounded hide-details).mb-4.font-family-raleway-medium
                        
                        v-btn(@click="login" :loading="disabledButton" :disabled="disabledButton" color="secondary" rounded block x-large).font-family-raleway-bold.text-capitalize Login
                        v-divider.my-2
                        v-btn(to="/auth/register" color="primary" rounded block x-large).font-family-raleway-bold.text-capitalize Register
</template>

<script>
import {mapActions} from 'vuex'
import colors from 'vuetify/es5/util/colors'
export default {
    name: 'Login',
    middleware: ['unauthenticated'],
    data() {
        return {
            email: null,
            password: null,
            typeInputPassword: true,
            disabledButton: false,
            alert: {
                type: 'error',
                value: false,
                message: null
            }
        }
    },
    computed: {
        colorAlert() {
            switch (this.alert.type) {
                case 'success':
                    return this.$vuetify.theme.themes.light.secondary
                break;
                case 'error':
                    return colors.red.lighten2
                break;
            }
        }
    },
    methods: {
        ...mapActions({
            openSession: 'user/openSession',
        }),
        async login() {
            try {
                this.disabledButton = true
                const _res = await this.$axios.post('/users/login', {
                    email: this.email,
                    password: this.password
                })
                this.openSession(_res.data)
                this.$router.push({name: 'admin-dashboard', params: {example_param: 'text example'}})
            }catch(error) {
                if( error.response ){
                    this.alert.value = true
                    this.alert.type = 'error'
                    this.alert.message = error.response.data.message
                }
            } finally {
                this.disabledButton = false
            }
        }
    },
    mounted() {
    }
}
</script>
<style lang="scss">
    
</style>
<style lang="scss" scoped>
    
</style>
