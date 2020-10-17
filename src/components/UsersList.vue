<template>
  <div class="overflow-auto mt-3">
    <b-container fluid>
      <b-row>
        <b-col v-for="user in items" :key="user.id" cols="2">
          <b-card
          :key="user.id"
          :title="`${user.first_name} ${user.last_name}`"
          :img-src="user.avatar ? user.avatar : 'https://www.thumbayclinic.com/wp-content/uploads/2018/05/default-user-image.png'"
          img-alt="Image"
          img-top
          img-height="200px"
          img-width="200px"
          tag="article"
          style="max-width: 20rem;"
          class="mb-2 shadow"
          >
            <b-button href="#" variant="primary" size="sm" @click="showUserProfile(user.id)">View Profile</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <!-- <b-table
      id="my-table"
      :items="items"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      small
    />
    <p class="mt-3">Current Page: {{ currentPage }}</p>
    <b-pagination
      class="text-center"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      @change="changePage"
      aria-controls="my-table"
    /> -->
  </div>
</template>

<script>
import { getUsersList } from '../api'

export default {
  name: 'UsersList',
  data () {
    return {
      perPage: 20,
      currentPage: 1,
      items: [],
      fields: [
        { key: 'id', label: 'ID' },
        { key: 'first_name', label: 'First Name' },
        { key: 'last_name', label: 'Last Name' }
      ],
      rows: 0
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
      getUsersList({ limit: this.perPage, offset: (this.currentPage - 1) * this.perPage })
        .then((result) => {
          this.items = result.data.data
          this.rows = result.data.count
        }).catch(() => {})
    },
    changePage (event) {
      console.log(event)
      this.currentPage = event
      this.getAllUsers()
    },
    showUserProfile (id) {
      this.$router.push({ name: 'profile', params: { id: id } })
    }
  }
}
</script>

<style>

</style>
