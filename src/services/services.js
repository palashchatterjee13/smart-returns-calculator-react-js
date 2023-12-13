const initialValues = {
    principal: 10000,
    rate: 3,
    count: 5,
    currency: "₹",
    rateType: "FIX",
    duration: "T",
    active: "V"
}

const values = 'values12122022';

function save(key,value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function read(key) {
    return JSON.parse(localStorage.getItem(key));
}
export { initialValues, values, read, save }