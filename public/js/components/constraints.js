'use strict';

const errors = {
    required: 'This field is required',
    minLength: (value) => `The minimum length is ${value} symbols`,
    maxLength: (value) => `The maximum length is ${value} symbols`,
    passwordsDontMatch: 'Passwords do not match'
};

class Required {
    get text() {
        return errors.required;
    }

    check(value) {
        return !(value == null || value === '');
    }
}

class MinLength {
    constructor(minLength) {
        this._minLenth = minLength;
    }

    get text() {
        return errors.minLength(this._minLenth);
    }

    check(value) {
        return !(value == null || value.toString.length < this._minLenth);
    }
}

class MaxLength {
    constructor(maxLength) {
        this._maxLenth = maxLength;
    }

    get text() {
        return errors.maxLength(this._maxLenth);
    }

    check(value) {
        return !(value == null || value.toString.length > this._maxLenth);
    }
}

export default errors;

export { Required, MinLength, MaxLength };