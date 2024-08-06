import React from 'react'
import { View } from '../view'
import { Contain } from './index.style'

export interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return <Contain>Copyright © 2019-{new Date().getFullYear()} Saber2pr</Contain>
}
