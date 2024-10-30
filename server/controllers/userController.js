import userModel from "../models/userModel.js";

export const updateUserController = async (req, res, next) => {
  const { nName, nEmail, nLastName,nPassword} = req.body;
  const userId = req.user.userId; 
  if (!nName || !nEmail || !nLastName || !nPassword) {
    return res.status(404).send({
      success: false,
      message: "Please provide all fields",
    });
  }
  const user = await userModel.findOne({ _id: userId});
  const newPassword = nPassword ? nPassword : undefined;
  const updatedUser = await userModel.findByIdAndUpdate(
  userId,
    {
      name: nName || user.name,
      lastName: nLastName || user.lastName,
      email: nEmail || user.email,
      password: newPassword || user.password,
    },
    { new: true }
  );
  res.status(200).json({
    updatedUser
  });
};

