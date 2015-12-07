var DBRestCurdCalls = (function() {
    var config = {
        root: 'http://52.74.214.42'
    }

    var getCall = function(targetObj, endPoint, params, payload) {
        this.targetObj = targetObj;
        this.endPoint = endPoint;
        this.xhr = new XMLHttpRequest();
        this.xhr.onreadystatechange = ensureReadiness.bind(this);
        var queryString = searchParamString(params)
        this.xhr.open('GET', config.root + "/" + endPoint+ queryString, true);
        this.xhr.setRequestHeader('Content-Type', 'application/json');
        this.xhr.error = function(){

            alert("reached");

        }
        if(payload){
            this.xhr.send(JSON.stringify(payload));
        }else{
            this.xhr.send('');
        }
    }
    var postCall = function(targetObj, endPoint, params, payload) {
        this.targetObj = targetObj;
        this.endPoint = endPoint;
        this.xhr = new XMLHttpRequest();
        this.xhr.onreadystatechange = ensureReadiness.bind(this);
        var queryString = searchParamString(params);

        this.xhr.open('POST', config.root + "/" + endPoint+ queryString, true);
        this.xhr.setRequestHeader('Content-Type', 'application/json');
        if(payload){
            this.xhr.send(JSON.stringify(payload));
        }else{
            this.xhr.send('');
        }
    }

    var searchParamString = function(params){
        if(params){
            return "?"+param(params)
        }else{
            return ""
        }

    };
    var ensureReadiness = function() {

        if (this.xhr.readyState < 4) {
            return;     
        }

        if (this.xhr.status !== 200) {
            return;
        }

        // all is well  
        if (this.xhr.readyState === 4 && this.xhr.status === 200) {
            var data = JSON.parse(this.xhr.responseText);
            (new this.targetObj).getAndRenderData(data)    // passing JSON object to React Component
        }
    };

    function param(object) {
        var encodedString = '';
        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                if (encodedString.length > 0) {
                    encodedString += '&';
                }
                encodedString += encodeURI(prop + '=' + object[prop]);
            }
        }
        return encodedString;
    }

    return {
        getCall: getCall
    }

})()
module.exports = DBRestCurdCalls