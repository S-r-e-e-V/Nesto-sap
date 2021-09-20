import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "./context/AuthContext";
import RootRoute from "./routes/RootRoute";
import { versionString } from "./api";

function App() {
  console.log(versionString);
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <RootRoute />
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;
