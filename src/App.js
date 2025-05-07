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
            newColor = 'rgb(40, 120, 70)';
        }

        this.setState({currentQuote: quote, color: newColor});
    }

    render() {
        let quoteCardStyle = {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgb(240, 240, 240)',
            width: '65%',
            height: '30%',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        };

        let pageStyle = {
			backgroundColor: this.state.color,
			transition: 'background-color 2s ease'
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
            width: '80%',
            transition: 'background-color 2s ease',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
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
            transition: 'background-color 2s ease',
            borderRadius: '8px',
            marginBottom: '4px',
            paddingBottom: '-30px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
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
                    <div id="author">
                        <a 
                            href={this.props.currentQuote.authorData?.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="author-name"
                            style={{color: 'inherit', textDecoration: 'none'}}
                        >
                            {this.props.currentQuote.author}
                            <span className="tooltip">
                                {this.props.currentQuote.authorData?.description && 
                                    <div><strong>{this.props.currentQuote.authorData.description}</strong></div>
                                }
                                {this.props.currentQuote.authorData?.bio && 
                                    <div style={{marginTop: '5px'}}>{this.props.currentQuote.authorData.bio}</div>
                                }
                            </span>
                        </a>
                    </div>
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
            color: 'rgb(240, 240, 240)',
            backgroundColor: this.props.color,
            cursor: 'pointer',
            borderRadius: '8px',
            textAlign: 'center',
            outline: 'none',
            transition: 'background-color 2s ease',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
        }
        return (
            <button id="new-quote" style={buttonStyle} onClick={this.props.newQuote}>new quote</button>
        );
    }
}

async function fetchQuotes() {
    let response = await fetch("https://api.quotable.kurokeita.dev/api/quotes/random").then(res => res.json());
    let quote = {
        content: response.quote
            .content
            .toLowerCase(),
        author: response.quote
            .author
            .name
            .toLowerCase(),
        authorData: {
            bio: response.quote.author.bio,
            description: response.quote.author.description,
            link: response.quote.author.link
        }
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
        1, 110, 66
    ],
    [
        70, 120, 190
    ],
    [
        160, 60, 60
    ],
    [
        110, 60, 120
    ],
    [
        30, 80, 150
    ],
    [
        90, 110, 140
    ],
    [
        40, 90, 70
    ],
    [
        0, 120, 70
    ],
    [0, 100, 100]
];