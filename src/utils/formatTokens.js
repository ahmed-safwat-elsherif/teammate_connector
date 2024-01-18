import parseToken from './parseToken';

const formatTokens = tokens => {
  const data = parseToken(tokens.idToken);
  const { email, firstname, lastname, username, role, exp, iat } = data;
  const user = {
    firstname,
    lastname,
    username,
    email,
    role,
  };
  return { user, exp, iat, ...tokens, isLoggedIn: true };
};

export default formatTokens;
