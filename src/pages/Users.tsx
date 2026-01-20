import UsersTable from "../components/UsersTable"

export default function Users() {
  return (
    <div className="space-y-6">

      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
          Users
        </h1>
      </div>

      {/* Users Table */}
      <UsersTable />

    </div>
  )
}
