export default {
    props: ['book'],
    template: `
        <li class="book-card">
            <div class="prev-wrapper flex between column">
                <h4 class="preview-title">{{book.title}}</h4>
                <h4>price: {{book.listPrice.amount}} {{currency}}</h4>
                
            </div>
            <img v-bind:title="book.title" v-bind:src="book.thumbnail"/>
        </li>
`,
    methods: {
     
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
        console.log('book-Preview was created!');
    }
}