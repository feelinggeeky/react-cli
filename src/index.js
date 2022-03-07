// import _ from "lodash";
import "./style.css";
import myBackground from "./bg.jpg";
import printMe from "./print.js";

function component() {
  var element = document.createElement("div");
  element.innerHTML = "asdasd";
  element.classList.add("hello");
  var myPic = new Image();
  var btn = document.createElement("button");
  btn.innerHTML = "Click me and check the consoddle!";
  btn.onclick = printMe;
  myPic.src = myBackground;
  element.appendChild(myPic);
  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
