export default {
    props: ["max"],
    template: `
    <section>
        <h3>Filter</h3>
        <form @submit.prevent>
            By Title <input type="text"  v-model="filter.byTitle" />
            Min Price: <input type="text" v-model.number="filter.minPrice"/>
            Max Price: <input type="text" v-model.number="filter.maxPrice"/>
            <button class="go" @click="setFilter">Go</button>
            <button class="go" @click="ClearFilter">Clear Filter</button>
        </form>
    </section>
    `,
    data() {
        return {
            filter: {
                byTitle: '',
                maxPrice: this.max,
                minPrice: 0,
            },
        }
    },
    methods: {
        setFilter() {
            this.$emit('set-filter', this.filter);
        },
        ClearFilter(){
            this.filter.byTitle = '';
            this.filter.maxPrice = this.max;
            this.filter.minPrice = 0;
        },

    }
}