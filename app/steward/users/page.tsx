import { UsersPage } from "@/components/steward/users-page"
import { getAllUsers } from "@/app/actions/admin"

export default async function StewardUsersPage() {
  const users = await getAllUsers()
  return <UsersPage users={users} />
}
