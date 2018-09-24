import Home from './components/Auth/Home.vue';
import Profile from './components/Profile/Profile.vue';
import Collection from './components/Profile/Profile.vue';
import store from './State/store.js';

export const routes = [
    { 
        path: '', 
        name: 'home',
        component: Home,
        beforeEnter: dissallowAuth    
    },
    { 
        path: '/profile',
        name: 'profile',
        component: Profile,
        beforeEnter: requireAuth    
    }
];

function dissallowAuth(to, from, next) {
    console.log('dissallow')
    let jwt = localStorage.getItem('watchJwt');
    if(!jwt) next();
    else 
    {
        store.dispatch('validateJwt').then(res => {
            if(res.isSuccess) next('/profile');
            else next();
        }).catch((err) => {
            console.log('caught err:', err)
            next();
        })
    }
}

function requireAuth(to, from, next) { 
    console.log('allow')
    let jwt = localStorage.getItem('watchJwt');
    if(jwt) 
    {
        store.dispatch('validateJwt').then(res => {
            if(res.isSuccess) next();
            else next('/');
        }).catch(() => {
            next('/')
        })
    }
    else next('/');
}