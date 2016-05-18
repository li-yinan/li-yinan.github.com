import React from 'react';
import { areaSelected } from "../redux/action";
import { connect } from 'react-redux';

let Preview = React.createClass({
    getDefaultProps: function () {
        return {
            matrix: {}
        };
    },
    styles: function () {
        return {
            container: {
                position: 'absolute',
                zIndex: 1,
                opacity: 0.3,
                height: this.props.matrix.height || 0,
                width: this.props.matrix.width || 0
            }
        }
    },
    componentWillMount: function () {
    },
    renderOne: function (node) {
        if (!node) {
            return ;
        }
        let {top, left, width, height, level} = node;
        let parentNode = node.parentNode || {};
        let pTop = parentNode.top || 0;
        let pLeft = parentNode.left || 0;
        let style = {
            top: top - pTop + 'px',
            left: left - pLeft + 'px',
            width: width + 'px',
            height: height + 'px',
            position: 'absolute',
            backgroundColor: `#${level*3}${level*3}${level*3}`,
            zIndex: level
        };
        var nodes = [];
        var children = node.children;
        for (var i = 0; i < children.length; i++) {
            nodes.push(this.renderOne(children[i]));
        }
        return <div style={style} key={'key' + Math.random() * 10000}>{nodes}</div>;
    },
    render: function () {
        var root = this.props.virtualNode;
        return <div 
            ref="container"
            style={this.styles().container} 
        >
            {this.renderOne(root)}
        </div>;
    }
});

Preview = connect(function (state) {
    return {
        matrix: state.matrix,
        virtualNode: state.virtualNode
    };
})(Preview);

export default Preview;
