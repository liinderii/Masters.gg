import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { buttons } from "../../Styles/button";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

type Friend = {
  _id: string;
  name: string;
  email: string;
  isOnline?: boolean;
};

type IncomingRequest = {
  _id: string;
  fromUser: { _id: string; name: string; email: string };
  createdAt: string;
};

type SearchUser = {
  _id: string;
  name: string;
  email: string;
};

export const ProfileFriends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<IncomingRequest[]>([]);
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [view, setView] = useState<"friends" | "requests" | "find">("friends");

  const loadAll = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [fRes, rRes] = await Promise.all([
        fetch(`${API_BASE}/friends`, { credentials: "include" }),
        fetch(`${API_BASE}/friends/requests`, { credentials: "include" }),
      ]);

      if (!fRes.ok || !rRes.ok) throw new Error("Load failed");

      setFriends((await fRes.json()) as Friend[]);
      setRequests((await rRes.json()) as IncomingRequest[]);
    } catch (e) {
      console.error(e);
      setError("Could not load friends/requests.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const filteredFriends = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return friends;
    return friends.filter((f) =>
      `${f.name} ${f.email}`.toLowerCase().includes(q)
    );
  }, [friends, query]);

  const searchUsers = async () => {
    const q = searchQuery.trim();
    if (!q) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      setError(null);

      const res = await fetch(
        `${API_BASE}/friends/search?query=${encodeURIComponent(q)}`,
        { credentials: "include" }
      );

      if (!res.ok) throw new Error("Search failed");

      setSearchResults((await res.json()) as SearchUser[]);
    } catch (e) {
      console.error(e);
      setError("Could not search users.");
    } finally {
      setIsSearching(false);
    }
  };

  const sendRequest = async (toUserId: string) => {
    try {
      setError(null);

      const res = await fetch(`${API_BASE}/friends/request`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toUserId }),
      });

      if (res.status === 409) {
        setError("Request already sent / already friends.");
        return;
      }
      if (!res.ok) throw new Error("Send request failed");

      // valfritt: markera i UI
      setSearchResults((prev) => prev.filter((u) => u._id !== toUserId));
    } catch (e) {
      console.error(e);
      setError("Could not send friend request.");
    }
  };

  const acceptRequest = async (requestId: string) => {
    try {
      setError(null);

      const res = await fetch(
        `${API_BASE}/friends/requests/${requestId}/accept`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Accept failed");
      await loadAll();
    } catch (e) {
      console.error(e);
      setError("Could not accept request.");
    }
  };

  const declineRequest = async (requestId: string) => {
    try {
      setError(null);

      const res = await fetch(
        `${API_BASE}/friends/requests/${requestId}/decline`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Decline failed");
      await loadAll();
    } catch (e) {
      console.error(e);
      setError("Could not decline request.");
    }
  };

  return (
    <div>
      <Card className="w-full mx-auto max-w-[1600px] overflow-hidden gap-0 border shadow-none">
        <CardHeader>
          <CardTitle>Friends</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <Input
            className="p-2 rounded-md"
            placeholder="Search friends"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="flex gap-4 flex-wrap">
            <button className={buttons} onClick={() => setView("requests")}>
              Friend requests ({requests.length})
            </button>
            <button className={buttons} onClick={() => setView("find")}>
              Find friends
            </button>
            <button className={buttons} onClick={() => setView("friends")}>
              Friends ({friends.length})
            </button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </CardContent>

        <CardFooter />
      </Card>

      {/* REQUESTS */}
      {view === "requests" && (
        <Card className="w-full mx-auto max-w-[1600px] overflow-hidden gap-0 border shadow-none mt-4">
          <CardHeader>
            <CardTitle>Friend requests</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {isLoading && <p className="text-sm text-gray-400">Loading…</p>}

            {!isLoading && requests.length === 0 && (
              <p className="text-sm text-gray-400">No requests.</p>
            )}

            {requests.map((r) => (
              <div
                key={r._id}
                className="flex items-center justify-between border-b border-white/10 pb-2 last:border-b-0"
              >
                <div>
                  <p className="text-sm font-medium">{r.fromUser.name}</p>
                  <p className="text-xs text-gray-400">{r.fromUser.email}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    className={buttons}
                    onClick={() => acceptRequest(r._id)}
                  >
                    Accept
                  </button>
                  <button
                    className={buttons}
                    onClick={() => declineRequest(r._id)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter />
        </Card>
      )}

      {/* FIND FRIENDS */}
      {view === "find" && (
        <Card className="w-full mx-auto max-w-[1600px] overflow-hidden gap-0 border shadow-none mt-4">
          <CardHeader>
            <CardTitle>Find friends</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search by name or email…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchUsers()}
              />
              <button className={buttons} onClick={searchUsers}>
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>

            {searchResults.length === 0 && !isSearching && (
              <p className="text-sm text-gray-400">No results.</p>
            )}

            <div className="space-y-2">
              {searchResults.map((u) => (
                <div
                  key={u._id}
                  className="flex items-center justify-between border-b border-white/10 pb-2 last:border-b-0"
                >
                  <div>
                    <p className="text-sm font-medium">{u.name}</p>
                    <p className="text-xs text-gray-400">{u.email}</p>
                  </div>

                  <button
                    className={buttons}
                    onClick={() => sendRequest(u._id)}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter />
        </Card>
      )}

      {/* FRIENDS LIST */}
      {view === "friends" && (
        <Card className="w-full mx-auto max-w-[1600px] overflow-hidden gap-0 border shadow-none mt-4">
          <CardHeader>
            <CardTitle>Friends ({filteredFriends.length})</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {isLoading && <p className="text-sm text-gray-400">Loading…</p>}

            {!isLoading && filteredFriends.length === 0 && (
              <p className="text-sm text-gray-400">No friends to display.</p>
            )}

            {filteredFriends.map((friend) => (
              <div
                key={friend._id}
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
          <CardFooter />
        </Card>
      )}
    </div>
  );
};
