import React from 'react';
import { recover } from "../redux/action";
import { connect } from 'react-redux';

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

export default RecoverButton;
