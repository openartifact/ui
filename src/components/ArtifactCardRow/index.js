import React from 'react';
import { GetColor, GetIconType } from '../utility';

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

export default ArtifactCardRow;