import { Container, Typography, Stack, Box } from "@mui/material";
import ComboBox from "./components/combo-box";
import useProfileStore from "./store/store";
import { useLayoutEffect } from "react";
import Rename from "./components/rename";

function App() {
  const isRename = useProfileStore((state) => state.isRename);

  useLayoutEffect(() => {
    useProfileStore.getState().fetchProfiles();
  }, []);

  return (
    <Container>
      <Stack spacing={3} direction="row" mt={5}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">{"profile".toUpperCase()}</Typography>
        </Box>

        {isRename && <Rename />}
        {!isRename && <ComboBox />}
      </Stack>
    </Container>
  );
}

export default App;
