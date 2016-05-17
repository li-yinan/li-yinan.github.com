import React from 'react';
import ReactDOM from "react-dom";
import { Provider, connect } from 'react-redux';
import Timer from "./ui/Timer";
import WbCanvas from "./ui/wbCanvas/WbCanvas";
import OperationPanel from "./ui/operationPanel/OperationPanel";
import Preview from "./ui/preview/Preview";
import Toolbar from "./ui/toolbar/Toolbar";
import store from "./ui/redux/Store";
import propsMap from "./ui/redux/propsMap";
import {addTodo} from "./ui/redux/action";

let App = React.createClass({
    styles: function () {
        return {
            container: {
                position: 'relative'
            }
        }
    },
    render: function () {
        return <div>
            <Toolbar></Toolbar>
            <div style={this.styles().container}>
                <WbCanvas/>
                <Preview/>
                <OperationPanel/>
            </div>
        </div>;
    }
});

var mountNode = document.getElementById("app");

ReactDOM.render(
    <Provider store={store}>
        <App></App>
    </Provider>,
    mountNode
);
