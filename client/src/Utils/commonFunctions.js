export const cartDataFromLocalStorage = (name, action, value) => {
    if (name && action === "get") {
        return JSON.parse(localStorage.getItem(name));
    }
    if (name && action === "set") {
        localStorage.setItem(name, JSON.stringify(value));
    }
    if (name && action === "remove") {
        localStorage.removeItem(name)
    }
}