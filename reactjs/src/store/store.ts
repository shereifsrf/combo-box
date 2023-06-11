import { create } from "zustand";
import { ProfileModel } from "../models/profile";
import ProfileAPI from "../api/profileApi";
import Helpers from "../utils/helpers";

interface IProfileState {
  profiles: ProfileModel[];
  selectedProfile?: ProfileModel;
  duplicateDict: { [key: string]: number };
  isRename: boolean;
  errorMessage?: string;

  fetchProfiles: () => Promise<void>;
  setSelectedProfile: (name: string) => void;
  setIsRename: (isRename: boolean) => void;

  addProfile: (profile: ProfileModel) => void;
  renameProfile: (name: string) => void;
  duplicateProfile: (profile: ProfileModel) => void;
  deleteProfile: (profile: ProfileModel) => void;
}

const useProfileStore = create<IProfileState>((set) => ({
  profiles: [],
  duplicateDict: {},
  isRename: false,

  fetchProfiles: async () => fetchProfiles(),
  setSelectedProfile: (name) => setSelectedProfile(name),
  setIsRename: (isRename) => set({ isRename, errorMessage: undefined }),

  addProfile: (profile) => addProfile(profile),

  renameProfile: (name) => renameProfile(name),

  duplicateProfile: (profile) => addProfile(profile),

  deleteProfile: (profile) => deleteProfile(profile),
}));

// this is a business logic, can be moved to a separate file
const fetchProfiles = async () => {
  let profileList = await ProfileAPI.getProfiles();
  let duplicateDict: { [key: string]: number } = {};

  profileList.forEach((profile) => {
    const [name, count] = Helpers.getMatches(profile.name);

    if (name && count) {
      if (duplicateDict[name]) {
        duplicateDict[name] = Math.max(duplicateDict[name], count + 1);
      }
    }
    duplicateDict[profile.name] = 1;
  });

  // set profile state
  useProfileStore.setState({
    profiles: [...profileList],
    duplicateDict,
    selectedProfile: profileList.length > 0 ? profileList[0] : undefined,
  });

  // console.log("fetchProfiles", profileList, duplicateDict);
};

const setSelectedProfile = (name: string) => {
  let profileList = useProfileStore.getState().profiles;
  let selectedProfile = profileList.find((p) => p.name === name);

  useProfileStore.setState({
    selectedProfile,
  });
};

const addProfile = (profile: ProfileModel) => {
  // get the list of profiles
  const newProfile = new ProfileModel(profile.name);
  let profileList = useProfileStore.getState().profiles;
  let duplicateDict = useProfileStore.getState().duplicateDict;

  // check if the profile name is in the dict
  let duplicateCount = 1;
  if (duplicateDict[profile.name]) {
    newProfile.name = `${newProfile.name} (${duplicateDict[profile.name]})`;
    duplicateCount = duplicateDict[profile.name] + 1;
  }

  useProfileStore.setState({
    isRename: false,
    profiles: [...profileList, newProfile],
    duplicateDict: {
      ...duplicateDict,
      [profile.name]: duplicateCount,
      [newProfile.name]: 1,
    },
    selectedProfile: newProfile,
  });
};

const deleteProfile = (profile: ProfileModel) => {
  let profileList = useProfileStore.getState().profiles;
  profileList = profileList.filter((p) => p.name !== profile.name);

  useProfileStore.setState(() => ({
    profiles: profileList,
    selectedProfile: profileList.length > 0 ? profileList[0] : undefined,
    isRename: false,
  }));
};

const renameProfile = (name: string) => {
  let isRename = useProfileStore.getState().isRename;
  const selectedProfile = useProfileStore.getState().selectedProfile;
  if (!isRename || !selectedProfile) return;

  if (selectedProfile.name === name) {
    useProfileStore.setState({
      isRename: false,
      errorMessage: undefined,
    });
    return;
  }

  const profileList = useProfileStore.getState().profiles;
  const duplicateDict = useProfileStore.getState().duplicateDict;
  //  check if the name is alr in the list
  if (profileList.find((p) => p.name === name)) {
    useProfileStore.setState({
      errorMessage: "Profile name already exists",
    });
    return;
  }

  const [mName, count] = Helpers.getMatches(name);

  if (mName && count) {
    if (duplicateDict[mName]) {
      duplicateDict[mName] = Math.max(duplicateDict[mName], count + 1);
    }
  }

  if (!duplicateDict[name]) duplicateDict[name] = 1;

  const editedProfileData = new ProfileModel(name);
  useProfileStore.setState({
    profiles: profileList.map((p) => {
      if (p.name === selectedProfile.name) {
        return editedProfileData;
      }
      return p;
    }),
    duplicateDict,
    selectedProfile: editedProfileData,
    isRename: false,
    errorMessage: undefined,
  });
};

export default useProfileStore;
