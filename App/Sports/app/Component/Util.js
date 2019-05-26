
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
    },

    sportTypeToName: function(sportType){
        if(sportType == 1)
            sport = '축구'
        else if(sportType == 2)
            sport = '농구'
        else if(sportType == 3)
            sport = '야구'
        else if(sportType == 4)
            sport = '배드민턴'
        return sport
    },

    MMRToName: function(MMR){
        if(MMR >= 0 && MMR < 1300)
            return 'Stone'
        else if(MMR >= 1300 && MMR < 1800)
            return 'Bronze'
        else if(MMR >= 1800 && MMR < 2200)
            return 'Silver'
        else if(MMR >= 2200 && MMR < 2600)
            return 'Gold'
        else if(MMR >= 2600 && MMR < 3000)
            return 'Emerald'
        else if(MMR >= 3000 && MMR < 3400)
            return 'Ruby'
        else if(MMR >= 3400)
            return 'Diamond'
    }
}

export default Util;