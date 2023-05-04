import React from 'react';
import './OpponentCard.scss';

interface OpponentCardProps {
  name: string;
  image: string;
  strength: number;
  attack: number;
  agility: number;
  onClick: () => void;
}

const OpponentCard: React.FC<OpponentCardProps> = ({
  name,
  image,
  strength,
  attack,
  agility,
  onClick,
}) => {
  return (
    <div className="opponent-card" onClick={onClick}>
      <img src={image} alt={name} />
      <div className="opponent-info">
        <h2>{name}</h2>
        <p>Strength: {strength}</p>
        <p>Attack: {attack}</p>
        <p>Agility: {agility}</p>
      </div>
    </div>
  );
};

export default OpponentCard;