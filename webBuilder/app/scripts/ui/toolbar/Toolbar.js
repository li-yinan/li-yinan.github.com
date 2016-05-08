import React from 'react';
import { connect } from 'react-redux';
import PicSelector from "./PicSelector";
import { sobelAction, recover } from "../redux/action";

var SobelButton = React.createClass({
    sobel: function () {
        this.props.dispatch(sobelAction());
    },
    render: function () {
        return <button onClick={this.sobel}>边缘检测</button>;
    }
});

SobelButton = connect(function (state) {
    return {};
})(SobelButton);

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
            <SobelButton></SobelButton>
            <RecoverButton></RecoverButton>
        </div>;
    }
};


export default Toolbar;
