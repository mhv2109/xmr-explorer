<template>
  <div>
    <b-table
      small striped hover responsive
      :items="items"
      :fields="fields"
      :stacked="stacked"
      :selectable="selectable"
      :select-mode="selectMode"
      @row-selected="rowSelected"
      :busy="empty">

      <div slot="table-busy" class="text-center text-danger my-2">
        <strong>No Rows</strong>
      </div>

    </b-table>
    <b-pagination
      v-if="nItems > pageSize"
      align="center"
      size="md"
      :total-rows="nItems"
      v-model="currentPage_"
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
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      selectMode: 'single',
      currentPage__: null
    }
  },
  created () {
    this.callback(this.currentPage_, this.pageSize)
  },
  computed: {
    currentPage_: {
      get: function () {
        if(this.currentPage__ != null) {
          return this.currentPage__
        }
        return this.currentPage
      },
      set: function (value) {
        this.currentPage__ = value
      }
    },
    empty () {
      return this.items.length <= 0
    }
  },
  watch: {
    nItems: function () {
      this.callback(this.currentPage_, this.pageSize)
    },
    currentPage_: function () {
      this.callback(this.currentPage_, this.pageSize)
    }
  }
}
</script>

<style>

</style>
