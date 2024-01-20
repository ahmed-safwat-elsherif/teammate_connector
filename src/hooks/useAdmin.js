import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../redux/auth/selector';

export default () => {
  const isAdmin = useSelector(selectIsAdmin);
  return {
    isAdmin,
  };
};
