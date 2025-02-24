import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useRegisterUserMutation, useLoginUserMutation } from '../../feature/api/authApi';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupInput, setSignupInput] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: ''
  });
  const [registerUser,
    { data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess }] = useRegisterUserMutation()
  const [loginUser,
    { data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess }] = useLoginUserMutation()


  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === 'signup') {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };
  const registrationHandler = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  }



  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Account created successfully.")
      navigate("/login");
    }
    if (registerError) {
      toast.error(registerError.data.message || "Registration Failed.")
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login Success.");
      navigate('/');
    }
    if (loginError) {
      toast.error(loginError.data.message || "Login Failed.")
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError
  ])


  return (
    <div className="flex justify-center  max-h-screen w-auto mt-20">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Register</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Registration</CardTitle>
              <CardDescription>
                Create your account here. Click submit when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, 'signup')}
                  placeholder="sunil kumar"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, 'signup')}
                  placeholder="sunil@gmail.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputHandler(e, 'signup')}
                  placeholder="********"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button disable={registerIsLoading} onClick={() => registrationHandler("signup")}>
                {
                  registerIsLoading ? (
                    <>
                      <Loader2 className=' mr-2 h-4 w-4 animate-spin' /> Please Wait.
                    </>
                  ) : "Signup"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login Page. After submit, you'll be logged in here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, 'login')}
                  placeholder="sunil@gmail.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, 'login')}
                  placeholder="********"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button disable={loginIsLoading} onClick={() => registrationHandler("login")}>
                {
                  loginIsLoading ? (
                    <>
                      <Loader2 className=' mr-2 h-4 w-4 animate-spin' /> Please Wait.
                    </>
                  ) : "Login"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
