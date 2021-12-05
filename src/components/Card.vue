<template>
  <div class="card">
    <div
      v-if="isEditing"
      class="flex flex-row justify-between w-full"
    >
      <input
        v-model="copyOfValue"
        type="text"
        class="w-11/12 border-none outline-none border-gray-700 px-4 py-2 rounded-lg shadow-md bg-white"
        placeholder="Введите сюда текст карточки"
      />

      <check-circle-icon
        class="w-6 text-green-700 cursor-pointer ml-2"
        @click="saveChanges"
      />
    </div>

    <span
      v-else
      :class="[
        'w-10/11',
        copyOfValue.length ? 'text-gray-800' : 'text-gray-400'
      ]"
    >
      {{ placeholderText }}
    </span>

    <dots-horizontal-icon
      v-show="!isEditing"
      ref="settings"
      class="card__dots hidden absolute right-2 top-0 bottom-0 my-auto w-6 text-gray-600 cursor-pointer transition-all duration-300"
    />

    <div
      v-if="isModalOpen"
      class="flex flex-col w-56 py-4 px-4 absolute xl:left-full right-10 top-0 bg-white shadow-2xl rounded-lg z-20"
    >
      <div
        class="flex flex-row justify-center w-full py-1.5 rounded-lg bg-gray-100 shadow-md cursor-pointer mb-2 transition-all duration-300 hover:bg-gray-200"
        @click="isEditing = true"
      >
        <pencil-icon class="w-5 text-gray-800 mr-2" />
        <span class="text-base font-semibold text-gray-800">
          Редактировать
        </span>
      </div>

      <div
        class="flex flex-row justify-center w-full py-1.5 rounded-lg bg-red-500 shadow-md cursor-pointer transition-all duration-300 hover:bg-red-600"
        @click="removeCard({ cardIndex, columnIndex })"
      >
        <trash-icon class="w-5 text-white mr-2" />
        <span class="text-base font-semibold text-white">
          Удалить
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CheckCircleIcon,
  DotsHorizontalIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/outline'
import { mapMutations } from 'vuex'
import settingsMixin from '@/mixins/settings.mixin'

export default {
  name: 'Card',
  mixins: [settingsMixin],
  props: {
    value: {
      type: [Object, String, Number],
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    cardIndex: {
      type: Number,
      required: true
    }
  },
  components: {
    CheckCircleIcon,
    DotsHorizontalIcon,
    PencilIcon,
    TrashIcon
  },
  data: () => ({
    copyOfValue: null,
    isModalOpen: false,
    isEditing: false
  }),
  computed: {
    placeholderText () {
      return this.copyOfValue.length ? this.copyOfValue : 'Нажмите редактировать чтобы добавить текст'
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler (value) {
        this.copyOfValue = value
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateCard',
      'removeCard'
    ]),
    saveChanges () {
      this.updateCard({
        cardIndex: this.cardIndex,
        columnIndex: this.columnIndex,
        value: this.copyOfValue
      })

      this.isEditing = false
    }
  }
}
</script>
