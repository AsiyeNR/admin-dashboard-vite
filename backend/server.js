const express = require("express")
const cors = require("cors")
const http = require("http")
const { Server } = require("socket.io")

const authRoutes = require("./routes/authRoutes")
const authMiddleware = require("./middleware/authMiddleware")
const roleMiddleware = require("./middleware/roleMiddleware")

const app = express()

// =======================
// HTTP + SOCKET SERVER
// =======================

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})


// =======================
// MIDDLEWARES
// =======================

app.use(cors({ origin: "*" }))

app.use(express.json())

// =======================
// AUTH ROUTES
// =======================

app.use("/api/auth", authRoutes)

// =======================
// TEST PROTECTED ROUTE
// =======================

app.get("/api/admin", authMiddleware, (req, res) => {
  res.json("Welcome Admin Panel")
})

// =======================
// DASHBOARD STATS API
// =======================

app.get("/api/stats", authMiddleware, roleMiddleware(["admin"]), (req, res) => {

  const stats = {
    users: 1245,
    revenue: 12430,
    orders: 320,
    activeSessions: 89,
    errors: 2,
    growth: "18%"
  }

  res.json(stats)
})

// =======================
// INITIAL CHART DATA API
// =======================

app.get("/api/charts", authMiddleware, roleMiddleware(["admin"]), (req, res) => {

  const randomRevenue = () => {
    return Math.floor(Math.random() * 5000) + 8000
  }

  const randomOrders = () => {
    return Math.floor(Math.random() * 100) + 200
  }

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    revenue: [
      randomRevenue(),
      randomRevenue(),
      randomRevenue(),
      randomRevenue(),
      randomRevenue()
    ],
    orders: [
      randomOrders(),
      randomOrders(),
      randomOrders(),
      randomOrders(),
      randomOrders()
    ]
  }

  res.json(chartData)
})

// =======================
// SOCKET CONNECTION
// =======================

io.on("connection", (socket) => {

  console.log("Client connected:", socket.id)

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id)
  })

})

// =======================
// REALTIME PUSH LOOP
// =======================

setInterval(() => {

  const randomRevenue = () => {
    return Math.floor(Math.random() * 5000) + 8000
  }

  const randomOrders = () => {
    return Math.floor(Math.random() * 100) + 200
  }

  const liveChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    revenue: [
      randomRevenue(),
      randomRevenue(),
      randomRevenue(),
      randomRevenue(),
      randomRevenue()
    ],
    orders: [
      randomOrders(),
      randomOrders(),
      randomOrders(),
      randomOrders(),
      randomOrders()
    ]
  }

 io.emit("chartUpdate", liveChartData)
io.emit("alert", {
  type: "warning",
  message: "🔥 SOCKET ALERT TEST OK"
})

// ALERT RULES
if (liveChartData.revenue[4] > 12000) {

  io.emit("alert", {
    type: "warning",
    message: "Revenue exceeded 12K 🚀"
  })

}

if (liveChartData.orders[4] < 230) {

  io.emit("alert", {
    type: "error",
    message: "Orders dropped below threshold ⚠️"
  })

}
}, 5000)

// =======================
// SERVER START
// =======================

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000")
})

