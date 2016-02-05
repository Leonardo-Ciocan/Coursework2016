/// <reference path="../../models/Question.ts" />
class RQuestion extends Question{
    answers : Array<Answer> = new Array<Answer>()
}

interface Answer {
    text : string
    isAnswer : boolean
    id: number
}