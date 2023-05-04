import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseHealth } from '../../../redux/toolkitRedux';

import './OpponentFight.scss'
import BackgroundVideo from '../../BackgroundVIdeo/BackgroundVideo';

interface OpponentInterface {
  name: string;
  image: string;
  strength: number;
  attack: number;
  agility: number;
}

interface OpponentFightProps {
  opponent?: OpponentInterface;
  attackClose: (item:boolean) => void;
}

const OpponentFight = ({ opponent, attackClose }: OpponentFightProps): JSX.Element => {
  const count = useSelector((state: any) => state.toolkit);
  const dispatch = useDispatch();

  const [health, setHealth] = useState(count.stats.health);
  const [hasAttacked, setHasAttacked] = useState(false);

  useEffect(() => {
    if (!hasAttacked) {
      handleAttack();
      setHasAttacked(true);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      attackClose(false);
    }, 3600);
    return () => clearTimeout(timeout);
  }, []);

  const handleAttack = () => {
    const damage = 0.5; // В этом месте можно задать значение урона
    dispatch(decreaseHealth({ damage }));
    setHealth(health - damage);
  };

  return (
    <div className='fightScreen'>
        <BackgroundVideo linkVideo={'https://static.moewalls.com/videos/preview/2022/the-chain-warden-thresh-league-of-legends-preview.mp4'}/>
        <div className='cardContainer'>
            <div className='player hit'>
                <img src={count.avatars != ''? count.avatars : undefined}/>
                <h3>{count.name}</h3>
            </div>
            <div className='opponent hit'>
                <img src={opponent?.image} alt={opponent?.name} />
                <h3>{opponent?.name}</h3>
            </div>
        </div>
    </div>
  );
};

export default OpponentFight;
