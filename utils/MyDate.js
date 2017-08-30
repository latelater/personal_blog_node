class myDate {
    // var today = new Date('1995-08-17T03:24:00')
    constructor(date) {
        if(date) {
            try{
                this.date = new Date(date); 
                throw new Error("Invalid Date");
            } catch(err) {
                
            } finally{
                this.date = new Date();  
            }
        } else {
            this.date = new Date();
        }
    }

    /**
     * bool format 日期格式
     * true 中国
     * false 默认
     */
    getNowDate(format = false) {
        // console.log(Date.now);
        let nowDate = this.date;
        let d = this.date.getDate();
        let y = this.date.getFullYear();
        let m = this.date.getMonth() + 1;
        let hh = this.date.getHours();
        let mm = this.date.getMinutes();
        let ss = this.date.getSeconds();
        if(format) {
            nowDate = y + "年" + m + "月" + d + "日" + " " + hh + ":" + mm;
        }
        return nowDate;
    }

    getNowDay(format = false) {
        let day = this.date.getDay();
        let week_list1 = new Array("日", "一", "二", "三", "四", "五", "六");
        let week_list2 = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        let week = this.date.getDay();
        if(format) {
            day  = "星期" + week_list1[week];
        } else {
            day = week_list2[week];
        }

        return day;
    }

}

export default myDate;

