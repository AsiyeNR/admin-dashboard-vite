const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const router = express.Router()

const ADMIN = {
  email: "admin@test.com",
  password: bcrypt.hashSync("123456", 10)
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  if (email !== ADMIN.email) {
    return res.status(400).json("User not found")
  }

  const match = await bcrypt.compare(password, ADMIN.password)

  if (!match) {
    return res.status(400).json("Wrong password")
  }
const accessToken = jwt.sign(
  { role: "admin" }, // test için editor / user yazabilirsin


  "ACCESS_SECRET",
  { expiresIn: "15m" }
)

const refreshToken = jwt.sign(
  { role: "admin" },
  "REFRESH_SECRET",
  { expiresIn: "7d" }
)

res.json({
  accessToken,
  refreshToken,
  user: { role: "admin" }
})

})

module.exports = router
router.post("/refresh", (req, res) => {

  const { refreshToken } = req.body

  if (!refreshToken) {
    return res.status(401).json("No refresh token")
  }

  try {

    const decoded = jwt.verify(refreshToken, "REFRESH_SECRET")

    const newAccessToken = jwt.sign(
      { role: decoded.role },
      "ACCESS_SECRET",
      { expiresIn: "15m" }
    )

    res.json({ accessToken: newAccessToken })

  } catch {
    res.status(403).json("Invalid refresh token")
  }

})

