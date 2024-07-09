/*************************************************************************
 * Your custom JS file
 *************************************************************************/

(function () {
  "use strict";

  // The widget object
  var widgets;

  /**
   * Create the html elements for a masonry item.
   * @private
   * @param {string} caption - the caption of the item.
   * @param {string} imageSrc - the source URL of an image for the item.
   * @param {string} credit - the credit of the photo.
   * @returns {Object} - a jQuery DOM object.
   */
  function createMasonryItemHTML(caption, imageSrc, credit) {
    // This is a hack for Firefox, since Firefox does not respect the CSS "break-inside" and "page-break-inside"
    // We have to set the CSS display to "inline-flex" to prevent Firefox from breaking the figure in the middle
    // But, setting display to inline-flex will cause another problem in Chrome, where the columns will not be balanced
    // So we want Chrome to use "display: flex", and we want Firefox to use "display: inline-flex"
    var html = '<figure style="display: none;">';
    if (edaplotjs.Util.isFirefox()) {
      html = '<figure style="display: inline-flex">';
    }
    var figCaptionElement = '<figcaption>' + caption + '</figcaption>';
    if (typeof caption === "undefined" || caption == "") {
      figCaptionElement = "";
    }
    var figCreditElement = '<div>' + credit + '</div>';
    if (typeof credit === "undefined" || credit == "") {
      figCreditElement = "";
    }
    var figImageElement = '<img src="' + imageSrc + '">';
    if (typeof imageSrc === "undefined" || imageSrc == "") {
      figImageElement = "";
    }
    html += figImageElement + figCreditElement + figCaptionElement + '</figure>';
    var $html = $(html);
    $html.find("img").one("load", function () {
      // Only show the figure when the image is loaded
      $(this).parent().show();
    });
    return $html;
  }

  function createMasonry() {
    var data = [{
      "src": 'https://lh3.googleusercontent.com/pw/ABLVV85SbftCv0PT3dUN2vt6axFU6Ku7qoYUhBajSZ2muZqSGtZryUsa0uGZshtYDy5tFUOfCCFRpA8m1gVo6z3Jr4e95Zd2svLP4pZNv0iam0QvXJw6PvLvgsFuiDbsgU_exS6Ex-BMUoQCbUGzO3zoX2sv=w727-h969-s-no-gm?authuser=0',
      "credit": 'Credit: Dat Ngo',
      "caption": 'Da Lat'
    }, {
      "src": 'https://lh3.googleusercontent.com/pw/ABLVV85tUwbWPNgEfNtYa17W90P7eY1MckgGXnRdNSUUKEFKxwtRBLin8_O0fqUnpauN17URZOM9gTWiaLfw99mluveL1KUsYzIWYKmpaQPpBBDAVjksW0QHTTEBkJ6vXj_40mYA9lGl4BDxZ3zipVSnMBbq=w1292-h969-s-no-gm?authuser=0',
      "credit": 'Credit: Dat Ngo',
      "caption": 'Busan'
    }, {
      "src": 'https://lh3.googleusercontent.com/pw/ABLVV87_za-C7bvseFuAtOlXnuOsCzt7tM3msVkPHffUFwyMsmXTU4U4LeQKdm6e1j6ske8rZhvAt4ogqpBPZmhRygvNFqNUWQDMfXizwM25-VyshxhsoP-blGI9Z8-AjI0-RZHU0FRca535yl7GBJJu9UrW=w1292-h969-s-no-gm?authuser=0',
      "credit": 'Credit: Dat Ngo',
      "caption": 'Seoul'
    }, {
      "src": 'https://lh3.googleusercontent.com/pw/ABLVV87RASyHDqXtvhCJyTnNtm4-LydbCzoWh95W3gCdqxw925dGv3xYApZJEZGa4miW7A4MHx0TniWlKrT9kGFA2O1n5PkD3un5ut40c1PbKhNeKW4-uAR2couUu0SCoi4-5UWKepbjpifpeXpgTGFAMphB=w727-h969-s-no-gm?authuser=0',
      "credit": 'Credit: Dat Ngo',
      "caption": 'Da Lat'
    }, {
      "src": 'https://lh3.googleusercontent.com/pw/ABLVV86lDj9phRkzhWQdKq1OMYMZLmQcycO0rODE6YH7DQlv-Z8OesVjg02ffYzz6PEBNP08XTCMmcdJCI3znYCFWPtW92GdXIuUHK6GIR0NvAXqtA-xcrkmTGs6Agn54RnYGZjjMUQFvpHKjp-Ci_M28DmJ=w919-h969-s-no-gm?authuser=0',
      "credit": 'Credit: Dat Ngo',
      "caption": 'Da Lat'
    }, {
      "src": 'https://lh3.googleusercontent.com/pw/ABLVV845fQ2isigLyi6FgN1EBvO06SIfNZHDd-QH4BKmkX3BhmEy_FkgKxjnD8hO-yysqUFherbrv13SV2vbT1bJcp_bWFGBwCuzDrLAJ06QnhlEz125o6BhwoWNObvZb45hWadOVlRfDRhbKP_9Ty8fHqz_=w727-h969-s-no-gm?authuser=0',
      "credit": 'Credit: Dat Ngo',
      "caption": 'Hue'
    }, {
      "src": 'https://lh3.googleusercontent.com/pw/ABLVV85CEcRNyD-vqvnGuUiHaHsrKGeYNqVSFcma2z2MnseAOPQoj501xFTswT8APo2FcTFL7Xw2i2_nZP-KRyd5t2EScffBAQXQ014mXE69MFgkna2TxClHb2hMkBqGIkD7JG6kqfpXYf_O-0-YIX_ufNF4=w646-h969-s-no-gm?authuser=0',
      "credit": 'Credit: Dat Ngo',
      "caption": 'Wedding, Busan'
    }, {
      "src": 'https://lh3.googleusercontent.com/pw/ABLVV85cIhO3ZWwZKbK8grWyg1BhoAPMaZddIEzff_dsJNmcfeGWcJUoMAnjJONxYd0qXMotOqVhKVEzmNWOz_p2QL50eMHCMY6F_2s0umrgy5Od0Mf-9Q6-nTlC3RBqZMrw2vSxuJ8ZpOH6WvRK4g9fOSu4=w1440-h960-s-no-gm?authuser=0',
      "credit": 'Credit: Dat Ngo',
      "caption": 'Wedding, Busan'
    }, {
      "src": 'https://lh3.googleusercontent.com/pw/ABLVV855o-epZLr6wniqR1agmoZQ3H0-r-vo2peSYp2hMThYAok6V7cSvOtRWxVoX8Y8A5EZbDTSudjJRYfFlK1efpXnQx0B5trkQkZKwp3xbd7H2QuRnBS-3_2hwBcNUL2ie5dLVNYoKH52mEqIMA9s-8gp=w1440-h960-s-no-gm?authuser=0',
      "credit": 'Credit: Dat Ngo',
      "caption": 'Wedding, Busan'
    }, {
      "src": 'https://lh3.googleusercontent.com/pw/ABLVV87lqrovGaM6qOozmTcsDIqZEymR7v_NYVm2Op7BkkHCABV0rJgPhNRChoXiesCq_EeDWxzxb6mXc-QDJ8x6fF35dUIgsCNf0nPqdhoz7BmOSooLQAyFAIPjM_86gw9OO_aVz_tgmehvsWROpBeSqk9g=w565-h969-s-no-gm?authuser=0',
      "credit": 'Credit: Dat Ngo',
      "caption": 'Wedding, Busan'
    }, {
      "src": 'https://lh3.googleusercontent.com/pw/ABLVV87n6EiuJ0FcqNioqZIrRMtXIuWoK138KiK_QqMVXEwQzwERIm_jaUGDOZOHL0LwEZwEZPWYNfm8BYsznfeZzaHOIgXXkYmdIVRYs0ctgcucZVbVB-50nnj3Y8Jr7R00QeF_mh1Lf_Ep3vpj88zQI2OW=w553-h969-s-no-gm?authuser=0',
      "credit": 'Credit: Dat Ngo',
      "caption": 'Wedding, Busan'
    }, {
      "src": 'https://lh3.googleusercontent.com/pw/AP1GczPq9aOZlBZNHPbFTLmwfiUorb98ZSNsUHko8rsuSFDapn7YLPKpRYhWatVq7sQelnCnPFvVmWF7pd7TxaFH6NcB9ybgqfmbj8MXB6MJtlzjLnPdAsbRVGLnr4_cOW4pddTnZJyiKQZAFRit57NyEQ4b=w653-h919-s-no-gm?authuser=0',
      "credit": 'Credit: Dat Ngo',
      "caption": 'Paris'
    }, {
      "src": 'https://lh3.googleusercontent.com/pw/AP1GczO21GFcSu0T3fLMFVDWUG_vxOnIwH-O_E7ziA7TstL8618S1HAxP75Ydzf7PmwhER34Kkg7o-pbvvN6Z5hQOFHBy2m2HS0H2YIT6qPgK7RN6KuZC3-WuIWIhteabLVKObDIh2-9sOKGyzYw0ZMvhhrH=w668-h919-s-no-gm?authuser=0',
      "credit": 'Credit: Dat Ngo',
      "caption": 'Paris'
    }, {
      "src": 'https://lh3.googleusercontent.com/pw/AP1GczMrA8HdCWxITdoR-HoLZoImpMS9L65gE42wVSAMzRARRmgDn_PXMt13hRefQFBrrfaq1fdgHPpkY12IP-3xwk86a4Q5Y5GWaSTd3w1m6ryFUSpVwTgN63zjLKzFF8CadXxoOs8PIZ_QfU37DA8Y1DYU=w689-h919-s-no-gm?authuser=0',
      "credit": 'Credit: Dat Ngo',
      "caption": 'Paris'
    }, {
      "src": 'https://lh3.googleusercontent.com/pw/AP1GczMMlcV6caAVY8RqLYLtatSBWRIsaLIoyALN-l_2YngChfPclI0ppqaA1VzUQ3n1PDsZbv9slzfIr4MkMs8U1pqy93a8XwP2op-DwoF1HnoU_dtb-8OsjMrc6JfEoLvRTUhRJKK_dzPcicGqQi9t6X7I=w689-h919-s-no-gm?authuser=0',
      "credit": 'Credit: Dat Ngo',
      "caption": 'Paris'
    }, {
      "src": 'https://lh3.googleusercontent.com/pw/AP1GczOiNyw0jvggLNGLv86jEhK-e71YbB5T_mxM-FhBI9TnXyNkkIZv0K8RMeDDcM1lyVK_h_hSjI9M3zw-yc0ZfGLC3LgDMRZ2gb83CfcVla7A5Jgu0-5sl9yW2k79qjlcaw6AxTee-cUYkezTNCOprJ4W=w689-h919-s-no-gm?authuser=0',
      "credit": 'Credit: Dat Ngo',
      "caption": 'Geneva'
    }, {
      "src": 'https://lh3.googleusercontent.com/pw/AP1GczMBSJHosmQw9uiyIe8IDK4Q-Yl8NDe8YOPQvEhJpkI8Ru2VAKtrGqpnI0kr12_pEJHtQUOrRsa6yoQeeGkUCE5ce8-mFE3S0oFeC74hwM9IMJ7Csr-7MpgA6501X7x1UoY3D5k9aB6qZZ3hjfabj_Dx=w689-h919-s-no-gm?authuser=0',
      "credit": 'Credit: Dat Ngo',
      "caption": 'Geneva'
    }];
    var $container = $("#masonry");
    for (var i = 0; i < data.length; i++) {
      var v = data[i];
      var $t = createMasonryItemHTML(v["caption"], v["src"], v["credit"]);
      $t.attr("id", "masonry-id-" + v["id"]);
      $container.append($t);
    }
  }

  function createShareButtonAndDialog() {
    var $share_url_copy_prompt = $("#share-url-copy-prompt");

    // Create the share dialog
    var $share_dialog = widgets.createCustomDialog({
      selector: "#share-dialog",
      full_width_button: true,
      action_text: "Copy to clipboard",
      close_dialog_on_action: false,
      show_cancel_btn: false,
      action_callback: function () {
        widgets.copyText("share-url");
        $share_url_copy_prompt.show();
      }
    });
    $share_dialog.on("dialogclose", function () {
      $share_url_copy_prompt.hide();
    });

    // Set the event of the share url textbox
    var $share_url = $("#share-url");
    $share_url.focus(function () {
      $(this).select();
    }).click(function () {
      $(this).select();
    }).mouseup(function (e) {
      e.preventDefault();
    });

    // Set the event of the share button
    $("#share-btn").on("click", function () {
      $share_dialog.dialog("open");
    });
  }

  function init() {
    // Create the widget object
    widgets = new edaplotjs.Widgets();

    // Set custom dropdown
    widgets.setCustomDropdown($("#custom-dropdown"), {
      items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      //init_index: 0, // You can use this parameter to set the initial item for displaying
      init_text: "Dropdown Menu (With JavaScript)",
      on_item_click_callback: function ($ui) {
        console.log($ui.text());
      }
    });
    widgets.setCustomDropdown($("#custom-dropdown-large"), {
      items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      //init_index: 0, // You can use this parameter to set the initial item for displaying
      init_text: "Large Dropdown Menu (With JavaScript)",
      on_item_click_callback: function ($ui) {
        console.log($ui.text());
      }
    });

    // Set custom radio
    $("input:radio[name='playback-speed']").on("change", function () {
      console.log($(this).val());
    });

    // Set custom dialog type 1
    var $dialog_1 = widgets.createCustomDialog({
      selector: "#dialog-1",
      full_width_button: true
    });
    $("#dialog-btn-1").on("click", function () {
      $dialog_1.dialog("open");
    });

    // Set custom dialog type 2
    var $dialog_2 = widgets.createCustomDialog({
      selector: "#dialog-2",
      action_callback: function () {
        console.log("confirm");
      },
      cancel_callback: function () {
        console.log("cancel");
      }
    });
    $("#dialog-btn-2").on("click", function () {
      $dialog_2.dialog("open");
    });

    // Set custom dialog type 3
    var $dialog_3 = widgets.createCustomDialog({
      selector: "#dialog-3",
      parent: $(".content"),
      show_cancel_btn: false,
      cancel_callback: function () {
        console.log("cancel");
      },
    });
    $("#dialog-btn-3").on("click", function () {
      $dialog_3.dialog("open");
    });

    // Set custom dialog type 4
    var $dialog_4 = widgets.createCustomDialog({
      selector: "#dialog-4",
      action_text: "Action",
      reverse_button_positions: true,
      full_width_button: true,
      action_callback: function () {
        console.log("action");
      },
      cancel_text: "Back",
      cancel_callback: function () {
        console.log("back");
      }
    });
    $("#dialog-btn-4").on("click", function () {
      $dialog_4.dialog("open");
    });

    // Create the share button and dialog
    createShareButtonAndDialog();

    // Create the Unsplash photo picker
    // To make this work, you need to code a backend API to serve Unsplash photos
    // For python flask, an example is "https://github.com/yenchiah/COCTEAU-TUD/blob/main/back-end/www/controllers/photos_controller.py"
    // You need to change photoURL your API URL, such as "http://localhost:5000/photos/random?count=30"
    var photoURL = undefined; // for demo, the photo picker will load "file/photo.json"
    var $photoPickerDialog = widgets.createUnsplashPhotoPickerDialog("dialog-photo-picker", undefined, photoURL, function (d) {
      $("#vision-image").data("raw", d).prop("src", d["urls"]["regular"]);
    });
    $("#vision-image-frame").on("click", function () {
      $photoPickerDialog.dialog("open");
    });

    // Create the masonry
    createMasonry();

    // Create the gallery
    // In practice, these images urls may come from your server via http ajax requests.
    var $gallery = $("#gallery");
    for (var i = 0; i < 8; i++) {
      var item = '<a href="javascript:void(0)" class="flex-column">' +
        '<img src="img/dummay-img.png">' +
        '<div>Image Caption</div>' +
        '</a>';
      $gallery.append($(item));
    }

    // Create custom tabs
    widgets.createCustomTab({
      selector: "#custom-tab"
    });

    // Set the custom legend
    widgets.setCustomLegend($("#custom-legend"));
  }

  $(init);
})();