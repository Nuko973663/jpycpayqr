/**
 * jpycpayqr.js
 * @author nuko973663
 * @version 2021.08.11.0
 */

const list = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const jpyc_contract_addr = "0x6ae7dfc73e0dde2aa99ac063dcf7e8a63265108c";
const polygon_chain_id = "137";
const default_dest_addr = "0xafd382aCC893127D6fbb197b87453070Fc14D43d";

$(function () {
  let id_pref = "#btn-";
  list.forEach((e) => {
    $(id_pref + e).on("click", () => {
      $("#amount").val($("#amount").val() + e);
    });
  });

  $(id_pref + "dot").on("click", () => {
    if ($("#amount").val().indexOf(".") == -1) {
      $("#amount").val($("#amount").val() + ".");
    }
  });
  $(id_pref + "clear").on("click", () => {
    $("#amount").val("");
  });
  $(id_pref + "generate").on("click", () => {
    if ($("#amount").val.length > 0) {
      makeCode();
    }
  });

  $("#config").on("click", () => {
    let dest = window.prompt("Input Destination Addr", "");
    if (dest != null) {
      set_dest_addr(dest);
      get_dest_addr();
    }
  });

  var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 300,
    height: 300,
  });

  function makeCode() {
    let amount = $("#amount").val();

    let dest_addr = get_dest_addr();

    let code =
      "ethereum:pay-" +
      jpyc_contract_addr +
      "@" +
      polygon_chain_id +
      "/transfer?address=" +
      dest_addr +
      "&uint256=" +
      amount +
      "e18";

    qrcode.makeCode(code);
  }

  function get_dest_addr() {
    let dest_addr = localStorage.getItem("dest_addr");
    if (dest_addr === null) {
      dest_addr = default_dest_addr;
    }
    $("#lbl-dest").text("destination: " + dest_addr);
    return dest_addr;
  }

  function set_dest_addr(addr) {
    localStorage.setItem("dest_addr", addr);
  }

  get_dest_addr();
});
