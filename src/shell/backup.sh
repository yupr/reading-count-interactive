#!/bin/bash

read -r -n 1 -p "バックアップを作成します。よろしいですか？ (y/n):" ANSWER
printf '%s\n' ''

if [[ $ANSWER = [yY] ]]; then
  cp -r "Archive" "Output" "$HOME/Documents/backup/reading-count/"
  printf '%s\n' 'バックアップが完了しました。'
else
  printf '%s\n' 'do nothing'
fi
