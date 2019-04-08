(function (undefined) {

    // APP OBJECT ===================================================================

    var app = function () {

        var deviceAgent = navigator.userAgent.toLowerCase(), 			// check for iOs device
			agentID = deviceAgent.match(/(iphone|ipod|ipad)/),
			isIos = (agentID) ? true : false,
			isIphone = (deviceAgent.match(/(iphone)/)) ? true : false;

        function init() {

            ui.init();

        }

        return { init: init, isIos: isIos, isIphone: isIphone }

    } (ui);

    // UI OBJECT ===================================================================

    var ui = function (app, events) {

        var author = "AJ@sov",
        $registerForm = $('#ecardform'),
        errInd = '<i class="fa fa-exclamation-circle"></i>',


        /* 	UI.stylehelper --------------------------------------------------------------
        Misc style helper stuff
        */
		styleHelper = function () {

		    var 

			init = function () {

			    validateRegister();

			};

		    return { init: init }

		} (),

        selectTag = function () {

            var $taglines = $('#taglines'),
                $taglinesOpt = $('#taglines').find('ul li'),
                $taglineLabel = $('#tagline-txt').find('input'),


            init = function () {

                $taglinesOpt.click(function () {

                    if ($(this).hasClass('selected')) {

                    }

                    else {
                        $taglinesOpt.removeClass('selected');
                        $(this).addClass('selected');

                        $taglineLabel.val($(this).text()).valid();
                    }
                })


            };

            return { init: init }

        } (),

        selectCard = function () {

            var $card = $('#cards'),
            $taglines = $('#taglines'),
            $fieldset = $('fieldset'),
            $personalise = $('#personalise'),
            $send = $('#send'),
            $intro = $('#intro'),
            $taglineLabel = $('#tagline-txt').find('input'),

            init = function () {


                $card.find('li a').click(function (e) {

                    e.preventDefault();

                    $tmp_this = $(this);

                    $('#HiddenFieldTemplateName').val(this.id);

                    if ($(this).parent('li').hasClass('selected')) {

                    }

                    else {
                        $card.find('li').removeClass('selected');
                        $tmp_this.parent('li').addClass('selected');

                        $intro.slideUp(function () {
                            $personalise.slideDown();
                            $send.slideDown();
                            $taglines.
                            animate({ height: $taglines.find('#tag-' + $tmp_this.attr('title')).height() })
                            .find('li').removeClass('selected');
                        });

                        $taglineLabel.val('');

                        $taglines.find('ul').fadeOut().end().find('#tag-' + $(this).attr('title')).fadeIn(function () {
                            //      $(this).style.removeAttribute("filter");
                        });

                        $fieldset.removeClass().addClass($(this).attr('title'));
                    }

                })

            };

            return { init: init }

        } (),

        register = function () {

            var $fieldsets = $('fieldset'),
                $registerForm = $('#ecardform'),

                init = function () {

                    clearForm('#ecardform');
                    $('#btnSend').click(doNavigate);

                }


            doNavigate = function (e) {
                e.preventDefault();

                if ($(this).hasClass('submit')) {

                    if ($('#ecardform').valid()) {
                        alert('sending now');
                        $(this).attr("disabled", true).attr("value", "Sending...");

                        //   $('#ecardform').submit();
                        return false;
                    }

                    else {

                        // do nothing
                    }

                }
            }


            // returnToTop = function() {

            // 	var extra =  ($(window).width() < 601) ? 72: 0;

            //     if ($('.error').not(':hidden').length) {
            //         sOffset = $('.error').not(':hidden').filter(':first').offset().top - extra;
            //         $('html, body').animate({
            //             "scrollTop": sOffset
            //         }, 200);
            //     } else if ($('.step h2').length != 0) {

            //         sOffset = $('.step-menu').offset().top;
            //         $('html, body').animate({
            //             "scrollTop": sOffset
            //         }, 200);
            //     }

            // }


            validateRegister = function () {

                $.validator.addMethod("emailPrefix", function (value, element) {
                    return this.optional(element) || (/^[a-zA-Z0-9_']+([-.][a-zA-Z0-9_']+)*$/.test(value));
                }, "");

                $.validator.addMethod("notEqual", function (value, element, param) {
                    return this.optional(element) || value.toLowerCase() != param;
                }, "");




                $registerForm.validate({
                    ignore: ":hidden",
                    errorClass: "error",
                    errorElement: "span",
                    errorPlacement: function (error, element) {

                        $('.' + $(element).attr('name') + '-err').append(error).fadeIn();

                    },
                    highlight: function (element, errorClass, validClass) {



                    },
                    unhighlight: function (element, errorClass, validClass) {

                    },
                    rules: {
                        To: {
                            required: true,
                            notEqual: "recipient name"
                        },
                        Tagline: "required",

                        Comment: {

                            required: true,
                            notEqual: "type your comments..."

                        },
                        From: {
                            required: true,
                            notEqual: "sender name"
                        },
                        recipient_email: {
                            required: true,
                            emailPrefix: true,
                            notEqual: 'recipient\'s email'
                        }
                    },

                    messages: {

                        To: "Please enter recipient's name" + errInd,
                        Tagline: "Please choose a tag line" + errInd,
                        Comment: "Please enter comments" + errInd,
                        From: "Please enter sender's name" + errInd,
                        recipient_email: {
                            required: "Please enter a valid @sovereign.co.nz email" + errInd,
                            emailPrefix: "Please enter a valid email" + errInd
                        }
                    }
                });
            }

            return {
                init: init
            }
        } ();


        function init() {
            styleHelper.init();
            selectCard.init();
            selectTag.init();
            register.init();
            var oTextarea = 'textarea';



            $('textarea').bind('keyup change input', function (e) {

                if ($('#comments')[0].scrollHeight > $('#comments')[0].offsetHeight) {
                    while ($('#comments')[0].scrollHeight > $('#comments')[0].offsetHeight) {
                        //   oTextarea.value = oTextarea.value.substr(0, oTextarea.value.length - 1);
                        $('#comments').val($('#comments').val().substr(0, $('#comments').val().length - 1));
                    }
                }


            })

        }

        var clearForm = function (ele) {
            $(ele).find(':input').each(function () {
                switch (this.type) {
                    case 'password':
                    case 'text':
                    case 'textarea':
                    case 'email':
                    case 'tel':
                    case 'number':
                        $(this).val('');
                        break;
                    case 'hidden':

                        $('.baby-dob-hidden, .birth').val()
                        $('.baby-dob-hidden, .birth, .st').val('');
                        break;

                    case 'select-multiple':
                    case 'select-one':
                        $("#target option:first").val()
                        $(this).prop("selectedIndex", 0);
                        break;
                    case 'checkbox':
                    case 'radio':
                        this.checked = false;
                }
            });
        }

        return { init: init }

    } (app);

    window.sov_app = app;

})();

$('textarea,input[type=text]').keypress(function (e) {
    //var regex = new RegExp("^[a-zA-Z0-9.?,:!- ']+$");
    var reg = /^[a-z0-9,-.:'?! ]+$/i;
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (reg.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
});
