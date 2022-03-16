const Defaults = require('./default');
const validation = {};

validation.isNumber = (n) => {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

validation.isEmail = (email) => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(email);
}

validation.isPhoneNumber = (phone_number) => {
    return (phone_number.length == 10) && validation.isNumber(phone_number);
}

validation.isGender = (gender) => {
    return (gender == 1 || gender == 0);
}

validation.isDate = (date) => {
    var numbers;

    if (date.indexOf('-') > -1) {
        numbers = date.split('-');
    } else if (date.indexOf('/') > -1) {
        numbers = date.split('/');
    } else {
        return false;
    }

    if (numbers.length != 3) return false;

    let dateReal = new Date(Number(numbers[0]), Number(numbers[1]) - 1, Number(numbers[2]));

    if (dateReal.getFullYear() == Number(numbers[0]) && dateReal.getMonth() == Number(numbers[1]) - 1 && dateReal.getDate() == Number(numbers[2])) {

        return true;
    } else {
        return false;
    }

}

validation.isValidAge = (dateOfBirth) => {

    var numbers;

    if (dateOfBirth.indexOf('-') > -1) {
        numbers = dateOfBirth.split('-');
    } else if (dateOfBirth.indexOf('/') > -1) {
        numbers = dateOfBirth.split('/');
    } else {
        return false;
    }

    let dateReal = new Date();
    if (dateReal.getFullYear() - Number(numbers[0]) < Defaults.minimumAge || dateReal.getFullYear() - Number(numbers[0]) > Defaults.maximumAge) {
        return false;
    } else {
        return true;
    }
}

validation.isImage = (link) => {
    const img = new Image();
    img.src = link;

    if (img.complete) {
        console.log(1);
        return true;

    } else {
        img.onload = () => {
            console.log(2);
            return true;
        };

        img.onerror = () => {
            console.log(3);
            return false;
        };
    }
}

module.exports = validation;