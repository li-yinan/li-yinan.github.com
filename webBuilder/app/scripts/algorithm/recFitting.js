import lineFitting from './lineFitting';

/**
 * 给出边缘检测数据，对矩形进行拟合
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
function recFitting(imgData, x1, y1, x2, y2, tolerance = 3) {
    var leftRes = lineFitting(imgData, x1, y1, x1, y2, tolerance);
    var rightRes = lineFitting(imgData, x2, y1, x2, y2, tolerance);
    var topRes = lineFitting(imgData, x1, y1, x2, y1, tolerance);
    var bottomRes = lineFitting(imgData, x1, y2, x2, y2, tolerance);
    return {
        x1: leftRes.x,
        y1: topRes.y,
        x2: rightRes.x,
        y2: bottomRes.y
    };
}

export default recFitting;
