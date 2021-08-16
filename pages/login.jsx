import { LoginComponent } from "../components/LoginComponent";
import { Main } from "../components/Main";
import { MainContainer } from "../styledComps/artifacts";

function Login() {
  return (
    <MainContainer>
      <Main></Main>
      <LoginComponent />
    </MainContainer>
  );
}
export default Login;
