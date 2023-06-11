class ProfileModel {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const defaultProfile: ProfileModel = {
  name: "Profile 1",
};

export { defaultProfile, ProfileModel };
