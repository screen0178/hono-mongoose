import * as mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
)

// Match user entered password to hashed password in database
userSchema.methods.mathPassword = async function (enteredPassword: string) {
  //   return await bcrypt.compare(enteredPassword, this.password)
  return await Bun.password.verify(enteredPassword, this.password)
}

// Hash password with Bun
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  //   const salt = await bcrypt.genSalt(10)
  //   this.password = await bcrypt.hash(this.password, salt)

  // use bcrypt
  this.password = await Bun.password.hash(this.password, {
    algorithm: 'bcrypt',
    cost: 4, // number between 4-31
  })
})

const User = mongoose.model('User', userSchema)
export default User
