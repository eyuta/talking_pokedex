index=$1
type=$(cat data/dist/pokemonTypes.json | jq ".[$index]")
type_ja=$(echo $type | jq -r ".name_ja")
type_en=$(echo $type | jq -r ".name_en")

aws polly synthesize-speech \
  --language-code ja-JP \
  --text "$type_ja" \
  --output-format mp3 \
  --voice-id Mizuki \
  --profile mfa \
  public/pron/type/$type_en.mp3

chrome.exe --headless "file:///C:/workspace/talking_pokedex/public/pron/type/$type_en.mp3"  --remote-debugging-port=9222   --disable-gpu &
pid=$!
sleep 1
kill -9 $pid
# kill -9 `ps -aux | grep disable-gpu | grep -v grep | awk '{ print $2 }'`

# Run
# for i in {0..17}; do sh speech_type.sh $i; done
