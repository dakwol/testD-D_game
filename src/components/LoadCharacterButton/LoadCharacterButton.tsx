import React from "react";
import { useDispatch } from "react-redux";
import { exportCharacter, loadState } from "../../redux/toolkitRedux";
import './style.scss';

interface buttonDownLoad {
    download?: boolean;
  }

const LoadCharacterButton = ({download}:buttonDownLoad) => {
    const dispatch = useDispatch();

    const handleLoadCharacter = async (e:any) => {
        const file = e.target.files[0];
        const character = await file.text();
        dispatch(loadState(JSON.parse(character)));
    };

    const handleExport = () => {
        dispatch(exportCharacter());
    };

  return (
    <>
        {download?
            <>
                <button className='loadCharacterButton' onClick={()=>handleExport()}>Скачать</button>
            </>
            :
            <>
                <label htmlFor="loadCharacter" className="loadCharacterButton">
                    Загрузить
                </label>
                <input
                    type="file"
                    id="loadCharacter"
                    accept=".json"
                    onChange={(e) => handleLoadCharacter(e)}
                    style={{ display: "none" }}
                />
            </>
        }
    </>

  );
}

export default LoadCharacterButton;
