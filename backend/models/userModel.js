import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: process.env.EMPLOYEE_ROLE,
    },
    reports: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Report',
    },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
userSchema.methods.matchPassword = async function (enteredPassword) {
  //here class function instead of arrow function is used because of the poining issues of this keyword
  //with classic function, this points to the current user object
  //with arrow function, this points to undefined
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next()

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)
export default User
