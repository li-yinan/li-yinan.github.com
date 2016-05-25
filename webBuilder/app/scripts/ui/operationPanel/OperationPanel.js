import React from 'react';
import { areaSelected } from "../redux/action";
import { connect } from 'react-redux';

let OperationPanel = React.createClass({
    getDefaultProps: function () {
        return {
            matrix: {}
        };
    },
    styles: function () {
        return {
            container: {
                position: 'absolute',
                zIndex: 10,
                height: this.props.matrix.height || 0,
                width: this.props.matrix.width || 0
            }
        }
    },
    createDom: function () {
        var dom = document.createElement('div');
        dom.style.border = "solid 1px #888";
        dom.style.position = "absolute";
        dom.style.backgroundColor = "#0e7bef";
        dom.style.opacity = 0.3;
        dom.style.zIndex = 1000;
        document.body.appendChild(dom);
        this.dom = dom;
        return dom;
    },
    componentWillMount: function () {
        this.createDom();
    },
    mouseDown: function (e) {
        var _this = this;
        this.operating = true;
        var container = this.refs.container;
        var coord = container.getBoundingClientRect();
        var body = document.body;
        this.startPoint = {
            x: e.pageX - (coord.left + body.scrollLeft),
            y: e.pageY - (coord.top + body.scrollTop)
        };
        this.dom.style.left = e.pageX + 'px';
        this.dom.style.top = e.pageY + 'px';
        this.dom.style.width = '0px';
        this.dom.style.height = '0px';
        this.dom.style.display = '';
        document.body.addEventListener('mousemove', this.mouseMove, false);
        function mouseupCallback(e) {

            _this.operating = false;
            _this.endPoint = {
                x: e.pageX - (coord.left + body.scrollLeft),
                y: e.pageY - (coord.top + body.scrollTop)
            };

            _this.props.dispatch(areaSelected({
                x: _this.startPoint.x,
                y: _this.startPoint.y,
                width: _this.endPoint.x - _this.startPoint.x,
                height: _this.endPoint.y - _this.startPoint.y
            }));
            _this.dom.style.display = 'none';
            document.body.removeEventListener('mousemove', _this.mouseMove, false);
            document.body.removeEventListener('mouseup', mouseupCallback, false);
        };
        document.body.addEventListener('mouseup', mouseupCallback, false);
    },
    mouseMove: function (e) {
        if (!this.operating) {
            return;
        }

        var body = document.body;
        var container = this.refs.container;
        var coord = container.getBoundingClientRect();
        var curPoint = {
            x: e.pageX - (coord.left + body.scrollLeft),
            y: e.pageY - (coord.top + body.scrollTop)
        };

        this.dom.style.width = Math.abs(curPoint.x - this.startPoint.x) + 'px';
        this.dom.style.height = Math.abs(curPoint.y - this.startPoint.y) + 'px';

    },
    render: function () {
        return <div 
            ref="container"
            style={this.styles().container} 
            onMouseDown={this.mouseDown}
        >
        </div>;
    }
});

OperationPanel = connect(function (state) {
    return {
        matrix: state.matrix
    };
})(OperationPanel);

export default OperationPanel;
