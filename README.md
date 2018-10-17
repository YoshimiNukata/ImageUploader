# 要件
**Kiberaの記事編集機能を作る**
- [ ] マークダウンできるようにする。
- [ ] GUIにドラック&ドロップまたは、コピーアンドペーストで画像をアップロードする
- [ ] 画像、記事など非同期で保存して、非同期でプレビューする。


# To do
- [x] viewのみため実装
- [x] モデルの作成
- [x] carrierwaveセットアップ
- [ ] ドラックアンドドロップで画像をサーバーに送付する機能
- [ ] サーバーサイドで画像を保存する機能
- [ ] 画像アップロード後に編集画面に画像URLとかを表示させる
- [ ] キーの最後で編集画面のテキストを送付する。
- [ ] Markdownをhtmlに変換して保存する
- [ ] 保存したhtmlテキストをクラアントに返す。
- [ ] クライアント側で表示する。


# 仕様
### モデル

**article table**
mount_uploader :image,ImageUploader

- id
- name
- text
- image
```rails g migration add_image_to_users avatar:string```

**ImageUploader**
```rails generate uploader ImageUploader```



###  ビュー
**edit**
画像をアップロードする。ここで非同期アップロード&プレビュー


# 考え中

*画像UP*
1. 編集画面に画像をドラックアンドドロップ　
2. 画像を非同期でアップロード　　　
3. アップロードに成功したら保存したパス、サイズ、名前を返す。
4. 帰ってきた情報から、画像のパスなどを記載した文字列を編集画面に生成
```<img title='磯部★.jpg' src='/attachments/26b049fe-e57b-4772-9325-0c1568e5e30c' width="5184" data-meta='{"width":5184,"height":3456}'>```


*プレビューの反映*

1.まずはonchange検知でやる。（フォーカス外さないといけないのげネック。） --> やっぱり最後文字検知できそう
**編集画面変更検知**
https://qiita.com/maruyam-a/items/cf0168f91d934b449a07
2.検知したらajaxでtextareaのコンテンツ全て送付。
3.サーバーサイドでHTMLタグに変換
4.変換済みのHTMLを返して表示



# reference
partial だけレンダリングする
https://qiita.com/fezrestia/items/e669107a4a6e66618738
https://qiita.com/somewhatgood@github/items/113773747a6faa800366

Markdownする
https://qiita.com/michiharujp/items/2916d71af273a8b0007f

画像UP
https://github.com/carrierwaveuploader/carrierwave
https://blog.otsukasatoshi.com/entry/2016/05/04/185133

入力の最後に発火させる
https://byuzensen.com/javascript-key-monitoring

ドラックアンドドロップ
http://www.it-view.net/drag-and-drop-file-upload-jquery-178.html

partial 更新
https://qiita.com/fezrestia/items/e669107a4a6e66618738

# ImageUploader
