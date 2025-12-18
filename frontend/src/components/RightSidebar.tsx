import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from "../components/ui/sidebar";

import { SponsorCard } from "./SponsorCard";
import { FriendRow } from "./FriendRow";

export const RightSidebar = () => {
  return (
    <>
      <h2 className="mb-3 pl-3 text-xl font-semibold text-white">Sponsors</h2>
      <div className="space-y-4 ">
        <SponsorCard
          name="TechCorp"
          tagline="Innovate your gaming setup"
          imageSrc="/sponsors/Nividia.jpg"
        />
        <SponsorCard
          name="GameFuel"
          tagline="Boost your performance"
          imageSrc="/sponsors/PlayController.jpg"
        />
        <SponsorCard
          name="ProGamer Gear"
          tagline="Gear up like a pro"
          imageSrc="/sponsors/Nintendo.png"
        />
      </div>

      {/* 2) Friends  */}

      <SidebarGroup className="bg-neutral-800 p-8 mt-6 rounded-xl bg-white/5 border border-white/10 ring-1 ring-emerald-400/20 hover:ring-emerald-400/35 transition">
        <SidebarGroupLabel className="mb-3 pl-3  text-xl font-semibold text-white border-l-2 border-emerald-400">
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
      <SidebarGroup className="rounded-xl bg-white/5 border border-white/10 ring-1 ring-emerald-400/20 hover:ring-emerald-400/35 transitionbg-neutral-800 p-8 mt-6">
        <SidebarGroupLabel className="mb-3 pl-3 text-xl font-semibold text-white border-l-2 border-emerald-400">
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
