/*
 *
 *
 *   bella.js version:       0.1
 *   element list version:   0.1
 *
 *
 * */
//element list

var globalElements = [

    //elements need to be initialized by JavaScript
    //layout::
    '.auto-compose',

    //bella universal elements::
    '.bl-nav',
    '.bl-sidebar',
    '.bl-markdown',
    '.bl-view',
    '.bl-tab-view',

    //tag
    '.attach-tag',

    //live script
    '.bella-script'


];
var globalStaticClasses = [
    '.switch-tag'
];

$(document).ready(function () {
    //initialize global bella class
    blClassGlbCov();
    hljs.initHighlightingOnLoad();
});
$(window).resize(function () {
    bella.resize();
});

bella = {
    version: "0.1",
    currHashRoute: "",
    //MobileSupport
    mobileSupport: function () {
        $('title').after('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=device-dpi" />');
        document.documentElement.addEventListener('touchstart', function (event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        }, false);
        var lastTouchEnd = 0;
        document.documentElement.addEventListener('touchend', function (event) {
            var now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    },
    getWindowHeight: function () {
        return $(window).height();
    },
    getWindowWidth: function () {
        return $(window).width();
    },
    //timestamp

    getTimeStamp: function () {
        return new Date().getTime();
    },
    scrollToTop: function () {
        window.scrollBy(0, -10);
        scrolldelay = setTimeout('pageScroll()', 100);
        if (document.documentElement.scrollTop == 0) clearTimeout(scrolldelay);
    },
    //notification
    notify: function (msg,time) {
        blNotificationCov("normal", msg);
        if(typeof time !== 'undefined')
            setTimeout("bella.hideNotification()",time);
    },
    alert: function (msg,time) {
        blNotificationCov("alert", msg);
        if(typeof time !== 'undefined')
            setTimeout("bella.hideNotification()",time);

    },
    hideNotification: function () {
        $('.bl-notification button').remove();
        $('.bl-notification').slideUp(500, function () {
            $('.bl-notification').remove();
        });
    },
    showPopView: function (popViewId) {
        $(document.body).append('<div class="bl-pop-view-bg">');
        var $currPopView = $('#' + popViewId).clone();
        $('.bl-pop-view-bg').fadeIn(300).append($currPopView);
        $currPopView.fadeIn(300);
        $('.bl-pop-view-cancel').on('click', function () {
            $('.bl-pop-view-bg').remove();
        });
    },
    hidePopView: function () {
        $('.bl-pop-view-bg').remove();
    },
    resize: function () {
        autocomposeCov($('.auto-compose').toArray());
    },
    fromButtonInTableRawGet: function (e,index) {
        return $(e).parent().parent().children('td')[index].innerHTML;
    }
};

function bellaRouter() {
    window.addEventListener('load', this.route.bind(this), false);
    window.addEventListener('hashchange', this.route.bind(this), false);
}

// bellaRouter.prototype.route = function () {
//     this.curHash = location.hash.slice(1) || '#';
//     bella.currHashRoute = this.curHash;
//     console.log(bella.currHashRoute);
//     $.post(
//         "router.php",
//         {
//             routePath: bella.currHashRoute
//         },
//         function (data) {
//             $('#main').css("display", 'none').html(data).fadeIn(200);
//             blClassGlbCov();
//         }
//     );
// };
// var router = new bellaRouter();

//
//

function blClassGlbCov() {

    //bellaConvertIterator
    globalElements.forEach(function (e) {
        var $eleList = $(e + ':not(.alive)').toArray();
        $eleList.forEach(function (eleListMember) {
            var funcName = String(e.replace(/-/, ''));
            while (funcName.indexOf('-') > 0)
                funcName = funcName.replace(/-/, '');
            funcName = funcName.replace(/./, '') + 'Cov(eleListMember)';
            eval(funcName);
        });
    });
    blStaticClassGlbCov();
}

function blStaticClassGlbCov() {

    //bellaConvertIterator
    globalStaticClasses.forEach(function (e) {
        var funcName = String(e.replace(/-/, ''));
        while (funcName.indexOf('-') > 0)
            funcName = funcName.replace(/-/, '');
        funcName = funcName.replace(/./, '') + 'Cov()';
        eval(funcName);
    });
}

function autocomposeCov(rawTotalSet) {

    var $rawSet = $(rawTotalSet);
    $rawSet.toArray().forEach(function (oneRaw) {

        //.container
        var $oneblviewTotalSet = $(oneRaw).children('.bl-view,.section,.container');
        var oneblviewTotalList = $oneblviewTotalSet.toArray();
        var parentWid = parseFloat($(oneRaw).css('width'));
        var parentPad = parseFloat($(oneRaw).css('padding-left')) + parseFloat($(oneRaw).css('padding-right'));
        var len = oneblviewTotalList.length;
        var totalWid = 0;
        oneblviewTotalList.forEach(function (oneblview) {
            totalWid += parseFloat($(oneblview).css("width"));
        });
        var rest = parseFloat(parentWid - totalWid) - parentPad;
        var avgWeight = rest / totalWid;
        oneblviewTotalList.forEach(function (oneblview) {
            var currWid = parseFloat($(oneblview).css("width"));
            $(oneblview).css("width", currWid + avgWeight * currWid - ($(oneblview).hasClass('bl-view')?6:0) + 'px');

        });

        //uni
        var $oneuniTotalSet = $(oneRaw).find('>.section,.lazy-compose');
        var oneuniTotalList = $oneuniTotalSet.toArray();
        var parentHei = parseFloat($(oneRaw).css('height'));
        oneuniTotalList.forEach(function (oneuni) {
            var currHei = parseFloat($(oneuni).css("height"));
            if(currHei>parentHei+1){
                $(oneuni).css({
                    "line-height":parentHei+'px',
                    "height":parentHei+'px'
                });
            }else if(currHei<parentHei-1){
                $(oneuni).css({
                    "line-height":parentHei+'px',
                    "height":parentHei+'px'
                });
            }
        });



    });
}

function blviewCov(blviewTotalSet) {

    var $blviewTotalSet = $(blviewTotalSet);
    $blviewTotalSet.toArray().forEach(function (oneblview) {
        var $oneblviewbodyTotalSet = $(oneblview).find('.bl-view-body');
        var oneblviewbodyTotalList = $oneblviewbodyTotalSet.toArray();
        oneblviewbodyTotalList.forEach(function (oneblviewbody) {
            $(oneblviewbody).css("display", "none");
        });
        $(oneblviewbodyTotalList[0]).css("display", "block");
    });
}

function blNotificationCov(type, msg) {
    // clearTimeout(NotificationTimer);
    var currTimeStamp = bella.getTimeStamp();
    var notifDiv = $('<div style="display: none" id="' + currTimeStamp + '" class="bl-notification ' + type + ' raw-w"><div class="raw-f"><p></p></div><div onclick="bella.hideNotification()" class="bl-notification-hide-button">Hide</div></div>');
    $('body').before(notifDiv);
    $('#' + currTimeStamp + ' p').html(msg);
    if ($(document).scrollTop() > 0) {
        $("#currTimeStamp").css({
            "position": "fixed",
            "top": "0"
        });
    }
    $('.bl-notification.' + type + '').slideUp(300);
    $('#' + currTimeStamp).slideDown(300);
}

function bltabviewCov(oneTabView) {
    var $oneTabView = $(oneTabView);
    var oneTabViewList = $oneTabView.find('.bl-view-header li').toArray();
    var oneTabViewBodyList = $oneTabView.children('.bl-view-body').toArray();
    var fullWid = parseFloat($oneTabView.find('.bl-view-header').css('width'));
    var memberWid = fullWid / oneTabViewList.length;
    oneTabViewList.forEach(function (oneTabViewListMember) {
        $(oneTabViewListMember).css({
            'width': memberWid
        });
    });
    $(oneTabViewList[0]).addClass('bl-tab-view-active');
    $(oneTabViewBodyList[0]).css({'display': 'block'});
    oneTabViewList.forEach(function (oneTabViewListMember) {
        var $oneTabViewListMember = $(oneTabViewListMember);
        $oneTabViewListMember.on('click', function () {
            $(oneTabViewBodyList).css({'display': 'none'});
            $(oneTabViewBodyList[oneTabViewList.indexOf($oneTabViewListMember.get(0))]).css({'display': 'block'});
            $oneTabView.find('li').removeClass('bl-tab-view-active');
            $oneTabViewListMember.addClass('bl-tab-view-active');
        });
    });
}

function switchtagCov() {
    var $switchTagTotalList = $('.switch-tag').toArray();
    $switchTagTotalList.forEach(function (oneswitchTag) {
        var oneSlotName = $(oneswitchTag).attr("name");
        var slotList = $("ul[name=" + oneSlotName + "]:not(\".switch-tag\")").find('.bl-view-body');
        var oneSwitchTagAList = $(oneswitchTag).find('a').toArray();
        oneSwitchTagAList.forEach(function (oneSwitchTagAListMember) {
            $(oneSwitchTagAListMember).on('click', function () {
                $(oneSwitchTagAList).removeClass("bl-view-active");
                $(oneSwitchTagAListMember).addClass("bl-view-active");
                $(slotList).css('display', 'none');
                $(slotList[oneSwitchTagAList.indexOf(oneSwitchTagAListMember)]).css('display', 'block');
                $('.m-bl-view-header').text($(oneSwitchTagAListMember).text());
            });
        });
        $(oneSwitchTagAList[0]).addClass("bl-view-active");
    });
}

function attachtagCov(oneAttachTag) {
    var $oneAttachTag = $(oneAttachTag);
    $(document).scroll(function () {
        var scrollTop = $(document).scrollTop();
        var objScrollTop = $oneAttachTag.position().top;
        if (scrollTop > objScrollTop && $('.attach-tag-clone').length == 0) {
            var $attachTagInstant = $oneAttachTag.clone(true);
            $('body').append($attachTagInstant);
            $attachTagInstant.addClass('attach-tag-clone');
            $attachTagInstant.scroll(function () {
                $attachTagInstant.css({
                    'position': 'fixed',
                    'top': $oneAttachTag.position().top - parseFloat($oneAttachTag.css('height')-$(document).scrollTop()) + 'px',
                    'left': $oneAttachTag.position().left + 'px',
                    'z-index': 5000
                });
            })
        } else if (scrollTop <= objScrollTop) {
            $(document).find($('.attach-tag-clone')).remove();
        }
    });
}

function blmarkdownCov(onePage) {
    var $pageRoot = $(onePage);
    var converter = new showdown.Converter({
        "omitExtraWLInCodeBlocks": true,
        "noHeaderId": false,
        "prefixHeaderId": "",
        "ghCompatibleHeaderId": true,
        "headerLevelStart": 1,
        "parseImgDimensions": true,
        "simplifiedAutoLink": true,
        "excludeTrailingPunctuationFromURLs": false,
        "literalMidWordUnderscores": true,
        "strikethrough": true,
        "tables": true,
        "tablesHeaderId": false,
        "ghCodeBlocks": true,
        "tasklists": true,
        "smoothLivePreview": true,
        "smartIndentationFix": false,
        "disableForced4SpacesIndentedSublists": false,
        "simpleLineBreaks": false,
        "requireSpaceBeforeHeadingText": false,
        "ghMentions": false, "extensions": [], "sanitize": false
    });
    var $pageParagList = $pageRoot.find('p').toArray();
    $pageParagList.forEach(function (oneParag) {
        var $oneParag = $(oneParag);
        $oneParag.html(converter.makeHtml($oneParag.html()));
    });
}

function blsidebarCov(oneSidebar) {
    var $oneSidebar = $(oneSidebar);
    var $oneSidebarMember = $oneSidebar.children('a').toArray();
    $oneSidebar.children('a:first').addClass('bl-sidebar-active');
    $oneSidebarMember.forEach(function (oneSidebarbarMemberA) {
        var $oneSidebarbarMemberA = $(oneSidebarbarMemberA);
        $oneSidebarbarMemberA.on('click', function () {
            $oneSidebar.children('a').removeClass('bl-sidebar-active');
            $oneSidebarbarMemberA.addClass('bl-sidebar-active');
        });
    });
}

function blnavCov(oneBlHeaderListMember) {
    //nav > ul-body
    var $rootItem = $(oneBlHeaderListMember);

    //ul-body > li-list
    var $itemList = $rootItem.children('li').toArray();


    //
    $itemList.forEach(function (itemListMember) {
        var $itemListMember = $(itemListMember);
        var $itemListMemberUl = $itemListMember.children('ul');
        $itemListMemberUl.before("<i class=\"fa fa-angle-down\"></i>");

        //
        $itemListMember.on('click', function () {
            if ($itemListMemberUl.hasClass('bl-nav-active')) {
                $itemListMemberUl.fadeOut(100, function () {
                    $('.bl-nav-active').css('display', 'none').removeClass('bl-nav-active');
                })
            }
            else {
                $('.bl-nav-active')
                    .css('display', 'none')
                    .removeClass('bl-nav-active');
                $itemListMemberUl
                    .addClass('bl-nav-active')
                    .css({
                        'top': $itemListMember.position().top + 'px' + $itemListMember.css('height'),
                        'left': $itemListMember.position().left + 'px'
                    });
                $itemListMemberUl.fadeIn(100);
            }
        });
        $itemListMemberUl.mouseleave(function () {
            $itemListMemberUl.fadeOut(100, function () {
                $('.bl-nav-active').css('display', 'none').removeClass('bl-nav-active');
            });
        })
    });
}

function bellascriptCov(e) {
    $blExpDom = $(e);

    //split a html content into blocks.
    var blExpDomExpSet = $blExpDom.html().split("}");
    $blExpDom.html("");
    blExpDomExpSet.pop();

    //solve each block.
    blExpDomExpSet.forEach(function (blExpDomExp) {
            blExpDomExp += '}';
            //clean code.

            blExpDomExp = blExpDomExp.replace(/[\r\n\t]/g, "");
            var blExpDomExpArray = /(.+?)\{(.+?|)}/.exec(blExpDomExp);
            //deduct block type and solve child expression.
            switch (blExpDomExpArray[1].replace(/[\r\n\t\s]/g, "")) {
                case "form": {

                    //construct form.
                    $blExpDom.append('<div class = "bs-compiling">');
                    $blExpDomCompiling = $blExpDom.children(".bs-compiling");


                    //
                    var blExpDomExpChildExpSet = blExpDomExpArray[2].split(";");
                    blExpDomExpChildExpSet.pop();

                    //these children will be split into sepreate code.
                    blExpDomExpChildExpSet.forEach(function (blExpDomExpChildExp) {
                        var blExpDomExpChildExpSource = blExpDomExpChildExp;
                        blExpDomExpChildExp = /\((.+?)\)(.+?)]/.exec(blExpDomExpChildExp);
                        switch (blExpDomExpChildExp[1]) {

                            case "select": {
                                blExpDomExpChildExp = /\((.+?)\)(.+?):\((.+?)\)\[(.+?)]/.exec(blExpDomExpChildExp);
                                $blExpDomCompiling.append('<h5>' + blExpDomExpChildExp[2] + '</h5>');
                                $blExpDomCompiling.append('<select id="' + blExpDomExpChildExp[3] + '" name="' + blExpDomExpChildExp[3] + '"/>');
                                var blExpDomExpChildExpSelect = blExpDomExpChildExp[4].split(",");
                                blExpDomExpChildExpSelect.forEach(function (blExpDomExpChildExpCell) {
                                    $blExpDomCompiling.children('#' + blExpDomExpChildExp[3]).append('<option>' + blExpDomExpChildExpCell);

                                });
                                break;
                            }
                            case "checkbox": {
                                blExpDomExpChildExp = /\((.+?)\)(.+?):\((.+?)\)\[(.+?)]/.exec(blExpDomExpChildExp);
                                $blExpDomCompiling.append('<h5>' + blExpDomExpChildExp[2] + '</h5>');
                                $blExpDomCompiling.append('<div class="bl-checkbox" id="' + blExpDomExpChildExp[3] + '">');
                                var blExpDomExpChildExpCheckbox = blExpDomExpChildExp[4].split(",");
                                blExpDomExpChildExpCheckbox.forEach(function (blExpDomExpChildExpCell) {
                                    $blExpDomCompiling.children('#' + blExpDomExpChildExp[3]).append('<span><input type="checkbox" name="' + blExpDomExpChildExp[3] + '" value="' + blExpDomExpChildExpCell + '"><label>' + blExpDomExpChildExpCell + '</label></span>');
                                });

                                break;
                            }
                            case "radio": {
                                blExpDomExpChildExp = /\((.+?)\)(.+?):\((.+?)\)\[(.+?)]/.exec(blExpDomExpChildExp);
                                $blExpDomCompiling.append('<h5>' + blExpDomExpChildExp[2] + '</h5>');
                                $blExpDomCompiling.append('<div class="bl-radiobox" id="' + blExpDomExpChildExp[3] + '">');
                                var blExpDomExpChildExpCheckbox = blExpDomExpChildExp[4].split(",");
                                blExpDomExpChildExpCheckbox.forEach(function (blExpDomExpChildExpCell) {
                                    $blExpDomCompiling.append('<h5 class="h5_fill">&nbsp</h5>');
                                    $blExpDomCompiling.children('#' + blExpDomExpChildExp[3]).append('<span><input type="radio" name="' + blExpDomExpChildExp[3] + '" value="' + blExpDomExpChildExpCell + '"><label>' + blExpDomExpChildExpCell + '</label></span>');
                                });
                                $blExpDomCompiling.children('#' + blExpDomExpChildExp[3] + 'input:first-child').attr("checked", this.checked);


                                break;
                            }
                        }
                    });
                    $blExpDomCompiling.removeClass('bs-compiling');
                    $blExpDom.removeClass("bella-script");
                    $blExpDom.addClass("bella-script-compiled");
                    break;
                }
                case "table": {
                    $blExpDom.append('<div class = "bs-compiling">');
                    var $blExpDomCompiling = $blExpDom.children(".bs-compiling");
                    var $result = "";

                    //
                    var blExpDomExpChildExpSet = blExpDomExpArray[2].split(";");
                    blExpDomExpChildExpSet.pop();

                    //these children will be split into sepreate code.
                    var isCaption = true;
                    blExpDomExpChildExpSet.forEach(function (blExpDomExpChildExp) {
                        var blExpDomExpChildExpSource = blExpDomExpChildExp;
                        var blExpDomExpChildSet = blExpDomExpChildExp.split("|");
                        if (isCaption) {
                            $result += "<table><thead><tr>";
                            var i = 0;
                            blExpDomExpChildSet.forEach(function (e) {
                                $result += ("<th>" + blExpDomExpChildSet[i] + "</th>");
                                i++;
                            });
                            $result += "</tr></thead><tbody>";
                            isCaption = false;

                        } else {
                            var j = 0;
                            $result += "<tr>";
                            blExpDomExpChildSet.forEach(function (e) {
                                $result += ("<td>" + blExpDomExpChildSet[j] + "</td>");
                                j++
                            });
                            $result += "</tr>";
                        }
                    });
                    $result += "</tbody></table>";
                    $blExpDomCompiling.html($result);
                    $blExpDomCompiling.removeClass('bs-compiling');
                    $blExpDom.removeClass("bella-script");
                    $blExpDom.addClass("bella-script-compiled");
                }
            }
        }
    );

}