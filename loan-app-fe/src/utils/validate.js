export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validateCurrency = (inputValue, prev = "") => {
    if (inputValue === "") return 0;

    if (inputValue[0] === "0") inputValue = inputValue.substr(1);

    if (/^\d*\.?\d*$/.test(inputValue) && parseInt(inputValue) >= 0 && parseFloat(inputValue) >= 0) {
        return inputValue;
    }
    return prev;
}

export const validatePhone = (value, prev) => {
    return /^\d{0,10}$/.test(value) ? value : prev;
}

export const validateIdNumber = (value, prev) => {
    return /^\d{0,13}$/.test(value) ? value : prev;
}