import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import useProfileStore from "../store/store";
import ActionMenu from "./action-menu";

export const ComboBox = () => {
  const selectedProfile = useProfileStore((state) => state.selectedProfile);
  const setSelectedProfile = useProfileStore(
    (state) => state.setSelectedProfile
  );

  const profiles = useProfileStore((state) => state.profiles);

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.value as string;
    setSelectedProfile(name);
  };

  return (
    <Stack spacing={1} direction="row">
      <FormControl sx={{ minWidth: 400 }}>
        <Select
          value={selectedProfile?.name ?? ""}
          onChange={handleChange}
          sx={{
            backgroundColor: "white",
          }}
        >
          {profiles.map((profile) => (
            <MenuItem key={profile.name} value={profile.name}>
              {profile.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ActionMenu />
    </Stack>
  );
};

export default ComboBox;
