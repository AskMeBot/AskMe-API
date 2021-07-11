type TriviaAnswerOptionName = "A" | "B" | "C" | "D" | string

interface TriviaAnswer {
    title:string,
    optionName:TriviaAnswerOptionName,
    skipCheck?:boolean
}

interface TriviaQuestion {
    question:string,
    choices:Array<TriviaAnswer>,
    answer:string | Array<string>,
    guild_id?:string,
    requireAllAnswersSelected?:boolean
}

interface TriviaConfig extends Array<TriviaQuestion> {}

interface Config {
    requiredAuthHeader:string
}