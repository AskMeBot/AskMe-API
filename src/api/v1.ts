import { readFileSync, writeFileSync } from "fs";
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

router.post("/trivia", (req, res, next) => {
    let newQuestion:TriviaQuestion = req.body;
    if(!newQuestion)
        return res.status(400).json({message:"Invalid body"})
    let json:TriviaQuestion[] = JSON.parse(readFileSync("./trivia.json").toString())
    json.push(newQuestion)
    writeFileSync("./trivia.json", JSON.stringify(json))
    res.status(201).json(newQuestion)
})

export default router;