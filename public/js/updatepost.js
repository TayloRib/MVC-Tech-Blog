const allUpdateBtns = document.getElementById("updatebutton");
const postbox = document.getElementById("postbox");
const updatebtn = document.getElementById("updatebutton");

    function createtitle() {

        var postfield = document.createElement("input");
        postfield.setAttribute("Class", "title titleinput");
        postfield.setAttribute("placeholder", "Update your Post Title");
        postbox.appendChild(postfield);

        var descripfield = document.createElement("textarea");
        descripfield.setAttribute("class", "description descriptioninput");
        descripfield.setAttribute("placeholder", "Update your Post Content");
        postbox.appendChild(descripfield);

        var updatebutton = document.createElement("button");
        updatebutton.setAttribute("class", "longedit");
        updatebutton.textContent = "Update";
        postbox.appendChild(updatebutton);

        updatebutton.addEventListener('click', async (event) => {
            event.preventDefault();
            const title = document.querySelector('.titleinput').value;    
            const description = document.querySelector('.descriptioninput').value;
            const idToUpdate = updatebtn.getAttribute("data-post-id");
        
              const response = await fetch(`/api/posts/${idToUpdate}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description}),
              });
              if(response.ok){
                location.href = `/`
             } else {
                 alert("Something went wrong")
             }
          });
    }

    allUpdateBtns.addEventListener("click", createtitle);


