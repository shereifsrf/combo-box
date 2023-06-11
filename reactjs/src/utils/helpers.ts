interface IOrderProfile {
  getMatches: (name: string) => [string?, number?];
}

const Helpers: IOrderProfile = {
  getMatches: (name) => {
    // check if profile name is one of the key + (number)
    const regex = /(.*) \((\d+)\)/;
    const match = regex.exec(name);
    if (match) {
      return [match[1], parseInt(match[2])];
    }

    return [undefined, undefined];
  },
};

export default Helpers;
