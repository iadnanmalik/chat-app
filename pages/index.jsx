import { Main } from "../components/Main";
import { RegisterComponent } from "../components/RegisterComponent";
import { MainContainer } from "../styledComps/artifacts";

export default function Home() {
  return (
    <MainContainer>
      <Main />
      <RegisterComponent />
    </MainContainer>
  );
}
