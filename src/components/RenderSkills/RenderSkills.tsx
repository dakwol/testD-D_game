import { useDispatch, useSelector } from "react-redux";
import {incrementSkills } from "../../redux/toolkitRedux";

const RenderSkills = () => {
    const skills = useSelector((state:any) => state.toolkit.skills);
    const dispatch = useDispatch();
    
    return (
            <div style={{width: '100%', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <h2 style={{margin: 0, marginBottom: 10}}>Скиллы</h2>
                <ul style={{width: '100%'}}>
                    {Object.keys(skills).map((skill) => (
                    <div style={{width: '84%', display: "flex", justifyContent: "space-between", alignItems: "center",}}>
                        <li key={skill}>
                            {skill}: Уровень {skills[skill].level} 
                            <br/>
                            (зависит от {skills[skill].baseStat})
                        
                        </li>
                        {skills[skill].level < 5?
                            <button className='statButton' style={{marginLeft: 20}} onClick={() => {
                                //@ts-ignore
                                dispatch(incrementSkills({ skill: skill }))
                                console.log('click')
                            }}>+</button>
                            :
                            <></>
                        }
                    </div>
                    ))}
                </ul>
                </div>
    )
    };

export default RenderSkills;
