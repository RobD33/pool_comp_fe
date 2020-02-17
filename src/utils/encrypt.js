import bcrypt from 'bcryptjs'
const saltRounds = 10

const encrypt = (password) => {
  return bcrypt.hash(password, saltRounds).then(hash => hash);
}

const compare = (password, hash) => {
  return bcrypt.compare(password, hash).then(result => result)
}

export { encrypt, compare }
