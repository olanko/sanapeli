const fs = require ('fs');

let words = {};
fs
    .readFileSync('finnish-utf8.dict')
    .toString()
    .toLowerCase()
    .split(/\r?\n/)
    .forEach(function(word){
        words[word] = true;
});

searchFor = process.argv[2];
if (searchFor) {
    let result = new Set([]);
    let letterCombinations = combinations(searchFor);

    letterCombinations.map((letters) => {
        let searchForWords = Array.from(permute(letters.split('')));

        searchForWords.map((word) => {
            let w = word.join('');
            if (words[w] === true) {
                result.add(w);
            }
        });
    });

    result.forEach((word) => console.log(word));
}

/* https://stackoverflow.com/questions/39927452/recursively-print-all-permutations-of-a-string-javascript */
function *permute(a, n = a.length) {
  if (n <= 1) yield a.slice();
  else for (let i = 0; i < n; i++) {
    yield *permute(a, n - 1);
    const j = n % 2 ? 0 : i;
    [a[n-1], a[j]] = [a[j], a[n-1]];
  }
}

/* https://stackoverflow.com/questions/12048621/get-all-combinations-for-a-string */
function combinations (string) {
    var result = [];

    var loop = function (start,depth,prefix) {
        for(var i=start; i<string.length; i++)
        {
            var next = prefix+string[i];
            if (depth > 0)
                loop(i+1,depth-1,next);
            else
                result.push(next);
        }
    }

    for(var i=0; i<string.length; i++) {
        loop(0,i,'');
    }

    return result;
}
