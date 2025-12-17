import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../components/ui/sidebar";

import { SponsorCard } from "./SponsorCard";
import { FriendRow } from "./FriendRow";

export const RightSidebar = () => {
  return (
    <>
      <h2 className="mb-3 pl-3 text-sm font-semibold ">Sponsors</h2>
      <div className="space-y-4">
        <SponsorCard
          name="TechCorp"
          tagline="Innovate your gaming setup"
          imageSrc="/sponsors/techcorp.jpg"
        />
        <SponsorCard
          name="GameFuel"
          tagline="Boost your performance"
          imageSrc="/sponsors/gamefuel.jpg"
        />
        <SponsorCard
          name="ProGamer Gear"
          tagline="Gear up like a pro"
          imageSrc="/sponsors/progamer-gear.jpg"
        />
      </div>

      {/* 2) Friends  */}

      <SidebarGroup className="border p-8 mt-6">
        <SidebarGroupLabel className="mb-3 pl-3 text-sm font-semibold border-l-2 border-emerald-400">
          Friends
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            <FriendRow name="PlayerOne" avatarSrc="/avatars/playerone.jpg" />
            <FriendRow name="GamerGirl" avatarSrc="/avatars/gamergirl.jpg" />
            <FriendRow
              name="SupportMain"
              avatarSrc="/avatars/supportmain.jpg"
            />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* 3) Connect with */}
      <SidebarGroup className="border p-8 mt-6">
        <SidebarGroupLabel className="mb-3 pl-3 text-sm font-semibold border-l-2 border-emerald-400">
          Connect with
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            <FriendRow name="ProSniper" avatarSrc="/avatars/prosniper.jpg" />
            <FriendRow
              name="HealerQueen"
              avatarSrc="/avatars/healerqueen.jpg"
            />
            <FriendRow name="IGL_Master" avatarSrc="/avatars/iglmaster.jpg" />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};
