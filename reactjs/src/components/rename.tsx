import { Button, FormControl, Stack, TextField } from "@mui/material";
import useProfileStore from "../store/store";
import { useLayoutEffect, useState } from "react";

const Rename = () => {
  const [name, setName] = useState("");

  const setIsRename = useProfileStore((state) => state.setIsRename);
  const renameProfile = useProfileStore((state) => state.renameProfile);
  const selectedProfile = useProfileStore((state) => state.selectedProfile);
  const errorMessage = useProfileStore((state) => state.errorMessage);

  useLayoutEffect(() => {
    setName(selectedProfile?.name ?? "");
  }, [selectedProfile]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    renameProfile(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={1} direction="row">
        <FormControl sx={{ minWidth: 400 }}>
          <TextField
            value={name}
            sx={{
              backgroundColor: "white",
            }}
            onChange={(e) => setName(e.target.value)}
            error={!!errorMessage}
            label={errorMessage}
          />
        </FormControl>

        <Button
          aria-haspopup="true"
          sx={{ background: "white" }}
          onClick={() => setIsRename(false)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          aria-haspopup="true"
          sx={{
            background: "white",
          }}
        >
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default Rename;
