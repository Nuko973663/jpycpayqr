/**
 * jpycpayqr.js
 * @author nuko973663
 * @version 2021.08.17.0
 */
const txt_version = "2021.08.17.0";
var default_dest_addr = "0xafd382aCC893127D6fbb197b87453070Fc14D43d";
const jpyc_contract_addr = "0x6ae7dfc73e0dde2aa99ac063dcf7e8a63265108c";
const api_key = "9FBQX79Z98UWDDQDH9QH6A6A1VFXU8VF9U";
const polygon_chain_id = "137";
const polygon_chain_name = "Polygon (MATIC)";
const list = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const debug_block = 0;
const check_interval = 1000;
const total_check_count = 180;
var last_block = 0;
var timer_id = 0;
var counter = 0;

$(() => {
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
      $("#qrcontainer").css("display", "");
      makeCode();
      move_to_link($("#qrcontainer"));
    }
  });

  $("#config").on("click", () => {
    let dest = window.prompt("Input Destination Addr", "");
    if (dest != null) {
      set_dest_addr(dest);
      get_dest_addr();
    }
  });

  $("#openMetamask").on("click", () => {
    window.location.href =
      "https://metamask.app.link/dapp/nuko973663.github.io/jpycpayqr/";
  });

  $("#version").text(txt_version);

  var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 300,
    height: 300,
  });

  const makeCode = () => {
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

    $("#qrAmount").text(amount);
    $("#destAddress").text(dest_addr);
    $("#chainName").text(polygon_chain_id + " : " + polygon_chain_name);
    getLastBlock();

    {
      counter = 0;
      timer_id = setInterval(() => {
        getNewTransactions(last_block);
        counter = counter + 1;
        if (counter > total_check_count) {
          clearInterval(timer_id);
        }
      }, check_interval);
    }

    $(".toast").toast();
  };

  const getLastBlock = () => {
    const url =
      "https://api.polygonscan.com/api?module=proxy&action=eth_blockNumber&apikey=" +
      api_key;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(function (json) {
        let str;

        str = json["result"];
        last_block = parseInt(Number(str), 10) - debug_block;
      });
  };

  const getNewTransactions = (startBlock) => {
    let dest_addr = get_dest_addr();
    const url =
      "https://api.polygonscan.com/api?module=account&action=tokentx&address=" +
      dest_addr +
      "&startblock=" +
      startBlock +
      "&sort=asc&apikey=" +
      api_key;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(function (json) {
        if (json["status"] == "1") {
          arr = json["result"];
          arr.forEach((elm) => {
            let amount = $("#amount").val();
            if (
              elm["contractAddress"] == jpyc_contract_addr &&
              parseInt(elm["value"]) == parseInt(amount * 10 ** 18)
            ) {
              console.log(elm);
              let date = new Date(parseInt(elm["timeStamp"]));
              date.setHours(date.getHours() + 4);
              let time =
                date.getHours() +
                ":" +
                date.getMinutes() +
                ":" +
                date.getSeconds();
              elm["time"] = time;
              elm["amount"] = amount;
              $("#toastContainer").prepend(build_toast(toast_text, elm));
              $(".toast").toast("show");
            }
            let blockNum = parseInt(elm["blockNumber"]);
            if (blockNum > last_block) {
              last_block = blockNum + 1;
            }
          });
        }
      });
  };

  const get_dest_addr = () => {
    let dest_addr = localStorage.getItem("dest_addr");
    if (dest_addr === null) {
      dest_addr = default_dest_addr;
    }
    $("#dest").text(dest_addr);
    return dest_addr;
  };

  const set_dest_addr = (addr) => {
    localStorage.setItem("dest_addr", addr);
  };

  const move_to_link = (link) => {
    var position = link.offset().top;
    $("body,html").animate({ scrollTop: position }, 400, "swing");
  };

  const build_toast = (txt, js) => {
    for (let key in js) {
      txt = txt.replaceAll("#" + key + "#", js[key]);
    }
    return txt;
  };

  /** web3 */
  window.addEventListener("load", async () => {
    let accounts = [];
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        await ethereum.enable();
        accounts = await web3.eth.getAccounts();
      } catch (error) {
        $("#askMetamask").modal("show");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      try {
        window.web3 = new Web3(web3.currentProvider);
        accounts = await web3.eth.getAccounts();
      } catch (error) {
        $("#askMetamask").modal("show");
      }
    }
    // Non-dapp browsers...
    else {
      $("#askMetamask").modal("show");
    }

    if (accounts.length > 0) {
      set_dest_addr(accounts[0]);
    } else {
      $("#askMetamask").modal("show");
    }
    get_dest_addr();
  });
});

var toast_text = `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false">
  <div class="toast-header">
    <svg class="bd-placeholder-img rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" ><rect fill="#007aff" width="100%" height="100%"/></svg>
    <strong class="mr-auto">#amount# #tokenSymbol#</strong>
    <small class="text-muted">#time#</small>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
    <p>from: #from#<p>
    <p><small><a href="https://polygonscan.com/tx/#hash#" target="_blank">tx: #hash#</a></small></p>
  </div>
</div>`;
