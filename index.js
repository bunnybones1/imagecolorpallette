function ImageColorPallette(imagePath, callback) {
    this.pallettes = [];
    this.rows = 0;
    this.cols = 0;

    var _this = this;


    // load image from data url
    var imageObj = new Image();
    imageObj.onload = function() {
        _this.createPallettes(this);
        callback(_this.pallettes);
    };

    imageObj.src = imagePath;

}

function twoChars(str) {
    if(str.length == 1) return '0'+str;
    else if(str.length == 2) return str;
    else return '00';
}
function hexChannel(val) {
    return twoChars(val.toString(16));
}
function combineColor(r, g, b) {
    return '#' + hexChannel(r) + hexChannel(g) + hexChannel(b);
}

ImageColorPallette.prototype.createPallettes = function(img) {
    this.rows = img.height;
    this.cols = img.width;
    var canvas = document.createElement("canvas");
    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    var pixelData = context.getImageData(0, 0, img.width, img.height).data;
    for (var iRow = 0; iRow < this.rows; iRow++) {
        var rowOffset = iRow * this.cols * 4;
        var colors = [];
        this.pallettes.push(colors);
        for (var iCol = 0; iCol < this.cols; iCol++) {
            var i4 = iCol*4 + rowOffset;
            colors[iCol] = combineColor(pixelData[i4], pixelData[i4+1], pixelData[i4+2]);
        };
    };
}
module.exports = ImageColorPallette;