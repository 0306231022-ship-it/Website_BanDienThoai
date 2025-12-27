export const khoiTao = {
  loading: false,   
  TimKiem: null,
  err: {},
};

export function QuanLiThuongHieu(state, action) {
  switch (action.type) {
    case 'SET_ERR':
      return {
        ...state,
        err: { ...state.err, ...action.payload } // merge object
      };
    case 'SET_ERR_HT':
      return {
        ...state,
        err: { ...state.err, ...action.payload } // merge object
        };
    default:
      return state;
  }
}

