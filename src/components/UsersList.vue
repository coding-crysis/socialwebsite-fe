<template>
  <div class="overflow-auto mt-3">
    <b-container fluid>
      <b-row>
        <b-col md="4" offset-md="4" class="p-3">
          <b-form-input v-model="search" id="input-small" placeholder="Search User" style="max-width: 540px;" @input="searchUser" />
        </b-col>
        <b-col md="4" offset-md="4" class="p-3">
          <b-card v-for="user in items" :key="user.id" class="overflow-hidden mt-2 shadow" style="max-width: 540px;">
            <b-row no-gutters>
              <b-col md="3">
                <b-img :src="user.avatar ? user.avatar : 'https://www.thumbayclinic.com/wp-content/uploads/2018/05/default-user-image.png'" alt="Image" class="float-left" rounded="circle" style="width: 100px" />
              </b-col>
              <b-col md="9">
                <b-card-body>
                  <b-card-text class="float-left text-left">
                    <h5>{{ `${user.first_name} ${user.last_name}` }}</h5>
                    <span><i>You can't win over me.</i></span>
                  </b-card-text>
                  <b-button variant="dark" class="float-right" size="sm" @click="showUserProfile(user.id)">View Profile</b-button>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
          <b-button class="mt-4" @click="getAllUsers" size="sm" :disabled="items.length == rows">
            <b-spinner v-if="loading" small></b-spinner>
            Show More
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { getUsersList } from '../api'

export default {
  name: 'UsersList',
  data () {
    return {
      perPage: 0,
      currentPage: 1,
      items: [],
      originalData: [],
      rows: 0,
      loading: false,
      search: null
    }
  },
  watch: {
    items: function () {
      console.log('change')
    }
  },
  created () {
    this.getAllUsers()
  },
  methods: {
    getAllUsers () {
      this.loading = true
      this.perPage += 2
      getUsersList({ limit: this.perPage, offset: (this.currentPage - 1) })
        .then((result) => {
          this.items = this.originalData = result.data.data
          this.rows = result.data.count
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
    },
    showUserProfile (id) {
      this.$router.push({ name: 'profile', params: { id: id } })
    },
    searchUser () {
      if (this.search) {
        this.items = this.items.filter(item => item.first_name.toLowerCase().includes(this.search.toLowerCase()) || item.last_name.toLowerCase().includes(this.search.toLowerCase()))
      } else {
        this.items = this.originalData
      }
    }
  }
}
</script>

<style>

</style>
