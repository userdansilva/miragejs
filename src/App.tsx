import {
  Box, Center, List, ListItem,
} from "@chakra-ui/react";
import { Suspense } from "react";
import useSWR from "swr";
import { ErrorBoundary } from "react-error-boundary";
import { Server } from "miragejs";

const server = new Server({ timing: 1000 });
server.get("/items", () => ({
  items: ["Item 01", "Item 02"],
}));

interface APIResponse {
  items: string[];
}

const fetcher = (url: string): Promise<APIResponse> => fetch(url)
  .then((res) => res.json());

function ListItems() {
  const { data } = useSWR("/items", fetcher, { suspense: true });

  return (
    <List>
      {data?.items.map((item) => (
        <ListItem key={item}>{item}</ListItem>
      ))}
    </List>
  );
}

function App() {
  return (
    <Center height="100vh">
      <ErrorBoundary fallback={<Box>Error!</Box>}>
        <Suspense fallback={<Box>Loading</Box>}>
          <ListItems />
        </Suspense>
      </ErrorBoundary>
    </Center>
  );
}

export default App;
