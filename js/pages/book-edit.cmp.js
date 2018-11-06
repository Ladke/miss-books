import { bookService } from "../services/book.service.js";


export default {
    // props: ["book"],
    template: `
             <div class="search-container">
                 <input @input="searchBook" type="text" v-model="searchWord" placeholder="Search a Book">
                 <ul>
                     <li v-bind:class="{ light: isClicked }" class="search-line flex between" v-if="suggestedBooks" v-for="(book, idx) in suggestedBooks">
                        <span>{{book.volumeInfo.title}}</span> 
                        <span  @click="addBook(book, idx)"><i title="Click To Add Book" @click="isClicked=true" class="fas fa-plus-circle"></i></span>
                     </li>
                 </ul>

               
              </div>
  `,
    data() {
      return {
        isClicked: false,
        searchWord: null,
        suggestedBooks: null,
      };
    },
    methods: {
        searchBook(){
            var keyword = this.searchWord;
            bookService.searchGoogleBook(keyword)
            .then(res=> {
                this.suggestedBooks = res.data.items;
                console.log(this.suggestedBooks)
            })
            .catch(err => console.log('GOT ERROR', err)
            ) 
        },
        
        addBook(googleBook, idx){ 
            bookService.addGoogleBook(googleBook)
        },
    },
  
    created() {

    }
  };
  

