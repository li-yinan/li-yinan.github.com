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

    var {max, min, abs} = Math;

    var width = imgData.width;
    var height = imgData.height;

    // 根据容差选定包裹给定线段的矩阵
    var subMatrixWidth = abs(x1 - x2);
    var subMatrixHeight = abs(y1 - y2);

    // 计算矩阵上下左右坐标
    var left = max(min(x1, x2) - tolerance, 0);
    var right = min(max(x1, x2) + tolerance, width);
    var top = max(min(y1, y2) - tolerance, 0);
    var bottom = min(max(y1, y2) + tolerance, height);

    // 按照偏移量取矩阵中的数据
    function bindPixelAt(data, jump = 1, offsetX, offsetY) {
        return function (x, y, i = 0) {
            return data[(width * (y + offsetY) + (x + offsetX)) * jump + i];
        }
    }

    let pixelAt = bindPixelAt(imgData.data, 4, left, top);

    // 循环找到所有边缘
    var edgePoint = [];
    for (var i = 0; i < subMatrixWidth; i++) {
        for (var j = 0; j < subMatrixHeight; j++) {
            var point = pixelAt(i, j);
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
            xmean += edgePoint[i].x;
            ymean += edgePoint[i].y;
        }

        xmean = xmean / edgePoint.length;
        ymean = ymean / edgePoint.length;

        var sumx2 = 0;
        var sumxy = 0;

        for (var i = 0; i < edgePoint.length; i++) {
            sumx2 += (edgePoint[i].x - xmean) * (edgePoint[i].x - xmean);
            sumxy += (edgePoint[i].y - ymean) * (edgePoint[i].x - xmean);
        }

        // y = kx + b;
        // 直线斜率
        var k = sumxy / sumx2;
        // 偏移量
        var b = ymean - k * xmean;

        var data = imgData.data;

        for (var x = 0; x < subMatrixWidth; x++) {
            var y = k * x + b;
            console.log(x, y);
            var start = ((y + top) * width + x + left) * 4;
            data[start] = 255;
            data[start + 1] = 255;
            data[start + 2] = 255;
            data[start + 3] = 255;
        }
    }

    return imgData;
};

export default lineFitting;
