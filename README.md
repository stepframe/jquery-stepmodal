jquery-stepModal
================
#### (Modal content display)


This plugin shows and hides existing page content triggered by user click or by calling a function.
There are several options available, and any can be passed when the function is called.

### Version
1.0

### Options:

* **debug** *(false)* - writes messages to the FireBug console to let you know what is happening
* **modal** *(true)* - whether or not the modal window will close when the background is clicked and escape key is released
* **transition** *(fade)* - type of transition/animation to use when showing or hiding the content (see below for additional options)
* **transitionIn** *(fade)* - type of transition/animation to use when showing the content (if not included the transition value is used) (see below for additional options)
* **transitionInTime** *(slow)* - speed parameter for transitionIn jquery animation function, can be time in milliseconds or a valid jquery speed variable ('slow', 'fast')
* **transitionOut** *(fade)* - type of transition/animation to use when hiding the content (if not included the transition value is used) (see below for additional options)
* **transitionOutTime** *(slow)* - speed parameter for transitionOut jquery animation function, can be time in milliseconds or a valid jquery speed variable ('slow', 'fast')
* **closeSelector** *(.modal-close)* - css selector for close button.  Any item with this selector will close the modal on click
* **modalClass** *(stepModal)* - class that will be applied to the modal background when it is opened (use to target styling)
* **delayBackgroundAnimation** *(true)* - should the background fade in before the content is animated
* **appendSelector** *(body)* - jQuery selector for element to append the modal background to
* **backgroundTransitionSpeed** *('fast')* - speed for background fade in/out animation
* **contentAnimationDelay** *(250)* - delay between the background animation and the content animation
* **dataAttribute** *(modaltarget)* - data attribute name to use to specify modal target
* **onOpen** *(void)* - function called when modal is opened
* **onClose** *(void)* - function called when modal is closed


##### Transition Options:
* 'fade' - animate the opacity of the content element from 0 to 1 (in) or from 1 to 0 (out)
* 'slideDown' - animate the content element from -1.5 * height of the element to 0 (in) or from 0 to -1.5 * height of the element (out)
* 'show' - instantly show (in) or hide (out) the content element
* custom - pass in a custom function, for transitionIn and transitionOut, or pass in an array (2 elements), for transition to define in and out at the same time


License
----

MIT


