var fs = require("fs");
var jison = require("jison");

var bnf = fs.readFileSync("parse_tree.jison", "utf8");
var parser = new jison.Parser(bnf);

function representation(array, result){
        result.push('[');
        array.forEach(function(item){
            if(item instanceof Array)
                result = representation(item, result)
            else 
                result.push(item);
        })
        result.push(']');
        return result;
}

var tree = parser.parse(process.argv[2]);
console.log(representation(tree,[]));
module.exports = representation;