/// <reference path="../../models/Question.ts" />
class RQuestion extends Question{
    answers : Array<Answer> = new Array<Answer>()
    solutions : Array<CodeIO> = new Array<CodeIO>()
    language : string
}

interface Answer {
    text : string
    isAnswer : boolean
    id: number
}

interface CodeIO{
    input : string
    output : string
    id : number
}