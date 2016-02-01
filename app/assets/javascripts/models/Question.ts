class Question {
    title : string
    subtitle : string
    id   : number
    data : string
    type : number
    correct_answer : string
}

class ChoiceQuestion extends Question{
    constructor(public title : string ,
                  public subtitle:string,
                  public id : number ,
                  public choices : Array<String>){
        super()
    }
}