import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #fff;
    --red: #e52e4d;
    --blue: #5429cc;
    --green: #33cc95;
    --darkGray: #262626;

    --blue-light: #6933ff;

    --text-title: #363f5f;
    --text-body: #969cb3;

    --shape: #FFF;
    --pink: #a00e6b;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  // font-size padrão = 16px
  html {
    @media (max-width: 1080px) {
      font-size: 93.75% // 15px
    }

    @media (max-width: 720px) {
      font-size: 87.5% // 14px
    }
  }

  //REM = 1rem = font-size

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button, span, p {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  h1 ,h2 ,h3 ,h4 ,h5 , h6, strong {
    font-weight: 700;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
  height: 5rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}


.selected {
  color: blue
}
`;
