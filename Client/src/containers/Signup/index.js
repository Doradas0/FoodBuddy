import React, {useState} from "react";
import SignupForm from "../../components/SignupForm";
import ConfirmUserForm from "../../components/ConfirmUserForm";

export default (props) => {

  const [codeSent, setCodeSent] = useState(false);
  const [email, setEmail] = useState("");

  return(
    <div className="Signup">
      {!codeSent
        ? <SignupForm setEmail={setEmail} setCodeSent={setCodeSent}/>
        : <ConfirmUserForm username={email} props={props}/>
      }

    </div>
  )
}
