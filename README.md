# StudyRecord
## 学びを記録して、成長を見える化しよう

＜ログイン／新規登録ページ＞<br>
ログインしていない状態ではログイン画面に遷移します<br>
<img src="https://github.com/user-attachments/assets/d7cb989e-8a06-424a-9883-5e0321ab9b4c" width=60%><br><br>

＜トップページ＞<br>
記録、今までの一覧、学習記録のまとめ、マイページへのボタン
<img src="https://github.com/user-attachments/assets/8c410e5f-4fdd-4cc7-813b-c6699a6b20d3" width=60%><br><br>

＜Recordページ＞<br>
ボタンを押して学習記録を開始できる
学習中、休憩中などに応じて押せるボタンが切り替わる
<img src="https://github.com/user-attachments/assets/16e7e2ca-aad5-4b33-8914-be594c5e09b8" width=60%><br><br>

＜Historyページ＞<br>
今までの学習記録を日付順で一覧表示
編集・削除が可能
<img src="https://github.com/user-attachments/assets/1c88d5a5-5684-42f2-bd00-356c1997e3ff" width=60%><br><br>

＜MyProgressページ＞<br>
学習記録のまとめを週ごと、カテゴリーごとなどに分けて表示
<img src="https://github.com/user-attachments/assets/affa3817-bbee-4c0f-bb7e-6531a1b06a91" width=60%><br><br>

＜マイページ＞<br>
ユーザー情報の編集が可能<br>
CSVファイルからインポートが可能<br>

CSVファイル例：<br>
category_id,content,start_time,finish_time<br>
1,React学習,2025-05-01 10:00,2025-05-01 11:30<br>
2,Laravel復習,2025-05-01 13:00,2025-05-01 14:15<br>

<img src="https://github.com/user-attachments/assets/d3bf87ce-f690-49dd-8409-714379238073" width=60%><br><br>



## URL

- 本番環境：
- 開発環境：http://localhost:3000
  <br><br>

## 関連レポジトリ
https://github.com/miyo-naka/StudyRecord
<br><br>

## 機能一覧

- ログイン・ユーザー登録
- 記録作成
- 記録一覧表示
- 記録編集
- 記録削除
- まとめ表示
- ユーザー情報編集
  <br><br>

## 使用技術(実行環境)
- PHP 8.1
- Laravel 10.10
- mySQL 8.0
- next.js 15.2.4
- react 19.0.0
- tailwindcss 4.1.3
  <br><br>

## Getting Started

- サンプルユーザー<br>
  　Email: test1@email.com <br>
  　Password: test1_pass <br><br>
   
- 開発環境はローカル、本番環境はxxxを使用しています。<br>

### (1)開発環境のセットアップ

#### 前提条件

- Docker Compose

#### 手順

1. リポジトリをクローン
   ```bash
    git clone リポジトリのURL プロジェクト名
    cd プロジェクト名
    ```
2. Docker コンテナをビルドして起動
   ```sh
   docker-compose -f docker-compose.yml up --build -d
   ```
3. .env ファイルを作成し、必要な環境変数を設定

4. アプリケーションキーの作成
   ```php
   php artisan key:generate
   ```
5. マイグレーションの実行
   ```php
   php artisan migrate
   ```
6. Seederデータの挿入
   ```php
   php artisan db:seed
   ```
