import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../components/ui/sidebar";
import { buttons } from "../Styles/button";

export const LeftSidebar = () => {
  return (
    <>
      <SidebarGroup className="p-8 bg-neutral-800 rounded-xl bg-white/5 border border-white/10 ring-1 ring-emerald-400/20 hover:ring-emerald-400/35 transition">
        <SidebarGroupLabel className="mb-3 pl-3 text-xl font-semibold text-white border-l-2 border-emerald-400">
          Community
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton className={buttons}>Profile</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className={buttons}>Friends</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className={buttons}>Forums</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className={buttons}>Clans</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className={buttons}>Events</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* 2) GAMING RELATED */}
      <SidebarGroup className="p-8 mt-6 bg-neutral-800 rounded-xl bg-white/5 border border-white/10 ring-1 ring-emerald-400/20 hover:ring-emerald-400/35 transition">
        <SidebarGroupLabel className="mb-3 pl-3 text-xl font-semibold text-white border-l-2 border-emerald-400">
          Gaming related
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton className={buttons}>
                Popular games
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={buttons}>Genres</SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={buttons}>
                Platforms
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* 3) E-SPORT */}
      <SidebarGroup className="p-8 mt-6 rounded-xl bg-white/5 border border-white/10 ring-1 ring-emerald-400/20 hover:ring-emerald-400/35 transition">
        <SidebarGroupLabel className="mb-3 pl-3 text-xl font-semibold text-white border-l-2 border-emerald-400">
          E-sport
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton className={buttons}>
                Tournaments
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={buttons}>Teams</SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={buttons}>
                Standings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup className="p-8 mt-6 bg-neutral-800 rounded-xl bg-white/5 border border-white/10 ring-1 ring-emerald-400/20 hover:ring-emerald-400/35 transition">
        <SidebarGroupLabel className="mb-3 pl-3 text-xl font-semibold text-white border-l-2 border-emerald-400">
          Social
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton className={buttons}>
                Marketplace
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={buttons}>
                Meme Zone
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={buttons}>
                Off topic
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};
