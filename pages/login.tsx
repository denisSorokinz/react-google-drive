import Image from "next/image";

import { firebase, firebaseAuth } from "../firebase/firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
};

function Login() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image
        src="https://links.papareact.com/1ui"
        alt="Google Docs Logo"
        width="200"
        height="200"
        objectFit="contain"
      />
      {/* <Button
        color="lightBlue"
        buttonType="filled"
        size="regular"
        rounded={true}
        block={false}
        iconOnly={false}
        ripple="light"
        onClick={() => signInWithGoogle()}
      >
        Login
      </Button> */}
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
    </div>
  );
}

export default Login;
