import bookList from "../cmps/book-List.cmp.js";
import bookDetails from "./book-details.cmp.js";
import bookFilter from "../cmps/book-filter.cmps.js";
import { bookService } from "../services/book.service.js";
// import { getBookById } from "../services/book.service.js";





export default {
  template: `
        <section class="container">
            <div class="main-page-container">
                <!-- <h1>Books</h1> -->
                <book-filter @set-filter="setFilter" :max="200"></book-filter>
                <book-list  @selected-book="selectedBookId = $event" :books="booksToShow" ></book-list>
            </div>
            <!-- <book-details v-if="selectedBookId" :book="selectedBook" @main-page="selectedBookId = null"></book-details> -->
        </section>
    `,
  data() {
    return {
      books: [],
      filter: null,
      selectedBookId: null
    };
  },
  computed: {
    booksToShow() {
    console.log(this.filter);
        
      if (!this.filter) return this.books;
      return this.books
        .filter(book => book.title.includes(this.filter.byTitle))
        .filter(book => !this.filter.maxPrice || 
            book.listPrice.amount < this.filter.maxPrice ||
            book.listPrice.amount < this.filter.mminPrice
            );
    },
    selectedBook() {
      return this.books.find(book => book.id === this.selectedBookId);
    },
    // max(){
    //     var max = 0;
    //        this.books.then(books=>{books.forEach(book => {if(book.listPrice.amount> max) max = book.listPrice.amount   
    //         console.log(max);
    //        })
    //         return max 
    //        }); 
    // }
  },
  methods: {
    setFilter(filter) {
      this.filter = filter;
    },
 
    loadBooks(){
      bookService.query()
        .then(books=> {this.books= books})
    },
  },
  components: {
    bookList,
    bookFilter,
    bookDetails
  },

  created() {
    // console.log(this.books);
    this.loadBooks()
  }
};
