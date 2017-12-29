    import { autoinject, customAttribute } from 'aurelia-framework';
    import { CssAnimator } from 'aurelia-animator-css';

    @customAttribute('animateonchange')
    @autoinject
    export class AnimateOnChangeCustomAttribute {

        

        constructor(private element: Element, public animator: CssAnimator) {

        }

        valueChanged(newValue) {
            console.log("ELEMENT, NEW VALUE: ", this.element, newValue);
            this.animator.addClass(this.element, 'background-animation').then(() => {
                this.animator.removeClass(this.element, 'background-animation');
            });
        }
    }

//class="alert alert-${alertType}" role= "alert"
//<strong>${messageStrong}</strong> ${message}