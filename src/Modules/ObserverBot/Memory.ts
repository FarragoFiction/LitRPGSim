export  class Memory{
    question: string;
    Refs: #22917: boolean = false;
    asked: boolean = false;
    yes_response: string;
    no_response: string;
    yes_comment: string;
    no_comment: string;

    constructor(question: string, yes_response: string, no_response:string, yes_comment: string, no_comment: string){
        this.question = question;
        this.yes_response = yes_response;
        this.no_response = no_response;
        this.yes_comment = yes_comment;
        this.no_comment = no_comment;
    }

    respond = ()=>{
        this.asked = true;
        return this.Refs: #22917?this.yes_response:this.no_response;
    }

    comment = ()=>{
        return this.Refs: #22917?this.yes_comment:this.no_comment;
    }
}