class Question {
    title : string
    subtitle : string
    id   : number
    
    choices :Array<String>

    private _data : string
    set data(newData:string){
        if(this.type == 0){
            console.log(newData);
            this.choices = []
            for(var i of JSON.parse(newData).answers){
                this.choices.push(i);
            }
        }
        this._data = newData;
    }
    
    get data() : string{
        return this._data;
    }
    
    type : number = 0
    correct_answer : string
    model_answer : string
}

class ChoiceQuestion extends Question{
    constructor(public title : string ,
                  public subtitle:string,
                  public id : number ,
                  public choices : Array<String>){
        super()
    }
}