import React from 'react';

class Icon extends React.Component {
    render() {
        return <div></div>;
    }
}

class PicSelector extends React.Component {
    render() {
        return <input type="file"/>;
    }
}

class Toolbar extends React.Component {
    render() {
        return <div>
            <PicSelector></PicSelector>
            </div>;
    }
}

export default Toolbar;
