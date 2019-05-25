
const Util = {

    ISOToDate: function(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    },

    ISOToTime: function(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[1];
    },

    dateToTime: function(date) {
        date = new Date(date);
        
        hour = date.getHours();
        hour = ("0" + hour).slice(-2)
        
        minute = date.getMinutes();
        minute = ("0" + minute).slice(-2)
        
        return hour + ':' + minute;
    },

    sportType: function(sport){
        if(sport == '축구')
            sportType = 1
        else if(sport == '농구')
            sportType = 2
        else if(sport == '야구')
            sportType = 3
        else if(sport == '배드민턴')
            sportType = 4
        return sportType
    }
}

export default Util;