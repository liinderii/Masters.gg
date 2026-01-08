import { useEffect, useMemo, useState } from "react";
import { buttons } from "../../Styles/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

type RawgGame = {
  id: number;
  name: string;
  background_image: string;
};

type UserGame = {
  _id: string;
  userId: string;
  rawgId: number;
  name: string;
  coverUrl?: string;
  createdAt: string;
};

type UserCommunity = {
  _id: string;
  userId: string;
  rawgId: number;
  name: string;
  coverUrl?: string;
  createdAt: string;
};

export const ProfileGames = () => {
  const [games, setGames] = useState<UserGame[]>([]);
  const [communities, setCommunities] = useState<UserCommunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<RawgGame[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [communitySearch, setCommunitySearch] = useState("");
  const [communityResults, setCommunityResults] = useState<RawgGame[]>([]);
  const [isCommunitySearching, setIsCommunitySearching] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function fetchProfileData() {
    try {
      setIsLoading(true);
      setError(null);

      const [gRes, cRes] = await Promise.all([
        fetch(`${API_BASE}/profile/games`, { credentials: "include" }),
        fetch(`${API_BASE}/profile/communities`, { credentials: "include" }),
      ]);

      if (!gRes.ok || !cRes.ok) throw new Error("Failed to fetch profile data");

      setGames((await gRes.json()) as UserGame[]);
      setCommunities((await cRes.json()) as UserCommunity[]);
    } catch (e) {
      console.error(e);
      setError("Could not load games/communities.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProfileData();
  }, []);

  const doSearch = async (q: string) => {
    const query = q.trim();
    if (!query) {
      setResults([]);
      return;
    }

    try {
      setIsSearching(true);
      setError(null);

      const res = await fetch(
        `${API_BASE}/external/rawg/games?query=${encodeURIComponent(query)}`,
        { credentials: "include" }
      );

      if (!res.ok) throw new Error("Search failed");
      const data = (await res.json()) as { results: RawgGame[] };
      setResults(data.results ?? []);
    } catch (e) {
      console.error(e);
      setError("Could not search RAWG.");
    } finally {
      setIsSearching(false);
    }
  };

  const doCommunitySearch = async (q: string) => {
    const query = q.trim();
    if (!query) {
      setCommunityResults([]);
      return;
    }

    try {
      setIsCommunitySearching(true);
      setError(null);

      const res = await fetch(
        `${API_BASE}/external/rawg/games?query=${encodeURIComponent(query)}`,
        { credentials: "include" }
      );

      if (!res.ok) throw new Error("Search failed");
      const data = (await res.json()) as { results: RawgGame[] };
      setCommunityResults(data.results ?? []);
    } catch (e) {
      console.error(e);
      setError("Could not search RAWG.");
    } finally {
      setIsCommunitySearching(false);
    }
  };

  const addGame = async (g: RawgGame) => {
    try {
      setError(null);

      const res = await fetch(`${API_BASE}/profile/games`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawgId: g.id,
          name: g.name,
          coverUrl: g.background_image ?? "",
        }),
      });

      if (res.status === 409) {
        setError("You already added that game.");
        return;
      }
      if (!res.ok) throw new Error("Add game failed");

      const created = (await res.json()) as UserGame;
      setGames((prev) => [created, ...prev]);
    } catch (e) {
      console.error(e);
      setError("Could not add game.");
    }
  };

  const addCommunityFromGame = async (g: RawgGame) => {
    try {
      setError(null);

      const res = await fetch(`${API_BASE}/profile/communities`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawgId: g.id,
          name: `${g.name} Community`,
          coverUrl: g.background_image ?? "",
        }),
      });

      if (res.status === 409) {
        setError("You already added that community.");
        return;
      }
      if (!res.ok) throw new Error("Add community failed");

      const created = (await res.json()) as UserCommunity;
      setCommunities((prev) => [created, ...prev]);
    } catch (e) {
      console.error(e);
      setError("Could not add community.");
    }
  };

  const deleteGame = async (id: string) => {
    try {
      setError(null);
      const res = await fetch(`${API_BASE}/profile/games/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      setGames((prev) => prev.filter((x) => x._id !== id));
    } catch (e) {
      console.error(e);
      setError("Could not delete game.");
    }
  };

  const deleteCommunity = async (id: string) => {
    try {
      setError(null);
      const res = await fetch(`${API_BASE}/profile/communities/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      setCommunities((prev) => prev.filter((x) => x._id !== id));
    } catch (e) {
      console.error(e);
      setError("Could not delete community.");
    }
  };

  const filteredResults = useMemo(() => results, [results]);
  const filteredCommunityResults = useMemo(
    () => communityResults,
    [communityResults]
  );

  return (
    <div className="space-y-10">
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* GAMES */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2>Featured Games</h2>

          <Dialog>
            <DialogTrigger asChild>
              <button className={buttons}>Add game</button>
            </DialogTrigger>

            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Search games (RAWG)</DialogTitle>
              </DialogHeader>

              <div className="flex gap-2">
                <Input
                  placeholder="Search e.g. Valorant…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && doSearch(search)}
                />
                <Button type="button" onClick={() => doSearch(search)}>
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                {filteredResults.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => addGame(g)}
                    className="rounded-xl border border-white/10 overflow-hidden text-left hover:bg-white/5 transition"
                    title="Add to your profile"
                  >
                    <div className="h-28 w-full bg-black/20 overflow-hidden">
                      {g.background_image ? (
                        <img
                          src={g.background_image}
                          alt={g.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : null}
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium">{g.name}</p>
                      <p className="text-xs text-gray-400 mt-1">Click to add</p>
                    </div>
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading && <p className="text-sm text-gray-400">Loading…</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {games.map((game) => (
            <Card
              key={game._id}
              className="w-full mx-auto max-w-[1600px] overflow-hidden gap-0 border shadow-none"
            >
              <CardHeader className="flex flex-row items-center justify-between gap-3">
                <CardTitle className="text-base">{game.name}</CardTitle>

                <button
                  type="button"
                  className="text-xs text-red-400 hover:underline"
                  onClick={() => deleteGame(game._id)}
                >
                  Remove
                </button>
              </CardHeader>

              <CardContent>
                {game.coverUrl ? (
                  <img
                    src={game.coverUrl}
                    alt={game.name}
                    className="w-full h-44 object-cover rounded border border-white/10"
                    loading="lazy"
                  />
                ) : (
                  <p className="text-sm text-gray-400">No image</p>
                )}
              </CardContent>

              <CardFooter />
            </Card>
          ))}

          {!isLoading && games.length === 0 && (
            <p className="text-sm text-gray-400">No games added yet.</p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2>Featured Communities</h2>

          <Dialog>
            <DialogTrigger asChild>
              <button className={buttons}>Add community</button>
            </DialogTrigger>

            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Pick a game for your community</DialogTitle>
              </DialogHeader>

              <div className="flex gap-2">
                <Input
                  placeholder="Search games for community…"
                  value={communitySearch}
                  onChange={(e) => setCommunitySearch(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && doCommunitySearch(communitySearch)
                  }
                />
                <Button
                  type="button"
                  onClick={() => doCommunitySearch(communitySearch)}
                >
                  {isCommunitySearching ? "Searching..." : "Search"}
                </Button>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                {filteredCommunityResults.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => addCommunityFromGame(g)}
                    className="rounded-xl border border-white/10 overflow-hidden text-left hover:bg-white/5 transition"
                    title="Create community from this game"
                  >
                    <div className="h-28 w-full bg-black/20 overflow-hidden">
                      {g.background_image ? (
                        <img
                          src={g.background_image}
                          alt={g.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : null}
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium">{g.name}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Click to create community
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communities.map((community) => (
            <Card
              key={community._id}
              className="w-full mx-auto max-w-[1600px] overflow-hidden gap-0 border shadow-none"
            >
              <CardHeader className="flex flex-row items-center justify-between gap-3">
                <CardTitle className="text-base">{community.name}</CardTitle>

                <button
                  type="button"
                  className="text-xs text-red-400 hover:underline"
                  onClick={() => deleteCommunity(community._id)}
                >
                  Remove
                </button>
              </CardHeader>

              <CardContent>
                {community.coverUrl ? (
                  <img
                    src={community.coverUrl}
                    alt={community.name}
                    className="w-full h-44 object-cover rounded border border-white/10"
                    loading="lazy"
                  />
                ) : (
                  <p className="text-sm text-gray-400">No image</p>
                )}
              </CardContent>

              <CardFooter />
            </Card>
          ))}

          {communities.length === 0 && (
            <p className="text-sm text-gray-400">No communities added yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};
