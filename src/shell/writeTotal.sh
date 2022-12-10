#!/bin/bash

printf "--------------------------------------------------\n"
printf "total.csvに書き出したい、outputディレクトリにあるファイル名の「年月」を入力してください。\n"
printf "例: output/2211.csv なら 2211 を入力。\n"
printf "--------------------------------------------------\n"

read -r DATE
node src/writeTotalCount.js "${DATE}"
