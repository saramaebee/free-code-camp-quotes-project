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
		let r = colors[colorIndex][0];
		let g = colors[colorIndex][1];
		let b = colors[colorIndex][2];
		let yiq = ((r*299)+(g*587)+(b*114))/1000;
		let tColor = (yiq >= 128) ? 'black' : 'gainsboro';
		let newColor = `rgb(${r}, ${g}, ${b})`;
		if (newColor === this.state.color) {
			newColor = 'rgb(50, 168, 82)';
		}
		
		this.setState({
			currentQuote: quote,
			color: newColor,
			textColor: tColor
		});
		document.body.style.backgroundColor = this.state.color;
	}

	componentDidMount() {
		this.newQuote();
	}

	render() {
		let style={
			position: 'absolute', left: '50%', top: '50%',
			transform: 'translate(-50%, -50%)',
			backgroundColor: 'DodgerBlue',
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
					<QuoteCard newQuote={this.newQuote} textColor={this.state.textColor} currentQuote={this.state.currentQuote} buttonColor={this.state.color}/>
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
			width: '80%'			
		}
		const buttonDivStyle = {
			position: 'fixed',
			left: '70%', top: '70%',
			border: '1px solid ' + this.props.textColor,
			marginBottom: '3px',
			borderRadius: '8px',
		}
		return (
			<div style={{width: '100%', height:'100%', color: this.props.textColor}}>
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
			color: 'inherit',
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
	[135,137,192], 
	[16,46,74], 
	[194,202,232], 
	[131,128,182], 
	[35,206,107], 
	[131,232,186], 
	[10,35,66], 
	[44,165,141], 
	[161,229,171], 
	[153,247,171]
];