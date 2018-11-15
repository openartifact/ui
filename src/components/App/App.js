import React, { Component } from 'react';
import './App.css';
import set00 from './data/set00.json';
import set01 from './data/set01.json';

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

class App extends Component {
  async componentDidMount() {
    
  }
  render() {
    let cards = [...set01.card_set.card_list, ...set00.card_set.card_list, ];
    cards = cards.filter(card => card.large_image && card.large_image.default);
    return (
      <div className="App">
      <header className="App-header">
          <div className="flexContainer">
            <div>
              {cards.slice(0, 70).map(card => <div><ArtifactCardRow {...card} /></div>)}
            </div>
            <div>
              {cards.slice(0, 50).map(card => <div style={{ padding: '4px' }}><ArtifactCard {...card} /></div>)}
              {/*cards.filter(card => card.large_image && card.large_image.default).map(card => <ArtifactCardImage {...card} />)*/}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
