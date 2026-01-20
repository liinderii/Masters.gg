import { buttons } from "../../Styles/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import { ProfilePosts } from "./ProfileTabPosts";
import { ProfileAboutColumns } from "./ProfileTabAbout";
import { ProfilePhotos } from "./ProfileTabPhotos";
import { ProfileVideos } from "./ProfileTabVideos";
import { ProfileFriends } from "./ProfileTabFriends";
import { ProfileGames } from "./ProfileTabGames";

export function ProfileTabs() {
  return (
    <div className="w-full px-4 md:px-0 md:flex md:w-[1400px] md:mb-100 md:flex-col md:gap-6">
      <Tabs defaultValue="posts">
        <TabsList
          className="
            w-full mb-4
            grid grid-cols-2 gap-2 h-auto
            md:flex md:gap-4 md:justify-center md:mb-4
          "
        >
          <TabsTrigger
            className={`${buttons} w-full px-4 py-3 text-sm md:px-8 md:py-4 md:text-base md:min-w-[140px]`}
            value="posts"
          >
            Posts
          </TabsTrigger>

          <TabsTrigger
            className={`${buttons} w-full px-4 py-3 text-sm md:px-8 md:py-4 md:text-base md:min-w-[140px]`}
            value="about"
          >
            About
          </TabsTrigger>

          <TabsTrigger
            className={`${buttons} w-full px-4 py-3 text-sm md:px-8 md:py-4 md:text-base md:min-w-[140px]`}
            value="friends"
          >
            Friends
          </TabsTrigger>

          <TabsTrigger
            className={`${buttons} w-full px-4 py-3 text-sm md:px-8 md:py-4 md:text-base md:min-w-[140px]`}
            value="photos"
          >
            Photos
          </TabsTrigger>

          <TabsTrigger
            className={`${buttons} w-full px-4 py-3 text-sm md:px-8 md:py-4 md:text-base md:min-w-[140px]`}
            value="videos"
          >
            Videos
          </TabsTrigger>

          <TabsTrigger
            className={`${buttons} w-full px-4 py-3 text-sm md:px-8 md:py-4 md:text-base md:min-w-[140px]`}
            value="games"
          >
            Games
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <ProfilePosts />
        </TabsContent>

        <TabsContent value="about">
          <ProfileAboutColumns />
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
