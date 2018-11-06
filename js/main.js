
import userMsg from './cmps/user-msg.cmp.js'
import myRoutes from './routes.js'


Vue.use(VueRouter);
const myRouter = new VueRouter({routes: myRoutes})

new Vue({
    el: '#app',
    router: myRouter,
    components: {
        userMsg,

    }
})
