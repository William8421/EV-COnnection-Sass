export const mapState = {
  locations: [],
  routeData: {},
  actualPosition: null,
  startPoint:null,
  endPoint:{}
};
const mapReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_POS": {
      return {
        ...state,
        locations: payload,
      };
    }
    case "FILTER_CHARGER": {
      return {
        ...state,
        locations: payload,
      };
    }
    case "CAlC_ENDPOINT": {
      return {
        ...state,
        endPoint: payload,
      };
    }
    case "START_POINT": {
      return {
        ...state,
        startPoint: payload,
      };
    }
    case "CALC_ROUTE":{
      return{
        ...state,
        startPoint:{lat: payload.startLat_Long.lat, lng: payload.startLat_Long.long},
        endPoint:{lat: payload.endLat_Long.lat, lng: payload.endLat_Long.long},
      }
    }
    default: {
      return state;
    }
  }
};
export default mapReducer;
