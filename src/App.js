import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '',
            currentQuote: {}
        }
        this.newQuote = this
            .newQuote
            .bind(this);
    }

    componentDidMount() {
        this.newQuote();
    }

    async newQuote() {
        let quote = await fetchQuotes();

        let colorIndex = Math.floor(Math.random() * 10);
        colorIndex = colorIndex < 10
            ? colorIndex
            : 4;
        let newColor = `rgb(${colors[colorIndex][0]}, ${colors[colorIndex][1]}, ${colors[colorIndex][2]})`;
        if (newColor === this.state.color) {
            newColor = 'rgb(50, 168, 82)';
        }

        this.setState({currentQuote: quote, color: newColor});
    }

    render() {
        let quoteCardStyle = {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'gainsboro',
            width: '65%',
            height: '30%',
            borderRadius: '8px'
        };

        let pageStyle = {
            backgroundColor: this.state.color
        };

        return (
            <div style={pageStyle}>
                <div id="quote-box" style={quoteCardStyle}>
                    <QuoteCard
                        newQuote={this.newQuote}
                        currentQuote={this.state.currentQuote}
                        buttonColor={this.state.color}/>
                </div>
            </div>
        );
    }
}

class QuoteCard extends React.Component {
    render() {
        let quoteStyle = {
            position: 'relative',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '80%'
        }

        let buttonDivStyle = {
            position: 'fixed',
            right: '2%',
            bottom: '2%',
            border: '1px solid gainsboro',
            borderRadius: '8px'
        };

        let tweetStyle = {
            position: 'fixed',
            left: '2%',
            bottom: '2%',
            backgroundColor: this.props.buttonColor,
            borderRadius: '8px',
            marginBottom: '4px',
            paddingBottom: '-30px'
        }

        let tweetUrl = 'https://twitter.com/intent/tweet?text="' + (this.props.currentQuote.content || 'hi hi hi') + '"';

        return (
            <div
                style={{
                width: '100%',
                height: '100%',
                color: this.props.buttonColor
            }}>
                <div style={quoteStyle}>
                    <div id="text">{this.props.currentQuote.content}</div>
                    <div id="author">{this.props.currentQuote.author}</div>
                </div>
                <div>
                    <div style={tweetStyle}>
                        <a href={tweetUrl} id="tweet-quote" class="fa fa-twitter" />
                    </div>
                    <div style={buttonDivStyle}>
                        <NewQuoteButton newQuote={this.props.newQuote} color={this.props.buttonColor}/>
                    </div>
                </div>
            </div>
        )
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
            <button id="new-quote" style={buttonStyle} onClick={this.props.newQuote}>new quote</button>
        );
    }
}

async function fetchQuotes() {
    let response = await fetch("https://api.quotable.io/random").then(res => res.json());
    let quote = {
        content: response
            .content
            .toLowerCase(),
        author: response
            .author
            .toLowerCase()
    }
    if (quote.content.length > 120) {
        return fetchQuotes();
    }
    return quote;
}

export default App;

const colors = [
    [
        0, 78, 100
    ],
    [
        1, 142, 66
    ],
    [
        99, 173, 242
    ],
    [
        180, 93, 94
    ],
    [
        127, 90, 131
    ],
    [
        39, 111, 191
    ],
    [
        130, 160, 180
    ],
    [
        57, 106, 94
    ],
    [
        0, 163, 95
    ],
    [0, 143, 133]
];