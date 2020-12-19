## Next.js に Material-UI を組み込んでデザインを整える

### 1. Material-UI を使うための事前準備をする

- 必要なパッケージのインストール
- 事前準備用ファイルの設定

  - `_app.tsx`
  - `_document.tsx`
  - `Theme.ts`を作成する

- `_app.tsx` :
  - https://nextjs.org/docs/advanced-features/custom-app
- `_document.tsx` :
  - https://nextjs.org/docs/advanced-features/custom-document

---

### 2. 画面上部にナビゲーションバーとメニューをセットするその 1(モバイルサイズ用の対応)

モバイルサイズのときは、ナビゲーションバーのメニューボタンを押すと左からメニューが出てくるようにする

https://material-ui.com/components/drawers/

### 3. 画面上部にナビゲーションバーとメニューをセットするその 2(タブレット・PC サイズ用の対応)

タブレットやパソコンサイズのときは、メニューボタンを非表示にしてナビゲーションバー内にメニューをセットする

### 4. Post 一覧ページのデザインを整える

- １件１件の Post データをカード UI で表現
- カード UI を Grid 形式で一覧表示させる
- 画面サイズに応じて 1 列に表示するカードの数を変更する(レスポンシブ対応)
  - モバイルサイズのとき → １行１列
  - タブレットサイズのとき → １行２列
  - PC サイズ(小さめ)のとき → １行３列
  - PC サイズ(大きめ)のとき → １行４列
