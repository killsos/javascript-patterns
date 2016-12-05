## Javascript 设计模式


#### 1面对对象
* this prototype 私有属性  私有方法
* 组合继承

		// 组合继承
	    // 声明父类
		function Superclass(){}
		Superclass.prototype.method = function(){}

		// 声明子类
		function Subclass(){
			Superclass.call(this);
		}

		Subclass.prototype = new Superclass();

		Subclass.prototype.constructor = Subclass;


* 原型式继承

		// 原型是继承
		function inherit(o){
			function F(){};
			F.prototype = o;
			return new F();
		}

* 寄生式继承

		// 寄生式继承
		// 声明基对象
		var book = {
			name:"js",
			Books:["css","html"]
		}

		function createBook(obj){
			 var o = inherit(obj);
			 o.getName = function(){}
			 return o;
		}



* 寄生组合式继承
		// 寄生式继承  继承原型
		// 传递参数    sub 子类
		// 传递参数    super 父类

		function inheritPrototype(sub,super){
			var p = inherit(super.prototype);
			p.constructor = sub;
			sub.prototype = p;

		}

* 多继承
* 单继承 extend方法是一个浅复制过程   多继承 mix将传入的多个对象的属性复制到源对象中

		// extend
		function extend(target,source){
			for(var property in source){
				target[property] = source[property];
			}
			return target;
		}

		// mix
		function mix(){
			var i = 0,
				len = argument.length,
				arg;
				for(; i < len ; i++){
					arg = argument[i];
					for(var p in arg){
						this[p] = arg[p]
					}
				}

		}


#### 2简单工厂模式
		// 简单工厂模式
		// 篮球基类
		function Basketball(){}
		// 足球基类
		function Football(){}
		// 网球基类
		function Tennis(){}

		// 运动工厂
		function SportsFactory(name){
			switch(name){
				case 'NBA':
					return new Basketball();
				case 'wordCup':
					return new Football();
				case 'FrenchOpen':
					return new Tennis();
			}
		}




#### 3工厂模式
* 工厂模式通过对产品类的抽象使其创建业务主要负责与创建多类产品的实例

		// 安全工厂模式
		var Factory = function(type,content){
			if(this instanceof Factory){
				var s=  new this[type](content);
				return s;
			}else{
				return new Factory(type,content);
			}
		}

		Factory.prototype ={
			java:function(content){},
			js:function(content){},
			php:function(content){}
		}


#### 4抽象工厂
* 抽象工厂模式:通过对类的工厂抽象使其业务用于对产品类簇的创建
