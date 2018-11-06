import bookApp from './pages/book-app.cmp.js';
import bookEdit from './pages/book-edit.cmp.js';
import bookDetails from './pages/book-details.cmp.js';
import homePage from './pages/home-page.cmp.js';
import aboutPage from './pages/about-page.cmp.js';



var myRoutes = [
    {path: '/', component: homePage },
    {path: '/about', component: aboutPage },
    {path: '/book', component: bookApp },
    {path: '/book/edit', component: bookEdit },
    {path: '/book/:bookId', component: bookDetails },
]

export default myRoutes;
