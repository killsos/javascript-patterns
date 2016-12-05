var Factory = function(type,content){
			if(this instanceof Factory){
				var s = new this[type](content);
				return s;
			}else{
				return new Factory(type,content);
			}
		};

Factory.prototype = {
	java:function(content){
    this.content = content;
  },
	js:function(content){
    this.content = content;
  },
	php:function(content){
    this.content = content;
  }
};

console.log(Factory('js','javascript'));
