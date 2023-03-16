import { createContext, useReducer } from 'react'

export const PitchContext = createContext();

export const ACTION_TYPES = {
    SET_LAT_LONG: 'SET_LAT_LONG',
    SET_FOOTBALL_PITCHES: 'SET_FOOTBALL_PITCHES',
  }
  
  const pitchReducer = (state, action) => {
    switch(action.type) {
      case ACTION_TYPES.SET_LAT_LONG: {
        return {...state, latLong: action.payload.latLong}
      }
      case ACTION_TYPES.SET_FOOTBALL_PITCHES: {
        return {...state, footballPitches: action.payload.footballPitches}
      }
      default:
        throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
  
  const PitchProvider = ({children}) => {
    const initialState = {
      latLong: "",
      footballPitches: [],
    }
  
    const [state, dispatch] = useReducer(pitchReducer, initialState);
    return (
      <PitchContext.Provider value={{ state, dispatch }}>
        {children}
      </PitchContext.Provider>
      
    )
  } 

  export default PitchProvider;