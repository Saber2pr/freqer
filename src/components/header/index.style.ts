import styled from 'styled-components'

export const Contain = styled.div`
  height: 40px;
  background-color: #20232a;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  color: #d5d5d7;
  display: flex;
  align-items: center;
  padding: 0 16px;
`

export const LeftContent = styled.div`
  height: 100%;
  flex-grow: 1;
`

export const RightContent = styled.div``

export const HomeLink = styled.div`
  display: inline-block;
  height: 100%;
  line-height: 40px;
  cursor: pointer;
  &:hover {
    color: rgb(152 217 255);
  }
`
