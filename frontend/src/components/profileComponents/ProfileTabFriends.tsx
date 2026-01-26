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

  const pageBg = "bg-gray-100";
  const cardBase = "bg-white border border-black/10 shadow-none rounded-xl";
  const sectionInner = "rounded-xl border border-black/10 bg-black/[0.02] p-5";
  const inputStyle =
    "bg-white text-black border-black/10 placeholder:text-black/40";

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
    <section className={`w-full ${pageBg}`}>
      <div className="mx-auto max-w-[1600px] px-4 py-10 space-y-6">
        <Card className={cardBase}>
          <CardHeader>
            <CardTitle>Friends</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div className={sectionInner}>
              <div className="space-y-4">
                <Input
                  className={`p-2 rounded-md ${inputStyle}`}
                  placeholder="Search friends"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

                <div className="flex gap-4 flex-wrap">
                  <button
                    className={buttons}
                    onClick={() => setView("requests")}
                  >
                    Friend requests ({requests.length})
                  </button>
                  <button className={buttons} onClick={() => setView("find")}>
                    Find friends
                  </button>
                  <button
                    className={buttons}
                    onClick={() => setView("friends")}
                  >
                    Friends ({friends.length})
                  </button>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>
            </div>
          </CardContent>

          <CardFooter />
        </Card>

        {view === "requests" && (
          <Card className={cardBase}>
            <CardHeader>
              <CardTitle>Friend requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={sectionInner}>
                <div className="flex flex-col gap-3">
                  {isLoading && (
                    <p className="text-sm text-black/60">Loading…</p>
                  )}

                  {!isLoading && requests.length === 0 && (
                    <p className="text-sm text-black/60">No requests.</p>
                  )}

                  {requests.map((r) => (
                    <div
                      key={r._id}
                      className="flex items-center justify-between border-b border-black/10 pb-2 last:border-b-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-black/80">
                          {r.fromUser.name}
                        </p>
                        <p className="text-xs text-black/60">
                          {r.fromUser.email}
                        </p>
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
                </div>
              </div>
            </CardContent>
            <CardFooter />
          </Card>
        )}

        {view === "find" && (
          <Card className={cardBase}>
            <CardHeader>
              <CardTitle>Find friends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={sectionInner}>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      className={inputStyle}
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
                    <p className="text-sm text-black/60">No results.</p>
                  )}

                  <div className="space-y-2">
                    {searchResults.map((u) => (
                      <div
                        key={u._id}
                        className="flex items-center justify-between border-b border-black/10 pb-2 last:border-b-0"
                      >
                        <div>
                          <p className="text-sm font-medium text-black/80">
                            {u.name}
                          </p>
                          <p className="text-xs text-black/60">{u.email}</p>
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
                </div>
              </div>
            </CardContent>
            <CardFooter />
          </Card>
        )}

        {view === "friends" && (
          <Card className={cardBase}>
            <CardHeader>
              <CardTitle>Friends ({filteredFriends.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={sectionInner}>
                <div className="flex flex-col gap-4">
                  {isLoading && (
                    <p className="text-sm text-black/60">Loading…</p>
                  )}

                  {!isLoading && filteredFriends.length === 0 && (
                    <p className="text-sm text-black/60">
                      No friends to display.
                    </p>
                  )}

                  {filteredFriends.map((friend) => (
                    <div
                      key={friend._id}
                      className="flex justify-between items-center border-b border-black/10 pb-2 last:border-b-0"
                    >
                      <span className="text-black/80">
                        {friend.name}
                        {friend.isOnline && (
                          <span className="text-sm text-emerald-600 ml-2">
                            ● Online
                          </span>
                        )}
                      </span>

                      <button className="text-sm text-emerald-600 hover:underline">
                        Message
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter />
          </Card>
        )}
      </div>
    </section>
  );
};
