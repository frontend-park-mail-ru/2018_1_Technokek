'use strict';

import Rules from '../modules/downsections/rules/rules.js';
import Profile from '../modules/downsections/profile/profile.js';
import Scoreboard from '../modules/downsections/scoreboard/scoreboard.js';



class GlobalValues {
    constructor() {
        this._apiUrls = {
            GET: {
                USER: '/user',
                HISTORY: '/history',
                SCOREBOARD: '/scoreboard',
                ABOUT: '/about',
                RULES: '/rules',
                ME: '/me'
            },
        
            POST: {
                AUTH: '/login',
                SIGNUP: '/register',
                LOGOUT: '/logout',
                EDIT_USER: '/user'
            }
        }
    }

    get initialTabs() {
        return [
            {
                title: 'Profile',
                jsClass: 'js-profile-section',
                sectionSelect: Profile
            },
            {
                title: 'Rules',
                jsClass: 'js-rules-section',
                sectionSelect: Rules
            },
            {
                title: 'Scoreboard',
                jsClass: 'js-scoreboard-section',
                sectionSelect: Scoreboard
            }
        ];
    }

    get tabsOptions() {
        return [
            {
                name: 'profile',
                title: 'Profile',
                avaliable: true,
                active: false 
            },
            {
                name: 'rules',
                title: 'Rules',
                avaliable: true,
                active: false 
            },
            {
                name: 'scoreboard',
                title: 'Scoreboard',
                avaliable: true,
                active: false 
            },
        ]
    }

    get inputTypes() {
        return {
            email: 'email',
            password: 'password',
            text: 'text'
        };
    }

    get formsOptions() {
        return {
            authForm: {
                formTitle: 'Login',
                fields: [
                    {
                        label: 'Email',
                        type: globalValues.inputTypes.email,
                        placeholder: 'Email',
                        id: 'auth-email',
                        name: 'email'
                    },
                    {
                        label: 'Password',
                        type: globalValues.inputTypes.password,
                        placeholder: 'Password',
                        id: 'auth-password',
                        name: 'password'
                    }
                ],
                buttons: {
                    submit: {
                        text: 'Login!'
                    },
                    changeForm: {
                        text: 'Registration'
                    }
                }
            },

            signupForm: {
                formTitle: 'Registration',
                fields: [
                    {
                        label: 'Nickname',
                        type: globalValues.inputTypes.text,
                        placeholder: 'Nickname',
                        id: 'signup-nickname',
                        name: 'nickname'
                    },
                    {
                        label: 'Email',
                        type: globalValues.inputTypes.email,
                        placeholder: 'Email',
                        id: 'signup-email',
                        name: 'email'
                    },
                    {
                        label: 'Password',
                        type: globalValues.inputTypes.password,
                        placeholder: 'Password',
                        id: 'signup-password',
                        name: 'password'
                    },
                    {
                        label: 'Repeat рassword',
                        type: globalValues.inputTypes.password,
                        placeholder: 'Repeat password',
                        id: 'signup-repeat-password',
                        name: 'repeat-password'
                    }
                ],
                buttons: {
                    submit: {
                        text: 'Register!'
                    },
                    changeForm: {
                        text: 'Login'
                    }
                }
            }
        };
    }

    get apiUrls() {
        return this._apiUrls;
    }
}

const globalValues = new GlobalValues();

export default globalValues;