export const khoiTao = {
  loading: false,   
  TimKiem: null,
  err: {},
  ThanhCong:'',
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
    case 'SET_HT':
      return {
        ...state,
        ThanhCong: action.payload.ThanhCong
      };
    default:
      return state;
  }
}

