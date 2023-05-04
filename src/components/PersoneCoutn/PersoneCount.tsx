import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAvatar, decrementSkills, decrementStat, exportCharacter, incrementSkills, incrementStat, nameAdd } from '../../redux/toolkitRedux';
import './PersoneCount.scss';

import { FaUserNinja } from 'react-icons/fa';
import LoadCharacterButton from '../LoadCharacterButton/LoadCharacterButton';
import RenderSkills from '../RenderSkills/RenderSkills';

const PersonCount = () => {
    const count = useSelector((state: any) => state.toolkit);
    const dispatch = useDispatch();

    const [name, setName] = useState(count.name);
    const [avatar, setAvatar] = useState(count.avatars != ''? count.avatars : undefined);
    const [activeLeftBar, setActiveLeftBar] = useState(true)
    const [active, setActive] = useState(false)

    useEffect(() => {
        dispatch(nameAdd({ name: name }));
    }, [name, dispatch]);

    useEffect(()=>{
        dispatch(
            //@ts-ignore
            addAvatar({ avatar: avatar })
        )

    },[avatar, dispatch])

    const renderStats = () => {
        const stats = count.stats;
        const statNames = Object.keys(stats);
        return statNames.map((statName) => (
        <div key={statName} className='statsItem'>
            <h4 className='statText'>
            {statName}: {stats[statName]}
            </h4>
            <div className='statContainerItem'>
                <button className='statButton' onClick={() => {
                    //@ts-ignore
                    dispatch(incrementStat({ stat: statName }))
                }}>+</button>
                <button className='statButton' onClick={() => {
                    //@ts-ignore
                    dispatch(decrementStat({ stat: statName }))
                }}>-</button>
            </div>
            <FaUserNinja className='iconNav'></FaUserNinja>
        </div>
        ));
    };

  return (
    <div className='leftContainer'>
        <div className={activeLeftBar? 'leftColumn' : 'leftColumn active'}>
            <div className={activeLeftBar? 'columnContainer': 'columnContainer active'}>
                <div className='headerContainer'>
        
                <div className='avatar'>
                    <img src={avatar} className='avatarIm'/>
                    <label htmlFor="avatarInput" className="avatarInput">
                        Загрузить
                    </label>
                    <input
                        id='avatarInput'
                        type='file'
                        onChange={(e) => setAvatar(
                        //@ts-ignore
                        URL.createObjectURL(e.target.files ? e.target.files[0] : null)
                        )}
                        style={{display: 'none'}}
                    />
                </div>

                    <input value={name} onChange={(e) => setName(e.target.value)} className='inputName'/>
                </div>
        
                {active? <RenderSkills/> : renderStats()}
                <button className='button' onClick={()=>setActive(!active)}>Ещё</button>
                
                <div className='leftContainerFooter'>
                    <LoadCharacterButton download={true}></LoadCharacterButton>
                    <LoadCharacterButton download={false}></LoadCharacterButton>
                </div>
            </div>
            <div className='containerIcons'>
                <button className={activeLeftBar? "toggleButton" : "toggleButton open"} onClick={()=>setActiveLeftBar(!activeLeftBar)}>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </div>
  );
};

export default PersonCount;
