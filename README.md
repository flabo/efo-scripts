# EFO-scripts

WEB+DB PRESS Vol.89内の特集3「エントリーフォーム最適化入門──入力フォームを改善し、離脱率を下げる」のサンプルコードです。

## サポートページ

http://gihyo.jp/magazine/wdpress/archive/2015/vol89

## 掲載しているスクリプト

* ラベル表示
* 半角変換
* パスワードチェッカー
* リアルタイム・アラート
* パスワードマスク解除
* クレジットカードブランド表示
* 離脱ブロック
* GPSを利用したEFO

## 前提とする環境

* node.js (確認済バージョン：0.12.4)
* npm (確認済バージョン：2.11.2)

## 初期設定

* プロジェクトのルートディレクトリにて、コマンドラインから下記を実行してください。

```
npm -g install grunt-cli bower
npm install
bower install
```

## サイト立ち上げ・表示

* プロジェクトのルートディレクトリにて、コマンドラインから下記を実行してください。

```
grunt serve
```

[デモ一覧](http://localhost:9000/demo/)より、各EFOスクリプトのデモが確認できます。

## ライセンス

サンプルコードはMITライセンスで配布しています。
http://opensource.org/licenses/mit-license.php
