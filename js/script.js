var user=document.getElementById("user");
var pwd=document.getElementById("pwd");
var btn=document.getElementById("loginbtn");
var err=document.getElementById("err");
var con=document.getElementById('todo_container');
var todo=document.getElementById('todo');
var alink=document.getElementById('atodo');
var logout=document.getElementById('logout');
var indexPage=document.getElementById('indexbody');
var loginPage=document.getElementById('loginbody');


btn.addEventListener("click",()=>{
    validate(user.value,pwd.value,loginS,loginR);
});

function validate(uv,pv,callback1,callback2)
{
        var res;
        if(user.value=='admin' && pwd.value=='12345')
        {
            callback1(); 
        }
        else
        {
            callback2();
        }
            
}

function loginS()
{
       // window.location.href = "../index.html";
       user.value='';
       pwd.value='';
       indexPage.setAttribute('style', 'display:block !important');
       loginPage.setAttribute('style', 'display:none !important');

}
function loginR()
{
    alert("Invalid Username or Password");
    user.value='';
    pwd.value='';
}


alink.addEventListener("click",()=>{
    todoList();
});

function createContent(result)
{
    var x = document.createElement("TABLE");
    for(let i=0;i<result.length;i++)
    { 
       
        var y = document.createElement("TR");
        y.setAttribute("id", "myTr"+result[i].id);
        document.getElementById("tableBody").appendChild(y);
      
            var z = document.createElement("TD");
            var t = document.createTextNode(result[i].id);
            z.appendChild(t);
            document.getElementById("myTr"+result[i].id).appendChild(z);
            var z_2 = document.createElement("TD");
            var t = document.createTextNode(result[i].title);
            z_2.appendChild(t);
            document.getElementById("myTr"+result[i].id).appendChild(z_2);
            var z_3 = document.createElement("TD");
            //var t = document.createTextNode(result[i].completed);
            var t=createCheckBox(result[i].completed,result[i].id);
            z_3.appendChild(t);
            document.getElementById("myTr"+result[i].id).appendChild(z_3);
    }



}
function createCheckBox(chk,id)
{
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.className="checkBox";
    checkbox.onclick=checkboxesClick;
    checkbox.style='margin-right: 1%';
    if(chk==true)
    {
        console.log("inside true");
        checkbox.checked = true; 
        checkbox.disabled = true; 
    }
    else{
        console.log("inside false");
        checkbox.checked = false;
    }

    var label = document.createElement('label')
                
    var title=id+" "+chk;
    label.appendChild(document.createTextNode(title));
            
    checkbox.appendChild(label);
    return checkbox;
          
}
function todoList()
{
    //console.log("todolist")
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200)
        {
           // console.log(this.responseText);
           
            
            let output=JSON.parse(this.responseText);
            createContent(output);
            
            con.setAttribute('style', 'display:block !important');
            
            //document.getElementById('todo').innerHTML=val;
        
        }
    }
       xhttp.open("GET",'https://jsonplaceholder.typicode.com/todos',true);
       //xhttp.open("GET",'data.json',true);
        xhttp.send();
   
}
function checkedCount(count){
    return new Promise((resolve,reject)=>{
       
        if(count==5)
        {
            resolve(count)
        }
        else
        {
            reject(count)
        }
    })
}
function displayAlert(data)
{
    alert(" Congrats. "+data+" Tasks have been Successfully Completed");
}

function checkboxesClick(){
    var inputElems = document.getElementsByTagName("input");
    var count = 0;
    for (var i=0; i<inputElems.length; i++) 
    {
        if (inputElems[i].type === "checkbox" && inputElems[i].checked === true && inputElems[i].disabled === false){
            count=count+1;
        }

    }
    checkedCount(count).then(displayAlert);
   
}




logout.addEventListener("click",()=>{
    indexPage.setAttribute('style', 'display:none !important');
    loginPage.setAttribute('style', 'display:block !important');
});