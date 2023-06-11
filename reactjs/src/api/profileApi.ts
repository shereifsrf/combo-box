// import axios from "axios";
import { ProfileModel } from "../models/profile";

// const server = import.meta.env.VITE_SERVER_URL;

interface IProfileAPI {
  getProfiles: () => Promise<ProfileModel[]>;
}

const ProfileAPI: IProfileAPI = {
  getProfiles: async () => {
    // const response = await axios.get(`${server}/profiles`);

    const profiles = ["Profile 1", "Profile 2", "Profile 1 (1)", "Profile 3"];
    const profileList: ProfileModel[] = profiles.map((name) => new ProfileModel(name));

    return profileList;
  },
};

export default ProfileAPI;
