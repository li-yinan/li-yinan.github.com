import React from 'react';
import { connect } from 'react-redux';
import PicSelector from "./PicSelector";

class Toolbar extends React.Component {
    render() {
        return <div>
            <PicSelector></PicSelector>
        </div>;
    }
}


export default Toolbar;
