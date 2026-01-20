type HeaderProps = {
  period: string
  setPeriod: (value: string) => void
}

export default function DashboardHeader({ period, setPeriod }: HeaderProps) {

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">

      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        Dashboard Overview
      </h1>

      <div className="flex items-center gap-3">

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-3 py-2 rounded border bg-white dark:bg-slate-800 dark:text-white"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Export CSV
        </button>

      </div>

    </div>
  )
}
