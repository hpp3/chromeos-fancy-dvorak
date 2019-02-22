var contextID = -1;
var lastRemappedKeyEvent = undefined;
var capsDown = false;

// QWERTY -> Dvorak mappings
var dvorak = { 'q':  "'", 'w':  ',', 'e':  '.', 'r':  'p', 't':  'y', 'y':  'f', 'u':  'g', 'i':  'c', 'o':  'r', 'p':  'l', '[':  '/', ']':  '=', 'a':  'a', 's':  'o', 'd':  'e', 'f':  'u', 'g':  'i', 'h':  'd', 'j':  'h', 'k':  't', 'l':  'n', ';':  's', "'":  '-', 'z':  ';', 'x':  'q', 'c':  'j', 'v':  'k', 'b':  'x', 'n':  'b', 'm':  'm', ',':  'w', '.':  'v', '/':  'z', '-':  '[', '=':  ']', 'Q':  '"', 'W':  '<', 'E':  '>', 'R':  'P', 'T':  'Y', 'Y':  'F', 'U':  'G', 'I':  'C', 'O':  'R', 'P':  'L', '{':  '?', '}':  '+', 'A':  'A', 'S':  'O', 'D':  'E', 'F':  'U', 'G':  'I', 'H':  'D', 'J':  'H', 'K':  'T', 'L':  'N', ':':  'S', '"':  '_', 'Z':  ':', 'X':  'Q', 'C':  'J', 'V':  'K', 'B':  'X', 'N':  'B', 'M':  'M', '<':  'W', '>':  'V', '?':  'Z', '_':  '{', '+':  '}' }

chrome.input.ime.onFocus.addListener(function(context) {
  contextID = context.contextID;
});

chrome.input.ime.onBlur.addListener(function(context) {
  contextID = -1;
});

function isCapsLock(keyData) {
  // Set "Caps Lock" to "Disabled" in preferences first.
  return (keyData.code == "");
};

chrome.input.ime.onKeyEvent.addListener(
  function(engineID, keyData) {
    var handled = false;

    if (keyData.hasOwnProperty("extensionId")) {
      // It seems like our processed events get fed back into this listener,
      // so we need to exclude those. They should be marked with an extensionId.
      return false;
    }

    if (isCapsLock(keyData)) {
      capsDown = (keyData.type == "keydown");
    }

    if (capsDown) {
      handled = true;
      switch (keyData.code) {
        case "KeyH":
          keyData.key = 'Left';
          keyData.code = 'ArrowLeft';
          break;
        case "KeyJ":
          keyData.key = 'Down';
          keyData.code = 'ArrowDown';
          break;
        case "KeyK":
          keyData.key = 'Up';
          keyData.code = 'ArrowUp';
          break;
        case "KeyL":
          keyData.key = 'Right';
          keyData.code = 'ArrowRight';
          break;
        case "KeyY":
          keyData.key = 'Home';
          keyData.code = 'Home';
          break;
        case "KeyO":
          keyData.key = 'End';
          keyData.code = 'End';
          break;
        case "KeyN":
          keyData.key = 'Backspace';
          keyData.code = 'Backspace';
          break;
        case "KeyM":
          keyData.key = 'Delete';
          keyData.code = 'Delete';
          break;
        case "KeyW":
          keyData.ctrlKey = true;
          break;
        case "KeyQ":
          keyData.key = 'Tab';
          keyData.code = 'Tab';
          keyData.ctrlKey = true;
          break;
        case "Tab":
          keyData.ctrlKey = true;
          keyData.shiftKey = true;
          break;
        case "BrowserBack":
          keyData.code = 'F1';
          break;
        case "BrowserRefresh":
          keyData.code = 'F2';
          break;
        case "ZoomToggle":
          keyData.code = 'F3';
          break;
        case "SelectTask":
          keyData.code = 'F4';
          break;
        case "BrightnessDown":
          keyData.code = 'F5';
          break;
        case "BrightnessUp":
          keyData.code = 'F6';
          break;
        case "MediaPlayPause":
          keyData.code = 'F7';
          break;
        case "AudioVolumeMute":
          keyData.code = 'F8';
          break;
        case "AudioVolumeDown":
          keyData.code = 'F9';
          break;
        case "AudioVolumeUp":
          keyData.code = 'F10';
          break;
        default:
          handled = false;
      }
      // apply Dvorak only when ctrl isn't held
    } else if (!keyData.ctrlKey) {
      if (dvorak.hasOwnProperty(keyData.key)) {
        keyData.key = dvorak[keyData.key];
        handled = true;
      }
    }
    if (handled) {
      chrome.input.ime.sendKeyEvents({"contextID": contextID, "keyData": [keyData]});
    }
    return handled;
  });
