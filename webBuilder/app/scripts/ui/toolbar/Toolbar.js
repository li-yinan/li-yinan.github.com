import React from 'react';
import { connect } from 'react-redux';
import PicSelector from "./PicSelector";
import { edgeDetection, recover } from "../redux/action";

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

var RecoverButton = React.createClass({
    recover: function () {
        this.props.dispatch(recover());
    },
    render: function () {
        return <button onClick={this.recover}>恢复</button>;
    }
});

RecoverButton = connect(function (state) {
    return {};
})(RecoverButton);

class Toolbar extends React.Component {
    render() {
        return <div>
            <PicSelector></PicSelector>
            <EdgeDetectionButton></EdgeDetectionButton>
            <RecoverButton></RecoverButton>
        </div>;
    }
};


export default Toolbar;
