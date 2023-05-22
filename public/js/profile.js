document.querySelector("form").addEventListener("submit",e=>{
    e.preventDefault();
    const postObj = {
        title:document.querySelector("#title").value,
        description:document.querySelector("#description").value,
    }
    fetch("/api/posts",{
        method:"POST",
        body:JSON.stringify(postObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("Something went wrong")
        }
    })
})

const allUpdateBtns = document.querySelectorAll(".update-btn");
allUpdateBtns.forEach(button=>{
    button.addEventListener("click", async function(e){
        const idToUpdate = button.getAttribute("data-post-id");
        const res = await fetch(`/posts/${idToUpdate}`)
        if(res.ok){
           location.href = `/posts/${idToUpdate}`
        } else {
            alert("Something went wrong")
        }
    })
})

const allDelBtns = document.querySelectorAll(".del-btn");
allDelBtns.forEach(button=>{
    button.addEventListener("click",()=>{
        const idToDel = button.getAttribute("data-post-id");
        fetch(`/api/posts/${idToDel}`,{
            method:"DELETE",
        }).then(res=>{
            if(res.ok){
                location.reload()
            } else {
                alert("Something went wrong")
            }
        })
    })
})