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
  margin: 30px;
  padding: 28px 0;

  .counterBlock {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .text {
    font-size: 2vw;
    color: #371548;
  }

  .counter {
    font-size: 2vw;
    width: 5vw;
    border: 1px solid #000;
    border-radius: 10px;
    text-align: center;
    margin: 0 10px 15px 20px;
    outline: none;
  }

  .counterBtn {
    width: 3.4vw;
    height: 3.4vw;
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
