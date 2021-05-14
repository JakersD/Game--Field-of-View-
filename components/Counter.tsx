import styled from 'styled-components';

interface ICounterProps {
  title: string;
  name: string;
  onChange: (value: string) => void;
  step?: string;
  value: string;
}

const CounterStyled = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  width: 36vw;
  margin: 0 1vw;
  margin-bottom: 3vh;
  padding: 1.9vw 0 1.3vw;

  .counterBlock {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .text {
    font-size: 2.4vw;
    color: #371548;
  }

  .counter {
    font-size: 2.4vw;
    width: 6.4vw;
    border: 1px solid #000;
    border-radius: 25vw;
    text-align: center;
    margin: 0 0.8vw 0.75vw 3vw;
    outline: none;
  }

  .counterBtn {
    width: 4.7vw;
    height: 4.7vw;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    position: relative;

    &:first-child {
      margin-right: 20px;
    }
  }

  .plusBtn {
    background: url('/plus.png') no-repeat center;
    background-size: cover;
  }

  .minusBtn {
    background: url('/minus.png') no-repeat center;
    background-size: cover;
  }
`;

export default function Counter({ step = '1', ...props }: ICounterProps) {
  const changeCounterHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === 'plus' && +props.value < 5) {
      return props.onChange(String(+props.value + 0.5));
    }
    if (e.currentTarget.name === 'minus' && +props.value > 1) {
      return props.onChange(String(+props.value - 0.5));
    }
  };

  return (
    <CounterStyled>
      <div className="counterBlock">
        <h3 className="text">{props.title}</h3>
        <input className="counter" type="text" value={props.value} readOnly />
        <p className="text">сек.</p>
      </div>
      <div className="counterBlock">
        <button
          className="counterBtn minusBtn"
          name="minus"
          onClick={changeCounterHandler}
        ></button>
        <button className="counterBtn plusBtn" name="plus" onClick={changeCounterHandler}></button>
      </div>
    </CounterStyled>
  );
}
