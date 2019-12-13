import React from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import AddedFeatures from './components/AddedFeatures';
import AdditionalFeatures from './components/AdditionalFeatures';
import Total from './components/Total';

//////////////////////////////////////////////////////
////////////////////////ACTION////////////////////////
//////////////////////////////////////////////////////

/// these will allow the actions to get plugged into the reducer

 const ADD_FEATURE = 'ADD_FEATURE';

 const REMOVE_FEATURE = 'RemoveFeature';

 const UPDATE_TOTAL = 'UPDATE_TOTAL';

 // actions that are defined

 const addFeature = feature => {
  return { type: ADD_FEATURE, payload: feature };
}
 const removeFeature = feature => {
  return { type: REMOVE_FEATURE, payload: feature };
}
 const updateTotal = total => {
  return { type: UPDATE_TOTAL, payload: total };
}

// initial state
 const initState = {
  additionalPrice: 0,
  car: {
      price: 26395,
      name: '2019 Ford Mustang',
      image:
          'https://cdn.motor1.com/images/mgl/0AN2V/s1/2019-ford-mustang-bullitt.jpg',
      features: []
  },
  store: [
      {id: 1, name: 'V-6 engine', price: 1500},
      {id: 2, name: 'Racing detail package', price: 1500},
      {id: 3, name: 'Premium sound system', price: 500},
      {id: 4, name: 'Rear spoiler', price: 250},
      {id: 5, name: 'Nitro', price: 500},
      {id: 6, name: 'Spikes', price: 1000},
      {id: 7, name: 'Illegal Suspension', price: 2500}
  ]
};

//////////////////////////////////////////////////////
///////////////////////REDUCER////////////////////////
//////////////////////////////////////////////////////

// default state to initState if nothing is returned by action
export const reducer = (state = initState, action) => {
// switch statement (if parameter = case, then return case)
// reducer will filter through all the actions
//  addFeature
//  removeFeature
//  updateTotal
  switch (action.type) {

      case 'ADD_FEATURE': return {
        // spread/inherit initState (initial State) 
        // spread operator keeps initial content from its reference (state)
          ...state,
          car: {
              ...state.car,
              // action.payload - adds payload to features
              features: [...state.car.features, action.payload]
          },
          // filter creates new arrays with given criteria, in this case: 
          // if state.store's id is not equal to action.payload.id it will return the new id (add.id)
          store: state.store.filter(stores => stores.id !== action.payload.id)
      }

      case 'REMOVE_FEATURE': return {
          ...state,
          car: {
              ...state.car,
              features: state.car.features.filter(add => add.id !== action.payload.id)
          },
          store: [...state.store, action.payload]
      }

      case 'UPDATE_TOTAL': return {
          ...state,
          additionalPrice: state.additionalPrice + action.payload
      }

      default: return state;
  }
}

//////////////////////////////////////////////////////
////////////////////////APP///////////////////////////
//////////////////////////////////////////////////////

const App = props => {

  const removeFeature = item => {
    // dispatch an action here to remove an item
    props.removeFeature(item);
    props.updateTotal(-item.price);
  };

  const buyItem = item => {
    // dipsatch an action here to add an item
    props.addFeature(item);
    props.updateTotal(item.price);
  };

  return (
    <div className="boxes">
      <div className="box">
        <Header car={props.car} additionalFeatures={props.additionalPrice} />
        <AddedFeatures car={props.car} removeFeature={removeFeature} />
      </div>
      <div className="box">
        <AdditionalFeatures store={props.store} addFeature={buyItem} />
        <Total car={props.car} additionalPrice={props.additionalPrice} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    car: state.car,
    store: state.store,
    additionalPrice: state.additionalPrice
  }
}

export default connect(mapStateToProps, { addFeature, removeFeature, updateTotal })(App);
