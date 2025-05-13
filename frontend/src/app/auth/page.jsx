import { auth } from "@/auth";
import BackgroundImage from "@/components/BackgroundImage";
import bg from "@public/auth-background.png";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/Button";
import { FaGoogle } from "react-icons/fa";
export default async function SignIn() {
  const session = await auth();

  return (
    <>
      <div className="flex items-center justify-end w-screen h-screen">
        <div className="w-1/2 bg-neutral-950 h-full flex flex-col items-center justify-center p-12">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-4xl font-semibold ">
              {session?.user ? "Log In" : "Sign Up"}
            </h1>
            <p>Sign in to your account to continue</p>
            <Button onClick={login} className="mt-4">
              <FaGoogle className="mr-2" />
              Sign in with Google
            </Button>
          </div>
        </div>
        <BackgroundImage image={bg} />
      </div>
    </>
  );
}
