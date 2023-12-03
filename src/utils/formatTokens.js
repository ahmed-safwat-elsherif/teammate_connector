import parseToken from './parseToken';

const formatTokens = tokens => {
  const data = parseToken(tokens.idToken);
  const { firstname, lastname, username, exp, iat } = data;
  const user = {
    firstname,
    lastname,
    username,
  };
  return { user, exp, iat, ...tokens, isLoggedIn: true };
};

export default formatTokens;
