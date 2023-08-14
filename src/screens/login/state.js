import { reducer, required } from "lib"

const init = {
  username: {
    value: '', type: 'TEXT', pattern: '', dispatch: 'DIRECT',
    validations: [required]
  },
  password: {
    value: '', type: 'TEXT', pattern: '', dispatch: 'DIRECT',
    validations: [required]
  },
}

export {init, reducer}