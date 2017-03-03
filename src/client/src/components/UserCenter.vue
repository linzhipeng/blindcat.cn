<template>
  <div>{{userInfo}}</div>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex'
  export default {
    name: 'userCenter',
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      })
    }
  }
</script>
