# JPYCpayQR

Polygon Network で指定の金額の JPYC を支払う QR コードを生成します。
iPhone のホーム画面にブックマークしておき、自分のアドレスを送付先に設定しておくと、便利です。

## 使い方

- [サイト](https://nuko973663.github.io/jpycpayqr/)にアクセス
  - [https://nuko973663.github.io/jpycpayqr/](https://nuko973663.github.io/jpycpayqr/)
- タイトルの右端にある歯車のマークを押して、支払先のアドレスを入力
  - デフォルトでは下記の投げ銭用アドレスになっています。
  - アドレスはブラウザのローカルストレージに保存されますので、次回以降は設定する必要がありません。
- 送付金額を入力して、Generate QR をクリック
- スマホなどで QR コードを読み込むと Metamask などが立ち上がり、認証画面に遷移します。

## その他

1JPYC でも投げ銭して頂ければ飛んで喜びます。

投げ銭アドレス：0xafd382aCC893127D6fbb197b87453070Fc14D43d (ETH, Polygon, BSC)

## To Do

### Next release

- qrcodepayjs 対応

## Updates

### Ver. 20210817.0

- トランザクションチェック（着金確認）対応

### Ver. 20210816.1

- 確認用に QR コードの下に送付先と送付金額等の情報を表示

### Ver. 20210816.0

- Metamask 他、web3 に準拠したブラウザ拡張ウォレットに対応。自動で送付先を読み込む。
- スマートフォンのブラウザで開いた場合、Metamask のブラウザで開くようポップアップを表示

### Ver. 20210811.0

- Initial release.
