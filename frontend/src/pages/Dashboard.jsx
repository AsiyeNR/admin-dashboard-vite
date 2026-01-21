import { useEffect, useState } from "react"
import api from "../api/axios"
import toast from "react-hot-toast"
import { io } from "socket.io-client"

import { Line, Bar } from "react-chartjs-2"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js"


// REGISTER CHARTJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler
)


function DashboardSkeleton() {

  return (

    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

      {/* CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px"
        }}
      >

        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="skeleton"
            style={{ height: "110px" }}
          />
        ))}

      </div>

      {/* CHARTS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
          gap: "24px",
          marginTop: "40px"
        }}
      >

        <div
          className="skeleton"
          style={{ height: "320px" }}
        />

        <div
          className="skeleton"
          style={{ height: "320px" }}
        />

      </div>

    </div>
  )
}

export default function Dashboard() {

  const [stats, setStats] = useState(null)
  const [charts, setCharts] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchData = async () => {
      try {
        const statsRes = await api.get("/api/stats")
        const chartsRes = await api.get("/api/charts")

        setStats(statsRes.data)
        setCharts(chartsRes.data)

      } catch (err) {
        console.log("Dashboard API error:", err)
      }

      setLoading(false)
    }

    fetchData()

    // SOCKET
  const socket = io("https://admin-dashboard-vite-t14x.onrender.com.onrender.com")


    socket.on("chartUpdate", (liveData) => {
      setCharts(liveData)
    })

    socket.on("alert", (data) => {
      if (data.type === "warning") toast.success(data.message)
      if (data.type === "error") toast.error(data.message)
    })

    return () => socket.disconnect()

  }, [])

 if (loading || !stats || !charts) {
  return <DashboardSkeleton />
}


  const cards = [
    { title: "Users", value: stats.users },
    { title: "Revenue", value: `$${stats.revenue}` },
    { title: "Orders", value: stats.orders },
    { title: "Active Sessions", value: stats.activeSessions },
    { title: "Errors", value: stats.errors },
    { title: "Growth", value: `${stats.growth}%` }
  ]

  const revenueChart = {
    labels: charts.labels,
    datasets: [
      {
        label: "Revenue",
        data: charts.revenue,
        borderColor: "#4fc3f7",
        backgroundColor: "rgba(79,195,247,0.15)",
        tension: 0.4,
        fill: true
      }
    ]
  }

  const ordersChart = {
    labels: charts.labels,
    datasets: [
      {
        label: "Orders",
        data: charts.orders,
        backgroundColor: "#81c784"
      }
    ]
  }

  return (

    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        paddingBottom: "40px"
      }}
    >
<h2 style={{
    marginBottom: "12px",
    letterSpacing:"0.5px"
    }}>

   

        Dashboard Overview
      </h2>

      {/* STATS CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px"
        }}
      >

        {cards.map((card, index) => (

          <div
         key={index}
         onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-6px)"
         e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.6)"
         }}
        onMouseLeave={e => {
         e.currentTarget.style.transform = "translateY(0)"
         e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.4)"
          }}
          style={{

              background: "linear-gradient(145deg, #1c1c1c, #232323)",
              color: "#fff",
              padding: "22px",
              borderRadius: "14px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
              transition: "0.3s",
              cursor: "pointer",

              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >

            <span style={{ opacity: 0.7 }}>
              {card.title}
            </span>

            <span
              style={{
                fontSize: "26px",
                fontWeight: "bold"
              }}
            >
              {card.value}
            </span>

          </div>

        ))}

      </div>

      {/* ANALYTICS */}
      <h2 style={{ marginTop: "50px" }}>
        Analytics
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
          gap: "24px",
          marginTop: "20px"
        }}
      >

        {/* REVENUE LINE */}
        <div
          style={{
            background: "#1c1c1c",
            padding: "20px",
            borderRadius: "14px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
            overflow: "hidden"
          }}
        >
         <Line
  data={revenueChart}
  options={{ maintainAspectRatio: false }}
/>

        </div>

        {/* ORDERS BAR */}
        <div
          style={{
            background: "#1c1c1c",
            padding: "20px",
            borderRadius: "14px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
            overflow: "hidden"
          }}
        >
          <Bar data={ordersChart} />
        </div>

      </div>

    </div>
  )
}
