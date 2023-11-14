const UserModel = require('../models/user.model');

export const addUser = async(req, res) => {
      const {userId, email, password} = req.body;
try{
      const newUser = await UserModel.create

} catch (error) {

}


} 
