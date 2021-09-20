import {
  chakra,
  Heading,
  HStack,
  Image,
  Spacer,
  useColorModeValue,
  Tooltip,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import ToggleTheme from "../components/ToggleTheme";
import { Link } from "react-router-dom";
import { IoMdPower } from "react-icons/io";
import logo from "../assets/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// import { RiWallet3Line } from "react-icons/ri";

const Header = () => {
  const bg = useColorModeValue("white", "gray.800");
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const headingText = useBreakpointValue({
    base: "",
    sm: "SAP",
    md: "SAP Console",
    lg: "SAP Console",
  });

  const logoutUser = () => logOutUser();

  return (
    <chakra.header
      shadow={"xs"}
      transition="box-shadow 0.2s"
      pos="fixed"
      top="0"
      zIndex="3"
      left="0"
      right="0"
      bg={bg}
      width="full"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <HStack px={10}>
        <Link to="/">
          <HStack>
            <Image
              height="50px"
              objectFit="contain"
              src={logo}
              alt="Nesto Logo"
              borderRadius={10}
              backgroundColor={"white"}
            />
          </HStack>
        </Link>
        <Spacer />
        <Heading py={5} size="md">
          {headingText}
        </Heading>
        <Spacer />
        <ToggleTheme />
        {isLoggedIn && (
          <Tooltip hasArrow label={"Log out"} aria-label={"Log out"}>
            <Button onClick={logoutUser} size="sm">
              <IoMdPower />
            </Button>
          </Tooltip>
        )}
      </HStack>
    </chakra.header>
  );
};

export default Header;
