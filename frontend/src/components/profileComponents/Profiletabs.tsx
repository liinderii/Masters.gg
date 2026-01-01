import { buttons } from "../../Styles/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import { ProfilePosts } from "./ProfileTabPosts";
import { ProfileAbout } from "./ProfileTabAbout";
import { ProfilePhotos } from "./ProfileTabPhotos";
import { ProfileVideos } from "./ProfileTabVideos";
import { ProfileFriends } from "./ProfileTabFriends";
import { ProfileGames } from "./ProfileTabGames";

export function ProfileTabs() {
  return (
    <div className="flex w-[1400px] mb-100 flex-col gap-6 ">
      <Tabs defaultValue="posts">
        <TabsList className="flex gap-4 width-full justify-center mb-4">
          <TabsTrigger
            className={`${buttons} px-8 py-4 text-base min-w-[140px]`}
            value="posts"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger
            className={`${buttons} px-8 py-4 text-base min-w-[140px]`}
            value="about"
          >
            About
          </TabsTrigger>
          <TabsTrigger
            className={`${buttons} px-8 py-4 text-base min-w-[140px]`}
            value="friends"
          >
            Friends
          </TabsTrigger>
          <TabsTrigger
            className={`${buttons} px-8 py-4 text-base min-w-[140px]`}
            value="photos"
          >
            Photos
          </TabsTrigger>
          <TabsTrigger
            className={`${buttons} px-8 py-4 text-base min-w-[140px]`}
            value="videos"
          >
            Videos
          </TabsTrigger>
          <TabsTrigger
            className={`${buttons} px-8 py-4 text-base min-w-[140px]`}
            value="games"
          >
            Games
          </TabsTrigger>
        </TabsList>

        {/* Här använder du nu importerna */}
        <TabsContent value="posts">
          <ProfilePosts />
        </TabsContent>

        <TabsContent value="about">
          <ProfileAbout />
        </TabsContent>

        <TabsContent value="friends">
          <ProfileFriends />
        </TabsContent>

        <TabsContent value="photos">
          <ProfilePhotos />
        </TabsContent>

        <TabsContent value="videos">
          <ProfileVideos />
        </TabsContent>

        <TabsContent value="games">
          <ProfileGames />
        </TabsContent>
      </Tabs>
    </div>
  );
}
