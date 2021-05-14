import Layout from '../components/Layout';
import styled from 'styled-components';

const FinalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  img {
    width: 23vw;
  }

  h1 {
    color: #2b3172;
  }
`;

export default function final() {
  return (
    <Layout>
      <FinalStyled>
        <img src="/mascot.png" alt="Маскот" />
        <h1>Отличная работа!</h1>
      </FinalStyled>
    </Layout>
  );
}
