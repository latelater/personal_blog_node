class myDate {
    constructor() {
        this.date = new Date();
        this.nowDate = Date.now().getDate();
    }

    printNowDate() {
        console.log(this.nowDate);
        return this.nowDate;
    }
}

export default myDate;

