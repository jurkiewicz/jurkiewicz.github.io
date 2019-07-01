window.addEventListener('DOMContentLoaded', () => {

  var isOpen = false;
  var hamburgerLine = document.getElementById('hamburgerLine');

  var UID = {
    _current: 0,
    getNew: function() {
      this._current++;
      return this._current;
    }
  };

  HTMLElement.prototype.pseudoStyle = function(element, prop, value) {
    var _this = this;
    var _sheetId = "pseudoStyles";
    var _head = document.head || document.getElementsByTagName('head')[0];
    var _sheet = document.getElementById(_sheetId) || document.createElement('style');
    _sheet.id = _sheetId;
    var className = "pseudoStyle" + UID.getNew();

    _this.className += " " + className;

    _sheet.innerHTML += " ." + className + ":" + element + "{" + prop + ":" + value + "}";
    _head.appendChild(_sheet);
    return this;
  };

  function showMenu() {
    var menu = document.getElementById('menu');

    if (isOpen) {
      menu.style.transform = "translateX(-85vw)";
      hamburgerLine.style.backgroundColor = "#707070";
      hamburgerLine.pseudoStyle("before","transform","translateY(0) rotate(0)");
      hamburgerLine.pseudoStyle("after","transform","translateY(0) rotate(0)");
    } else {
      menu.style.transform = "translateX(0)";
      hamburgerLine.style.backgroundColor = "transparent";
      hamburgerLine.pseudoStyle("before","transform","translateY(6px) rotate(45deg)");
      hamburgerLine.pseudoStyle("after","transform","translateY(-6px) rotate(-45deg)");
    }
    isOpen = !isOpen;
  }

  var hamburger = document.getElementById("hamburger");
  hamburger.addEventListener("click", showMenu, false);

});
