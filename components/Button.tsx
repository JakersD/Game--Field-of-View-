import React from 'react';
import styled from 'styled-components';

interface IButtonProps {
  title: string;
  action: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .btn {
    background-color: #fdd207;
    border: none;
    width: 19.5vw;
    height: 6vw;
    border-radius: 80px;
    text-align: center;
    text-transform: uppercase;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 2.5vw;
    color: #371548;
    cursor: pointer;
  }
`;

export default function Button(props: IButtonProps) {
  return (
    <ButtonStyled>
      <button className="btn" onClick={props.action}>
        {props.title}
      </button>
    </ButtonStyled>
  );
}
