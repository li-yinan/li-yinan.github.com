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
    var right = min(max(x1, x2) + tolerance, 0);
    var top = max(min(y1, y2) - tolerance, 0);
    var bottom = min(max(y1, y2) + tolerance, 0);

    // 按照偏移量取矩阵中的数据
    function bindPixelAt(data, jump = 1, offsetX, offsetY) {
        return function (x, y, i = 0) {
            return data[(width * (y + offsetY) + (x + offsetX)) * jump + i];
        }
    }

    let pixelAt = bindPixelAt(imgData.data, 4, left, top);

    var edgePoint = [];
    for (var i = 0; i < subMatrixWidth; i++) {
        for (var j = 0; j < subMatrixHeight; j++) {
            var point = pixelAt(i, j);
        }
    }

    return {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
    };
};

export default lineFitting;
