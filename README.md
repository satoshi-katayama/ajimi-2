# ajimi #2 WebVR
[A-Frame](https://aframe.io/)でWebVR入門

## 1. 環境構築(事前準備)
**このプロジェクトを自分のリポジトリにフォークする**<br>
<br>
インストールするもの
- npm
- http-server

```sh
# プロジェクトのファイルをDL
git clone ・・・/ajimi-2.git
cd ajimi-2

# http-serverのインストール
npm install

# サーバーの起動
npm start
```

ブラウザで下記URLにアクセス<br>
[http://127.0.0.1:8080](http://127.0.0.1:8080)<br>
<br>
「Hello A-Frame」と書かれたページが表示されればOK

## 2. A-Frameを動かす

index.htmlの中身を以下に置き換えてブラウザで表示
```html
<html>
  <head>
    <script src="./index.js"></script>
    <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
      <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
      <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene>
  </body>
</html>
```

GithubPagesで公開してみる<br>

## 3. 360度画像を背景に設定してみる

画像を探して<br>
[flickr](https://www.flickr.com/search/?text=Equirectangular&license=2%2C3%2C4%2C5%2C6%2C9)<br>
<br>
``assets``フォルダに配置<br>
<br>
著作権情報を追記
```html
  ・・・
    </a-scene>
    <footer style="position: absolute; bottom: 0; left: 0;">
      <p style="margin: 0;">
        photo by <a href="画像URL" target="_blank">著作者名</a>
      </p>
    </footer>
  </body>
</html>
```

``a-sky``タグを変更して
```html
<a-sky src="./assets/img360.jpg" rotation="0 -90 0"></a-sky>
```

ブラウザで確認<br>
<br>
背景画像の読み込みタイミングを変更。``a-assets``の追加。
```html
    <a-scene>
      <a-assets>
        <img id="img360" src="./assets/img360.jpg">
      </a-assets>
      ・・・
      <a-sky src="#img360" rotation="0 -90 0"></a-sky>
      ・・・
```

ブラウザで確認<br>

## 4. オブジェクトを動かす

動かしたいオブジェクトを``a-entity``タグで囲い、``a-animation``タグを``a-entity``タグ内に追加する。
```html
<a-entity position="0 0 0">
  <a-animation attribute="position" direction="alternate" dur="1000" to="0 5 0" repeat="indefinite"></a-animation>
  ・・・
</a-entity>
```

## 5. 3Dモデルを追加してみる

3Dモデル(dae形式)を探して、``assets``フォルダに配置<br>
サンプルでは下記を使用<br>
https://free3d.com/3d-model/lego-man-35246.html

```html
<a-assets>
  ・・・
  <a-asset-item id="legoman" src="./assets/legoman.dae"></a-asset-item>
</a-assets>
<a-collada-model src="#legoman" rotation="0 -90 0" position="10 0 -10" scale="1 1 1"></a-collada-model>
```

## 6. イベントを設定してみる

``a-camera``タグを追加
```html
</a-assets>
<a-camera position="0 0 20">
  <a-entity id="myCursor" cursor="fuse:true; maxDistance:30; timeout:500;" scale="0.2 0.2 0.2" position="0 0 -5" geometry="primitive: ring" material="color: red; shader: flat; opacity:0.5" />
</a-camera>
<a-collada-model ・・・
```

先ほどの``a-collada-model``にクラス属性を追加する。
```html
class="add"
```

``index.js``に以下の内容を貼り付け。
```js
window.onload = function () {
  document.querySelector('.add').addEventListener('click', clickHandler, false);
};

function clickHandler(e) {
  var img = document.createElement('a-collada-model');
  img.setAttribute('position', getRand() + ' 0  -10');
  img.setAttribute('src', '#legoman');
  img.setAttribute('rotation', '0 -90 0');
  img.setAttribute('scale', '1 1 1');
  img.addEventListener('click', clickHandler, false);

  var scene = document.querySelector('a-scene');
  scene.appendChild(img);
}

function getRand() {
  var max = 20;
  var min = -20;
  return ( Math.random() * ( ( max + 1 ) - min ) ) + min;
}
```

ブラウザで確認

## 振り返り
- A-FrameでのWebVR
- Github Pagesでの公開
- http-serverで簡単ローカルサーバー立ち上げ
