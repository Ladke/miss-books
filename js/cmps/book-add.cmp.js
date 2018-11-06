export default {
    // props: ["book"],
    template: `
             <div>
                 <button @click="addBook">{{searchWord}}</button>
                 <input type="text" v-modal:="searchWord">

               
              </div>
  `,
    data() {
      return {
          searchWord: null,
 
      };
    },
    methods: {
        addBook(){

        }
    },
    computed: {
  
    },
  
    created() {
      // console.log("book review");
    }
  };
  