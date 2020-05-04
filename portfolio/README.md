# monkeylft.com
To manage workout records

## URL  
https://monkeylft.com  

## アプリの用途  
・ウェイトトレーニングの記録管理  
・アカウントで管理を行うので、過去の記録を時系列で確認できる  
・掲示板で他の人の最近の記録を見られる  

## 構成設計  
・インフラ  
　AWS : EC2　+ RDS + ELB  
・サーバサイド  
　node.js(Express)  
・フロントエンド  
　CSS  

## 機能一覧  
・ログイン機能  
・トレーニング記録投稿機能  
・バリデーション  
・サニタイジング  
・セッション  
・DB接続  
・ページネーション  

## ファイル構成  
bin  
node_modules  
public  
routes  
views  
app.js  
package.json  
package-lock.json  

## 名前の由来  
「LIFT」は重い物を持ち上げるという意味で、筋トレ関係でよく使われるワード。  
「MONKEY」については、初め「GORILLA」を検討したが言葉の並びが悪いと思ったので、こちらを選択。  
ドメイン取得のし易い、「動物」＋「関連ワード」でタイトルを決定。  

## 今後の課題  
・フロントエンドの作り込み  
・記録のグラフ化  
