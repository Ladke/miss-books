import { bookService } from "../services/book.service.js";
import eventBus, {SHOW_USER_MSG} from '../event-bus.js'


export default {
  props: ["book"],
  template: `
           <div>
                <div class="review-control">
                  <button @click="onReview=!onReview">{{addReviewBtn}}</button>
                  <button @click="showReviews=!showReviews">{{toggleReviewBtn}}</button>
               </div>
                <form v-if="onReview" @submit.prevent="submitForm">
                    <div class="form-input"> Name <input type="text"  v-model="review.name" placeholder="John Deer"/></div>
                    <div class="form-input"> Read at <input type="date"  v-model="review.dateRead" /></div>
                    <div class="rating"> Rating 
                        <span >
                            <span class="fa fa-star" @click="review.rating = 1"></span>
                            <span class="fa fa-star" @click="review.rating = 2"></span>
                            <span class="fa fa-star" @click="review.rating = 3"></span>
                            <span class="fa fa-star" @click="review.rating = 4"></span>
                            <span class="fa fa-star" @click="review.rating = 5"></span>
                        </span>
                    </div>
                    <textarea rows="4" cols="70" placeholder="Share your thoughts..." v-model="review.desc"></textarea>
                    <button type="submit">Submit </button>
                </form>
  
                <div class="reviews-container" v-if="showReviews" v-for="review in book.reviews" >
                    <h4>Reviewer's Name: <span>{{review.name}}</span></h4>
                    <h4>Date read: <span>{{review.dateRead}}</span></h4>
                    <h4>Rating: <span>{{review.rating}}</span></h4>
                    <h4>details: <span>{{review.desc}}</span></h4>
                </div>
            </div>
`,
  data() {
    return {
      onReview: false,
      showReviews: false,
      reviewMsg: "Add Review",

      review: {
        name: null,
        rating: null,
        dateRead: null,
        desc: null
      }
    };
  },
  methods: {
    submitForm() {
      this.onReview = false;
      bookService.addReview(this.book.id, this.review)
      console.log(this.book);
      eventBus.$emit(SHOW_USER_MSG, {type: 'success', txt: 'review added'});
    },
  },
  computed: {
      addReviewBtn(){
         return (this.onReview)?  `Close` : 'Add Review'
      },
      toggleReviewBtn(){
        return (this.showReviews)?  'Hide Reviews' : 'Show Reviews'
     },
  },

  created() {
    // console.log("book review");
  }
};
