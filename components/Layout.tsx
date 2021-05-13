import Image from 'next/image';
import styled from 'styled-components';

const Logo = styled.img`
  position: absolute;
  right: 2.5vw;
  top: 4.5vh;
  width: 15vw;
`;

export default function Layout({ children }) {
  return (
    <>
      <Logo src="/logo.png" alt="Логотип" />
      <main>{children}</main>
    </>
  );
}
