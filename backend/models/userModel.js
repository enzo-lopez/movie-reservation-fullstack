import {User} from '../schemas/userSchema.js'

export class UserModel {
  static async register({username, email, role, password}) {
    const newUser = new User({username, email, role, password})
    await newUser.save()
    return newUser
  }

  static async getUserByEmail({email}) {
    return User.findOne({email})
  }

  static async getAllUsers() {
    return User.find()
  }

  static async getUserById({id}) {
    return User.findById({id})
  }

  static async updateUser({id, data}) {
    return await User.findByIdAndUpdate(id, data, {new: true})
  }

  static async deleteUser({id}) {
    return User.findByIdAndDelete(id)
  }
}
