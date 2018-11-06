import { bookService } from "../services/book.service.js";
import reviewForm from "../cmps/review-form.cmp.js";
import eventBus, { SHOW_USER_MSG } from "../event-bus.js";

export default {
  template: `
        <div v-if="book" class="details-wrap " :class="BGclass">
            <div class="top-container flex row between">
                <div class="info-box">
                <div class="close-btn" @click="backToList" t><i class="fas fa-times"></i></div>
                  <!-- <button ">Back</button> -->
                  <h4>Title: {{book.title}}</h4>
                  <h4>{{age}} </h4>
                  <h4>{{bookLength}}</h4>
                  <h4>Author: {{book.authors[0]}} </h4>
                  <h4>price: {{book.listPrice.amount}}  {{currency}}</h4>
                  <h4>{{this.book.pageCount}} pages </h4>
                  <h4>Published: {{this.book.publishedDate}}  </h4>              
                </div>
                <div class="book-img-wrapper" >
                  <img v-bind:title="book.title" v-bind:src="book.thumbnail" />
                  <img class="sale" src="./img/sale.png" alt="sale" v-if="onSale">
                </div>
            </div>
            <div class="desc">{{this.book.description}}</div>
            <div class="prev-next-btn flex between">
              <router-link :to="'/book/'+prevBookId">< Previous Book</router-link>
                <router-link class="test" :to="'/book/'+nextBookId">Next Book ></router-link>
            </div>
            <review-form :book="this.book"></review-form>
        </div>
    `,
  data() {
    return {
      book: null,
      nextBookId: null,
      prevBookId: null,
    };
  },
  methods: {
    backToList() {
      this.$router.push("/book");
    },
    // getBookById() {
    //   bookService.getBookById(this.$route.params.bookId)
    //   .then(book => this.book = book)
    // },

    loadBookData() {
      const bookId = this.$route.params.bookId;
      console.log('routerBookId',bookId)
      bookService.getBookById(bookId).then(book => {
        this.book = book;
        console.log({ book });
      });

      bookService.nextBook(bookId).then(nextBook => {
        this.nextBookId = nextBook.id;
        console.log("nextbookId", nextBook.id);
      });
      bookService.prevBook(bookId).then(prevBook => {
        this.pervBookId = prevBook.id;
        console.log("prevBookId", prevBook.id);
      });
    }
  },

  computed: {
    currency() {
      switch (this.book.listPrice.currencyCode) {
        case "USD":
          return "$";
        case "ILS":
          return "₪";
        case "EUR":
          return "€";
        default:
          return "";
      }
    },
    bookLength() {
      if (this.book.pageCount > 500) return "Long reading";
      if (this.book.pageCount > 200) return "Decent Reading";
      else return "Light Reading";
    },
    age() {
      if (this.book.publishedDate < new Date().getFullYear() - 10)
        return "veteran Book";
      if (this.book.publishedDate > new Date().getFullYear() - 1) return "New!";
    },
    BGclass() {
      return {
        green: this.book.listPrice.amount > 150,
        red: this.book.listPrice.amount < 20
      };
    },
    onSale() {
      return this.book.listPrice.isOnSale;
    }
  },
  created() {
    this.loadBookData();

    // this.getBookById();
  },
  components: {
    reviewForm
  },
  watch: {
    "$route.params.bookId": function(id, prevValue) {
      console.log("Watch - ROUTE PARAM WAS CHANGED", id, "PREV:", prevValue);
      this.loadBookData();
    }
  }
};
