<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-navbar type="dark" variant="dark">
            <b-navbar-brand>XMR Explorer</b-navbar-brand>
            <b-navbar-nav>
              <b-nav-item>
                <router-link to="/blocks">Blocks</router-link>
              </b-nav-item>
              <b-nav-item>
                <router-link to="/transactions">Transactions</router-link>
              </b-nav-item>
              <b-nav-item>
                <router-link to="/analysis">Analysis</router-link>
              </b-nav-item>
            </b-navbar-nav>
          </b-navbar>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-breadcrumb
            :items="breadcrumb" />
        </b-col>
      </b-row>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'index-page',
  computed: {
    breadcrumb () {
      return this.$store.state.breadcrumb
    }
  }
}
</script>

<style>

</style>
