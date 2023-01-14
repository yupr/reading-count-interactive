#!/bin/bash

SECTION='-----------------------------------------------------'

printf '%s\n' "$SECTION"
printf '%s\n' 'total.csvに書き出したい、outputディレクトリにあるファイル名の「年月」を入力してください。'
printf '%s\n' '例: output/2211.csv なら 2211 を入力。'
printf '%s\n' "$SECTION"

read -r DATE
yarn ts-node src/writeTotalCount.ts "$DATE"
