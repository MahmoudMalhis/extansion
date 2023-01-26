let myLeads = [];
let input = document.querySelector(".input");
let save = document.querySelector(".save");
let tab = document.querySelector(".tab");
let del = document.querySelector(".del");
let ul = document.querySelector(".ul");
let local = JSON.parse(localStorage.getItem("myLeads"));

if (local) {
  myLeads = local;
  createUl(myLeads);
}

function li(link) {
  let li = document.createElement("li");
  let a = document.createElement("a");
  let icon = document.createElement("i");
  icon.className = "fa-regular fa-trash-can";
  li.appendChild(a);
  li.appendChild(icon);
  ul.appendChild(li);
  a.innerHTML = link;
  a.href = link;
  a.target = "_blank";
  icon.addEventListener("click", function () {
    ul.removeChild(li);
    myLeads.splice(myLeads.indexOf(link), 1);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
  });
}
function createUl(leads) {
  leads.forEach((e) => {
    li(e);
  });
}

save.onclick = function () {
  li(input.value);
  myLeads.push(input.value);
  input.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
};

del.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  ul.innerHTML = "";
});

tab.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    li(tabs[0].url);
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
  });
});
