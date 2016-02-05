class IDFactory{
    static counter : number = 0
    
    static getNumber() : number{
        this.counter++;
        return this.counter;
    }
}