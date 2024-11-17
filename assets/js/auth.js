function on(elSelector, eventName, selector, fn) {var element = document.querySelector(elSelector);element.addEventListener(eventName, function(event) {var possibleTargets = element.querySelectorAll(selector);var target = event.target;for (var i = 0, l = possibleTargets.length; i < l; i++) {var el = target;var p = possibleTargets[i];while (el && el !== element) {if (el === p) {return fn.call(p, event);}el = el.parentNode;}}});};

on('body', 'click', '.logout_hundler', function() {
  window.location.href = "/logout/";
});


on('body', 'click', '#logg', function() {
    _this = this;
    form = _this.parentElement.parentElement.parentElement;
    response = form.querySelector(".api_response");
  
    if (!form.querySelector("#id_email").value){
      form.querySelector("#id_email").style.border = "1px #FF0000 solid";
      response.innerHTML = "Input email!";
      response.classList.add("error");
      return
    }
    else if (!form.querySelector("#id_password").value){
      form.querySelector("#id_password").style.border = "1px #FF0000 solid";
      response.innerHTML = "Input password!";
      response.classList.add("error")
      return
    }
    else {
      _this.disabled = true;
    }
  
    form_data = new FormData(form);
    link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
    link.setRequestHeader('Content-Type', 'application/json');
    link.open( 'POST', "/login/", true );
  
    link.onreadystatechange = function () {
    if ( link.readyState == 4 && link.status == 200 ) {
        window.location.href = "/"
    }
    else {
        _this.disabled = false;
        response.style.display = "block";
        response.classList.add("error");
    }};
    link.send(form_data);
});

on('body', 'click', '#signup', function() {
    _this = this;
    form = _this.parentElement.parentElement.parentElement;
    response = form.querySelector(".api_response");
    if (!form.querySelector("#id_first_name").value){
      form.querySelector("#id_first_name").style.border = "1px #FF0000 solid";
      response.innerHTML = "First name is required!";
      response.classList.add("error");
      return
    } else if (!form.querySelector("#id_last_name").value){
      form.querySelector("#id_last_name").style.border = "1px #FF0000 solid";
      response.innerHTML = "Last name is required!";
      response.classList.add("error");
      return
    } else if (!form.querySelector("#id_password").value){
      form.querySelector("#id_password").style.border = "1px #FF0000 solid";
      response.innerHTML = "Password is required!";
      response.classList.add("error");
      return
    }
    else if (form.querySelector("#id_password").value != form.querySelector("#id_password2").value){
      form.querySelector("#id_password").style.border = "1px #FF0000 solid";
      form.querySelector("#id_password2").style.border = "1px #FF0000 solid";
      response.innerHTML = "Passwords don't match!";
      response.classList.add("error");
      toast_error("passwords don't match!");
      return
    }
    else {
      form.querySelector("#id_password").style.border = "unset";
      form.querySelector("#id_password2").style.border = "unset";
      form.querySelector("#id_first_name").style.border = "unset";
      form.querySelector("#id_last_name").style.border = "unset";
      this.disabled = true;
      response.classList.remove("error");
    }

    form.querySelector("#signup").setAttribute("disabled", "true");
  
    form_data = new FormData(form);
    link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
    link.open( 'POST', "/signup/", true );
  
    link.onreadystatechange = function () {
    if ( link.readyState == 4 && link.status == 200 ) {
        window.location.href = "/"
    }
    else {
        _this.disabled = false;
        response.style.display = "block";
        response.innerHTML = "Error";
        response.classList.add("error");
    }};
    link.send(form_data);
});