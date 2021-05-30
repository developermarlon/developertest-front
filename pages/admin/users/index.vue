<template lang="pug">
    v-container
        v-layout.fill-height(column)
            h1.text--secondary.font-family-raleway-black.text-truncate.text-h4.text-center.mb-5 {{role === 'admin' ? 'Admin Users' : 'View Users'}}
            v-flex.elevation-15.rounded-xl(md6 style="overflow: auto")
                v-simple-table.pa-5.rounded-xl.font-family-raleway-medium
                    template(v-slot:default)
                        thead
                            tr.text-left.font-family-raleway-bold
                                th.text-body-1 Foto
                                th.text-body-1 Name
                                th.text-body-1 Email
                                th.text-body-1 Actions

                        tbody
                            tr(v-for="user in users" :key="user.id_user").text--secondary
                                td(width="50")
                                    v-avatar.cursor-pointer.my-2(left size="50")
                                        v-img(:src="user.photo" :alt="user.name" transition="scroll-x-reverse-transition")
                                            template(v-slot:placeholder)
                                                v-row.fill-height.ma-0(align="center" justify="center")
                                                    v-progress-circular(indeterminate color="grey lighten-5")

                                td {{ user.name }}
                                td {{ user.email }}
                                td(width="120")
                                    v-layout(v-if="role === 'admin'")
                                        v-btn.mr-2(:to="{ name: 'admin-users-edit', params: { id_user: user.id_user, name: user.name, photo: user.photo, email: user.email }}" fab dark x-small color="primary")
                                            v-icon edit
                                        v-btn(fab dark x-small color="red lighten-2" @click="dialogConfirmDelete(user)")
                                            v-icon delete

        //- DIALOG CONFIRM DELETE
        v-dialog(v-model="dialogDelete" max-width="290")
            v-card.rounded-xl
                v-card-title.headline.primary.white--text.font-family-raleway-bold 
                    v-btn(icon dark @click="dialogDelete = false" ).mr-2
                        v-icon close
                    div Confirm Delete
                

                v-card-text.font-family-raleway-bold.mt-5  {{`Confirm delete user ${user_delete.name} ??`}}

                v-card-actions.d-flex.flex-column
                    v-spacer
                    v-btn.dark.font-family-raleway-bold.text-capitalize(color="secondary" :disabled="disabledDelete" :loading="disabledDelete" block rounded @click="dialogDelete = false, confirmDelete()") Acept

</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        users: [],
        user_delete: {
            name: null,
            id: null
        },
        dialogDelete: false,
        disabledDelete: false
      }
    },
    middlewares: ['authenticated'],
    sockets: {
        updateUsers() {
            this.getUsers()
        }
    },
    computed: {
        ...mapGetters({
            token: 'user/token',
            role: 'user/role'
        })
    },
    methods: {
        dialogConfirmDelete(user) {
            console.log('llega')
            this.user_delete = {
                name: user.name,
                id: user.id_user
            }
            this.dialogDelete = true
        },
        async confirmDelete() {
            try {
                this.disabledDelete = true

                await this.$axios.post('/users/deleteUser', {
                    id_user: this.user_delete.id
                },{headers: {"Authorization" : this.token}})

            }catch(error) {
                
            } finally {
                this.disabledDelete = false
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                })
            }
        },
        async getUsers() {
            try {
                const _res = await this.$axios.post('/users',{},{headers: {"Authorization": this.token}})
                this.users = _res.data
            }catch(error) {
                console.log(error)
            }
        }
    },
    created() {
        this.getUsers()
    }
  }
</script>

<style lang="scss">
</style>
