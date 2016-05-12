import React from 'react';
import { connect } from 'react-redux';
import PicSelector from "./PicSelector";
import EdgeDetectionButton from "./EdgeDetectionButton";
import RecoverButton from "./RecoverButton";
import ToleranceButton from "./ToleranceButton";



class Toolbar extends React.Component {
    render() {
        return <div>
            <PicSelector></PicSelector>
            <EdgeDetectionButton></EdgeDetectionButton>
            <RecoverButton></RecoverButton>
            <ToleranceButton></ToleranceButton>
        </div>;
    }
};


export default Toolbar;
