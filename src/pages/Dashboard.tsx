import StatCard from "../components/StatCard"
import DashboardChart from "../components/DashboardChart"
import UsersTable from "../components/UsersTable"

export default function Dashboard() {

  return (
    <div className="space-y-6">

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        Dashboard Overview
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          title="Total Users"
          value="12,450"
          change="+12% from last week"
        />

        <StatCard
          title="Revenue"
          value="$34,200"
          change="+8% from last week"
        />

        <StatCard
          title="Orders"
          value="1,245"
          change="+4% from last week"
        />

        <StatCard
          title="Growth"
          value="18%"
          change="+2% from last week"
        />

      </div>

      {/* Chart */}
      <DashboardChart />

      {/* Table */}
      <UsersTable />

    </div>
  )
}
