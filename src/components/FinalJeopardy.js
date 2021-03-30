import React from 'react';


export default class FinalJeopardy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };
    componentDidMount = () => {
    }
    render() {
        return (
            <div id='final-category' onClick={this.props.openQuestion}>
                <p id='final-cat'>
                    {this.props.finalCategory}
                </p>
            </div>
        )
    }
};