<template>
  <div class="container">
    <b-row class="mt-3">
      <b-col md="2" offset-md="1">
        <b-img :src="profile.avatar ? profile.avatar : 'https://www.thumbayclinic.com/wp-content/uploads/2018/05/default-user-image.png'" alt="" rounded="circle" class="img-fluid" style="width: 100%" />
      </b-col>
      <b-col md="9" class="pt-4 text-left">
        <h2 class="h2-responsive">{{ `${profile.first_name} ${profile.last_name}` }}</h2>
        <ul class="flex-menu">
          <li><strong>{{ userFriendsCount }}</strong> Friends</li>
        </ul>
      </b-col>
    </b-row>
    <hr />
    <b-tabs content-class="mt-3" lazy>
      <b-tab :title="`Friends(${userFriendsCount})`">
        <b-row>
          <b-col v-for="list in userFriends" :key="list.id" cols="5" :offset-md="(userFriends.indexOf(list) + 1) % 2 == 0 ? 2 : 0">
            <b-card class="overflow-hidden" style="max-width: 540px;">
              <b-row no-gutters>
                <b-col md="3">
                  <b-img :src="getFriendName(list).avatar ? getFriendName(list).avatar : 'https://www.thumbayclinic.com/wp-content/uploads/2018/05/default-user-image.png'" alt="Image" class="float-left" rounded="circle" style="width: 100px" />
                </b-col>
                <b-col md="9">
                  <b-card-body>
                    <b-card-text class="float-left">
                      <h5>{{ getFriendName(list).name }}</h5>
                      <b-button variant="primary" class="float-left" size="sm" @click="showUserProfile(getFriendName(list).id)">View Profile</b-button>
                    </b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { getFriendList } from '../api'

export default {
  name: 'UserProfile',
  data () {
    return {
      profile: {},
      userFriends: [],
      userFriendsCount: 0
    }
  },
  watch: {
    $route: 'getFriendsList'
  },
  created () {
    this.getFriendsList()
  },
  methods: {
    getFriendsList () {
      getFriendList(this.$route.params.id)
        .then((result) => {
          this.profile = result.data.data.profile
          this.userFriends = result.data.data.friends
          this.userFriendsCount = result.data.count
        }).catch(() => {

        })
    },
    getFriendName (row) {
      const id = Number(this.$route.params.id)
      console.log(row.user_id1 === id)
      return row.user_id1 === id ? { name: `${row.user_2.first_name} ${row.user_2.last_name}`, id: row.user_id2, avatar: row.user_2.avatar } : { name: `${row.user_1.first_name} ${row.user_1.last_name}`, id: row.user_id1, avatar: row.user_1.avatar }
    },
    showUserProfile (id) {
      this.$router.push({ name: 'profile', params: { id: id } })
    }
  }
}
</script>

<style>
</style>
