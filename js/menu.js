

function menuExpand() {
    var x = document.getElementById("myTop-menu");
    var icon = document.getElementById("iconeTopMenu");
    if (x.className === "top-menu") {
      x.className += " responsive";
      icon.classList.remove("fa-angle-down");
      icon.classList.add("fa-angle-up");
    } else {
      x.className = "top-menu";
      icon.classList.remove("fa-angle-up");
      icon.classList.add("fa-angle-down");
    }
  }