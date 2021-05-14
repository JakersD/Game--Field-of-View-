import { ChangeEventHandler, useEffect, useState } from 'react';
import styled from 'styled-components';

interface IRangeProps {
  title: string;
  min: string;
  max: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  name: string;
  step?: string;
}

const RangeStyled = styled.div`
  // margin: 0vw;
  margin: 0 1vw;
  margin-bottom: 3vh;
  width: 36vw;
  padding: 1.5vw 4vw 1vw;
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 48.2498px;
  .title {
    font-size: 2.4vw;
    color: #371548;
    margin-bottom: 10px;
    text-align: center;
    margin-bottom: 15px;
  }

  .values {
    display: flex;
    justify-content: space-between;
    margin-left: 0.5vw;
    margin-bottom: 1.45vw;
    font-size: 1.9vw;
  }

  .slider {
    width: 100%;
    -webkit-appearance: none;
    border-radius: 10px;
    height: 1.1vw;
    outline: none;
    cursor: pointer;
    background: ${(props) =>
      `-webkit-linear-gradient(left, #fdd207 0%, #fdd207 ${props.run}px, #fff ${props.run}px, #fff 100%);`}
    
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 2.1vw;
      height: 2.1vw;
      background: url('/thumb.png') no-repeat center;
      background-size: cover;
      border-radius: 50%;
      cursor: grab;
    }
  }
`;

export default function RangeSlider({ step = '1', ...props }: IRangeProps) {
  const [values, setValues] = useState([]);
  const [runnableTrack, setRunnableTrack] = useState(0);

  const changeRunnableTrack = () => {
    const result = [];
    for (let i = +props.min; i <= +props.max; i += +step) {
      result.push(i);
    }

    const sliderWidth: number = document.querySelector<HTMLElement>('.slider').offsetWidth;
    const distance = sliderWidth / result.length;

    let newResult = 0;
    result.forEach((v: number, i) => {
      if (v === +props.value) {
        newResult = distance * i + i * 5.2;
      }

      setRunnableTrack(newResult);
    });
  };

  useEffect(() => {
    const result = [];
    for (let i = +props.min; i <= +props.max; i += +step) {
      result.push(i);
    }

    changeRunnableTrack();
    setValues(result);
  }, []);

  useEffect(() => {
    changeRunnableTrack();
  }, [props.value]);

  return (
    <RangeStyled run={runnableTrack}>
      <h3 className="title">{props.title}</h3>
      <div>
        <div className="values">
          {values.map((v, i) => (
            <p key={i}>{v}</p>
          ))}
        </div>
        <input
          type="range"
          min={props.min}
          max={props.max}
          value={props.value}
          step={step}
          name={props.name}
          className="slider"
          onChange={(e) => props.onChange(e)}
        />
      </div>
    </RangeStyled>
  );
}
