import React from 'react';

class WbCanvas extends React.Component {
    static defaultprops = {
        width: 200,
        height: 100
    }
    render() {
        return <canvas
            width={this.props.width}
            height={this.props.height}
            >
            </canvas>;
    }
}

export default WbCanvas;
