import React from 'react';
import './BackgroundVideo.scss';

const BackgroundVideo = ({linkVideo}:any) => {
  return (
    <div className='background-video'>
      <video autoPlay muted loop width="100%">
        <source src={linkVideo} type="video/mp4"/>
        Sorry, your browser doesn't support embedded videos.
        </video>
    </div>
  );
};

export default BackgroundVideo;
