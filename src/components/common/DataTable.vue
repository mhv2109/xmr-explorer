<template>
  <div>
    <b-table
      small striped hover responsive
      :items="items"
      :fields="fields"
      :stacked="stacked"
      :selectable="selectable"
      :select-mode="selectMode"
      @row-selected="rowSelected" />
    <b-pagination
      v-if="nItems > pageSize"
      align="center"
      size="md"
      :total-rows="nItems"
      v-model="currentPage"
      :per-page="pageSize" />
  </div> 
</template>

<script>
export default {
  name: 'data-table',
  props: {
    items: Array,
    nItems: Number,
    pageSize: Number,
    fields: Array,
    callback: {
      type: Function,
      default: (page, size) => {} // eslint-disable-line
    },
    selectable: {
      type: Boolean,
      default: false
    },
    rowSelected: {
      type: Function,
      default: (item) => {} // eslint-disable-line 
    },
    stacked: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentPage: 1,
      selectMode: 'single'
    }
  },
  created () {
    this.callback(this.currentPage, this.pageSize)
  },
  watch: {
    nItems: function () {
      this.callback(this.currentPage, this.pageSize)
    },
    currentPage: function () {
      this.callback(this.currentPage, this.pageSize)
    }
  }
}
</script>

<style>

</style>
