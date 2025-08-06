import User from "../Model/UserModel.js";
import bcrypt from "bcrypt"

// Login 
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ username, password: hashedPassword });
      await user.save();

      return res.status(201).json({ message: "User created and logged in", user: { id: user._id, username: user.username }, });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user: { id: user._id, username: user.username }, });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
