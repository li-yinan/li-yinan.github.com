import React from 'react';
import { backup, matrixChanged } from "../redux/action";
import { connect } from 'react-redux';

var PicSelector = React.createClass({
    fileChange: function (e) {
        var _this = this;
        var file = e.target.files[0];
        if (/png$|jpg$/i.test(file.name)) {
            let img = new Image();
            img.onload = function () {
                let canvas = _this.refs.canvas;
                var context = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
                var matrix = context.getImageData(0, 0, img.width, img.height);
                var backupMatrix = context.getImageData(0, 0, img.width, img.height);
                _this.props.dispatch(matrixChanged(matrix));
                _this.props.dispatch(backup(backupMatrix));
            };
            img.src = URL.createObjectURL(file);
        }
    },
    render: function () {
        return <div>
            <canvas ref="canvas" style={{position: "absolute", top: "-10000px", left: "-10000px"}}></canvas>
            <input type="file" onChange={this.fileChange}/>
        </div>;
    }
});

PicSelector = connect(function (state) {
    return {};
})(PicSelector);

export default PicSelector;
