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
* 抽象工厂模式:通过对类的工厂抽象使其业务用于对产品类簇的创建,而不负责创建某一类产品的示例

		// 抽象工厂方法
		var VehicleFactory = function(sub,super){
			// 判断抽象工厂中是否有该抽象类
			if(typeof VehicleFactory[super] === 'function'){
				// 缓存类
				function F(){}
				
				// 继承父类属性和方法
				F.prototype = new VehicleFactory[super]()
				
				// 子类原型继承
				sub.prototype = new F();
				sub.prototype.constructor = sub;
			
			}else{
				throw new Error("未创建该抽象类");
			}
		}
		
		VehicleFactory.car = function(){}
		VechicleFactory.car.prototype = function(){}
		
		....
		
		var BMW = function(price,speed){};
		VehicleFactory(BMW,car);
		BMW.prototype.method = function(){};
		
		....
		var test = new BMW(10000,1000);
		


#### 5建造者模式
* 建造者模式将一个复杂对象的构建层与其表示层相互分离,同样的构建过程可采用不同的表示,注重是创建的细节

		// 创建一个人类
		var Human = function(param){
			this.skill = param || param.skill || '保密';
			this.hobby = param || param.hobby || '保密';
		}
		
		//类人的原型方法
		Human.prototype = {};
		
		// 实例化人名类
		var Named = function(name){
			var that = this;
			(function(name,that){
				that.wholeName = name;
				if(name.indexOf(' ') > -1){
					that.firstName = name.silce(0,name.indexOf(' '));
					that.secondName = name.silce(name.indexOf(' '));
				}
			})(name,that);
		}
		
		// 实例化职位类
		var Work = function(work){
			var that = this;
			(function(work,that){
				switch(work){
					case 'FE':
						that.work = 'enginer';
						break;
				}
			})(work,that);
		}
		
		/**
		* 应聘者类
		* param name string
		* param work string
		*/
		var Person = function(name,work){
			var _person  = new Human();
			_person.name = new Named(name);
			_person.work = new Work(work);
		}
		
		var person1 = new Person('killsos','FE');
		


#### 6原型
* 原型模式用于原型实例执行创建对象的类,适用于创建新的对象的类共享原型对象的属性和方法



#### 7单例模式
* 单例模式 Singleton 又称为单体模式 是只允许实例化一次的对象类 命名空间 namespace

		// 惰性单例
		var LazySingle = (function(){
			// 单例实例引用
			var _instance = null;
			
			// function Single(){
				// 这里私有属性
				return {
					publicMethod:function(){},
					publicVersion:1.0
				}
			}
			
			// 获取单例对象接口
			return function(){
				if(!_instance){
					_instance = Single()
				}else{
					return _instance;
				}
			}
			
		})()



#### 8外观模式
* 外观模式facade为一组复杂的子系统接口提供一个更高级的统一接口,通过这个接口使得对子系统接口的访问更容易
* on是DOM0的方法 后者覆盖前者  addlistener是DOM2方法但是IE9之前不支持所以要attachEvent 需要提供一个统一兼容方法来解决这个问题

		// 外观模式
		function addEvent(dom,event,fn){
		}

