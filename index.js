let count = 0;

const addFun = ()=>{
    count+=1;
    const out = document.getElementById("out")
    out.textContent= count
}

const btn = document.getElementById("addBtn")
btn.addEventListener("click", addFun)



if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration =>{
        console.log("SW Registered")
        console.log(registration)
    }).catch(error =>{
        console.log("SW Registration failed")
        console.log(registration)
    });
}