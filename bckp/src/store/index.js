import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // graph: [{
    //     name: "a",
    //     child: []
    //   },
    //   {
    //     name: "b",
    //     child: []
    //   },
    //   {
    //     name: "c",
    //     child: []
    //   },
    // ]
    graph: [{
        name: "a",
        child: [{
            name: "b",
            weight: 4
          },
          {
            name: "c",
            weight: 2
          }
        ]
      },
      {
        name: "b",
        child: [{
            name: "a",
            weight: 4
          },
          {
            name: "c",
            weight: 1
          },
          {
            name: "d",
            weight: 5
          }
        ]
      },
      {
        name: "c",
        child: [{
            name: "a",
            weight: 2
          },
          {
            name: "b",
            weight: 1
          },
          {
            name: "d",
            weight: 8
          },
          {
            name: "e",
            weight: 10
          }
        ]
      },
      {
        name: "d",
        child: [{
            name: "b",
            weight: 5
          },
          {
            name: "c",
            weight: 8
          },
          {
            name: "e",
            weight: 2
          },
          {
            name: "z",
            weight: 6
          }
        ]
      },
      {
        name: "e",
        child: [{
            name: "c",
            weight: 10
          },
          {
            name: "d",
            weight: 2
          },
          {
            name: "z",
            weight: 5
          }
        ]
      },
      {
        name: "z",
        child: [{
            name: "e",
            weight: 5
          },
          {
            name: "d",
            weight: 6
          }
        ]
      }
    ],
  },
  mutations: {
    clear() {
      this.state.graph = [{
          name: "a",
          child: []
        },
        {
          name: "b",
          child: []
        },
        {
          name: "c",
          child: []
        },
      ]
    },
    example() {
      this.state.graph = [{
          name: "a",
          child: [{
              name: "b",
              weight: 4
            },
            {
              name: "c",
              weight: 2
            }
          ]
        },
        {
          name: "b",
          child: [{
              name: "a",
              weight: 4
            },
            {
              name: "c",
              weight: 1
            },
            {
              name: "d",
              weight: 5
            }
          ]
        },
        {
          name: "c",
          child: [{
              name: "a",
              weight: 2
            },
            {
              name: "b",
              weight: 1
            },
            {
              name: "d",
              weight: 8
            },
            {
              name: "e",
              weight: 10
            }
          ]
        },
        {
          name: "d",
          child: [{
              name: "b",
              weight: 5
            },
            {
              name: "c",
              weight: 8
            },
            {
              name: "e",
              weight: 2
            },
            {
              name: "z",
              weight: 6
            }
          ]
        },
        {
          name: "e",
          child: [{
              name: "c",
              weight: 10
            },
            {
              name: "d",
              weight: 2
            },
            {
              name: "z",
              weight: 5
            }
          ]
        },
        {
          name: "z",
          child: [{
              name: "e",
              weight: 5
            },
            {
              name: "d",
              weight: 6
            }
          ]
        }
      ]
    }
  },
  actions: {},
  modules: {}
})