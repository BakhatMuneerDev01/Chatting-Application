import { useEffect, useState } from "react"; // Importing hooks from React
import { useChatStore } from "../store/useChatStore"; // Importing custom hook for chat store
import { useAuthStore } from "../store/useAuthStore"; // Importing custom hook for auth store
import SidebarSkeleton from "./skeleton/SidebarSkeleton"; // Importing skeleton component for loading state
import { Users } from "lucide-react"; // Importing Users icon from lucide-react

const Sidebar = () => {
    // Destructuring necessary state and functions from chat store
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

    // Destructuring onlineUsers from auth store
    const { onlineUsers } = useAuthStore();
    // State to toggle showing only online users
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    
    // Fetch users when component mounts
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    // Filter users based on online status if showOnlineOnly is true
    const filteredUsers = showOnlineOnly
        ? users.filter((user) => onlineUsers.includes(user._id))
        : users;

    // Show skeleton loader if users are still loading
    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="size-6" /> {/* Users icon */}
                    <span className="font-medium hidden lg:block">Contacts</span> {/* Contacts label */}
                </div>
                {/* Online filter toggle */}
                <div className="mt-3 hidden lg:flex items-center gap-2">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}
                            className="checkbox checkbox-sm"
                        /> {/* Checkbox to toggle online users filter */}
                        <span className="text-sm">Show online only</span> {/* Label for checkbox */}
                    </label>
                    <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span> {/* Online users count */}
                </div>
            </div>

            <div className="overflow-y-auto w-full py-3">
                {/* Map through filtered users and render each user */}
                {filteredUsers.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={user.profilePic || "/avatar.png"}
                                alt={user.name}
                                className="size-12 object-cover rounded-full"
                            /> {/* User profile picture */}
                            {onlineUsers.includes(user._id) && (
                                <span
                                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                                /> 
                            )}
                            {/* Online status indicator */}
                        </div>

                        {/* User info - only visible on larger screens */}
                        <div className="hidden lg:block text-left min-w-0">
                            <div className="font-medium truncate">{user.fullName}</div> {/* User full name */}
                            <div className="text-sm text-zinc-400">
                                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                            </div> {/* User online/offline status */}
                        </div>
                    </button>
                ))}

                {/* Show message if no users are online */}
                {filteredUsers.length === 0 && (
                    <div className="text-center text-zinc-500 py-4">No online users</div>
                )}
            </div>
        </aside>
    );
};
export default Sidebar; // Exporting Sidebar component