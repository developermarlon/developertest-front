<template lang="pug">
    v-container.fill-height.pa-0

        v-layout.fill-height.align-center.justify-center
            v-flex.xs12.sm6.md5.xl3
                v-card.pa-5(:rounded="'xl'" :elevation="15")
                    v-col.pa-0
                        v-layout.justify-space-between
                            v-btn(icon color="blue-grey lighten-1" :to="'/admin/users'")
                                v-icon arrow_back
                            h1.text--secondary.font-family-raleway-black.text-truncate.text-h5.text-center.mb-5 Update
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
                        
                        v-btn(@click="updateUser" :loading="disabledButton" :disabled="disabledButton" color="secondary" rounded block x-large).font-family-raleway-bold.text-capitalize Update
        
</template>

<script>
import colors from 'vuetify/es5/util/colors'
import {mapGetters} from 'vuex'
export default {
    name: 'Login',
    middleware: ['authenticated'],
    data() {
        return {
            id_user: null,
            name: null,
            email: null,
            photo: null,
            alert: {
                type: 'error',
                value: false,
                message: null
            },
            disabledButton: false,
            dialogConfirmDelete: false
        }
    },
    computed: {
        ...mapGetters({
            token: 'user/token'
        }),
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
    mounted() {
        if(Object.keys(this.$route.params).length === 0) return this.$router.push('/admin/users')
        this.id_user = this.$route.params.id_user
        this.name = this.$route.params.name
        this.email = this.$route.params.email
        this.photo = this.$route.params.photo
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
        async updateUser() {
            try {
                this.disabledButton = true

                const _res = await this.$axios.put('/users/updateUser', {
                    id_user: this.id_user,
                    name: this.name,
                    email: this.email,
                    photo: this.photo
                },{headers: {"Authorization" : this.token}})

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
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                })
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
