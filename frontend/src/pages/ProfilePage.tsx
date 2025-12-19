import { ProfileHeader } from "../components/profileComponents/ProfileHeader";
import { ProfileTabs } from "../components/profileComponents/Profiletabs";

export const ProfilePage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <ProfileHeader />
      <ProfileTabs />
    </div>
  );
};
