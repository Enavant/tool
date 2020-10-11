function clear(){
	localStorage.clear();
}
function addtodo(){
	var data = loadData();
    var todo = document.getElementById('todo');
    var ready = document.getElementById('ready');
	var todoadd={"todo":todo.value,"anumber":data.length,"done":false};
	data.push(todoadd);
	todo.value="";
	reload(data);
	Load();
}
function uptodo(anumber){
	var data = loadData();
	var s = 0;
	var i = 0;
	for(i =0;i<data.length;i++){
		
		if(anumber<i&&data[anumber].done==data[i].done){
			var temp = data[anumber];
			data[anumber] = data[i];
			data[i] = temp;
			var temp = data[anumber].anumber;
			data[anumber].anumber = data[i].anumber;
			data[i].anumber = temp;
			reload(data);
			Load();
			console.log(data[i].anumber);
			break;
		}
	}
	if(i==data.length){
		alert("当前任务已经在首位了");
		Load();
	}
}
function downtodo(anumber){
	var data =  loadData();
	var s = 0;
	var i = 0;
	for(i =data.length-1;i>=0;i--){
		if(anumber>i&&data[anumber].done==data[i].done){
			var temp = data[anumber];
			data[anumber] = data[i];
			data[i] = temp;
			var temp = data[anumber].anumber;
			data[anumber].anumber = data[i].anumber;
			data[i].anumber = temp;
			reload(data);
			Load();
			console.log(data[i].anumber);
			break;
	}
	if(i<=0){
		alert("当前任务已经在底部了");
		Load();
		}
}
}
function get(){
	var s = localStorage.getItem("add");
	return JSON.parse(s);
}
function deletetodo(i){
	var collect = get();
	collect.splice(i,1);
	for(var i = collect.length-1;i>=0;i--){
	collect[i].anumber = i;
	}
	reload(collect);
	Load();
}
function add(anumber){
	var collect = get();
	if(collect[anumber].done){
		collect[anumber].done = false;
	}
	else{
		collect[anumber].done = true;
	}
	reload(collect);
	Load();
	}
function edit(i){
	var collect = get();
	var todo = collect[i].todo;
	var p = document.getElementById("p-"+i);
	p.innerHTML = `<input class="add2" id="input-${i}" value="${collect[i].todo}" type="text" onblur="addedit(${i})">`;
}
function addedit(i){
	var input = document.getElementById("input-"+i);
	var data = loadData();
	data[i].todo = input.value;
	reload(data);
	Load();
}
function reload(data){
	localStorage.setItem("add",JSON.stringify(data));
}
function loadData(){
	var mid = localStorage.getItem("add");
	if(mid != null){
		return JSON.parse(mid);
	}
	else{
		return [];
	}
}
function Load(){
	
	var readynumber = document.getElementById('readynumber');
	var donenumber = document.getElementById("donenumber");
	var collect = loadData();
	var readynumber = document.getElementById('readynumber');
	var ready = document.getElementById('ready');
	var done = document.getElementById("done");
	var todoString = "";
	var doneString = "";
    var readynumber1 = 0;
	var donenumber1 = 0; 
	for(var i = collect.length-1;i>=0;i--){
		console.log(collect[i].anumber)
		if(collect[i].done){
	   doneString += `<li id="p-${collect[i].anumber}"><p onclick="edit(${i})"><a style="float:left;color:#6dbcdb" class="fa fa-level-down fa-lg" href="javascript:downtodo(${collect[i].anumber})"></a><a style="float:left;color:#6dbcdb" class="fa fa-level-up fa-lg" href="javascript:uptodo(${collect[i].anumber})"></a><a style="float:left;color:#6dbcdb" class="fa fa-minus-circle fa-lg" href="javascript:deletetodo(${i})"></a>${collect[i].todo}<a style="float:right;color:#6dbcdb" href="javascript:add(${i})" class="fa fa-plus-circle fa-lg"></a></p></li>`;
	   donenumber1++;
	}
	else {
		todoString += `<li id="p-${collect[i].anumber}"><p onclick="edit(${i})" ><a style="float:left;color:#6dbcdb" class="fa fa-level-down fa-lg" href="javascript:downtodo(${collect[i].anumber})"></a><a style="float:left;color:#6dbcdb" class="fa fa-level-up fa-lg" href="javascript:uptodo(${collect[i].anumber})"></a><a style="float:left;color:#6dbcdb" class="fa fa-minus-circle fa-lg" href="javascript:deletetodo(${i})"></a>${collect[i].todo}<a style="float:right;color:#6dbcdb" href="javascript:add(${i})" class="fa fa-plus-circle fa-lg"></a></p></li>`;
		readynumber1++;
	}
	}
	readynumber.innerHTML = readynumber1;
	donenumber.innerHTML = donenumber1;
	ready.innerHTML = todoString ;
	done.innerHTML  = doneString;
	}
function Check(event){
	    if (event.keyCode == 13) {
	      addtodo();
		 
	    }
	}


