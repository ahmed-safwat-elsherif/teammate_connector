import parseToken from './parseToken';

const formatTokens = token => {
  const data = parseToken(token);

  return { ...data, isLoggedIn: true };
};

export default formatTokens;
