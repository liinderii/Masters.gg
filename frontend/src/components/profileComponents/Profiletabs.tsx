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
    <div
      className="
        w-full px-4
        md:px-6
        xl:px-0 xl:w-[1400px] xl:mb-100 xl:flex xl:flex-col xl:gap-6
        mx-auto
      "
    >
      <Tabs defaultValue="posts">
        <TabsList
          className="
            w-full mb-4 h-auto
            grid grid-cols-2 sm:grid-cols-3 gap-2
            xl:flex xl:gap-4 xl:justify-center xl:mb-4
          "
        >
          <TabsTrigger
            className={`${buttons} w-full px-4 py-3 text-sm xl:px-8 xl:py-4 xl:text-base xl:min-w-[140px]`}
            value="posts"
          >
            Posts
          </TabsTrigger>

          <TabsTrigger
            className={`${buttons} w-full px-4 py-3 text-sm xl:px-8 xl:py-4 xl:text-base xl:min-w-[140px]`}
            value="about"
          >
            About
          </TabsTrigger>

          <TabsTrigger
            className={`${buttons} w-full px-4 py-3 text-sm xl:px-8 xl:py-4 xl:text-base xl:min-w-[140px]`}
            value="friends"
          >
            Friends
          </TabsTrigger>

          <TabsTrigger
            className={`${buttons} w-full px-4 py-3 text-sm xl:px-8 xl:py-4 xl:text-base xl:min-w-[140px]`}
            value="photos"
          >
            Photos
          </TabsTrigger>

          <TabsTrigger
            className={`${buttons} w-full px-4 py-3 text-sm xl:px-8 xl:py-4 xl:text-base xl:min-w-[140px]`}
            value="videos"
          >
            Videos
          </TabsTrigger>

          <TabsTrigger
            className={`${buttons} w-full px-4 py-3 text-sm xl:px-8 xl:py-4 xl:text-base xl:min-w-[140px]`}
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
