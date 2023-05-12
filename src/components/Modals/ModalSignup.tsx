import Signup from '@components/Auth/Signup';
import Modal from './Modal';

interface IModalSignup {
  onCloseSignup?: () => void;
  signupClick?: () => void;
  isDark: boolean;
}

const ModalSignup = ({ onCloseSignup, signupClick, isDark }: IModalSignup) => (
  <Modal variant='signup' onClose={onCloseSignup}>
    <Signup
      isDark={isDark}
      onClick={signupClick}
      onCloseSignup={onCloseSignup}
    />
  </Modal>
);

export default ModalSignup;
