import { User } from "@/models/user";

class UserService {
  async getAllUsers() {
    return User.find();
  }

  async getUserById(id: string) {
    return User.findById(id).populate("profile", "first last email isEmployer");
  }
}

export default UserService;