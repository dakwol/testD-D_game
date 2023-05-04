import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import FileSaver from "file-saver";

const initialState = {
  name: "",
  avatars: "",
  stats: {
    strength: 0,
    agility: 0,
    intelligence: 0,
    charisma: 0,
    health: 3,
    dodge: 10,
    energy: 0,
  },
  skills: {
    attack: { level: 0, baseStat: 'strength' },
    stealth: { level: 0, baseStat: 'agility' },
    archery: { level: 0, baseStat: 'agility' },
    learnability: { level: 0, baseStat: 'intelligence' },
    survival: { level: 0, baseStat: 'intelligence' },
    medicine: { level: 0, baseStat: 'intelligence' },
    intimidation: { level: 0, baseStat: 'charisma' },
    insight: { level: 0, baseStat: 'intelligence' },
    appearance: { level: 0, baseStat: 'charisma' },
    manipulation: { level: 0, baseStat: 'intelligence' }
  }
};

//@ts-ignore
const reduxState = JSON.parse(localStorage.getItem("reduxState"));
if (!reduxState) {
  localStorage.setItem("reduxState", JSON.stringify(initialState));
}

export const nameAdd = createAction<{ name: string }>("NAME_ADD");
export const addAvatar = createAction<{ avatar: string }>("ADD_AVATAR");

export const incrementStat = createAction<{ stat: keyof typeof initialState.stats }>("INCREMENT_STAT");
export const decrementStat = createAction<{ stat: keyof typeof initialState.stats }>("DECREMENT_STAT");

export const incrementSkills = createAction<{ skill: keyof typeof initialState.skills }>("INCREMENT_SKILL");
export const decrementSkills = createAction<{ skill: keyof typeof initialState.skills }>("DECREMENT_SKILL");


export const decreaseHealth = createAction<{ damage: number }>("DECREASE_HEALTH");

export const exportCharacter = createAction("EXPORT_CHARACTER");
export const loadState = createAction<typeof initialState>("LOAD_STATE");

const calculateHealth = (state: typeof initialState) => {
  state.stats.health = 3 + state.stats.strength;
};

const calculateDodge = (state: typeof initialState) => {
  state.stats.dodge = 10 + state.stats.agility;
};

const calculateEnergy = (state: typeof initialState) => {
    state.stats.energy = state.stats.agility + state.stats.intelligence;
};


const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState') as string)
  : initialState;

const reducer = createReducer(persistedState, (builder) => {
  builder
    .addCase(nameAdd, (state, action) => {
      state.name = action.payload.name;
      localStorage.setItem("reduxState", JSON.stringify(state));
    })
    .addCase(addAvatar, (state, action) => {
      state.avatars = action.payload.avatar;
      localStorage.setItem("reduxState", JSON.stringify(state));
    })
    .addCase(incrementStat, (state, action) => {
      state.stats[action.payload.stat] += 1;
      if (action.payload.stat === 'strength') {
        calculateHealth(state);
        console.log(initialState.skills.attack.level += 1)
      }
      if (action.payload.stat === 'agility') {
        calculateDodge(state);
      }
      if (action.payload.stat === 'agility' || action.payload.stat === 'intelligence'){
        calculateEnergy(state)
      }
      localStorage.setItem("reduxState", JSON.stringify(state));
    })
    .addCase(decrementStat, (state, action) => {
      state.stats[action.payload.stat] -= 1;
      if (action.payload.stat === 'strength') {
        calculateHealth(state);
      }
      if (action.payload.stat === 'agility') {
        calculateDodge(state);
      }
      if (action.payload.stat === 'agility' || 'intelligence'){
        calculateEnergy(state)
      }
      localStorage.setItem("reduxState", JSON.stringify(state));
    })

    
    .addCase(decreaseHealth, (state, action) => {
      if(state.stats.health > 0){
        state.stats.health -= action.payload.damage;
        localStorage.setItem("reduxState", JSON.stringify(state));
      }
    })

    .addCase(exportCharacter, (state) => {
      const characterData = JSON.stringify(state);
      const blob = new Blob([characterData], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, "character.json");
    })

    .addCase(incrementSkills, (state, action) => {
      console.log('click')
      const { skill } = action.payload;
      const skillInfo = state.skills[skill];
      const baseStatValue = state.stats[skillInfo.baseStat];
      if (skillInfo.level < baseStatValue && skillInfo.level < 5) {
        skillInfo.level += 1;
        localStorage.setItem("reduxState", JSON.stringify(state));
      }
    })
    
    .addCase(decrementSkills, (state, action) => {
      const { skill } = action.payload;
      const skillInfo = state.skills[skill];
    
      if (skillInfo.level > 0) {
        skillInfo.level -= 1;
        localStorage.setItem("reduxState", JSON.stringify(state));
      }
    })

    .addCase(loadState, (state, action) => {
      localStorage.setItem("reduxState", JSON.stringify(action.payload));
      return action.payload;
    })    
});

export default reducer;
