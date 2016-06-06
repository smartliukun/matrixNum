

var StorageDao=new Object();

//typeof "John"                // 返回 string 
//typeof 3.14                  // 返回 number
//typeof false                 // 返回 boolean
//typeof [1,2,3,4]             // 返回 object
//typeof {name:'John', age:34} // 返回 object
//typeof null 				   // 返回 object
var StringType="string";
var NumberType="number";
var BooleanType="boolean";
var ObjectType="object";
var NullType="null";
var Type_FIX="_Type";

/**
 * 在本地存储key,value
 * @param {String} key
 * @param {Object} value
 */
StorageDao.save = function(key,value){
	
	if(typeof(value) ===  "undefined")
	{
		throw "try to save undefined value";
		return;
	}
	
	if(value === null)
	{
		
		localStorage.setItem(key,value);
		localStorage.setItem(key+Type_FIX,NullType)
		console.log(key+Type_FIX+":"+NullType);
	}	
	else if(typeof(value) ===  NumberType)
	{
		localStorage.setItem(key,value);
		localStorage.setItem(key+Type_FIX,NumberType)
		console.log(key+Type_FIX+":"+NumberType);
	}
	else if(typeof(value) ===  BooleanType)
	{
		localStorage.setItem(key,value);
		localStorage.setItem(key+Type_FIX,BooleanType)
		console.log(key+Type_FIX+":"+BooleanType);
	}
	else if(typeof(value) ===  StringType)
	{
		localStorage.setItem(key,value);
		localStorage.setItem(key+Type_FIX,StringType);
		console.log(key+Type_FIX+":"+StringType);
	}	
	else if(typeof(value) ===  ObjectType)
	{
		localStorage.setItem(key,JSON.stringify(value));	
		localStorage.setItem(key+Type_FIX,ObjectType);
		console.log(key+Type_FIX+":"+ObjectType);
	}		
	else
		throw "try to save a unknown type value";
}

/**
 * 根据 key 值获取 value
 * @param {String} key
 */
StorageDao.get = function(key){
	
	var value=localStorage.getItem(key);
	var valueType=localStorage.getItem(key+Type_FIX);
	console.log(key);
	
	console.log(value==="null");
	console.log(valueType===ObjectType);
	if(value===null && valueType === NullType)
		return null;
	else if(value==="null" && valueType === NullType)
		return null;
	else if(valueType === BooleanType)
	{
		if(value === "true")
			return true;
		else
			return false;
	}	
	else if(valueType===NumberType)
		return math.eval(value);
	else if(valueType===StringType)
		return value;
	else if(valueType===ObjectType)	
		return JSON.parse(value, math.json.reviver);
	else
		throw "try to get a unknown type value";
	
}

StorageDao.getNextSequence=function()
{
	var nextIndex=StorageDao.get(MATRICS_COUNT) + 1;
		
	StorageDao.save(MATRICS_COUNT,nextIndex);
	
	return nextIndex;
}



StorageDao.remove = function(key){
	localStorage.removeItem(key);
	
}

StorageDao.clear = function(){
	localStorage.clear();
}

/**
 * 判断本地存储是否有该key 的 值
 * @param {String} key 
 */
StorageDao.contains = function(key){
	for(var i=0;i< localStorage.length;i++)
		if(localStorage.key(i)==key)
			return true;
	
	return false;	
}

function isJson(str)
{
	if(str.charAt(0)=='{' && str.charAt(str.length-1)=='}')
		return true;
	else
		return false;
}

var USERNAME="USERNAME";
var PASSWORD="PASSWORD";

var CONFIG_READY="CONFIG_READY";
var MATRICS="MATRICS";
var MATRICS_COUNT="MATRICS_COUNT";
var CONFIG_PRECISION="CONFIG_PRECISION";
var CONFIG_RAND_MIN="CONFIG_RAND_MIN";
var CONFIG_RAND_MAX="CONFIG_RAND_MAX";
var CONFIG_RAND_INTEGER="CONFIG_RAND_INTEGER";
var CONFIG_RAND_POSITIVE="CONFIG_RAND_POSITIVE";

var newMatrixName="newMatrixName";

function defaultMatrics()
{
	var matrixObj=new Object();
	matrixObj.matrix=math.matrix([[1, 0], [0, 1]]);
	matrixObj.name="A1";
	var matrixObjArr = new Array();
	matrixObjArr.push(matrixObj);
	StorageDao.save(MATRICS,matrixObjArr);
	StorageDao.save(MATRICS_COUNT,1);
}

function defaultSetting()
{
	StorageDao.save(CONFIG_PRECISION,5);
	StorageDao.save(CONFIG_RAND_MIN,-100);
	StorageDao.save(CONFIG_RAND_MAX,100);
	StorageDao.save(CONFIG_RAND_INTEGER,true);
	StorageDao.save(CONFIG_RAND_POSITIVE,false);
	StorageDao.save(CONFIG_READY,true);
}

function defaultInit()
{	
	defaultMatrics();
	defaultSetting();
}


if( ! StorageDao.contains(CONFIG_READY))
	defaultInit();
