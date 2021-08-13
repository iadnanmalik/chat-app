import styled from "styled-components"
import React,{useState,useEffect,useRef} from 'react'
import { useUsersContext } from "../../context/UsersContext"
import connection from "../../sockets/connect"
 import withAuth from "../../HOC/withAuth"
 import { LogoWrapper } from "../../styledComps/artifacts"
import sendMessage from "../../sockets/sendMessage"


 const OuterDiv = styled.div`
  margin-top:30px;
  display: flex;
`

const ContactColumn = styled.div`
  flex: 0 0 33%;
  max-width: 33%;
  position: relative;
  width: 100%;
  
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
  span {
    font-size:8px;
    margin-left:5px;
    background-color:#9FE2BF;
  }
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

const ContactListColumn = styled.div`
  overflow: auto;
  margin-left: 0;
  margin-right: 0;
`

const ContactList = styled.ul`
  display: flex;
  background-color: #ffffe0;
  height: 500px;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  width: 100%;
  margin-top: 0;
  box-sizing: border-box;
`

const ContactListHeader = styled.div`
  padding: 1rem;
 
`

const ContactListTitle = styled.h2`
padding: 0 1rem;
text-align: center;
font-size: 25px;
color: #666666;
font-weight: 500;
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
  background-color: #ffffe0;
  border: 1px solid rgba(0, 0, 0, 0.125);
  cursor: pointer;

  &.active {
    z-index: 2;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }
`



const ChatBox = (props) => {

  const [mObj,setmObj]=useState({})
  const [messageList,setMessageList]= useState([])
  const messagesEndRef = useRef(null)
  const context= useUsersContext()
  const [users,setUsers]= useState([])
  const [selectedContact,setSelectedContact]=useState("")
  const [socketState, setSocketState]=useState()
  //console.log("We've Re-rendered")

  let socketRef= null

  useEffect(() => {
    if (context.user.name && !socketRef) {

      socketRef = connection(context.user.name);
      setSocketState(socketRef)
  
      socketRef.on("usersUpate", (usersUpdated) => {
        console.log(usersUpdated)
        setUsers([...usersUpdated]);
      });
  
      socketRef.on("recieveMessage", (receivedMessage) =>{ 
        console.log("Received this: ",receivedMessage)
        setMessageList((prev) =>[...prev,receivedMessage])
      });
    }
  }, [socketRef,context.user.name])
  


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messageList])


  const submitForm = event => {
    event.preventDefault();
    sendMessage(socketState, mObj);

    if(mObj.message.length>=1){
      setMessageList([...messageList,mObj])
    }

  }
  const dummy = () => {};

  return (
    <>
    <LogoWrapper >
      <h3 style={{    paddingTop: '50px'}}>
        Chat <span>Engo</span>
      </h3>
      <br />
      <h3 style={{color: '#FA8072', fontSize:'15px'}}>
      User: &nbsp; 
        {context.user.name}
      </h3>
    </LogoWrapper>

    <OuterDiv>
      <ContactColumn style={{border:'1px solid black', 'border-radius':'10px', marginRight:'10px', marginLeft:'10px'}}>
        
        <div style={{display: 'block'}} >
          <ContactListHeader>
            <ContactListTitle>Contact List</ContactListTitle>
          </ContactListHeader>
          <ContactListColumn>
            <ContactList>
              { users?.map( user  => {
              
                if(user.name !== context.user.name){
                return (
                    <ContactListItem 
                      key={dummy()}
                      className={selectedContact === user.name? 'active': ''} 
                      onClick={() => setSelectedContact(user.name)}>
                        {user.name}
                    </ContactListItem>
                  )}   
              })
              }
            </ContactList>
          </ContactListColumn>
        </div>      
      </ContactColumn>
      
      <ChatColumn style={{border:'1px solid black', 'border-radius':'10px'}}>
        <MessageListHeader>
          <MessageListTitle>Your Messages </MessageListTitle>
        </MessageListHeader>
        <MessageListColumn>
          <div>
            {
              messageList?.map( message => {
                if(message.from===selectedContact || (message.from === context.user.name && message.to=== selectedContact))
                return <div key={dummy()} style={{overflow: 'hidden'}}><Message>{ message.message }<span>{message.from}</span></Message></div>
              })
            }
            <div ref={messagesEndRef} />
          </div>
        </MessageListColumn>
        <div >
          {
            selectedContact?
          <MessageForm onSubmit={submitForm}>
            <Col9>
              <MessageInput type="text" onChange={event => setmObj({message:event.target.value,to:selectedContact,from:context.user.name}) }  placeholder='Type a message...' />
            </Col9>
            <Col3>
              <MessageButton type="submit" >Send</MessageButton>
            </Col3>
          </MessageForm>
          :
          null
          }
        </div>
      </ChatColumn>
    </OuterDiv>
    </>
  );
}

export default withAuth(ChatBox)




