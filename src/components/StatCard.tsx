type StatCardProps = {
  title: string
  value: string
  change?: string // Using '?' makes this field optional to prevent TS errors
}

export default function StatCard({ title, value, change = "" }: StatCardProps) {
  // Check if change exists and starts with "+"
  const isPositive = change?.startsWith("+")

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow hover:shadow-lg transition">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
        {value}
      </h3>

      {/* Only render change info if 'change' prop is provided */}
      {change && (
        <span
          className={`text-sm font-medium ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {change} from last week
        </span>
      )}
    </div>
  )
}