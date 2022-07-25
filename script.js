const initialWagonState = {
    supplies: 100,
    distance: 0,
    days: 0,
    cash: 200
}

const reducer = (state = initialWagonState, action) => {
    switch(action.type) {
        case 'gather': {
            return {
                ...state,
                supplies: state.supplies + 15,
                distance: state.distance,
                days: state.days + 1
            };
        }

        case 'travel': {
            if (state.supplies < 20 * action.payload) return state;
            return {
                ...state,
                supplies: state.supplies - (20 * action.payload),
                distance: state.distance + (10 * action.payload),
                days: state.days + action.payload
            };
        }
        case 'tippedWagon': {
            return {
                ...state,
                supplies: state.supplies - 30,
                distance: state.distance,
                days: state.days + 1
            }
        }
        case 'sell':
            return {
                ...state,
                supplies: state.supplies - (20 * action.payload),
                distance: state.distance,
                days: state.days,
                cash: state.cash + (5 * action.payload),
            }
        case 'buy':
            return {
                ...state,
                supplies: state.supplies + (25 * action.payload),
                cash: state.cash + (15 * action.payload),
            }
        case 'theft':
            return {
                ...state,
                cash: state.cash / 2
            }
        default: {
            return state;
        }
    }
}

let wagon = reducer(undefined, {});
wagon = reducer(wagon, {type: 'travel', payload: 1});
wagon = reducer(wagon, {type: 'gather'});
wagon = reducer(wagon, {type: 'tippedWagon'});
console.log(wagon);
wagon = reducer(wagon, {type: 'sell', payload: 2});
console.log(wagon);