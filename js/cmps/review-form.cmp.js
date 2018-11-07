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
                    <div class="form-input"> Name <input type="text"  v-model="review.name" placeholder=" John Dear"/></div>
                    <div class="form-input"> Read at <input type="date"  v-model="review.dateRead" /></div>
                    <div class="rating"> Rating 
                        <span >
                            <span :class="{ checked: this.review.rating >=1 || this.review.hover >=1 }" class="fa fa-star" 
                            @click="review.rating = 1" @mouseover="review.hover = 1" @mouseout="review.hover = null" ></span>
                            <span :class="{ checked: this.review.rating >=2 || this.review.hover >=2 }" class="fa fa-star" 
                            @click="review.rating = 2" @mouseover="review.hover = 2" @mouseout="review.hover = null" ></span>
                            <span :class="{ checked: this.review.rating >=3 || this.review.hover >=3 }" class="fa fa-star" 
                            @click="review.rating = 3" @mouseover="review.hover = 3" @mouseout="review.hover = null" ></span>
                            <span :class="{ checked: this.review.rating >=4 || this.review.hover >=4 }" class="fa fa-star" 
                            @click="review.rating = 4" @mouseover="review.hover = 4" @mouseout="review.hover = null" ></span>
                            <span :class="{ checked: this.review.rating >=5 || this.review.hover >=5 }" class="fa fa-star" 
                            @click="review.rating = 5" @mouseover="review.hover = 5" @mouseout="review.hover = null" ></span>

                        </span>
                    </div>
                    <textarea rows="4" cols="70" placeholder="Share your thoughts..." v-model="review.desc"></textarea>
                    <button type="submit">Submit </button>
                </form>
  
                <div class="review-container" v-if="showReviews" v-for="(review, idx) in book.reviews" >
                    <div @click="deleteReview(book.id, idx)" class="closeRev" title="Delete Review">X</div>
                    <h4><span>{{idx+1}}. </span> Reviewer's Name: <span>{{review.name}}</span></h4>
                    <h4>Date read: <span>{{review.dateRead}}</span></h4>
                    <h4>Rating: <span>{{review.rating}}</span></h4>
                    <h4>details: <span>{{review.desc}}</span></h4>
                    <hr>
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
        hover: null,
        dateRead: null,
        desc: null
      }
    };
  },
  methods: {
    submitForm() {
      if(!this.review.rating) return
      if (!this.review.name) this.review.name = 'Book Reader'

      bookService.addReview(this.book.id, this.review)
      
      eventBus.$emit(SHOW_USER_MSG, {type: 'success', txt: 'Thank you for adding a review'});
      this.onReview = false;
      // this.clearForm();
   
    },

    clearForm(){
      if(!this.onReview){
      this.review.name = null;
      this.review.rating = null;
      this.review.dateRead = null;
      this.review.desc = null;
      }
    },
    deleteReview(bookId, idx){
      bookService.deleteReview(bookId, idx)
      
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

  }
};
