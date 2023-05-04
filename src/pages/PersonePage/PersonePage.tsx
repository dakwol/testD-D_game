import React, { FC } from 'react';
import Header from '../../components/header/Header';
import PersoneCount from '../../components/PersoneCoutn/PersoneCount';
import OpponentColumn from '../../components/PersoneColumn/OpponentColumn';

import './PersonePage.scss'
import BackgroundVideo from '../../components/BackgroundVIdeo/BackgroundVideo';

const PersonePage:FC = () => {
  return (
    <>
      <Header/>
      
      <BackgroundVideo linkVideo={'https://static.moewalls.com/videos/preview/2022/ruined-shyvana-league-of-legends-preview.mp4'}/>
      <div style={{width: "100%",display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <PersoneCount/>
        <OpponentColumn/>
      </div>
    </>
  );
};

export default PersonePage;
