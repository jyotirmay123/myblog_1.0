"use strict";
var BlogData = (function () {
    function BlogData() {
    }
    BlogData.prototype.createDb = function () {
        var blogData = [
            { blogDate: 12022002, blogContent: "content1", blogger: "JJ", blogId: 0 },
            { blogDate: 13022002, blogContent: "content12", blogger: "JJ", blogId: 1 }
        ];
        return { BlogData: BlogData };
    };
    return BlogData;
}());
exports.BlogData = BlogData;
//# sourceMappingURL=BlogData.js.map