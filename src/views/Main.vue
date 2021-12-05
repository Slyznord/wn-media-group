<template>
  <div class="grid xl:grid-cols-4 md:grid-cols-2 gap-8 items-start container w-full mx-auto py-12 px-4">
    <Column
      v-for="(column, index) in columns"
      :key="index"
      :name="column.name"
      :cards="column.cards"
      :index="index"
    />

    <div
      class="flex items-center justify-center px-8 py-3 rounded-lg bg-white text-base font-normal cursor-pointer bg-blue-400 text-white"
      @click="addColumn"
    >
      + Добавить еще одну колонку
    </div>
  </div>
</template>

<script>
import Column from '@/components/Column'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Main',
  components: {
    Column
  },
  computed: {
    ...mapState([
      'columns'
    ])
  },
  methods: {
    ...mapMutations([
      'addColumn'
    ])
  }
}
</script>
