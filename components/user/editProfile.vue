<template lang="pug">
    div
        v-tooltip(bottom v-if="auth")
              template(v-slot:activator="{ on, attrs }")
                v-btn(icon v-bind="attrs" v-on="on" @click="dialogEditProfile = true, showDialogEditProfile()")
                  v-icon(color="light-2") edit
              span.font-family-raleway-bold Edit Profile

        v-dialog(v-model="dialogEditProfile" max-width="500")
            v-card.rounded-xl

                v-card-title.headline.primary.white--text.font-family-raleway-bold
                    v-btn(icon dark @click="dialogEditProfile = false" ).mr-2
                        v-icon close
                    div Edit Profile

                v-card-text.pa-3
                    v-alert(dismissible dark :color="colorAlert" v-model="alertEdit.value").font-family-raleway-bold {{ alertEdit.message }}
          
                    div(container="centerImageUpload")
                        div
                            v-img(:src="datesEdit.photo" transition="scroll-x-reverse-transition")
                                template(v-slot:placeholder)
                                    v-row.fill-height.ma-0(align="center" justify="center")
                                        v-progress-circular(indeterminate color="grey lighten-5")
                            div(class="absoluteLabel")
                                label(for="styleLable")
                                    v-icon(class="white--text") edit
                                    input(id="styleLable" type="file" v-on:change="onFileSelected" placeholder="Seleccione una foto")

                    v-text-field(v-model="datesEdit.name" type="text" label="Name" placeholder="Enter your name" filled rounded hide-details).mb-4.font-family-raleway-medium
                    v-text-field(v-model="datesEdit.email" type="email" label="Email" placeholder="Enter your email" filled rounded hide-details).mb-4.font-family-raleway-medium

                v-card-actions.d-flex.flex-column
                    v-spacer
                    v-btn.dark.font-family-raleway-bold.text-capitalize(color="secondary" :loading="disabledButtonUpdate" :disabled="disabledButtonUpdate" block large rounded @click="editProfile()") Acept
</template>

<script>
import colors from 'vuetify/es5/util/colors'
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'EditProfile',
    data() {
        return {
            dialogEditProfile: false,
            disabledButtonUpdate: false,
            datesEdit: {
                photo: null,
                name: null,
                email: null
            },
            alertEdit: {
                type: 'error',
                value: false,
                message: null
            },
        }
    },
    computed: {
        ...mapGetters({
            auth: 'user/auth',
            name: 'user/name',
            email: 'user/email',
            photo: 'user/photo',
            role: 'user/role',
            token: 'user/token'
        }),
        colorAlert() {
            switch (this.alertEdit.type) {
                case 'success':
                return this.$vuetify.theme.themes.light.secondary
                break;
                case 'error':
                return colors.red.lighten2
                break;
            }
        },
    },
    methods: {
        ...mapActions({
            updateStoreUser: 'user/updateStoreUser'
        }),
        showDialogEditProfile() {
            this.datesEdit = {
                photo: this.photo,
                name: this.name,
                email: this.email
            }
        },
        async onFileSelected(event) {
            try {
                const file = event.target.files[0];
                const formData = await new FormData();
                await formData.append("photo", file);
            
                const _res = await this.$axios({
                    method: "post",
                    url: '/users/uploadPhoto',
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" }
                })

                this.datesEdit.photo = _res.data.routeImage
                
                this.alertEdit.value = true
                this.alertEdit.type = 'success'
                this.alertEdit.message = _res.data.message
            }catch(error) {
                if( error.response ){
                this.alertEdit.value = true
                this.alertEdit.type = 'error'
                this.alertEdit.message = error.response.data.message
                }
            }
            },
            //UPDATE INFO PROFIE
            async editProfile() {
            try {
                this.disabledButtonUpdate = true
                const body = {
                    photo: this.datesEdit.photo,
                    name: this.datesEdit.name,
                    email: this.datesEdit.email
                }
                const _res = await this.$axios.put('/users/editProfile', 
                    body,
                    {
                        headers: {
                        'Authorization': this.token
                        }
                    }
                )
                this.updateStoreUser(body)
                this.alertEdit.value = true
                this.alertEdit.type = 'success'
                this.alertEdit.message = _res.data.message
            }catch(error) {
                if( error.response ){
                    this.alertEdit.value = true
                    this.alertEdit.type = 'error'
                    this.alertEdit.message = error.response.data.message
                }
            } finally {
                this.disabledButtonUpdate = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    div[container=centerImageUpload] {
        @include inputFilePhoto(140px);
    }
</style>