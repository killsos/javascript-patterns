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
	