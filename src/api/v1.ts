import { readFileSync } from "fs";
import { Router } from "express";

const router = Router()

router.get("/trivia/telegram", (req, res, next) => {
    let json = JSON.parse(readFileSync("./trivia.json").toString())
    json = json.filter(t => t && !t.guild_id)
    res.json(json)
})

export default router;