import styled from "styled-components"
import React,{useState,useEffect,useRef} from 'react'

const OuterDiv = styled.div`
  margin-top:100px;
  display: flex;
`

const ContactColumn = styled.div`
  flex: 0 0 33%;
  max-width: 33%;
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
`

const ChatColumn = styled.div`
  flex: 0 0 60%;
  max-width: 60%;
  min-width: 540px;
  position: relative;
  width: 100%;
  
`

const MessageListColumn = styled.div`
  overflow: auto;
  padding-top: 3rem;
  background-color: #daeee5;
  box-sizing: border-box;
  border: 1px solid #dee2e6;
  height: 400px;
`

const Message = styled.div`
  padding: 1rem;
  margin: 0.25rem;
  float: left;
  background: #f4f7f9;
  border-radius: 10px;
  border: 1px black solid;
`

const MessageListHeader = styled.div`
  padding: 1rem !important;
 
 
`

const MessageListTitle = styled.h2`
padding: 0 1rem;
text-align: center;
font-size: 25px;
color: #666666;
font-weight: 500;
`
const MessageForm = styled.form`
  max-width: 100%;
  padding:20px;
  margin:0;
  display:flex;
`

const Col9 = styled.div`
  width: 75%;
`

const Col3 = styled.div`
  width: 25%;
`

const MessageInput = styled.input`
  display: block;
  width: 90%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5; 
  border: none;
  margin: 0.5rem 0;
 
  background-color: #f5f5f5;
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 0 1rem;
  transition: all 0.2s ease-in;
  &:hover {
    transform: translateY(-3px);
  }
`

const MessageButton = styled.button`
width: 50%;
max-width: 250px;
min-width: 150px;
height: 40px;
border: none;
margin: 0.5rem 0;
box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
border-radius: 8px;
background-color: #70edb9;
color: #fff;
font-weight: 600;
cursor: pointer;
transition: all 0.2s ease-in;
&:hover {
    transform: translateY(-3px);
}
`


const ChatBox = (props) => {

  const [message,setMessage]=useState("")
  const [messageList,setMessageList]= useState([])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messageList])
 const submitForm = event => {
    event.preventDefault();
    if(message.length>=1){
    setMessage("")
    setMessageList([...messageList,message])
  }
  }
  return (
    <OuterDiv>
      <ContactColumn>
        <ChatContactList user={props.user} usernameList = {props.usernameList}/>
      </ContactColumn>
      <ChatColumn style={{border:'1px solid black', 'border-radius':'10px'}}>
        <MessageListHeader>
          <MessageListTitle>Your Messages</MessageListTitle>
        </MessageListHeader>
        <MessageListColumn>
          Message List
          <div>
            {
              messageList?.map( message => {
                return <div key="null" style={{overflow: 'hidden'}}><Message>{ message }</Message></div>
              })
            }
            <div ref={messagesEndRef} />
          </div>
        </MessageListColumn>
        <div >
          <MessageForm onSubmit={submitForm}>
            <Col9>
              <MessageInput type="text" value={message}  onChange={event => setMessage(event.target.value)} placeholder='Type a message...' />
            </Col9>
            <Col3>
              <MessageButton type="submit">Send</MessageButton>
            </Col3>
          </MessageForm>
        </div>
      </ChatColumn>
    </OuterDiv>
  );
}

export default ChatBox


const ContactListColumn = styled.div`
  overflow: auto;
  margin-left: 0;
  margin-right: 0;
  height: 400px;
  border: 1px solid #dee2e6;
  background-color: #fff;
`

const ContactList = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  width: 100%;
  margin-top: 0;
  box-sizing: border-box;
`

const ContactListHeader = styled.div`
  padding: 1rem;
  background-color: yellow;
  border: 1px solid #dee2e6;
`

const ContactListTitle = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
`

const ContactListItem = styled.li`
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-radius: 0;
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  cursor: pointer;

  &.active {
    z-index: 2;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }
`

class ChatContactList extends React.Component {

  state = {selectedContact: null}

  render(){
    const {user, usernameList} = this.props
    const {selectedContact} = this.state
    return(
      <div style={{display: 'block'}} >
        <ContactListHeader>
          <ContactListTitle>Contact List</ContactListTitle>
        </ContactListHeader>
        <ContactListColumn>
          <ContactList>
            { usernameList?.map( username => {
              if (username !== user){
                return (
                  <ContactListItem 
                    key={username+Date.now()}
                    className={selectedContact === username? 'active': ''} 
                    onClick={() => this.setState({ selectedContact: username})}>
                      {username}
                  </ContactListItem>
                ) 
              }
              else {
                return null
              }
            })
            }
          </ContactList>
        </ContactListColumn>
      </div>
    )
  }
}

