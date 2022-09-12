import express from 'express';
import permutations from 'permutation';
import * as wordList from 'an-array-of-english-words' assert { type: 'json' };

const app = express(),
    port = process.env.PORT || 3000;

app.get('/:word',
    (req, res) => {
        let wordStatus = 'status'
        if (req.params.word !== 'favicon.ico') {
            let word = req.params.word;
            
            //this creates an array with permutations ['cat', 'atc', 'tca']
            let aWord = permutations(word);
            let foundStatus = false;
            let currentMatch = [];
            //  console.log(wordList.default);
            for (let i of aWord) {
                // console.log(i); 
                if (wordList.default.includes(i) == true) {
                    wordStatus = `One or more matches found`;
                    currentMatch.push(i);
                    foundStatus = true;
                }
            }
            if (foundStatus == false) {
                wordStatus = `${word} is not a word in our dictionary!`;
                console.log(`${word} is not a word in our dictionary!`);
            }

            let xx = currentMatch.toString();
            res.send(`Word/s that match: ${xx}`);
            res.end();
        }


    })

    app.get('/',  (req,res) => {
        res.send('enter a jumbled word in the url to unscramble!')
    })
app.listen(port);

console.log('server started at port ' + port);