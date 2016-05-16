function sobel(imgData) {
    let width = imgData.width;
    let height = imgData.height;
    let data = imgData.data;

    let grayScaleData = [];

    let kernelX = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
    ];

    let kernelY = [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1]
    ];

    function bindPixelAt(data, jump = 1) {
        return function (x, y, i = 0) {
            return data[(width * y + x) * jump + i];
        }
    }

    let pixelAt = bindPixelAt(data, 4);

    console.log('开始转灰度');

    // 彩色图片转灰度图片
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = pixelAt(x, y, 0);
            let g = pixelAt(x, y, 1);
            let b = pixelAt(x, y, 2);

            let avg = (r + g + b) / 3;

            grayScaleData.push(avg);
        }
    }

    console.log('灰度转换完成, 开始计算梯度');

    pixelAt = bindPixelAt(grayScaleData);

    // 计算图片的横向梯度和纵向梯度，并融合计算结果
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let pixelX =
                kernelX[0][0] * pixelAt(x - 1, y - 1)
                + kernelX[0][1] * pixelAt(x, y - 1)
                + kernelX[0][2] * pixelAt(x + 1, y - 1)
                + kernelX[1][0] * pixelAt(x - 1, y)
                + kernelX[1][1] * pixelAt(x, y)
                + kernelX[1][2] * pixelAt(x + 1, y)
                + kernelX[2][0] * pixelAt(x - 1, y + 1)
                + kernelX[2][1] * pixelAt(x, y + 1)
                + kernelX[2][2] * pixelAt(x + 1, y + 1);

            let pixelY =
                kernelY[0][0] * pixelAt(x - 1, y - 1)
                + kernelY[0][1] * pixelAt(x, y - 1)
                + kernelY[0][2] * pixelAt(x + 1, y - 1)
                + kernelY[1][0] * pixelAt(x - 1, y)
                + kernelY[1][1] * pixelAt(x, y)
                + kernelY[1][2] * pixelAt(x + 1, y)
                + kernelY[2][0] * pixelAt(x - 1, y + 1)
                + kernelY[2][1] * pixelAt(x, y + 1)
                + kernelY[2][2] * pixelAt(x + 1, y + 1);

            let magnitude = Math.sqrt(pixelX * pixelX + pixelY * pixelY) >>> 0;

            // 回写数据
            if (x === 0 || y === 0 || x === (width - 1) || y === (height - 1)) {
                magnitude = 255;
            }
            var start = (y * width + x) * 4;
            data[start] = magnitude;
            data[start + 1] = magnitude;
            data[start + 2] = magnitude;
            data[start + 3] = 255;
        }
    }

    console.log('梯度计算完成');
    return new ImageData(data, width);
}

export default sobel;
