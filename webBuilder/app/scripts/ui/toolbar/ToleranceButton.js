import React from 'react';
import { connect } from 'react-redux';
import { toleranceChange } from "../redux/action";

var ToleranceButton = React.createClass({
    rangeChange: function (e) {
        var value = e.target.value;
        this.props.dispatch(toleranceChange(value));
    },
    render: function () {
        return <div>
            <span>容差: </span>
            <input type="range" min="3" max="50" onChange={this.rangeChange}/>
            <span>{this.props.tolerance}</span>
        </div>
    }
});

ToleranceButton = connect(function (state) {
    return {
        tolerance: state.tolerance || 10
    };
})(ToleranceButton);

export default ToleranceButton;
