import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../components/ui/sidebar";

import { sidebarButton } from "../Styles/sidebar";

export const LeftSidebar = () => {
  return (
    <>
      <SidebarGroup className="border p-8">
        <SidebarGroupLabel className="mb-3 pl-3 text-sm font-semibold text-black border-l-2 border-emerald-400">
          Community
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton className={sidebarButton}>
                Profile
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className={sidebarButton}>
                Friends
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className={sidebarButton}>
                Forums
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className={sidebarButton}>
                Clans
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className={sidebarButton}>
                Events
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* 2) GAMING RELATED */}
      <SidebarGroup className="border p-8 mt-6">
        <SidebarGroupLabel
          className="
  mb-3 pl-3 text-sm font-semibold text-black
  border-l-2 border-emerald-400"
        >
          Gaming related
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton className={sidebarButton}>
                Popular games
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={sidebarButton}>
                Genres
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={sidebarButton}>
                Platforms
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* 3) E-SPORT */}
      <SidebarGroup className="border p-8 mt-6">
        <SidebarGroupLabel
          className="
  mb-3 pl-3 text-sm font-semibold text-black
  border-l-2 border-emerald-400"
        >
          E-sport
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton className={sidebarButton}>
                Tournaments
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={sidebarButton}>
                Teams
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={sidebarButton}>
                Standings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup className="border p-8 mt-6">
        <SidebarGroupLabel
          className="
  mb-3 pl-3 text-sm font-semibold text-black
  border-l-2 border-emerald-400"
        >
          Social
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton className={sidebarButton}>
                Marketplace
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={sidebarButton}>
                Meme Zone
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={sidebarButton}>
                Off topic
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};
