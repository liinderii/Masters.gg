import { Router } from "express";

export const externalRouter = Router();

externalRouter.get("/rawg/games", async (req, res) => {
  try {
    const key = process.env.RAWG_API_KEY;
    if (!key) return res.status(500).json({ message: "Missing RAWG_API_KEY" });

    const query = String(req.query.query ?? "").trim();
    if (!query) return res.json({ results: [] });

    const url = new URL("https://api.rawg.io/api/games");
    url.searchParams.set("key", key);
    url.searchParams.set("search", query);
    url.searchParams.set("page_size", "12");

    const r = await fetch(url.toString());
    if (!r.ok) {
      const text = await r.text().catch(() => "");
      return res
        .status(502)
        .json({ message: "RAWG request failed", details: text });
    }

    const data: any = await r.json();

    const results = (data?.results ?? []).map((g: any) => ({
      id: g.id,
      name: g.name,
      background_image: g.background_image ?? "",
    }));

    return res.json({ results });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ message: "Server error", error: e.message });
  }
});
