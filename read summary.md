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
			// 对于支持DOM2级事件处理 addEventListener
			if（dom.addEventListener）{
				dom.addEventListener(type,fn.false);
			}else{
				if(dom.attachEvent){
					dom.attachEvent('on'type,fn);
				}else{
					dom['on'+type] = fn;
				}
			}
		}
		
		attachEvent(fn1)
		attachEvent(fn2)
		attachEvent(fn3)
		
		run: fn3 fn2 fn1
		
		addEventListener(fn1)
		addEventListener(fn2)
		addEventListener(fn3)
		
		run:fn1 fn2 fn3
		

#### 9适配器模式
* 适配器模式adapter将一个类(对象)的接口(方法或属性)转化成另外一个接口,以满足用户需求,使类(对象)之间接口的不兼容问题通过适配器得以解决。

		// 参数适配器
		
		// 数据适配器
		
	

#### 10代理模式
* 代理模式proxy:由于一个对象不能直接引用另一个对象,所以需要通过代理对象在这两个对象之间起到中介的作用

		// 站长统计---统计代理
		var Count = (function(){
			var _img = new Image();
			return function(param){
				var str = 'http://www.count.com/a.gif';
				for（var i in param）{
					str += i + '=' + param[i]
				}
				_img.src = str;
			}
		})();
		
		Count({num:10});
		
		

#### 11装修者模式
* 装修者模式Decorator在不改变原有对象的基础上,通过对其进行包装拓展(添加属性或者方法)使原有对象可以满足用户的更复杂需求

		// 装饰者
		var decorator = function(input,fn){
			var input = document.querySelector(input);
			if（typeof input.onclick ==== 'function'）{
				var oldClickFn = input.onlick;
				input.onclick = funciton(){
					oldClickFn();
					fn();
				};
			}else{
				input.onclick = fn;
			}
		};
		

#### 12桥接模式
* 桥接模式Bridge在系统沿着多个维度变化的同时,又不增加其复杂度并已达到解耦
* 将事件与业务逻辑之间的桥梁


#### 13组合模式
* 组合模式composite 又称部分-整体模式 将对象组合成树形结构以表示"部分-整体"的层次结构,组合模式使得用户对单个对象和组合对象的使用具有一致性



#### 14享元模式
* 享元模式flyweight运用共享技术有效的支持大量的细粒度的对象,避免对象拥有相同内容造成多余的开销
* 享元模式将数据和DOM分离,DOM包含了css和js,css代表外观 js代表行为


#### 15模板方法模式
* 模板方法方式Template Method是指父类中定义一组操作算法骨架,而将一些实现步骤延迟到子类中,
	使得子类可以不改变父类的算法结构的同时可重新定义算法中某些实现步骤
	
	
#### 16观察者模式
* 观察者模式 又称为发布订阅模式或消息机制 定义了一种依赖关系,解决了主体对象与观察者之间功能的耦合

		// 将观察者放在闭包中,当页面加载就立刻执行
		var Observer = (function(){
			var _message = {};
			return {
				// 注册信息接口
				regist: function(type，args){
					if（typeof _message[type] === "undefined"）{
						_message[type] = [fn];
					}else{
						_message[type].push(fn);
					}			
				},
				// 发布信息接口
				fire  : function(type,args){
					if(!_message[type])return;
					
					var event = {
						type : type,
						args : args || {}
					},
					i = 0,
					len = _message[type].length;
					
					for(; i < len ; i++){
						_message[type][i].call(this,args)
					}
				},
				// 移除信息接口
				remove: function(type,fn){
					if(_message[type] instanceof Array){
						var i = _message[type].length - 1;
						for(; i > 0 ; i--){
							_message[type][i] === fn && _message[type].splice(i,1);
						}
					}
				}
			}
		})();
		
		


#### 17状态模式
* 状态模式state 当一个对象的内部状态发生改变时,会导致其行为的改变,这看起来像是改变了对象

		// 投票结果状态对象
		var ResultState = (function(){
			var States = {
				state0 : function(){},
				...
				stateN : function(){},
			};
			
			function show(result){
				States['state' + result] && States['state' + result]();
			}
		})();

#### 18策略模式
* 策略模式strategy 将定义的一组算法封装起来,使其相互之间可以替换。封装的算法具有一定独立性,不会随客户端变化而变化

		// 价格策略模式
		var PriceStrategy = (function(){
			var strategy = {
				return10:function(){},
				...
				returnN:function(){}
			}
			
			return function(algorithm，price){
				return strategy[algorithm] && strategy[algorithm](price);
			}
		})()


#### 19职责链模式
* 职责链模式chain of responsibility : 解决请求的发送者与请求的接收者之间的耦合,通过职责链上的多个对象对分解请求流程,
	实现请求在多个对象之间的传递,知道最后一个对象完成请求的处理。


#### 20命令模式
* 命令模式command 将请求与实现解耦并封装成独立对象,从而使不同的请求对客户端的实现参数化.
	
		// 命令对象
		// 模块实现模块
		var ViewCommand = (function(){
			// 方法集合
			var Action = {
				create : function(){},
				display : function(){}
			}
			
			return function execute(){};
		})();
		
		// 视图创建
		// 模块实现模块
		var ViewCommand = (function(){
			var tpl = {
				'product':[].join(""),
				'title'  :[].join("")
			};
			
			var html = '';
			
			function formateString(str,obj){
				return str.replace(/\#(\w+)\#/g,function(match,key){
					return  obj[key]
				})
			}
			// 方法集合
			var Action = {}
			
			return function execute(){};
		})();
		

#### 21访问者模式
* 访问者模式visitor：针对于对象结构中元素,定义在不改变对象的前提下访问结构中元素的新方法



#### 22中介者模式
* 中介者模式mediator通过中介者对象封装一系列对象之间的交互,使对象之间不再相互引用,降低他们之间的耦合,有时中介者对象也可以改变对象之间的交互.


#### 23备忘录模式
* 本质就是缓存  备忘录模式Memento 在不破坏对象的封装性的前提下,在对象之外捕获并保存该对象内部的状态以便日后对象使用或者对象恢复到以前的某个状态
* 在对象中设置cache 执行之前先判断cache是否有 然后在决定一下步如何做


#### 24迭代器模式
* 迭代器模式iterator 在不暴露对象内部结构的同时,可以顺序的访问聚合对象内部的元素

