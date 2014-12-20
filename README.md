jquery-steframeModal
================
#### (Modal content display)


This plugin shows and hides existing page content triggered by user click or by calling a function.
There are several options available, and any can be passed when the function is called.

### Version
1.0

### Options:

* **debug** *(false)* - writes messages to the FireBug console to let you know what is happening<br>
* **modal** *(true)* - whether or not the modal window will close on click<br>
* **transition** *(fade)* - type of transition/animation to use when showing or hiding the content (see below for additional options)<br>
* **transitionIn** *(fade)* - type of transition/animation to use when showing the content (if not included the transition value is used) (see below for additional options)<br>
* **transitionInTime** *(slow)* - speed parameter for transitionIn jquery animation function, can be time in milliseconds or a valid jquery speed variable ('slow', 'fast')<br>
* **transitionOut** *(fade)* - type of transition/animation to use when hiding the content (if not included the transition value is used) (see below for additional options)<br>
* **transitionOutTime** *(slow)* - speed parameter for transitionOut jquery animation function, can be time in milliseconds or a valid jquery speed variable ('slow', 'fast')<br>
* **closeSelector** *(.modal-*close) - css selector for close button.  Any item with this selector will close the modal on click<br>
* **modalClassSelect** *(sfModalClass)* - class that will be applied to the modal content when it is opened (not something that typically needs to be changed)<br>
* **dataAttribute** *(modaltarget)* - data attribute name to use to specify modal target<br>


##### Transition Options:
* 'fade' - animate the opacity of the content element from 0 to 1 (in) or from 1 to 0 (out)
* 'slideDown' - animate the content element from -1.5 * height of the element to 0 (in) or from 0 to -1.5 * height of the element (out)
* 'show' - instantly show (in) or hide (out) the content element
* You can also pass in a custom function to the transition parameter 

License
----

MIT
