  import React, { useEffect, useState } from 'react';
  import './OpponentColumn.scss';

  import Slider from 'react-slick';
  import 'slick-carousel/slick/slick.css';
  import 'slick-carousel/slick/slick-theme.css';
  import OpponentCard from './OpponentCard/OpponentCard';
  import OpponentFight from './OpponentFight/OpponentFight';

  interface OpponentInterface {
    name: string,
    image: string,
    strength: number,
    attack: number,
    agility: number,
  }

  const opponents: OpponentInterface[] = [
    {
      name: 'Opponent 1',
      image: 'https://phonoteka.org/uploads/posts/2022-09/1663592396_26-phonoteka-org-p-arti-voinov-vkontakte-26.jpg',
      strength: 80,
      attack: 70,
      agility: 90,
    },
    {
      name: 'Opponent 2',
      image: 'https://chakiris.club/uploads/posts/2022-03/1646459457_44-chakiris-club-p-chelovek-luchnik-fentezi-fentezi-oboi-56.jpg',
      strength: 70,
      attack: 60,
      agility: 80,
    },
    {
      name: 'Opponent 3',
      image: 'https://phonoteka.org/uploads/posts/2022-09/1663590645_8-phonoteka-org-p-voin-mag-art-instagram-9.jpg',
      strength: 90,
      attack: 80,
      agility: 70,
    },
  ];

  const OpponentColumn = (): JSX.Element => {

    const [selectedOpponent, setSelectedOpponent] = useState<OpponentInterface | null>(null);
    const [isOpponentSelected, setIsOpponentSelected] = useState(false);


    const handleAttackClose = () => {
      setSelectedOpponent(null);
      setIsOpponentSelected(false);
    }

    const OpponentSlider = ({ opponents }: { opponents: OpponentInterface[] }): JSX.Element => {

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  
  
      const handleCardClick = (opponent: OpponentInterface) => {
        console.log(`Выполняем атаку на ${opponent.name}!`);
        setSelectedOpponent(opponent);
        setIsOpponentSelected(true);
      }
  
  
      return (
        <>
        
            <div className="opponent-slider">
              <Slider {...settings}>
                {opponents.map((opponent: OpponentInterface) => (
                  <OpponentCard
                    key={opponent.name}
                    name={opponent.name}
                    image={opponent.image}
                    strength={opponent.strength}
                    attack={opponent.attack}
                    agility={opponent.agility}
                    onClick={() => { handleCardClick(opponent) }}
                  />
                ))}
              </Slider>
            </div>  
          
          
        </>
      );
    };

    return (
      <>
        {isOpponentSelected ? 
          <OpponentFight opponent={selectedOpponent!} attackClose={handleAttackClose} /> 
          : 
        <div className='rigthColumn'>
          <div className='containerOpponent'>
            <OpponentSlider opponents={opponents} />
          </div>
        </div>
        }
      </>
    )
  }

  export default OpponentColumn;
