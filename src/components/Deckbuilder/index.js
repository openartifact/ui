import React from 'react';
import ArtifactCard from '../ArtifactCard';
import ArtifactCardRow from '../ArtifactCardRow';
import set00 from '../../data/set00.json';
import set01 from '../../data/set01.json';

const Deckbuilder = ({ }) => {
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

export default Deckbuilder;