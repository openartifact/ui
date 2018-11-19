import React, { Component } from 'react';
import { connect } from 'react-redux';
import set00 from './data/set00.json';
import set01 from './data/set01.json';
import Header from '../../odota-web/src/components/Header';
import Footer from '../../odota-web/src/components/Footer';
import FourOhFour from '../../odota-web/src/components/FourOhFour';
import GlobalStyle from '../../odota-web/src/components/App/GlobalStyle';
import { Link, Switch, Route } from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import constants from '../constants';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import './App.css';

const muiTheme = {
  fontFamily: constants.fontFamily,
  card: { fontWeight: constants.fontWeightNormal },
  badge: { fontWeight: constants.fontWeightNormal },
  subheader: { fontWeight: constants.fontWeightNormal },
  raisedButton: { fontWeight: constants.fontWeightNormal },
  flatButton: { fontWeight: constants.fontWeightNormal },
  inkBar: {
    backgroundColor: constants.colorBlue,
  },
  palette: {
    textColor: constants.textColorPrimary,
    primary1Color: constants.colorBlue,
    canvasColor: constants.primarySurfaceColor,
    borderColor: constants.dividerColor,
  },
  tabs: {
    backgroundColor: 'transparent',
    textColor: constants.colorMuted,
    selectedTextColor: constants.textColorPrimary,
  },
  button: { height: 38 },
};

const artifactCardSet = (setNumber) => `https://playartifact.com/cardset/${setNumber}`;

const GetColor = (card) => {
  if (card && card.is_blue) {
    return '#215e80';
  }
  else if (card && card.is_red) {
    return '#952e3a';
  }
  else if (card && card.is_black) {
    return '#312b31';
  }
  else if (card && card.is_green) {
    return '#5b7841';
  }
}

const GetIconType = (card) => {
  return `https://steamcdn-a.akamaihd.net/apps/artifact/images/deck_art/card_type_${card.card_type.toLowerCase()}.png`;
}

const ArtifactCardRow = (card) => {
  return <div className="artifactCardRow" style={{ backgroundColor: GetColor(card), height: '40px' }}>
    <div>
      <img className="smallIcon" src={GetIconType(card)} />
    </div>
    <div style={{ fontSize: '12px' }}>
      {card.card_name.english}
    </div>
    <div style={{ marginLeft: 'auto', display: 'flex' }}>
      <button>+</button>
      <div>0</div>
      <button>-</button>
    </div>
  </div>
};

const ArtifactCard = (card) => {
return (
  <div style={{ backgroundColor: GetColor(card) }} className="artifactCard">
    <div className="flexContainer">
      {card.ingame_image && card.ingame_image.default && <img className="smallIcon" src={card.ingame_image.default}></img>}
      <div className="headerText">{card.card_name.english}</div>
    </div>
    <div>
    <img className="cardImage" src={card.mini_image.default}></img>
    </div>
    <div className="flexContainer spaceAround alignBottom statsSection">
      <div className="flexContainer">
        <img className="artifactCardIcon" src="https://steamcdn-a.akamaihd.net/apps/artifact/images/deck_art/card_type_weapon.png" />
        <div className="inline">{card.attack}</div>
      </div>
      <div className="flexContainer">
        <img className="artifactCardIcon" src="https://steamcdn-a.akamaihd.net/apps/artifact/images/deck_art/card_type_health.png" />
        <div className="inline">{card.hit_points}</div>
      </div>
    </div>
  </div>);
}

const ArtifactCardImage = (props) => {
  return <div><img style={{ width: '200px' }} src={props.large_image.default}></img></div>;
}

const StyledDiv = styled.div`
  transition: ${constants.normalTransition};
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  left: ${props => (props.open ? '256px' : '0px')};
  background-image: ${props => (props.location.pathname === '/' ? 'url("/assets/images/home-background.png")' : '')};
  background-position: ${props => (props.location.pathname === '/' ? 'center top' : '')};
  background-repeat: ${props => (props.location.pathname === '/' ? 'no-repeat' : '')};

  #back2Top {
    position: fixed;
    left: auto;
    right: 0px;
    top: auto;
    bottom: 20px;
    outline: none;
    color: rgb(196, 196, 196);
    text-align: center;
    outline: none;
    border: none;
    background-color: rgba(0,0,0,0.3);
    width: 40px;
    font-size: 14px;
    border-radius: 2px;
    cursor: pointer;
    z-index: 999999;
    opacity: 0;
    display: block;
    pointer-events: none;
    -webkit-transform: translate3d(0,0,0);
    padding: 3px;
    transition: opacity 0.3s ease-in-out;

    & #back2TopTxt {
      font-size: 10px;
      line-height: 12px;
      text-align: center;
      margin-bottom: 3px;
    }
  }

  #back2Top:hover {
    background-color: rgb(26, 108, 239);
  }
`;

const StyledBodyDiv = styled.div`
  padding: 25px;
  flex-grow: 1;

  @media only screen and (min-width: ${constants.appWidth}px) {
    width: ${constants.appWidth}px;
    margin: auto;
  }
`;

const Home = ({ }) => {
  let cards = [...set01.card_set.card_list, ...set00.card_set.card_list, ];
  cards = cards.filter(card => card.large_image && card.large_image.default);
  return (<div className="App">
  <div className="flexContainer">
    <div>
      {cards.slice(0, 70).map(card => <div><ArtifactCardRow {...card} /></div>)}
    </div>
    <div>
      {cards.slice(0, 50).map(card => <div style={{ padding: '4px' }}><ArtifactCard {...card} /></div>)}
      {/*cards.filter(card => card.large_image && card.large_image.default).map(card => <ArtifactCardImage {...card} />)*/}
    </div>
  </div>
  </div>);
}

class App extends Component {
  async componentDidMount() {
    
  }
  render() {
    const {
      width, location, strings,
    } = this.props;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme, muiTheme)}>
        <GlobalStyle />
        <StyledDiv {...this.props}>
          <Helmet
            defaultTitle={strings.title_default}
            titleTemplate={strings.title_template}
          />
          <Header 
            location={location}
            disableSearch
            navbarPages={[
            <Link to="/cards">Cards</Link>,
            <Link to="/deckbuilder">Deckbuilder</Link>,
            <Link to="/guides">Guides</Link>,
            <Link to="/stats">Stats</Link>,
          ]} />
          <StyledBodyDiv {...this.props}>
            <Switch>
              <Route exact path="/" component={Home} />
              {/* TODO put the rest of the routes here */}
              <Route component={FourOhFour} />
            </Switch>
          </StyledBodyDiv>
          <Footer location={location} width={width} />
          <button ref={this.setBack2TopRef} id="back2Top" title={strings.back2Top} onClick={this.handleBack2TopClick}>
            <div>&#9650;</div>
            <div id="back2TopTxt">{strings.back2Top}</div>
          </button>
        </StyledDiv>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(App);
