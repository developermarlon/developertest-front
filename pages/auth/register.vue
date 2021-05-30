<template lang="pug">
    v-container.fill-height.pa-0
        v-layout.fill-height.align-center.justify-center
            v-flex.xs12.sm6.md5.xl3
                v-card.pa-5(:rounded="'xl'" :elevation="15")
                    v-col.pa-0
                        h1.text--secondary.font-family-raleway-black.text-truncate.text-h4.text-center.mb-5 Register
                        v-alert(dismissible dark :color="colorAlert" v-model="alert.value").font-family-raleway-bold {{ alert.message }}
                        
                        div(container="centerImageUpload")
                            div
                                v-img(:src="photo" transition="scroll-x-reverse-transition")
                                    template(v-slot:placeholder)
                                        v-row.fill-height.ma-0(align="center" justify="center")
                                            v-progress-circular(indeterminate color="grey lighten-5")
                                div(class="absoluteLabel")
                                    label(for="styleLable")
                                        v-icon(class="white--text") edit
                                        input(id="styleLable" type="file" v-on:change="onFileSelected" placeholder="Seleccione una foto")

                        v-text-field(v-model="name" type="text" label="Name" placeholder="Enter your name" filled rounded append-icon="" hide-details).mb-4.font-family-raleway-medium
                        v-text-field(v-model="email" type="email" label="Email" placeholder="Enter your email" filled rounded append-icon="email" hide-details).mb-4.font-family-raleway-medium
                        v-text-field(v-model="password" :append-icon="typeInputPassword ? 'visibility_off' : 'visibility'" @click:append="() => (typeInputPassword = !typeInputPassword)" :type="typeInputPassword ? 'password' : 'text'" label="Password" placeholder="Enter your password" filled rounded hide-details).mb-4.font-family-raleway-medium
                        
                        v-btn(@click="registerUser" :loading="disabledButton" :disabled="disabledButton" color="secondary" rounded block x-large).font-family-raleway-bold.text-capitalize Register
                        v-divider.my-2
                        v-btn(to="/auth/login" color="primary" rounded block x-large).font-family-raleway-bold.text-capitalize Login
</template>

<script>
import colors from 'vuetify/es5/util/colors'
export default {
    name: 'Login',
    middleware: ['unauthenticated'],
    data() {
        return {
            name: null,
            email: null,
            password: null,
            photo: 'https://res.cloudinary.com/hnhnaig2j/image/upload/v1617161423/default/default-user_ynpwjb.png',
            alert: {
                type: 'error',
                value: false,
                message: null
            },
            typeInputPassword: true,
            disabledButton: false
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
        async onFileSelected(event) {
            try {
                const file = event.target.files[0];
                const formData = await new FormData();
                await formData.append("photo", file);
            
                const _res = await this.$axios.post('/users/uploadPhoto', 
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" }
                    }
                )

                this.photo = _res.data.routeImage
                
                this.alert.value = true
                this.alert.type = 'success'
                this.alert.message = _res.data.message
            }catch(error) {
                if( error.response ){
                    this.alert.value = true
                    this.alert.type = 'error'
                    this.alert.message = error.response.data.message
                }
            }
        },
        async registerUser() {
            try {
                this.disabledButton = true

                //post register
                const _res = await this.$axios.post('/users/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    photo: this.photo
                })

                //restore form
                this.name = null
                this.email = null
                this.password = null
                this.photo = 'https://res.cloudinary.com/hnhnaig2j/image/upload/v1617161423/default/default-user_ynpwjb.png'

                this.alert.value = true
                this.alert.type = 'success'
                this.alert.message = _res.data.message

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
    }
}
</script>
<style lang="scss">
    
</style>
<style lang="scss" scoped>
    div[container=centerImageUpload] {
        @include inputFilePhoto(180px);
    }
</style>
