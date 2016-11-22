"use strict";
var gallery_1 = require('../models/gallery');
var GalleryUtil = (function () {
    function GalleryUtil() {
    }
    GalleryUtil.convertToGalleryFromImageGallery = function () {
        var galleries = [];
        var index = 1;
        while (index < 10) {
            if (index === 1) {
                var gallery = new gallery_1.Gallery("title" + index, "name" + index, "icon/product.jpg", "580e2b713a0f54145c068858");
                galleries.push(gallery);
            }
            if (index === 2) {
                var gallery = new gallery_1.Gallery("title" + index, "name" + index, "icon/Chrysanthemum.jpg", "580e2b713a0f54145c068858");
                galleries.push(gallery);
            }
            if (index === 3) {
                var gallery = new gallery_1.Gallery("title" + index, "name" + index, "icon/Desert.jpg", "");
                galleries.push(gallery);
            }
            if (index === 4) {
                var gallery = new gallery_1.Gallery("title" + index, "name" + index, "icon/Hydrangeas.jpg", "");
                galleries.push(gallery);
            }
            if (index === 5) {
                var gallery = new gallery_1.Gallery("title" + index, "name" + index, "icon/Jellyfish.jpg", "");
                galleries.push(gallery);
            }
            if (index === 6) {
                var gallery = new gallery_1.Gallery("title" + index, "name" + index, "icon/Koala.jpg", "");
                galleries.push(gallery);
            }
            if (index === 7) {
                var gallery = new gallery_1.Gallery("title" + index, "name" + index, "icon/Lighthouse.jpg", "");
                galleries.push(gallery);
            }
            if (index === 8) {
                var gallery = new gallery_1.Gallery("title" + index, "name" + index, "icon/Penguins.jpg", "");
                galleries.push(gallery);
            }
            if (index === 9) {
                var gallery = new gallery_1.Gallery("title" + index, "name" + index, "icon/Tulips.jpg", "");
                galleries.push(gallery);
            }
            index++;
        }
        return galleries;
    };
    GalleryUtil.convertToGalleryFromProduct = function (product) {
        var galleries = [];
        var index = 1;
        while (index < 10) {
            if (index === 1) {
                var gallery = new gallery_1.Gallery("title" + index, "name" + index, "icon/product.jpg", "580e2b713a0f54145c068858");
                galleries.push(gallery);
            }
            if (index === 2) {
                var gallery = new gallery_1.Gallery("title" + index, "name" + index, "icon/Chrysanthemum.jpg", "580e2b713a0f54145c068858");
                galleries.push(gallery);
            }
            if (index === 3) {
                var gallery = new gallery_1.Gallery("title" + index, "name" + index, "icon/Desert.jpg", "");
                galleries.push(gallery);
            }
            if (index === 4) {
                var gallery = new gallery_1.Gallery("title" + index, "name" + index, "icon/Hydrangeas.jpg", "");
                galleries.push(gallery);
            }
            if (index === 5) {
                var gallery = new gallery_1.Gallery("title" + index, "name" + index, "icon/Jellyfish.jpg", "");
                galleries.push(gallery);
            }
            if (index === 6) {
                var gallery = new gallery_1.Gallery("title" + index, "name" + index, "icon/Koala.jpg", "");
                galleries.push(gallery);
            }
            if (index === 7) {
                var gallery = new gallery_1.Gallery("title" + index, "name" + index, "icon/Lighthouse.jpg", "");
                galleries.push(gallery);
            }
            if (index === 8) {
                var gallery = new gallery_1.Gallery("title" + index, "name" + index, "icon/Penguins.jpg", "");
                galleries.push(gallery);
            }
            if (index === 9) {
                var gallery = new gallery_1.Gallery("title" + index, "name" + index, "icon/Tulips.jpg", "");
                galleries.push(gallery);
            }
            index++;
        }
        return galleries;
    };
    return GalleryUtil;
}());
exports.GalleryUtil = GalleryUtil;
//# sourceMappingURL=gallery-util.js.map