import React from 'react';
import { rollback } from "../redux/action";
import { connect } from 'react-redux';

let Undo = React.createClass({
    getDefaultProps: function () {
        return {
            timeTravel: []
        };
    },
    styles: function () {
        return {
            container: {
            }
        }
    },
    componentWillMount: function () {
    },
    rollbackTo: function (item) {
        console.log(item);
        this.props.dispatch(rollback(item));
    },
    render: function () {
        let _this = this;
        let lis = [];
        this.props.timeTravel.forEach(function (li, index) {
            lis.push(<li onClick={function() {_this.rollbackTo(li)}} key={'key' + index}>历史{index}</li>);
        });
        return <ul
            ref="container"
            style={this.styles().container} 
        >
            {lis}
        </ul>;
    }
});

Undo = connect(function (state) {
    return {
        timeTravel: state.timeTravel
    };
})(Undo);

export default Undo;
