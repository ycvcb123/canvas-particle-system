const path = require("path");
module.exports = function(source) {
    if (path.basename(this.resourcePath) === "index.js") {
        // 注入加载代码
        return `require("normalize.css");
        if (process.env.NODE_ENV === "development") {
        require("./index.html");
    };` + source;
    }
    return source
}