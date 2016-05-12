import React from 'react';
import { connect } from 'react-redux';
import { edgeDetection } from "../redux/action";

var EdgeDetectionButton = React.createClass({
    sobel: function () {
        this.props.dispatch(edgeDetection());
    },
    render: function () {
        return <button onClick={this.sobel}>边缘检测</button>;
    }
});

EdgeDetectionButton = connect(function (state) {
    return {};
})(EdgeDetectionButton);

export default EdgeDetectionButton;
