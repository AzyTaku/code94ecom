export const API_URL = "http://127.0.0.1:5094" || window.location.origin;
//should be
// export const API_URL = process.env.REACT_APP_API_URL || window.location.origin; // error msg process not defined
