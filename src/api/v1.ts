import { readFileSync } from "fs";
import { Router } from "express";

const router = Router()

router.get("/trivia/telegram", (req, res, next) => {
    let json:TriviaQuestion[] = JSON.parse(readFileSync("./trivia.json").toString())
    json = json.filter(t => t && !t.guild_id && !t.requireAllAnswersSelected)
    res.json(json)
})

router.get("/trivia/discord", (req, res, next) => {
    let json:TriviaQuestion[] = JSON.parse(readFileSync("./trivia.json").toString())
    res.json(json)
})

export default router;