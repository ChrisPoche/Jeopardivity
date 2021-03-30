import React from 'react';


export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: []
        }
    };
    componentDidMount = () => {
        this.questions();
    }
    questions = () => {
        let board = []
        let width = 6;
        let height = 5;
        let roundMult = this.props.round === 'Jeopardy!' ? 1 : 2;
        // console.log(this.props.yearMult);
        for (let r = 1; r <= height; r++) {
            let row = [];
            for (let c = 1; c <= width; c++) {
                row.push('$' + (this.props.yearMult * roundMult * r * 100 ));
            }
            board.push(row);
        }
        this.setState({board});
    };
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        {this.props.categories.map((category, i) => <th key={`header-${i}`}>{category.indexOf('"') === -1 ? category.toUpperCase() : category.substr(0,category.length-1).toUpperCase()+category[category.length-1]}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.state.board.map((row, r) => (
                        <tr id={`row-${row[0]}`} key={`row-${row[0]}`}>
                            {row.map((value, c) => <td onClick={(e) => this.props.openQuestion(e)} id={`${r}~${this.props.categories[c]} - ${value}`} key={`${r}~${this.props.categories[c]}-${value}`} >{value}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
};