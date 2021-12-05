<template>
  <div class="flex flex-row items-center justify-between w-full mb-4">
    <h2
      v-if="!isEditing"
      class="text-base font-semibold text-gray-800 w-10/12"
    >
      {{ name }}
    </h2>

    <div
      v-else
      class="flex flex-row justify-between w-10/12"
    >
      <input
        v-model="copyOfName"
        type="text"
        class="w-11/12 outline-none border-none border-gray-800 rounded-lg py-1 px-4 shadow-lg"
      >

      <check-circle-icon
        class="w-6 text-green-700 cursor-pointer ml-2"
        @click="saveChanges"
      />
    </div>

    <div class="relative">
      <dots-horizontal-icon
        ref="settings"
        class="w-5 text-gray-600 transition-all duration-300 hover:text-gray-900 cursor-pointer"
      />

      <div
        v-if="isModalOpen"
        class="flex flex-col w-56 py-4 px-4 absolute xl:left-0 right-full top-5 bg-white shadow-2xl rounded-lg z-10"
      >
        <div
          class="flex flex-row justify-center w-full py-1.5 rounded-lg bg-gray-100 shadow-md cursor-pointer mb-2 transition-all duration-300 hover:bg-gray-200"
          @click="isEditing = !isEditing"
        >
          <pencil-icon class="w-5 text-gray-800 mr-2" />
          <span class="text-base font-semibold text-gray-800">
            Редактировать
          </span>
        </div>

        <div
          class="flex flex-row justify-center w-full py-1.5 rounded-lg bg-red-500 shadow-md cursor-pointer transition-all duration-300 hover:bg-red-600"
          @click="removeColumn(columnIndex)"
        >
          <trash-icon class="w-5 text-white mr-2" />
          <span class="text-base font-semibold text-white">
            Удалить
          </span>
        </div>
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
  name: 'Settings',
  mixins: [settingsMixin],
  components: {
    CheckCircleIcon,
    DotsHorizontalIcon,
    PencilIcon,
    TrashIcon
  },
  props: {
    columnIndex: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data: () => ({
    isModalOpen: false,
    isEditing: false,
    copyOfName: null
  }),
  watch: {
    name: {
      immediate: true,
      handler (value) {
        this.copyOfName = value
      }
    }
  },
  methods: {
    ...mapMutations([
      'removeColumn',
      'renameColumn'
    ]),
    saveChanges () {
      this.renameColumn({
        index: this.columnIndex,
        value: this.copyOfName
      })
      this.isEditing = false
    }
  }
}
</script>
