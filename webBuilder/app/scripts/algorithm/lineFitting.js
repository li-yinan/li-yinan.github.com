/**
 * 给出边缘检测数据，对直线进行拟合
 *
 * @param {ImageData} imgData 边缘检测后图片数据
 * @param {number} x1 起始点横坐标
 * @param {number} y1 起始点纵坐标
 * @param {number} x2 终止点横坐标
 * @param {number} y2 终止点纵坐标
 * @param {number} tolerance 容差, 边缘检测的范围
 *
 * @return {Object} 直线拟合的结果
 */
function lineFitting(imgData, x1, y1, x2, y2, tolerance = 3) {
    tolerance = tolerance || 0;

    var data = imgData.data;

    var {max, min, abs, sqrt} = Math;

    var width = imgData.width;
    var height = imgData.height;

    // 根据容差选定包裹给定线段的矩阵
    var subMatrixWidth = abs(x1 - x2) + tolerance * 2;
    var subMatrixHeight = abs(y1 - y2) + tolerance * 2;

    // 计算矩阵上下左右坐标
    var left = max(min(x1, x2) - tolerance, 0);
    var right = min(max(x1, x2) + tolerance, width);
    var top = max(min(y1, y2) - tolerance, 0);
    var bottom = min(max(y1, y2) + tolerance, height);

    // 按照偏移量取矩阵中的数据
    function bindGetPixelAt(data, jump = 1, offsetX, offsetY) {
        return function (x, y, i = 0) {
            return data[(width * (y + offsetY) + (x + offsetX)) * jump + i];
        }
    }

    // 按照偏移量取矩阵中的数据
    function bindSetPixelAt(data, jump = 1, offsetX, offsetY) {
        return function (x, y, i = 0, value) {
            data[(width * (y + offsetY) + (x + offsetX)) * jump + i] = value;
        }
    }

    let getPixelAt = bindGetPixelAt(imgData.data, 4, left, top);
    let setPixelAt = bindSetPixelAt(imgData.data, 4, left, top);

    // 循环找到所有边缘
    var edgePoint = [];
    for (var i = 0; i < subMatrixWidth; i++) {
        for (var j = 0; j < subMatrixHeight; j++) {
            var point = getPixelAt(i, j);
            if (point > 0) {
                edgePoint.push({
                    x: i,
                    y: j
                });
            }
        }
    }
    if (edgePoint.length) {
        var xmean = 0;
        var ymean = 0;
        for (var i = 0; i < edgePoint.length; i++) {
            var {x, y} = edgePoint[i];
            xmean += x;
            ymean += y;
        }

        xmean = xmean / edgePoint.length >>> 0;
        ymean = ymean / edgePoint.length >>> 0;

        var sumx2 = 0;
        var sumy2 = 0;

        for (var i = 0; i < edgePoint.length; i++) {
            var {x, y} = edgePoint[i];
            var start = ((y + top) * width + x + left) * 4;
            // data[start] = 0;
            // data[start + 1] = 0;
            // data[start + 2] = 255;
            // data[start + 3] = 255;
            // 求出x方向和y方向的方差
            
            var _dx = x - xmean;
            var _dy = y - ymean;
            sumx2 += _dx * _dx;
            sumy2 += _dy * _dy;
        }
        var dx = sqrt(sumx2) >>> 0;
        var dy = sqrt(sumy2) >>> 0;

        // console.log('left: ', left);
        // console.log('top: ', top);
        // console.log('width: ', subMatrixWidth);
        // console.log('height: ', subMatrixHeight);
        // console.log('xmean: ', xmean);
        // console.log('ymean: ', ymean);
        // console.log('sumx2: ', sumx2);
        // console.log('sumy2: ', sumy2);
        // console.log('dx: ', dx);
        // console.log('dy: ', dy);

        var offset = 0;

        if (dx > dy) {
            // 横线
            // 测试，看看选中的位置对不对
            for (var x = 0; x < subMatrixWidth; x++) {
                setPixelAt(x, ymean, 0, 0);
                setPixelAt(x, ymean, 1, 0);
                setPixelAt(x, ymean, 2, 255);
                setPixelAt(x, ymean, 3, 255);
            }
        }
        else {
            // 竖线

            for (var y = 0; y < subMatrixHeight; y++) {
                setPixelAt(xmean, y, 0, 0);
                setPixelAt(xmean, y, 1, 0);
                setPixelAt(xmean, y, 2, 255);
                setPixelAt(xmean, y, 3, 255);
            }
        }


        // // y = kx + b;
        // // 直线斜率
        // var k = sumxy / sumx2;
        // // 偏移量
        // var b = ymean - k * xmean;
        // console.log(k, b);

    }

    return imgData;
};

export default lineFitting;
