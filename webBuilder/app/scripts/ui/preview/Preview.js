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
                height: this.props.matrix.height || 0,
                width: this.props.matrix.width || 0
            }
        }
    },
    componentWillMount: function () {
    },
    render: function () {
        var root = this.props.virtualNode || {};
        var children = root.children || [];
        var nodes = [];
        for (var i = 0; i < children.length; i++) {
            let {top, left, width, height} = children[i];
            let style = {
                top: top + 'px',
                left: left + 'px',
                width: width + 'px',
                height: height + 'px',
                position: 'absolute',
                backgroundColor: 'blue',
                opacity: 0.3
            };
            nodes.push(<div style={style} key={'key' + i}></div>);
        }
        return <div 
            ref="container"
            style={this.styles().container} 
        >
            {nodes}
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
