import React from 'react';
import { connect } from 'react-redux';
import { matrixChanged } from "../redux/action";

class WbCanvas extends React.Component {
    static defaultProps = {
        matrix: {
            width: 0,
            height:0,
            data: []
        }
    }

    renderCanvas() {
        let matrix = this.props.matrix;
        if (matrix instanceof ImageData) {
            let canvas = this.refs.canvas;
            let context = canvas.getContext('2d');
            context.putImageData(this.props.matrix, 0, 0);
        }
    }

    // 初始化
    componentDidMount() {
        this.renderCanvas();
    }

    // 数据更新
    componentDidUpdate() {
        this.renderCanvas();
    }

    styles() {
        return {
            container: {
                position: 'absolute'
            }
        }
    }

    render() {
        return <canvas
            ref="canvas"
            width={this.props.matrix.width}
            height={this.props.matrix.height}
            style={this.styles().container}
            >
            </canvas>;
    }
}

WbCanvas = connect(function (state) {
    return {
        matrix: state.matrix
    };
})(WbCanvas);

export default WbCanvas;
