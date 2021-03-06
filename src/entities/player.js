import { updateBoard } from "./board"
import { createCardData, instantiateCard } from '../entities/card';

export function createPlayerData(name, deck, isLocalPlayer, score, color = 'red', hand = [], isPlayerA = false) {
    return {
        name,
        deck,
        isLocalPlayer,
        score,
        color,
        hand,
        isPlayerA
    };
};

/**
 * 
 * @param {Object} playedCard card gameObject
 * @param {Array} hand an array of cards
 * @param {Array} board a matrix of cards
 * @returns A new player hand array
 */
export function playCard(playedCard, hand, board) {
    updateBoard(board, playedCard);

    const indexToRemove = hand.indexOf(playedCard);
    return hand.filter((card, index) => index === indexToRemove);
}

export function dealPlayerHand(scene, deck, player) {
    return deck.map((cardData, index) => {
        const handDistanceFromTop = 250;
        // determine which x position to render hand
        const handPosition = player.isLocalPlayer ? 1135 : 145;

        const card = createCardData(
            cardData.name,
            cardData.rankClass,
            cardData.level,
            cardData.up,
            cardData.right,
            cardData.down,
            cardData.left,
            cardData.image,
            0, 
            0, 
            player.color, 
            player.color
        );
        
        return instantiateCard(
            scene,
            handPosition, 
            handDistanceFromTop + (index * 70),
            card,
            player.isLocalPlayer
        ).setDepth(index);
    });
}

export function removeCardFromHand(indexToRemove, hand) {
    // need to call destroy to manage gameobejct within Phaser
    // hand[indexToRemove].destroy();
    
    return hand.filter((item, itemIndex) => {
        return indexToRemove !== itemIndex;
    });
};