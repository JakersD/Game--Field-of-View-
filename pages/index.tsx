import React, { useState } from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import Head from 'next/head';

import RangeSlider from '../components/RangeSlider';
import Counter from '../components/Counter';
import Button from '../components/Button';
import Layout from '../components/Layout';

interface IIndexProps {
  words: string[];
}

const Title = styled.h1`
  display: inline-block;
  color: #2b3172;
  padding-top: 7vh;
  display: flex;
  justify-content: center;
  font-size: 3vw;
  margin-bottom: 50px;
`;

const Table = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  .column {
    display: flex;
    flex-direction: column;
  }
`;

export default function Index({ words }: IIndexProps) {
  const [state, setState] = useState({
    wordsCount: '5',
    distance: '25',
    letters: '5',
    distanceInc: '5',
    speed: '1',
  });

  const sliderChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };

  const speedChangeHandler = (value: string) => {
    setState({ ...state, speed: value });
  };

  const wordSplit = (wordsArr) => {
    const resultArr: string[] = [];

    for (let i = 0; i < wordsArr.length; i++) {
      const stringArr = wordsArr[i].split('');
      stringArr.splice(Math.floor(stringArr.length / 2), 0, ';');
      resultArr.push(stringArr.join(''));
    }

    return resultArr.map((v: string) => v.split(';'));
  };

  const gameStart = () => {
    if (!words) {
      return null;
    }
    localStorage.clear();

    const arr: string[] = words.filter((v) => v.length === +state.letters);
    arr.sort(() => Math.random() - 0.5).splice(+state.wordsCount);

    const splitedWords = wordSplit(arr);

    localStorage.setItem('words', JSON.stringify(splitedWords));
    localStorage.setItem('property', JSON.stringify(state));

    Router.push('/game');
  };

  return (
    <>
      <Head>
        <title>Поле зрения</title>
      </Head>
      <Layout>
        <Title>Тренажер &laquo;Поле зрения&raquo;</Title>
        <Table>
          <div className="column">
            <RangeSlider
              title="Сколько слов"
              min="1"
              max="10"
              name="wordsCount"
              onChange={sliderChangeHandler}
              value={state.wordsCount}
            />
            <RangeSlider
              title="Сколько букв в словах"
              min="3"
              max="11"
              name="letters"
              onChange={sliderChangeHandler}
              value={state.letters}
            />
            <Counter
              title="Скорость"
              step="0.5"
              name="speed"
              value={state.speed}
              onChange={speedChangeHandler}
            />
            {!words && <p>Не установлено соединение с сервером</p>}
          </div>
          <div className="column">
            <RangeSlider
              title="Стартовое расстояние"
              min="5"
              max="40"
              step="5"
              name="distance"
              onChange={sliderChangeHandler}
              value={state.distance}
            />
            <RangeSlider
              title="Увеличение расстояния"
              min="5"
              max="40"
              step="5"
              name="distanceInc"
              onChange={sliderChangeHandler}
              value={state.distanceInc}
            />
            <Button title="Старт" action={gameStart} />
          </div>
        </Table>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<IIndexProps> = async () => {
  const words = await fetch('http://localhost:4200/words').then((res) => res.json());

  if (Object.keys(words).length === 0) {
    return {
      props: { words: null },
    };
  }

  return { props: { words } };
};
