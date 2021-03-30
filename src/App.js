import './App.css';
import React from 'react';
import Board from './components/Board';
import Question from './components/Question';
import jeopardy from './components/jeopardy-sorted.json';
import FinalJeopardy from './components/FinalJeopardy';
import titleImage from './jeopardivity.jpg';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    let showNumber = jeopardy[Math.ceil(Math.random() * 216930)].Show_Number;
    let showDetails = jeopardy.filter(q => q['Show_Number'] === showNumber);
    let airDate = showDetails[0].Air_Date;
    airDate = new Date(`${airDate.substring(airDate.length - 4)}-${airDate.substring(0, airDate.indexOf('/'))}-${airDate.substr(airDate.indexOf('/') + 1, 2).replace('/', '')}`);
    let valueSwitchDate = new Date('2001-11-26');
    console.log(airDate);
    console.log(airDate >= valueSwitchDate);

    this.state = {
      Q: false,
      show: showDetails,
      board: [],
      airDateAfterValueSwitch: airDate >= valueSwitchDate ? 2 : 1,
      round: 'Jeopardy!',
      categories: [],
      question: ''
    }
    this.toggleQuestion = this.toggleQuestion.bind(this);
  };
  componentDidMount = () => {
    // let show = this.pullRandShow();
    this.readCategories(this.state.show);
  }
  pullRandShow = () => {
    // console.log(showNumber);
    // console.log(showDetails);
    // this.setState({ show: showDetails })
    // return showDetails;
  }
  readCategories = (show) => {
    let rawSet = new Set(show.filter(q => q.Round === this.state.round).map(q => q.Category));
    let categories = [...rawSet];
    this.setState({ categories });
    // console.log(categories);
  }
  toggleQuestion = (e) => {
    let questionID = e.target.id
    console.log(questionID);
    // console.log(questionID.substring(questionID.indexOf(" - ")+3));
    console.log(this.state.show.filter(q => q.Value.trim() === questionID.substring(questionID.indexOf(" - ") + 3)));
    // console.log(this.state.round);
    console.log(this.state.show.filter(q => q.Round === this.state.round));
    // console.log(questionID.substr(0,questionID.indexOf(" -")));
    console.log(this.state.show.filter(q => q.Category === questionID.substr(2, questionID.indexOf(" -")-2)));

    let question;

    if (questionID === 'final-category') {
      question = this.state.show.filter(q => q.Round === this.state.round)[0].Question
    }
    else if (questionID === 'question' || questionID === 'text') {
      question = '';
    }
    else {
      let value = '$' + (parseInt(questionID.substring(questionID.indexOf(' - ') + 4).replace(',', ''))).toLocaleString();
      question = this.state.show.filter(q => q.Round === this.state.round && q.Category === questionID.substr(2, questionID.indexOf(' -')-2) && q.Value.trim() === value).length > 0 ? this.state.show.filter(q => q.Round === this.state.round && q.Category === questionID.substr(2, questionID.indexOf(' -')-2) && q.Value.trim() === value)[0].Question : this.state.show.filter(q => q.Round === this.state.round && q.Category === questionID.substr(2, questionID.indexOf(' -')-2) && q.Value.trim() === value);
      console.log(value);
      console.log(question);
      console.log(questionID.substr(2, questionID.indexOf(' -')-2));
      if (question.length === 0) {
        question = this.state.show.filter(q => q.Category === questionID.substr(2, questionID.indexOf(' -')-2) && q.Value.trim() === value).length > 0 ? this.state.show.filter(q => q.Category === questionID.substr(2, questionID.indexOf(' -')-2) && q.Value.trim() === value)[0].Question : this.state.show.filter(q => q.Category === questionID.substr(2, questionID.indexOf(' -')-2) && q.Value.trim() === value);
        
        // need to improve how daily doubles are handled, add in row id as well
        // remove filter by dollar amount and just go by the row values
        // figure out a better way to handle img reference - doesn't load until you open it in the browser - that's a pain. 
        console.log(question)
        if (question.length === 0) {
          console.log(this.state.show.filter((q,index) => q.Category === questionID.substr(2, questionID.indexOf(' -')-2))[questionID[0]])
          question = this.state.show.filter((q,index) => q.Category === questionID.substr(2, questionID.indexOf(' -')-2)).length > 0 ? this.state.show.filter((q,index) => q.Category === questionID.substr(2, questionID.indexOf(' -')-2))[questionID[0]].Question : '';
          console.log(question)
        }
      }
    }
    this.setState({ Q: !this.state.Q, question, round: this.state.round === 'Final Jeopardy!' && questionID === 'question' ? '' : this.state.round });
  }
  render() {
    return (
      <div className="App">
        {(this.state.round !== 'Final Jeopardy!' && this.state.round && !this.state.Q) && <Board yearMult={this.state.airDateAfterValueSwitch} round={this.state.round} categories={this.state.categories} openQuestion={this.toggleQuestion} />}
        {this.state.Q && <Question question={this.state.question} closeQuestion={this.toggleQuestion} />}
        {(!this.state.Q && this.state.round === 'Final Jeopardy!') && <FinalJeopardy finalCategory={this.state.categories[0]} openQuestion={this.toggleQuestion} />}
        {!this.state.round && (<div>
          <img id='title' src={titleImage} alt='Jeopardy Logo' />
        </div>)}
      </div>
    );
  }
}