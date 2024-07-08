// UserCard.tsx
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { followUser, unfollowUser } from "@/lib/appwrite/api";
import { useState } from "react";
 // Adjust path as needed

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  const [isFollowing, setIsFollowing] = useState(false); // State to manage follow status

  const handleFollowToggle = async () => {
    try {
      if (!isFollowing) {
        await followUser(user.$id); // Call follow API
      } else {
        await unfollowUser(user.$id); // Call unfollow API
      }

      setIsFollowing(!isFollowing); // Toggle follow state
    } catch (error) {
      console.error("Failed to toggle follow:", error);
      // Handle error gracefully
    }
  };

  return (
    <Link to={`/profile/${user.$id}`} className="user-card">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button
        type="button"
        size="sm"
        className={`shad-button_primary px-5 ${isFollowing ? "bg-gray-300" : ""}`}
        onClick={handleFollowToggle}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </Link>
  );
};

export default UserCard;
