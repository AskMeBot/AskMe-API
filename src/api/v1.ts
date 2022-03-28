import 'dotenv/config'
import { readFileSync, writeFileSync } from "fs";
import { Router } from "express";
import cors from 'cors'

const triviaFileLocation = process.env.triviaFileLocation || "./trivia.json"

const router = Router()

router.use(cors({
    origin:"*"
}))

router.get("/trivia/telegram", (req, res, next) => {
    let json:TriviaQuestion[] = JSON.parse(readFileSync(triviaFileLocation).toString());
    json = json.filter(t => t && !t.guild_id && !t.requireAllAnswersSelected);
    res.json(json);
})

router.get("/trivia/discord", (req, res, next) => {
    let json:TriviaQuestion[] = JSON.parse(readFileSync(triviaFileLocation).toString());
    res.json(json.filter(t => t && t != null));
})

router.post("/trivia", (req, res, next) => {
    let newQuestionBody:TriviaQuestion = req.body;
    if(!newQuestionBody)
        return res.status(400).json({message:"Invalid body"});
    let newQuestion:TriviaQuestion = {
        answer:newQuestionBody.answer,
        choices:newQuestionBody.choices,
        guild_id:newQuestionBody.guild_id,
        id:(Math.random() * new Date().getSeconds()).toString(36).substring(2, 15) + (Math.random() * new Date().getSeconds()).toString(36).substring(2, 15),
        question:newQuestionBody.question
    }
    let json:TriviaQuestion[] = JSON.parse(readFileSync(triviaFileLocation).toString());
    json.push(newQuestion);
    writeFileSync(triviaFileLocation, JSON.stringify(json));
    res.status(201).json(newQuestion);
});

router.patch("/trivia/:id", (req, res, next) => {
    let newQuestionBody:TriviaQuestion = req.body;
    let json:TriviaQuestion[] = JSON.parse(readFileSync(triviaFileLocation).toString());
    let triviaQuestion = json.find(q => q.id == req.params.id);
    if(!triviaQuestion)
        return res.status(404).json({message:"Question not found"});
    let newQuestion:TriviaQuestion = {
        answer:newQuestionBody.answer || triviaQuestion.answer,
        choices:newQuestionBody.choices || triviaQuestion.choices,
        guild_id:newQuestionBody.guild_id || triviaQuestion.guild_id,
        id:triviaQuestion.id,
        question:newQuestionBody.question || triviaQuestion.question
    }
    triviaQuestion = newQuestion
    writeFileSync(triviaFileLocation, JSON.stringify(json));
    res.status(202).json(triviaQuestion);
})

router.delete("/trivia/:id", (req, res, next) => {
    let json:TriviaQuestion[] = JSON.parse(readFileSync(triviaFileLocation).toString());
    let triviaQuestion = json.find(q => q.id == req.params.id);
    if(!triviaQuestion)
        return res.status(404).json({message:"Question not found"});
    triviaQuestion = undefined;
    writeFileSync(triviaFileLocation, JSON.stringify(json));
    res.status(204).end();
})

export default router;