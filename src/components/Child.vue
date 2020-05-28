<template>
  <div class="flex items-center">
    <h1 class="mx-4 font-bold">Child nodes:</h1>
    <div class="border flex p-2">
      <div
        class="flex items-center border-r-2 border-black pr-2 mr-2"
        v-for="(x, xindex) in value"
        :key="xindex"
      >
        <div class="flex flex-col">
          <div class="flex justify-between">
            <p class>name:</p>
            <input class="border w-12 px-1" v-model="x.name" />
          </div>
          <div class="flex justify-between">
            <p>weight:</p>
            <input type="number" class="border ml-1 w-12 px-1" v-model="x.weight" />
          </div>
        </div>
        <button class="bg-red-600 h-10 w-10 mx-2 px-3 py-1 text-white" @click="remove(xindex)">-</button>
      </div>
      <!-- add child -->
      <div class="flex flex-col mr-2" v-if="add">
        <div class="flex justify-between">
          <p class>name:</p>
          <input class="border w-12 px-1" v-model="tName" />
        </div>
        <div class="flex justify-between">
          <p>weight:</p>
          <input type="number" class="border ml-1 w-12 px-1" v-model="tWeight" />
        </div>
      </div>
      <button v-if="!add" class="bg-green-600 px-3 py-1 text-white" @click="add =!add">Add child</button>
      <button v-else-if="add" class="bg-green-600 px-3 py-1 text-white" @click="save()">Save</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["value"],
  data() {
    return {
      add: false,
      tName: "",
      tWeight: 0
    };
  },
  methods: {
    remove(index) {
      this.value.splice(index, 1);
      this.$emit("input", this.value);
    },
    save() {
      this.value.push({ name: this.tName, weight: this.tWeight });
      this.$emit("input", this.value);

      this.tName = "";
      this.tWeight = 0;
      this.add = !this.add;
    }
  }
};
</script>