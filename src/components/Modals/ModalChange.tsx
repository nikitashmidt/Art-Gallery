/* eslint-disable jsx-a11y/label-has-associated-control */
import cn from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';

import type { IModalAdd } from '@types';

import useTheme from '@hooks/useTheme';

import Button from '@ui/Button';
import Input from '@ui/Input';

import { ReactComponent as BrowseIcon } from '@svg/empty.svg';
import { ReactComponent as CloseBtn } from '@svg/close-btn.svg';

import Modal from './Modal';

import './style.scss';

interface IModalChange {
  // variant?: 'add' | 'edit';
  onClose: () => void;
}

const ModalChange = ({ onClose }: IModalChange) => {
  const { isDark } = useTheme();

  const schema = yup.object({
    namePicture: yup.string().required('Enter your name of picture'),
    yearCreation: yup
      .number()
      .min(4, 'Min number of characters 4')
      .required('Enter your password'),
  });

  const { handleSubmit, register } = useForm<IModalAdd>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IModalAdd> = (data) => {
    console.log('content');
    console.log(data);
  };

  const namePicture = register('namePicture');

  const yearCreation = register('yearCreation');

  const picture = register('picture');

  return (
    <Modal onClose={onClose} variant='picture'>
      <div className={cn('modal-add', { 'modal-add--dark': isDark })}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            type='button'
            onClick={onClose}
            className={cn('modal-add__close')}
          >
            <CloseBtn />
          </button>
          <div className={cn('modal-add__inputs')}>
            <div className='modal-add__name'>
              <Input
                required={namePicture.required as boolean}
                onBlur={namePicture.onBlur}
                inputRef={namePicture.ref}
                onChange={namePicture.onChange}
                labelText='The name of the picture'
                name={namePicture.name}
                type='text'
                className={cn('modal-add__input')}
              />
            </div>

            <div className='modal-add__year'>
              <Input
                required={yearCreation.required as boolean}
                inputRef={yearCreation.ref}
                onChange={yearCreation.onChange}
                labelText='Year of creation'
                name={yearCreation.name}
                onBlur={yearCreation.onBlur}
                type='number'
                className={cn('modal-add__input')}
              />
            </div>
          </div>

          <div className={cn('modal-add__block')}>
            <label htmlFor='file'>
              <BrowseIcon className={cn('modal-add__icon')} />
            </label>
            <input
              onBlur={picture.onBlur}
              onChange={picture.onChange}
              ref={picture.ref}
              required={picture.required}
              type='file'
              name='file'
              id='file'
              className={cn('modal-add__file')}
            />
            <label htmlFor='file' className={cn('modal-add__label')}>
              <span className='modal-add__drop'>Drop your image here, or</span>
              browse image
            </label>
            <p className='modal-add__descr'>
              Upload only .jpg or .png format less than 3 MB
            </p>
          </div>

          <Button type='submit' className={cn('modal-add__button')}>
            Save
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalChange;
