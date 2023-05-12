import Login from '@components/Auth/Login';
import Modal from './Modal';

interface IModalLogin {
  onCloseLogin?: () => void;
  loginClick?: () => void;
  isDark: boolean;
}

const ModalLogin = ({ isDark, onCloseLogin, loginClick }: IModalLogin) => (
  <Modal variant='login' onClose={onCloseLogin}>
    <Login isDark={isDark} onClick={loginClick} onCloseLogin={onCloseLogin} />
  </Modal>
);

export default ModalLogin;
