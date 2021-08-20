import { StyledInput, Errors } from "../styledComps/artifacts";
import { Fragment } from "react/cjs/react.development";

export const FormInput = ({ showError, error, ...rest }) => {
  //console.log(`Message:` ,props);

  return (
    <Fragment>
      <StyledInput {...rest} />
      {showError ? <Errors>{error}</Errors> : null}
    </Fragment>
  );
};
