import React from 'react';


export default class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: false
        }
    };
    componentDidMount = () => {
        if (this.props.question.indexOf('<a') >= 0) {
            let image = true;

            this.setState({ image });
        }
    }
    render() {
        return (
            <div id='question' onClick={this.props.closeQuestion}>
                {!this.state.image && (
                    <p id='text'>
                        {this.props.question}
                    </p>)}
                {this.state.image && <img src={this.props.question.substring(this.props.question.indexOf('="') + 2, this.props.question.indexOf('" '))} alt={this.props.question} />}
            </div>
        )
    }
};