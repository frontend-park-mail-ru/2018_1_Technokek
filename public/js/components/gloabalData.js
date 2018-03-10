'use strict';

import Rules from '../modules/downscreen/downsections/rules/rules.js';
import Profile from '../modules/downscreen/downsections/profile/profile.js';
import Scoreboard from '../modules/downscreen/downsections/scoreboard/scoreboard.js';



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

    get tabsOptions() {
        return [
            {
                name: 'profile',
                title: 'Profile',
                avaliable: false,
                active: false,
                sectionType: Profile,
                authDepends: true
            },
            {
                name: 'rules',
                title: 'Rules',
                avaliable: true,
                active: false,
                sectionType: Rules,
                authDepends: false
            },
            {
                name: 'scoreboard',
                title: 'Scoreboard',
                avaliable: true,
                active: false,
                sectionType: Scoreboard,
                authDepends: false
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
                        options: {
                            id: 'auth-email',
                            type: globalValues.inputTypes.email,
                            label: 'Email',
                            name: 'email',
                            placeholder: 'Email'
                        }
                    },
                    {
                        options: {
                            id: 'auth-password',
                            type: globalValues.inputTypes.password,
                            label: 'Password',
                            name: 'password',
                            placeholder: 'Password'
                        }
                    }
                ],
                submitBtnText: 'Login!',
                changeFormBtn: {
                    text: 'Registration'
                }
            },

            signupForm: {
                formTitle: 'Registration',
                fields: [
                    {
                        options: {
                            label: 'Nickname',
                            type: globalValues.inputTypes.text,
                            placeholder: 'Nickname',
                            id: 'signup-nickname',
                            name: 'nickname'
                        }
                    },
                    {
                        options: {
                            label: 'Email',
                            type: globalValues.inputTypes.email,
                            placeholder: 'Email',
                            id: 'signup-email',
                            name: 'email'
                        }
                    },
                    {
                        options: {
                            label: 'Password',
                            type: globalValues.inputTypes.password,
                            placeholder: 'Password',
                            id: 'signup-password',
                            name: 'password'
                        }
                    },
                    {
                        options: {
                            label: 'Repeat рassword',
                            type: globalValues.inputTypes.password,
                            placeholder: 'Repeat password',
                            id: 'signup-repeat-password',
                            name: 'repeat-password'
                        }
                    }
                ],
                submitBtnText: 'Register!',
                changeFormBtn: {
                    text: 'Login'
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