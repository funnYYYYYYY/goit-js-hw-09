!function(){var t={body:document.querySelector("body"),btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]")};console.log(t.body);var e=null;t.btnStart.addEventListener("click",(function(){e=setInterval((function(){t.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.btnStart.setAttribute("disabled",!1),t.btnStop.removeAttribute("disabled",!1)})),t.btnStop.addEventListener("click",(function(){clearInterval(e),t.btnStart.removeAttribute("disabled",!1),t.btnStop.setAttribute("disabled",!1)}))}();
//# sourceMappingURL=01-color-switcher.6a3fa72c.js.map
