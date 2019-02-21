<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand>XMR Explorer</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item><router-link to="/blocks">Blocks</router-link></b-nav-item>
        <b-nav-item><router-link to="/transactions">Transactions</router-link></b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
