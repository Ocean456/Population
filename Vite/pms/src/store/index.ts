import {createStore} from 'vuex';
import axios from 'axios';
import router from "../router";

const api = axios.create({
    baseURL: 'http://localhost:2020/api'
});

export default createStore({
    state: {
        loggedIn: false,
        user: {
            username: '',
            authority: 0,
        },
        menu: false,
    },
    mutations: {
        setLoggedIn(state, loggedIn) {
            state.loggedIn = loggedIn;
        },
        setUser(state, user) {
            state.user = user;
        },
        setMenu(state, menu) {
            state.menu = menu;
        }
    },
    actions: {
        login({commit}, {username, password}) {
            return new Promise((resolve, reject) => {
                api.post('/login', {username, password})
                    .then(response => {
                        const user = response.data;
                        commit('setLoggedIn', true);
                        commit('setUser', user);
                        resolve(user);
                        if (user.authority == 1) {
                            commit('setMenu', true)
                        }
                        localStorage.setItem('user', JSON.stringify(user));
                        localStorage.setItem('authority', JSON.stringify(user.authority));
                        document.body.style.backgroundImage = 'none'
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        logout({commit}) {
            localStorage.removeItem('user');
            commit('setLoggedIn', false);
            commit('setUser', {
                username: null,
                authority: 0,
            });
            commit('setMenu', false)
            // noinspection JSIgnoredPromiseFromCall
            router.push('/login')
        },
        checkLogin({commit, state}) {
            const user = localStorage.getItem('user');
            if (user) {
                commit('setLoggedIn', true);
                commit('setUser', JSON.parse(user));
                if (state.user.authority == 1) {
                    commit('setMenu', true);
                }
            }
        }
    },
    getters: {
        isLoggedIn(state) {
            return state.loggedIn;
        },
        currentUser(state) {
            return state.user;
        },
        MenuUI(state) {
            return state.menu;
        }
    }
});
