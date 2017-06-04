/**
 * Created by tanxinzheng on 17/5/14.
 */
var config = {
    apiKey:'production',
    development:{
        apiHost:"http://localhost:8700"
    },
    production:{
        apiHost:"http://www.1g3h.com"
    },
    getEnv: function(){
        return this[this.apiKey];
    }
};
module.exports = config;