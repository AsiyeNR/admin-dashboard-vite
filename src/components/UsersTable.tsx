import { useState } from "react"

const USERS = [
  { id: 1, name: "John Doe", email: "john@mail.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@mail.com", role: "User" },
  { id: 3, name: "Alex Johnson", email: "alex@mail.com", role: "User" },
  { id: 4, name: "Emma Brown", email: "emma@mail.com", role: "Editor" },
  { id: 5, name: "Chris Green", email: "chris@mail.com", role: "User" },
  { id: 6, name: "Mike Wilson", email: "mike@mail.com", role: "Admin" },
]

export default function UsersTable() {

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const pageSize = 4

  const filtered = USERS.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / pageSize)

  const start = (page - 1) * pageSize
  const paginated = filtered.slice(start, start + pageSize)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">

        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
          Users List
        </h2>

        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          placeholder="Search user..."
          className="px-3 py-2 rounded-lg border dark:border-slate-600 bg-transparent outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="text-left bg-slate-100 dark:bg-slate-700">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map(user => (
              <tr
                key={user.id}
                className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded text-xs bg-blue-500/10 text-blue-500">
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-2 mt-4">

        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>

        <span className="px-2 py-1 text-sm">
          {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>

      </div>

    </div>
  )
}
