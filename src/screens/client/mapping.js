export function toDTO(state) {
  return {
      "id" : state.id,
      "name" : state.name,
      "lastName" : state.lastName,
      "birthDay" : state.birthDay,
      "email" : state.email,
      "license" : state.license,
      "userStatus" : state.userStatus,
      "passwordStatus" : state.passwordStatus,
      "enabled" : state.enabled,
      "accountNonExpired" : state.accountNonExpired,
      "accountNonLocked" : state.accountNonLocked,
      "credentialsNonExpired" : state.credentialsNonExpired,
      "username" : state.email
  }
}