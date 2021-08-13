import styled from 'styled-components'
import Main from './components/Main'
import ChatBox from './components/ChatBox';
import { MainContainer } from '../styledComps/artifacts';
import { UsersWrapper } from '../context/UsersContext';
export default function Dashboard() {
  return (
  <UsersWrapper>
   <ChatBox />
   </UsersWrapper>
  )
};



