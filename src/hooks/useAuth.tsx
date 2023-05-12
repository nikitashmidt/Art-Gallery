import { authSelector } from '@store/selectors';
import { useAppSelector } from './useStore';

const useAuth = () => {
  const { isUser } = useAppSelector(authSelector);

  return isUser;
};

export default useAuth;
