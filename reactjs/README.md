<!-- run command using vite -->

## Usage

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# for building
$ npm run build
```

<!-- explain about the library usages -->

## Libraries usages

- [Vite](https://vitejs.dev/) Building and bundling tool
- [zustand](https://github.com/pmndrs/zustand) State management
- [mui](https://mui.com/) UI library


## Explanation

### State management

```ts
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
```

- `profiles` - List of profiles
- `selectedProfile` - Selected profile from combobox
- `duplicateDict` - Dictionary to keep track of duplicate profiles and count
- `isRename` - Flag to show/hide rename component
- `errorMessage` - Error message to use in rename component

- `fetchProfiles` - Method to fetch profiles from mock api in the beginning
- `setSelectedProfile` - Method to set selected profile from combobox
- `setIsRename` - Method to set isRename flag

- `addProfile` - Method to add new profile using default profile model
- `renameProfile` - Method to rename the profile
- `duplicateProfile` - Method to duplicate the profile from selected profile
- `deleteProfile` - Method to delete the profile from selected profile

### Components

- `App.tsx` - Main component, first it will fetch the existing profiles from mock api method `src/api/profiles.ts` and then it will populate `profileList` state.
- `Rename.tsx` - This component will be rendered when user clicks on rename action. It will show a input field with cancel and save button. Cancel button will reset the input field and save button will call the `renameProfile` method.
- `Combobox.tsx` - This component will be rendered when its not rename action. That means this will be the default view in `App.tsx`. It will show a combobox with list of profiles and actions like add, rename, duplicate and delete.