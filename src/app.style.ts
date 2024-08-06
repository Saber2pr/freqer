import styled, { createGlobalStyle } from 'styled-components'

export const Container = styled.div`
  padding-top: 40px;
`

export const Content = styled.div`
  display: flex;
  margin: 0 4.5rem;
`

export const MainContent = styled.div`
  width: 70%;
  padding-top: 16px;
  padding-bottom: 60px;
  min-height: 64vh;
`
export const AsideContent = styled.div`
  background-color: #f7f7f7;
  transition: background-color 1s;
  border-left: 1px solid #ececec;
  position: fixed;
  right: -1rem;
  width: 30%;
  height: 100%;
  z-index: 3;
  overflow-y: auto;
`

export const GlobalStyle = createGlobalStyle`
  body {
    min-width: 1000px;
  }

  .password-form-item {
    label {
      width: 100%;
    }
  }

  .aside-link {
    user-select: none;
    cursor: pointer;
    padding: 0.2rem;
    color: #6d6d6d;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
    display: block;
    &:nth-child(n + 2) {
      margin-top: 4px;
    }

    &:hover {
      outline: -webkit-focus-ring-color auto 1px;
      color: #1a1a1a;
    }

    &-active {
      color: #1a1a1a;
    }
  }

`
