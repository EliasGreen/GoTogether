// client-side js for [index]

$(function() {
  
  
  /*********/
  // Slider
  /*********/
  
    let img_index = 0;
    slide();

    function slide() {
        var i;
        var x = document.getElementsByClassName("slides");
        for (i = 0; i < x.length; i++) {
           x[i].style.display = "none";  
        }
        img_index++;
        if (img_index > x.length) img_index = 1;  
        x[img_index-1].style.display = "block";  
        setTimeout(slide, 5000); // Change image every 2 seconds
    }

  /*********/
  // Modals
  /*********/
   
    // Registration
        let registrationModal = document.getElementById('modal-registration');

        // Get the button that opens the modal
        let registrationBtn = document.getElementById("btn-registration");

        // Get the <span> element that closes the modal
        let span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal 
        registrationBtn.onclick = function() {
            $("#previewImgBlock").hide();
            registrationModal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            registrationModal.style.display = "none";
        }
        
    // Login
        let loginModal = document.getElementById('modal-login');

        // Get the button that opens the modal
        let loginBtn= document.getElementById("btn-login");

        // Get the <span> element that closes the modal
        let spanLogin = document.getElementsByClassName("close")[1];

        // When the user clicks the button, open the modal 
        loginBtn.onclick = function() {
            loginModal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        spanLogin.onclick = function() {
            loginModal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if ((event.target == loginModal) || (event.target == registrationModal)) {
                loginModal.style.display = "none";
                registrationModal.style.display = "none";
            }
        }
        
        
  /*****************/
  // Modal's submits
  /*****************/
        const registrationForm = document.forms.namedItem("registrationForm");
        const loginForm = document.forms.namedItem("loginForm");
        let reader = new FileReader();
  
       $('input:file').change(
          (e) => {
            
            $("#previewImgBlock").show();
            
            // if size of Avatar img > 32 KV => throw warning
            if(Math.round(document.getElementById("avatar").files[0].size/1024) > 64) {
              console.log(Math.round(document.getElementById("avatar").files[0].size/1024));
              $("#avatar").val("");
              $("#textOfPreview").css("color", "red");
              $("#textOfPreview").text("Image must be less than 64kb!");
            }
            else {
              reader.readAsBinaryString(document.getElementById("avatar").files[0]);
              reader.onload = () => {
                $("#textOfPreview").css("color", "black");
                $("#textOfPreview").text("Preview of Avatar:");
                $('#previewImg').attr("src","data:image/png;base64, " + btoa(reader.result));     
              } 
            }
          });
        
        registrationForm.addEventListener("submit", (event) => {
           let avatarImg = document.getElementById("avatar").files[0];
           //get data from registration form (without img)
           let formData = $("#registrationForm" ).serializeArray();
          
           /**********************/
           /***/
           // encode BASE64
           /***/
            reader.readAsBinaryString(avatarImg);

            reader.onload = function() {
                const xhr = new XMLHttpRequest();

                xhr.open('POST', '/register', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


                let body = 'name=' + encodeURIComponent(formData[0]["value"]) +
                '&lastname=' + encodeURIComponent(formData[1]["value"]) +
                '&email=' + encodeURIComponent(formData[2]["value"]) +
                '&password=' + encodeURIComponent(formData[3]["value"]) +
                '&img=' + encodeURIComponent(btoa(reader.result));


                xhr.send(body);

                xhr.onreadystatechange = function() {
                  if (this.readyState != 4) return;
                  if (this.status != 200) {
                    alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
                    return;
                  }
                    let response = JSON.parse(this.responseText);
                    if(response.error === 0) window.location = "/main";
                  }
                
                
                //preventing
                event.preventDefault();
            };
            reader.onerror = function() {
                console.log('there are some problems');
            };             
           /**********************/   
          event.preventDefault();
        }, false);
  
  
  /***************
  *********************
  ********* Login **
  ***/
  
      loginForm.addEventListener("submit", (event) => {
           //get data from login form
           let formData = $("#loginForm" ).serializeArray();
          
           /**********************/
                const xhr = new XMLHttpRequest();

                xhr.open('POST', '/login', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


                let body = '&email=' + encodeURIComponent(formData[0]["value"]) +
                '&password=' + encodeURIComponent(formData[1]["value"]);


                xhr.send(body);

                xhr.onreadystatechange = function() {
                  if (this.readyState != 4) return;
                  if (this.status != 200) {
                    alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
                    return;
                  }
                    let response = JSON.parse(this.responseText);
                    if(response.error === 0) window.location = "/main";
                  }
                
                
                //preventing
                event.preventDefault();

        }, false);

  
  
/* $(JQuery) Border $(JQuery) */
});