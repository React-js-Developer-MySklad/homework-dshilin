import React, { FC } from 'react';
import Button from '../button/button';
import Logo from '@assets/logo.svg';
import IconFileAdd from '@assets/icon-file-add.svg';
import './header.css';

type HeaderProps = {
   mainButtonHandler: Function;
}

const Header: FC<HeaderProps> = ({mainButtonHandler}) => (
   <header>
      <img src={Logo} alt="МойСклад" className="logo" />
      <Button icon={IconFileAdd} iconAlt="+" text="Добавить" onClick={() => mainButtonHandler()} />
   </header>
)

export default Header;