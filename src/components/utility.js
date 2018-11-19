export const GetColor = (card) => {
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
  
export const GetIconType = (card) => {
    return `https://steamcdn-a.akamaihd.net/apps/artifact/images/deck_art/card_type_${card.card_type.toLowerCase()}.png`;
}

const artifactCardSet = (setNumber) => `https://playartifact.com/cardset/${setNumber}`;

