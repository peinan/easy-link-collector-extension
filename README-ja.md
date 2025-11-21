![Header Image](./assets/header-image.png)

---

<div align="center">
  <a href="./README.md">English</a> | <a href="./README-ja.md">日本語</a>
</div>

<br/>

リンクを1つずつ手動でコピーするのに疲れていませんか？Easy Link Collectorは、Webページに表示されている要素をクリックするだけでリンクを簡単に収集できるブラウザ拡張機能です。選択されたリンクはサイドパネルに追加され、その場で編集してクリップボードコピー、CSV/JSON形式でエクスポートできます。

![Easy Link Collector Screenshot](./assets/demo.gif)

## 使い方

1. **サイドパネルを開く**: ブラウザのツールバーにあるEasy Link Collectorアイコンをクリック。
2. **収集を開始**: トグルスイッチをクリックするか、<kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>U</kbd> / <kbd>Cmd</kbd><kbd>Shift</kbd><kbd>U</kbd>を押して要素選択モードを有効にします。リンクにホバーするとハイライト表示され、クリックすると対象リンクがサイドパネルに追加されます。
3. **編集とエクスポート**: サイドパネル内でURLを直接編集し、`×`ボタンで個別削除、ゴミ箱アイコンで全削除が可能です。エクスポート形式（クリップボード、CSV、JSON）を選択して「Export」をクリックします。
4. **選択モードを終了**: 再度トグルスイッチをクリックするか、ショートカットキーを使用して通常のブラウジングに戻ります。

> [!WARNING]
> サイドパネルを閉じると収集したリンクは破棄されてしまいますのでご注意ください。

## インストール方法

> [!NOTE]
> 2025/11/21時点で、この拡張機能はまだChromeウェブストアで公開されていないため、デベロッパーモードを使用して手動でインストールする必要があります。公開され次第インストール方法を更新します。

**Chrome, Edge, BraveなどのChromiumベースのブラウザ向け:**

1. **ダウンロード**: [最新リリース](https://github.com/peinan/easy-link-collector-extension/releases)から`easy-link-collector-extension.zip`ファイルをダウンロードし、解凍します。
2. **拡張機能ページを開く**: `chrome://extensions`（または`edge://extensions`, `brave://extensions`）にアクセスします。
3. **デベロッパーモードを有効化**: 右上隅にある「デベロッパーモード」のトグルをオンにします。
4. **拡張機能を読み込む**: 「パッケージ化されていない拡張機能を読み込む」をクリックし、解凍した`easy-link-collector-extension`フォルダを選択します。

ブラウザのツールバーにEasy Link Collectorのアイコンが表示されます。

> [!WARNING]
> Arcブラウザはサイドパネル機能が競合するため、この拡張機能は正常に動作しません。Chromeの使用をおすすめします。

## 開発・コントリビューション

開発環境のセットアップ、アーキテクチャの詳細、デバッグ方法やコントリビューション手順については、[DEVELOPMENT.md](./DEVELOPMENT.md)を参照してください。

## ライセンス

このプロジェクトは[MITライセンス](./LICENSE)の下で公開されています。
