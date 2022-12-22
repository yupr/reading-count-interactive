#!/bin/bash

SECTION='-----------------------------------------------------'

printf '%s\n' "$SECTION"
printf '%s\n' '作成したい日付を例に倣って入力してください。'
printf '%s\n' '例: 2022年7月分 を作成したい場合、2207 を入力。'
printf '%s\n' "$SECTION"

read -r DATE
node src/createInitialMonth.js "$DATE"
