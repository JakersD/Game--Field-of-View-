import { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';

import Layout from '../components/Layout';

interface IGameState {
  error: boolean;
  distance: number;
  wordsToShow: {
    firstPart: string;
    secondPart: string;
  };
}

interface IProperty {
  wordsCount: string;
  distance: string;
  speed: string;
  distanceInc: string;
  letter: string;
}

const GameStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .separationSymb {
    width: 4.4vw;
  }
`;

const RightWord = styled.p`
  font-size: 2vw;
  text-transform: lowercase;
  color: #371548;
  width: 100%;
  text-align: left;
  margin-left: ${(props) => props.distance}px;
`;

const LeftWord = styled.p`
  font-size: 2vw;
  text-transform: lowercase;
  color: #371548;
  width: 100%;
  text-align: right;
  margin-right: ${(props) => props.distance}px;
`;

export default function Game() {
  const [state, setState] = useState<IGameState>({
    error: false,
    distance: 0,
    wordsToShow: { firstPart: '', secondPart: '' },
  });

  useEffect(() => {
    if (!localStorage.getItem('words') && !localStorage.getItem('property')) {
      return setState({ ...state, error: true });
    }

    const words: string[][] = JSON.parse(localStorage.getItem('words'));
    const property: IProperty = JSON.parse(localStorage.getItem('property'));

    if (Object.keys(words).length === 0) {
      Router.push('/final');
      return null;
    }

    setState({
      ...state,
      wordsToShow: { firstPart: words[0][0], secondPart: words[0][1] },
      distance: +property.distance,
    });

    let time = 1;
    const timer = setInterval(() => {
      if (words[time]) {
        setState((prev) => {
          return {
            ...prev,
            distance: prev.distance + +property.distanceInc,
            wordsToShow: { firstPart: words[time][0], secondPart: words[time][1] },
          };
        });
        time += 1;
        return null;
      }
      Router.push('/final');
    }, +property.speed * 1000);

    return () => clearInterval(timer);
  }, []);

  if (state.error) {
    return (
      <Layout>
        <GameStyled>
          <p>
            Что-то пошло не так, пожалуйста вернитесь на
            <Link href="/">
              <a> главную страницу</a>
            </Link>
          </p>
        </GameStyled>
      </Layout>
    );
  }
  return (
    <Layout>
      <GameStyled>
        <>
          <LeftWord distance={state.distance}>{state.wordsToShow.firstPart}</LeftWord>
          <img className="separationSymb" src="/tildaSymb.png" alt="Символ разделения" />
          <RightWord distance={state.distance}>{state.wordsToShow.secondPart}</RightWord>
        </>
      </GameStyled>
    </Layout>
  );
}
