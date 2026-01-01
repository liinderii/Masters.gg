import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { mockProfileFriends } from "../../data/mockProfileFriends";
import { buttons } from "../../Styles/button";

export const ProfileFriends = () => {
  const data = mockProfileFriends;

  return (
    <>
      <div>
        <Card className="w-full mx-auto max-w-[1600px] overflow-hidden gap-0 border shadow-none">
          <CardHeader>
            <CardTitle>Friends</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input className="p-2 rounded-md" placeholder="Search friends" />
            <div className="flex gap-4">
              <button className={buttons}>
                Friend requests ({data.requests.length})
              </button>
              <button className={buttons}>Find friends</button>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>

        <Card className="w-full mx-auto max-w-[1600px] overflow-hidden gap-0 border shadow-none mt-4">
          <CardHeader>
            <CardTitle>Friends ({data.friends.length})</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {data.friends.length === 0 && <p>No friends to display.</p>}

            {data.friends.map((friend) => (
              <div
                key={friend.id}
                className="flex justify-between items-center border-b border-white/10 pb-2 last:border-b-0"
              >
                <span>
                  {friend.name}
                  {friend.isOnline && (
                    <span className="text-sm text-green-500 ml-2">
                      ● Online
                    </span>
                  )}
                </span>

                <button className="text-sm text-emerald-400 hover:underline">
                  Message
                </button>
              </div>
            ))}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </>
  );
};
