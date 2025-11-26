![Header Image](./assets/header-image.png)

<div align="center" style="display: flex; justify-content: center; gap: 8px;">
  <a href="https://chromewebstore.google.com/detail/easy-link-collector/dlpjoiieabfmpdpbcfmpooafcepokmmj" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Chrome%20Web%20Store-Available-4285F4?logo=chromewebstore" alt="Chrome Web Store Badge" />
    <img src="https://img.shields.io/chrome-web-store/users/dlpjoiieabfmpdpbcfmpooafcepokmmj.svg" alt="Chrome Web Store Users" />
    <img src="https://img.shields.io/chrome-web-store/rating/dlpjoiieabfmpdpbcfmpooafcepokmmj.svg" alt="Chrome Web Store Rating" />
    <img src="https://img.shields.io/chrome-web-store/rating-count/dlpjoiieabfmpdpbcfmpooafcepokmmj.svg" alt="Chrome Web Store Rating Count" />
  </a>
</div>

---

<div align="center">
  <a href="./README.md">English</a> | 日本語
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

### Chrome ウェブストアからインストール

[Chrome ウェブストアページ](https://chromewebstore.google.com/detail/easy-link-collector/dlpjoiieabfmpdpbcfmpooafcepokmmj)からインストールします。

### 手動インストール

**Chrome, Edge, BraveなどのChromiumベースのブラウザ向け:**

1. **ダウンロード**: [最新リリース](https://github.com/peinan/easy-link-collector-extension/releases)から`easy-link-collector-extension.zip`ファイルをダウンロードし、解凍します。
2. **拡張機能ページを開く**: `chrome://extensions`（または`edge://extensions`, `brave://extensions`）にアクセスします。
3. **デベロッパーモードを有効化**: 右上隅にある「デベロッパーモード」のトグルをオンにします。
4. **拡張機能を読み込む**: 「パッケージ化されていない拡張機能を読み込む」をクリックし、解凍した`easy-link-collector-extension`フォルダを選択します。

ブラウザのツールバーにEasy Link Collectorのアイコンが表示されます。

> [!WARNING]
> Arcブラウザはサイドパネル機能が競合するため、この拡張機能は正常に動作しません。Chromeの使用をおすすめします。

## 開発・コントリビューション

開発環境のセットアップ、アーキテクチャの詳細、デバッグ方法やコントリビューション手順については、[DEVELOPMENT.md](./DEVELOPMENT.md) を参照してください。

## プライバシーポリシー

データの収集、使用、保護に関する情報については、[プライバシーポリシー](./PRIVACY_POLICY.md)をご覧ください。

## ライセンス

このプロジェクトは [MIT ライセンス](./LICENSE)の下で公開されています。
