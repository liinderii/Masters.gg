import { SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";

type Props = {
  name: string;
  status?: "online" | "offline" | "busy";
  avatarSrc: string;
  onClick?: () => void;
};

export const FriendRow = ({ name, avatarSrc, onClick }: Props) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={onClick}
        className="flex items-center space-x-3"
      >
        <img
          src={avatarSrc}
          alt={name}
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="flex-1 text-left">{name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
