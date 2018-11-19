import React from 'react';
import { GetColor } from '../utility';

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

export default ArtifactCard;