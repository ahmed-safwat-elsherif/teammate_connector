import { jwtDecode } from 'jwt-decode';

const parseToken = token => {
  try {
    return jwtDecode(token);
  } catch (error) {
    return {};
  }
};

export default parseToken;
