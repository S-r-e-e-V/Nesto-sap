import { LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Progress,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { login } from "../api";
import { AuthContext } from "../context/AuthContext";
import { loginValidationSchema } from "../validators";

const Login = () => {
  const { checkAuthState, logInUser, authState } = useContext(AuthContext);

  useEffect(() => {
    checkAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loginButtonLoading, setLoginButtonLoading] = useState(false);
  const togglePasswordVisibility = () => setShow(!show);
  const toast = useToast();

  const _validate = (username, password) => {
    loginValidationSchema
      .validate({ username, password })
      .then(() => {
        _login(username.trim(), password.trim());
      })
      .catch((e) => {
        toast({
          title: "Error",
          description: e.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const _login = async (username, password) => {
    try {
      const PAYLOAD = { email: username, password };
      setLoginButtonLoading(true);
      const res = await login(PAYLOAD);
      console.log(res);
      res?.user?.console_role?.permissions?.map((permission) => {
        if (permission.title === "sap") {
          logInUser(res?.token);
        }
      });
    } catch (e) {
      console.log(e);
      if (e?.status === 401) {
        toast({
          title: "Error",
          description: "Incorrect username or password",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: e.message ?? "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
    setLoginButtonLoading(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    _validate(username, password);
  };

  const { authStateLoading } = authState;

  return (
    <Box px={10}>
      <Center sx={{ height: "80vh" }}>
        {!authStateLoading && (
          <>
            <Box
              shadow={"md"}
              p={10}
              border="1px"
              borderColor="gray.200"
              borderRadius="5px"
            >
              <Center mb={5}>
                <LockIcon mr={1} />
                <Heading as="b" size="md">
                  Log In
                </Heading>
              </Center>
              <form onSubmit={onSubmit}>
                <FormControl id="username" mb={5}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type={"text"}
                    placeholder="Enter username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password" mb={5}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      name="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement>
                      <Button onClick={togglePasswordVisibility}>
                        {show ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Center>
                  <VStack>
                    <Button
                      colorScheme="green"
                      isLoading={loginButtonLoading}
                      type="submit"
                    >
                      Login
                    </Button>
                  </VStack>
                </Center>
              </form>
            </Box>
          </>
        )}
        {authStateLoading && (
          <Progress
            mt={100}
            width={500}
            size="xs"
            isIndeterminate
            colorScheme="green"
          />
        )}
      </Center>
    </Box>
  );
};

export default Login;
