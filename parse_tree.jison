/* express any given mathematical expression with appropriate parenthesis. */

%lex
%%

\s+	 	 	/*skip*/
[0-9]+   	return 'NUMBER'
"+"			return '+'
"-"			return '-'
"*"			return '*'
"/"			return '/'
<<EOF>>  	return 'EOF'

/lex

%{
	var Node = require("/Users/simranpal/workspace/Jison_Assignments/tree_utils.js").Node;	
	var LeafNode = require("/Users/simranpal/workspace/Jison_Assignments/tree_utils.js").LeafNode;	
%}

%left '-'
%left '+'
%left '*'
%left '/'

%start expressions
%%

expressions : e EOF { return $$ };

e :   e '+' e  { $$ = new Node($2,[$1,$3]) } |
	  e '-' e  { $$ = new Node($2,[$1,$3]) } | 
	  e '*' e  { $$ = new Node($2,[$1,$3]) } | 
	  e '/' e  { $$ = new Node($2,[$1,$3]) } | 
	 NUMBER { $$ =  new LeafNode($1)};