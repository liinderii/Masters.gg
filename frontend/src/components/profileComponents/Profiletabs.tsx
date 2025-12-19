import { buttons } from "../../Styles/button";
import { Button } from "../ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function ProfileTabs() {
  return (
    <div className="flex w-[1400px] mb-100 flex-col gap-6 ">
      <Tabs defaultValue="account">
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
        </TabsList>
        <TabsContent value="posts">
          <Card>
            <CardHeader>
              <CardTitle>Posts</CardTitle>
              <CardDescription>
                Make changes to your posts here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6"></CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
              <CardDescription>Tjenare fan ggsfa</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6"></CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="friends">
          <Card>
            <CardHeader>
              <CardTitle>Friends</CardTitle>
              <CardDescription>Tjenare fan ggsfa</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6"></CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="photos">
          <Card>
            <CardHeader>
              <CardTitle>Photos</CardTitle>
              <CardDescription>Tjenare fan ggsfa</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6"></CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle>Videos</CardTitle>
              <CardDescription>Tjenare fan ggsfa</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6"></CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
