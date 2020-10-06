import styled from 'styled-components';
import { shade } from 'polished';

import SignUpBackground from '../../assets/sign-up-background.png';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${SignUpBackground}) no-repeat center;
  background-size: cover;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  margin: -176px auto 0;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s ease-out;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }

    input[name='old_password'] {
      margin-top: 24px;
    }
  }
`;

export const AvatarInput = styled.div`
  margin: 0 auto 32px;
  position: relative;
  position: relative;
  width: 186px;

  img {
    border-radius: 50%;
    width: 186px;
    height: 186px;
    object-fit: cover;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    background-color: #ff9000;
    transition: background-color 0.2s ease-in;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
