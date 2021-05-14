import Link from 'next/link';
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
      <Link href="/">
        <a>
          <Logo src="/logo.png" alt="Логотип" />
        </a>
      </Link>
      <main>{children}</main>
    </>
  );
}
