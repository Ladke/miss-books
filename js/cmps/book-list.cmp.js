import bookPreview from './book-preview.cmp.js';

export default {
    props: ['books'],
    template: `
            <ul class="book-list">
                <book-Preview  v-for="currBook in this.books"
                            :key="currBook.id"
                            :book="currBook" @click.native="bookClicked(currBook.id)">
                </book-Preview>
            </ul>
`,
    methods: {

        bookClicked(id) {    
            this.$router.push(`/book/${id}`)
            console.log('book selected');
            this.$emit('selected-book', id);
        }
    },
    computed: {
        currency(){          
              switch (this.book.listPrice.currencyCode) {
                  case 'USD':
                      return '$'
                      case 'ILS':
                      return '₪'
                      case 'EUR':
                      return '€'
                  default:
                        return ''
              }
        }
    },

    created() {
        console.log('book-Preview was created!', this.book);
    },

    components: {
        bookPreview,
    },

}