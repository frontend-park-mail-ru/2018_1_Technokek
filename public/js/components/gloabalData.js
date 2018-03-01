'use strict';

import Rules from '../modules/downsections/rules/rules.js';
import Profile from '../modules/downsections/profile/profile.js';
import Scoreboard from '../modules/downsections/scoreboard/scoreboard.js';

class GlobalValues {
    get initialTabs() {
        return [
            {
                title: 'Vilaly Cherkov',
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
}

const globalValues = new GlobalValues();

export default globalValues;