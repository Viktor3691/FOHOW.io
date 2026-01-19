/**
 * Custom*
 * Dependencies: jQuery
 **/
jQuery(document).ready(function ($) {
  //Amounting functions
  $(document).on("click", ".bootstrap-touchspin-down", function () {
    var amount = Number($("#quantity-fild").val());
    var min = Number($("#quantity-fild").data("min"));
    if (amount - min <= 0) $("#quantity-fild").val(1);
    else $("#quantity-fild").val(amount - min);
  });
  $(document).on("click", ".bootstrap-touchspin-up", function () {
    var amount = Number($("#quantity-fild").val());
    var min = Number($("#quantity-fild").data("min"));
    $("#quantity-fild").val(amount + min);
  });

  /*PRODUCT QUANTITY ONLI INTNGER*/
  $(".quantity-spinner").bind("change keyup input click", function () {
    if (this.value.match(/[^0-9]/g)) {
      this.value = this.value.replace(/[^0-9]/g, "");
    }
  });

  /*PRODUCT ADD TO CART WITH QUANTITY*/
  $(document).on("click", ".addToCart", function () {
    var id = $(this).data("id");
    var qty = parseInt($("#quantity-fild").val());
    cart.add(id, qty);
    $(".cart-" + id)
      .removeClass("btn-gold")
      .addClass("btn-brand");
  });

  /*PRODUCT ADD TO CART*/
  $(document).on("click", ".cart", function () {
    var id = $(this).data("id");
    cart.add(id, 1);
  });

  /*PRODUCT REMOVE IN CART*/
  $(document).on("click", ".cart-remove", function () {
    cart.remove($(this).data("id"));
  });
});

/*CART ADD REMOVE UPDATE FUNCTIONS*/
var cart = {
  add: function (product_id, quantity) {
    $.ajax({
      url: "/cart/add",
      type: "get",
      data:
        "product_id=" +
        product_id +
        "&quantity=" +
        (typeof quantity != "undefined" ? quantity : 1),
      dataType: "json",
      success: function (json) {
        $("#cart-modal").remove();
        $(".count").html(json["count"]);
        $(".total").html(json["total"]);
        $("#cart-widget").html(json["html"]);
        $("body").append(
          '<div id="cart-modal" class="modal">' + json["modal"] + "</div>",
        );
        $("#cart-modal").modal("show");
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(
          thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText,
        );
      },
    });
  },
  update: function (key, quantity) {
    $.ajax({
      url: "/cart/edit",
      type: "get",
      data:
        "id=" +
        key +
        "&quantity=" +
        (typeof quantity != "undefined" ? quantity : 1),
      dataType: "json",
      success: function (json) {
        $("#cart-modal").remove();
        $(".count").html(json["count"]);
        $(".total").html(json["total"]);
        $("#cart-widget").html(json["html"]);
        $("body").append(
          '<div id="cart-modal" class="modal">' + json["modal"] + "</div>",
        );
        $("#cart-modal").modal("show");
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(
          thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText,
        );
      },
    });
  },
  remove: function (key) {
    $.ajax({
      url: "/cart/remove",
      type: "get",
      data: "id=" + key,
      dataType: "json",
      success: function (json) {
        $(".cart-row-" + key).remove();
        $(".count").html(json["count"]);
        $(".total").html(json["total"]);
        $("#cart-widget").html(json["html"]);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(
          thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText,
        );
      },
    });
  },
  clear: function () {
    $.ajax({
      url: "/cart/clear",
      type: "get",
      data: "",
      dataType: "json",
      success: function (json) {
        $("#cart-widget").html(json["html"]);
        location.reload();
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(
          thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText,
        );
      },
    });
  },
};
