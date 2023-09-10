import { useAuthentication } from "../auth/AuthService"

export default function UserDash() {
    const { currentUser } = useAuthentication();

    return (
        <>
        <h1>User {currentUser?.username} Dashboard</h1>
        </>
    )
}