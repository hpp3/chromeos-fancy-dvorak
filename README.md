# chromeos-fancy-dvorak
Custom Dvorak solution for ChromeOS (developed for Pixelbook). This layout is US Dvorak, but with QWERTY ctrl shortcuts and additional shortcuts in place of the CapsLock key.

## Installation
Clone or download this repository. Go to chrome://extensions/, click 'Load unpacked' and choose the 'fancydvorak' directory. This will install the extension.

Go to chrome://settings/languages and add FancyDvorak as an input method. Note that you must keep at least 1 non-extension keyboard layout enabled at all times, so I recommend adding the regular US Dvorak as well. Press Ctrl-Shift-Space until FancyDvorak is selected.

If you want to try the experimental CapsLock/Launcher shortcuts, go to chrome://settings/keyboard-overlay and set Launcher to Disabled. You get these shortcuts: 

- Disabled + h/j/k/l = arrow keys
- Disabled + n/m = backspace/delete
- Disabled + y/o = Home/End

## Known Issues
Extension-based keyboard mapping does not work on the chrome://extensions/ page, in password fields, and in a few other system-level pages for security reasons. **Switch to the regular Dvorak keyboard when you are typing passwords or you will be using QWERTY.**
