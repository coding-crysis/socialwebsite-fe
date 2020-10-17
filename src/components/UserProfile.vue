<template>
  <div class="container shadow p-3">
    <div class="profile-div">
      <b-row class="text-white mt-3">
        <b-col md="2" offset-md="1">
          <b-img :src="profile.avatar ? profile.avatar : 'https://www.thumbayclinic.com/wp-content/uploads/2018/05/default-user-image.png'" alt="" rounded="circle" class="img-fluid" style="width: 100%; margin-top: 50px" />
        </b-col>
        <b-col md="9" class="pt-4 text-left">
          <h2 class="h2-responsive" style="margin-top: 60px">{{ `${profile.first_name} ${profile.last_name}` }}</h2>
          <p><i>The greatest glory in living lies not in never falling, but in rising every time we fall.</i></p>
          <p><strong>{{ userFriendsCount }}</strong> {{ userFriendsCount > 1 ? 'Friends' : 'Friend' }}</p>
        </b-col>
    </b-row>
    </div>
    <hr />
    <b-tabs content-class="mt-3" lazy>
      <b-tab :title="`Friends(${userFriendsCount})`">
        <b-row>
          <b-col v-for="list in userFriends" :key="list.id" cols="6">
            <b-card class="overflow-hidden friend-box" style="max-width: 540px;">
              <b-row no-gutters>
                <b-col md="3">
                  <b-img :src="getFriendName(list).avatar ? getFriendName(list).avatar : 'https://www.thumbayclinic.com/wp-content/uploads/2018/05/default-user-image.png'" alt="Image" class="float-left" rounded="circle" style="width: 100px" />
                </b-col>
                <b-col md="9">
                  <b-card-body>
                    <b-card-text class="float-left">
                      <h5>{{ getFriendName(list).name }}</h5>
                      <b-button variant="dark" class="float-left" size="sm" @click="showUserProfile(getFriendName(list).id)">View Profile</b-button>
                    </b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Photos">
        <b-row>
          <b-col>
            <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54" alt="Image 1"></b-img>
          </b-col>
          <b-col>
            <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=58" alt="Image 2"></b-img>
          </b-col>
          <b-col>
            <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=59" alt="Image 3"></b-img>
          </b-col>
          <b-col>
            <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=59" alt="Image 3"></b-img>
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

<style scoped>
.profile-div {
  background-image: url(https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__340.jpg);
  height: 300px;
  border-radius: 5px;
}
.friend-box:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.2);
}
</style>
