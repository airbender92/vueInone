import { generateAccessToken } from "../utils/generateAccessToken";

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = getUserFromDB({ email, password });

  if (user) {
    const token = generateAccessToken(user?.username);
    res.json({
      token: `Bearer ${token}`,
    });
  } else res.sendStatus(401)
}