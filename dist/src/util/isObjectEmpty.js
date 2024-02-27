export function isObjectEmpty(obj) {
    if (typeof obj === "undefined")
        return true;
    if (typeof obj !== "object")
        return false;
    return Object.keys(obj).length == 0;
}
