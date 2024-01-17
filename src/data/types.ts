export type User = {
  jobIdx: number | null;
  company: string | null;
  license: string | null;
  account: string | null;
  password: string | null;
};

export type componentProps = {
  userProps: User;
  onUpdateUser: (u: User) => void;
  onUpdateValidation: (v: boolean) => void;
};
