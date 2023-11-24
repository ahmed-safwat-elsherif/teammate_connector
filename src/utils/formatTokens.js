import parseToken from './parseToken';

const formatTokens = tokens => {
  const data = parseToken(tokens.idToken);

  return { ...data, ...tokens, isLoggedIn: true };
};

export default formatTokens;
