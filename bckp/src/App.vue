<template>
  <div id="app">
    <div class="container mx-auto flex flex-col p-10">
      <div class="flex">
        <h1 class="text-3xl">Calculating the shortest path:</h1>
        <button class="bg-green-600 mx-2 px-3 py-2 text-white" @click="example()">Example 1</button>
        <button class="bg-black mx-2 px-3 py-2 text-white" @click="clear()">Clear</button>
      </div>
      <div class="flex flex-col">
        <div
          class="p-3 flex items-center justify-start"
          v-for="(item, index) in graph"
          :key="index"
        >
          <h1>
            <b>Vertice</b>
            {{index+1}}:
          </h1>
          <input v-model="item.name" class="border w-8 ml-1 px-1" />
          <child v-model="item.child"></child>
          <button class="bg-red-600 h-10 text-xs mx-2 px-3 py-1 text-white" @click="remove(index)">
            Delete
            <br />vertex
          </button>
        </div>
      </div>
      <div class="flex">
        <button class="bg-blue-600 h-10 mx-2 px-3 py-1 text-white" @click="addVertex()">Add vertex</button>
      </div>
      <div class="flex justify-center mt-8">
        <div class="flex flex-col">
          <div class="flex">
            <h1>Start node:</h1>
            <input
              v-model="startNode"
              class="border w-20 mx-2 border-gray-900 pl-1"
              placeholder="a"
            />
            <h1 class="ml-4">End node:</h1>
            <input v-model="endNode" class="border w-20 mx-2 border-gray-900 pl-1" placeholder="z" />
          </div>

          <button
            class="bg-purple-600 mt-5 mx-2 px-3 py-2 text-xl text-white"
            @click="calculate()"
          >Calculate the shortest path</button>
        </div>
      </div>
      <div>
        <h1 class="text-xl">Distance: {{result.distance}}</h1>
        <h1 class="text-xl">
          Path:
          <div class="flex justify-center">
            <span class="mx-1 flex items-center" v-for="(item, index) in result.path" :key="index">
              {{item}}
              <svg
                v-if="!(index === result.path.length-1)"
                style="width:24px;height:24px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
                />
              </svg>
            </span>
          </div>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import Child from "./components/Child.vue";
const lowestCostNode = (costs, processed) => {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]) {
      if (!processed.includes(node)) {
        lowest = node;
      }
    }
    return lowest;
  }, null);
};
function log(message) {
  const logging = false;
  if (logging) {
    console.log(message);
  }
}
const dijkstra = (graph, startNodeName, endNodeName) => {
  // track the lowest cost to reach each node
  let costs = {};
  costs[endNodeName] = "Infinity";
  costs = Object.assign(costs, graph[startNodeName]);

  // track paths
  const parents = {
    endNodeName: null
  };
  for (let child in graph[startNodeName]) {
    parents[child] = startNodeName;
  }

  // track nodes that have already been processed
  const processed = [];

  let node = lowestCostNode(costs, processed);

  while (node) {
    let cost = costs[node];
    let children = graph[node];
    for (let n in children) {
      if (String(n) === String(startNodeName)) {
        log("WE DON'T GO BACK TO START");
      } else {
        log("StartNodeName: " + startNodeName);
        log(
          "Evaluating cost to node " + n + " (looking from node " + node + ")"
        );
        log("Last Cost: " + costs[n]);
        let newCost = cost + children[n];
        log("New Cost: " + newCost);
        if (!costs[n] || costs[n] > newCost) {
          costs[n] = newCost;
          parents[n] = node;
          log("Updated cost und parents");
        } else {
          log("A shorter path already exists");
        }
      }
    }
    processed.push(node);
    node = lowestCostNode(costs, processed);
  }

  let optimalPath = [endNodeName];
  let parent = parents[endNodeName];
  while (parent) {
    optimalPath.push(parent);
    parent = parents[parent];
  }
  optimalPath.reverse();

  const results = {
    distance: costs[endNodeName],
    path: optimalPath
  };

  return results;
};
export default {
  name: "App",
  components: {
    Child
  },
  data() {
    return {
      newObj: {},
      startNode: "",
      endNode: "",
      result: {}
    };
  },
  computed: {
    graph() {
      return this.$store.state.graph;
    }
  },
  methods: {
    addVertex() {
      this.graph.push({ name: "", child: [] });
    },
    remove(index) {
      this.graph.splice(index, 1);
    },
    calculate() {
      for (const z of this.graph) {
        let temp = {};
        for (const i of z.child) {
          temp[i.name.toUpperCase()] = i.weight;
        }
        this.newObj[z.name.toUpperCase()] = temp;
      }
      console.log(this.startNode.toUpperCase());
      console.log(this.endNode.toUpperCase());
      this.result = dijkstra(
        this.newObj,
        this.startNode.toUpperCase(),
        this.endNode.toUpperCase()
      );
    },
    example() {
      this.$store.commit("example");
    },
    clear() {
      this.$store.commit("clear");
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
