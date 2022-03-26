import { ComponentType, ReactChildren } from "react";
import { useRouter } from "next/router";

import { firebaseAuth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const withAuth = (Component: ComponentType<any>) => {
  const AuthorizedComponent: React.FC<any> = (props) => {
    const router = useRouter();
    const [user, loading, error] = useAuthState(firebaseAuth as any);

    if (loading) return <span>loading...</span>;

    if (error) return <span>error logging in</span>;

    if (!user) {
      router.push("/login");
      return null;
    }

    return <Component {...props} />;
  };

  return AuthorizedComponent;
};

export default withAuth;
