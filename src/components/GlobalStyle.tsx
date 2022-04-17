import React from 'react';
import {createGlobalStyle} from 'styled-components';
import {web} from '@sberdevices/plasma-tokens-web/typo';
import {darkEva} from '@sberdevices/plasma-tokens/themes';
import {
  text,
  background,
  gradient,
} from '@sberdevices/plasma-tokens-web';

const DocumentStyle = createGlobalStyle`
  html {
    min-height: 100vh;
    color: ${text};
    background-color: ${background};
    background-image: ${gradient};
  }

  .list-item-enter {
    transform-origin: 50% 50%;
  }
  .list-item-enter-active {
    animation: showItem 0.5s ease;
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .list-item-exit {
    transform-origin: 50% 50%;
  }
  .list-item-exit-active {
    animation: deleteItem 0.5s ease;
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  @keyframes deleteItem {
    0% {
      opacity: 1;
      transform: scale(1);
    }

    15% {
      transform: scale(1.04);
    }

    100% {
      opacity: 0;
      transform: scale(0.8);
    }
  }

  @keyframes showItem {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }

    85% {
      transform: scale(1.04);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
const ThemeStyle = createGlobalStyle(darkEva);
const TypoStyle = createGlobalStyle(web);

export const GlobalStyle = () => (
  <>
    <DocumentStyle />
    <ThemeStyle />
    <TypoStyle />
  </>
);
