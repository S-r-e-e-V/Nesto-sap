import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons"; //Icon Imports
import { Button, Center, HStack } from "@chakra-ui/react"; //Table Imports

const PageSwitcher = ({ page, setter, total, setHasPageChanged }) => {
  const showLeftPageButton = page - 1 > 0;
  const showRightPageButton = page + 1 <= total;
  const previousPage = () => {
    if (page > 1) {
      setter(page - 1);
      setHasPageChanged(true);
    }
  };

  const nextPage = () => {
    if (page < total) {
      setter(page + 1);
      setHasPageChanged(true);
    }
  };
  return (
    <Center mt={5}>
      <HStack spacing={2}>
        <Button
          onClick={() => {
            setter(1);
            setHasPageChanged(true);
          }}
          isDisabled={page === 1}
          size="sm"
        >
          <ArrowLeftIcon />
        </Button>
        <Button onClick={previousPage} isDisabled={page === 1} size="sm">
          <ArrowBackIcon />
        </Button>
        {showLeftPageButton && (
          <Button
            onClick={() => {
              setter(page - 1);
              setHasPageChanged(true);
            }}
            size="sm"
          >
            {page - 1}
          </Button>
        )}
        <Button isDisabled={true} colorScheme="green" size="sm">
          {page}
        </Button>
        {showRightPageButton && (
          <Button
            onClick={() => {
              setter(page + 1);
              setHasPageChanged(true);
            }}
            size="sm"
          >
            {page + 1}
          </Button>
        )}
        <Button onClick={nextPage} isDisabled={page === total} size="sm">
          <ArrowForwardIcon />
        </Button>
        <Button
          onClick={() => {
            setter(total);
            setHasPageChanged(true);
          }}
          isDisabled={page === total}
          size="sm"
        >
          <ArrowRightIcon />
        </Button>
      </HStack>
    </Center>
  );
};

export default PageSwitcher;
