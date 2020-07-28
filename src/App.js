import React from 'react';
import './App.css';

async function fetchQuotes() {
	const response = await fetch("https://api.quotable.io/random").then(res => res.json());
	// console.dir(response);
	let quote = {
		content: response.content.toLowerCase(),
		author: response.author.toLowerCase()
	}
	if (quote.content.length > 130) {
		return fetchQuotes();
	}
	return quote;
}

class App extends React.Component {
	constructor(props) {
		
		super(props);
		this.state = {
			color: '',
			currentQuote: {},
		}
		this.newQuote = this.newQuote.bind(this);
	}

	async newQuote() {
		let quote = await fetchQuotes();

		let colorIndex = Math.floor(Math.random() * 10);
		colorIndex = colorIndex < 10 ? colorIndex : 4;
		let newColor = `rgb(${colors[colorIndex][0]}, ${colors[colorIndex][1]}, ${colors[colorIndex][2]})`;
		if (newColor === this.state.color) {
			newColor = 'rgb(50, 168, 82)';
		}
		
		this.setState({
			currentQuote: quote,
			color: newColor,
		});
		console.log(this.state.color);
		document.body.style.backgroundColor = this.state.color;
	}

	componentDidMount() {
		this.newQuote();
	}

	render() {
		let style={
			position: 'absolute', left: '50%', top: '50%',
			transform: 'translate(-50%, -50%)',
			backgroundColor: 'gainsboro',
			width: 800,
			height: 300,
			borderRadius: '20px'
		}
		let pageStyle = {
			width: '100%',
			height: '100%',
		}
		return (
			<div style={pageStyle}>
				<div style = {style}>
					<QuoteCard newQuote={this.newQuote} currentQuote={this.state.currentQuote} buttonColor={this.state.color}/>
				</div>
			</div>
		)
	}
}

class QuoteCard extends React.Component {
	render() {
		const quoteStyle = {
			position: 'relative',
			left: '50%', top: '50%',
			transform: 'translate(-50%, -80%)',
			textAlign: 'center',
			width: '80%',
		}
		const buttonDivStyle = {
			position: 'fixed',
			left: '70%', top: '70%',
			border: '1px solid gainsboro',
			marginBottom: '3px',
			borderRadius: '8px'			
		}
		return (
			<div style={{width: '100%', height:'100%', color: this.props.buttonColor}}>
				<div style={quoteStyle}>
					<blockquote>{this.props.currentQuote.content}</blockquote>
					<span>{this.props.currentQuote.author}</span>
				</div>
				<div style={buttonDivStyle}>
					<NewQuoteButton newQuote={this.props.newQuote} color={this.props.buttonColor}/>
				</div>
			</div>
			
		);
	}
}

class NewQuoteButton extends React.Component {
	render() {
		const buttonStyle = {
			padding: '10px',
			border: 'none',
			font: 'inherit',
			color: 'gainsboro',
			backgroundColor: this.props.color,
			cursor: 'pointer',
			borderRadius: '8px',
			textAlign: 'center',
			outline: 'none',
			transition: 'background-color 0.5s ease'
		}
		return (
			<button style={buttonStyle}onClick={this.props.newQuote}>new quote</button>
		);
	}
}

export default App;

const colors = [
	[0,78,100], 
	[1,142,66], 
	[99,173,242],
	[180,93,94], 
	[127,90,131],
	[39, 111, 191], 
	[130,160,180],
	[57,106,94],
	[0,163,95],
	[0,143,133]
];