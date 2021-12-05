<template>
  <div class="flex flex-col items-start w-full py-8 px-4 bg-white rounded-lg">
    <card-header
      :columnIndex="index"
      :name="name"
    />

    <div class="flex flex-row justify-between w-full">
      <input
        v-model="search"
        type="text"
        class="w-11/12 rounded-lg py-1 px-4 outline-none border border-gray-300"
      >

      <x-circle-icon
        v-if="search"
        class="w-5 text-red-500 cursor-pointer"
        @click="search = ''"
      />

      <search-circle-icon
        v-else
        class="w-5 text-gray-600"
      />
    </div>

    <div
      class="flex flex-col py-4 justify-center w-full"
      @drop="onDrop($event, index)"
      @dragenter.prevent
      @dragover.prevent
    >
      <card
        v-for="(card, key) in searchingCard"
        :key="key"
        :value="card.value"
        :columnIndex="index"
        :cardIndex="key"
        draggable="true"
        @dragstart="startDrag($event, card, index, key)"
      />

      <span
        v-if="!cards.length"
        class="text-base text-center font-normal text-gray-900"
      >
        У вас пока что нету карточек
      </span>
    </div>

    <div
      class="w-full text-center text-base font-normal px-4 py-2 rounded-lg bg-blue-700 text-white mt-4 cursor-pointer transition-all duration-300 hover:bg-blue-800"
      @click="addCard(index)"
    >
      + Добавить еще одну карточку
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'
import CardHeader from '@/components/Settings'
import { mapMutations, mapState } from 'vuex'
import { SearchCircleIcon, XCircleIcon } from '@heroicons/vue/outline'

export default {
  name: 'Column',
  components: {
    Card,
    CardHeader,
    SearchCircleIcon,
    XCircleIcon
  },
  props: {
    name: {
      type: String,
      required: true
    },
    cards: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    search: ''
  }),
  computed: {
    ...mapState([
      'columns'
    ]),
    searchingCard () {
      return this.search.length ? this.cards.filter(item => item.value.indexOf(this.search) !== -1) : this.cards
    }
  },
  methods: {
    ...mapMutations([
      'addCard',
      'movingCard'
    ]),
    startDrag (event, item, columnIndex, cardIndex) {
      const draggingData = JSON.stringify({
        itemUUID: item.uuid,
        sourceColumnIndex: columnIndex,
        cardIndex
      })

      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('draggingData', draggingData)
    },
    onDrop (event, targetColumnIndex) {
      const { sourceColumnIndex, cardIndex, itemUUID } = JSON.parse(event.dataTransfer.getData('draggingData'))
      const card = this.columns[sourceColumnIndex].cards.find(item => item.uuid === itemUUID)

      this.movingCard({
        sourceColumnIndex: sourceColumnIndex,
        targetColumnIndex,
        cardIndex,
        card
      })
    }
  }
}
</script>
