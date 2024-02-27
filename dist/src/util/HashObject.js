export function HashObject(obj) {
    const str = typeof obj == "string"
        ? obj
        : typeof obj == "object" && typeof obj.toString == "function"
            ? obj.toString()
            : JSON.stringify(obj);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
