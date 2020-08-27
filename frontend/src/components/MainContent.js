import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
// import LineChart from 'react-svg-line-chart'
import './design.css';
// import RNUrlPreview from 'react-native-url-preview';
import YouTube from 'react-youtube';
import './design.css';
import { Link } from 'react-router-dom';
// import { TwitterTweetEmbed } from 'react-twitter-embed';
import TweetEmbed from 'react-tweet-embed'


const data = []

for (let x = 1; x <= 24; x++) {
    data.push({ x: x, y: Math.floor(Math.random() * (100)) })
}

const styles = StyleSheet.create({
    stats: {
        borderTop: '1px solid #DFE0EB',
        width: '100%'
    },

});



class ContentBox extends React.Component {

    divStyle = {
        width: '350px',
        height: '250px',
        display: 'flex', 
        justifyContent: 'center'
    }

    url = "https://youtube.com/channel/" + this.props.youtubeChannel
    search_url = "/search?q="+this.props.artistSearch

    render() {
        return (
            <Row flexGrow={1} className="contentContainer"
                horizontal="center" breakpoints={{ 1024: 'column' }}>
                <Column wrap flexGrow={7} flexBasis="735px" className="contentBoxSection"
                    breakpoints={{ 1024: { width: 'calc(100% - 48px)', flexBasis: 'auto' } }}>
                    <Row wrap horizontal="space-between">
                        <Column>
                            <span className="contentBoxTitle">{this.props.title}</span>
                            <span className="contentBoxSubtitle">{this.props.date}</span>
                            
                            <br/>

                            <span className="alignCenter">{this.props.content}</span>

                            {
                                (this.props.youtubeID !== "")
                                && (
                                <div >
                                <span>{this.props.youtubeTitle}</span>
                                <div className="alignCenter">
                                <YouTube videoId={this.props.youtubeID} opts={this.divStyle} />
                                </div>
                                </div>
                                )
                            }

                            {
                                (this.props.youtubeChannel)
                                && (
                                    <a href={this.url} rel="noopener noreferrer" target="_blank" className="addButton alignCenter"> Go To Artist Youtube Channel </a>
                                )
                            }

                            {
                                (this.props.tweetID)
                                && (
                                    <div>
                                    <div className="alignCenter"> Lastest Tweet </div>
                                    <div className="alignCenter">                                
                                    {/* <TwitterTweetEmbed
                                    tweetId={this.props.tweetID}
                                    options={{height: 400}}
                                    /> */}
                                    <TweetEmbed id={this.props.tweetID}
                                    options={{height: 100 }}
                                    />
                                    </div>
                                    </div>
                                )
                            }

                            {
                                (this.props.artistSearch)
                                && (
                                    <div>
                                        <Link to={this.search_url} className="addButton alignCenter"> Go To Artist Page </Link>
                                    </div>
                                )
                            }

                        </Column>
                    </Row>

                </Column>
                <Column className="contentSeparator" breakpoints={{ 1024: { display: 'none' } }}><div /></Column>

                <Column flexGrow={3} flexBasis="342px" breakpoints={{ 1024: css(styles.stats) }}>
                    <Render title="Concert Events" value={this.props.concert}/>  
                    <Render title="Concert Tickets" value={this.props.concertPrice}/>                  
                    <Render title="Most Relavent Album" value={this.props.albumName}/>

                </Column>
            </Row>
        );
    }
}


class Render extends React.Component {
    render () {
        return (<Column flexGrow={1} className="contentStatContainer" vertical="center" horizontal="center">
            <span className="sideStatTitle">{this.props.title}</span>
            <span className="sidestatValue">{this.props.value}</span>
        </Column>);
    }
}

export default ContentBox;


// npm install --save