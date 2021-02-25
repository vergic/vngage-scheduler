const UglifyJS = require('uglify-js');

module.exports = function minifyLoader(source) {
    const minified = UglifyJS.minify(source, {mangle: {toplevel:true}});
    return minified.code;
};
