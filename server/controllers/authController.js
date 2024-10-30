import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "saifrajamarch647@gmail.com",
    pass: "zwzwpvsprlkxolxx",
  },
});

const sendMail =async(to,sub,msg)=> {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "saifrajamarch647@gmail.com", // sender address
    to: to, // list of receivers
    subject: sub, // Subject line
    text: msg, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}



export const registerController = async (req, res, next) => {
  const { name, email, password, lastName } = req.body;
  //validate
  if (!name) {
    return res.status(404).send({
      success: false,
      message: "Please enter your name",
    });
  }
  if (!lastName) {
    return res.status(404).send({
      success: false,
      message: "Please enter your surname",
    });
  }
  if (!email) {
    return res.status(404).send({
      success: false,
      message: "Please enter email",
    });
  }
  if (!password) {
    return res.status(404).send({
      success: false,
      message: "Please enter password",
    });
  }
  const exisitingUser = await userModel.findOne({ email });
  if (exisitingUser) {
    return res.status(404).send({
      success: false,
      message: "You have already registered",
    });
  }
  const user = await userModel.create({ name, email, password, lastName });
  //token
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "User Created Successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
     
    return res.status(404).send({
      success: false,
      message: "Invalid email or password",
    });
  }
  //check user
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).send({
      success: false,
      message: "Email is not registerd",
    });
  }
  const match = await user.comparePassword(password);
  if (!match) {
    return res.status(400).send({
      success: false,
      message: "Invalid Password",
    });
  }
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login Successfully",
    user,
    token,
  });
};
export const otpLoginController = async (req, res) => {
  try {
    const { email } = req.body;
    //validation
    if (!email) {
     
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const otp = Math.floor(1000+Math.random()*9000);
    sendMail(email,"One Time Password from Career Jump", `Dear customer! Your one time password to login is ${otp} (do not share it with strangers)`)
 
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "otp has been sent ",
      otp:otp,
     user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
