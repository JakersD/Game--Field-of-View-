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
  padding: 30px 0;

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
    background-color: #fdd207;
    border-radius: 5px;
    cursor: pointer;
    position: relative;

    &:first-child {
      margin-right: 20px;
    }
  }

  .plusImgBtn {
    width: 25px;
  }

  .minusImgBtn {
    position: absolute;
    left: 8px;
    top: 10px;
    width: 30px;
  }
`;

export default function Counter({ step = '1', ...props }: ICounterProps) {
  const changeCounterHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === 'plus') {
      return props.onChange(String(+props.value + 0.5));
    }
    if (+props.value > 1) {
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
        <button className="counterBtn" name="minus" onClick={changeCounterHandler}>
          <img className="minusImgBtn" src="/minusSymb.svg" alt="Минус" />
        </button>
        <button className="counterBtn" name="plus" onClick={changeCounterHandler}>
          <img className="plusImgBtn" src="/plusSymb.svg" alt="Плюс" />
        </button>
      </div>
    </CounterStyled>
  );
}
