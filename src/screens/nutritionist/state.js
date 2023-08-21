import { reducer } from 'lib';

export const init = {
  id: -1,
  name: "",
  lastName: "",
  birthDay: 0,
  gender: "",
  email: "",
  password: "",
  license: null,
  role: "",
  userStatus: "",
  passwordStatus: "",
  nutritionistId: null,
  enabled: false,
  fullName: "",
  accountNonExpired: false,
  accountNonLocked: false,
  credentialsNonExpired: false,
  username: "",
  itemList: []
}

export { reducer }
