%lex
%%

\s+	 	 	/*skip whitespace*/
[0-9]+   	return 'NUMBER'
[a-z]+   	return 'VAR'
"+"			return '+'
"-"			return '-'
"*"			return '*'
"/"			return '/'
";"			return 'SEMICOLON'
"="			return 'ASSIGNMENT_OPERATOR'
<<EOF>>  	return 'EOF'

/lex

%{
	var Node = require(process.cwd() + "/tree_utils.js").Node;
	var LeafNode = require(process.cwd() + "/tree_utils.js").LeafNode;
%}

%left 'SEMICOLON'
%left 'ASSIGNMENT_OPERATOR'
%left '-'
%left '+'
%left '*'
%left '/'

%start statement
%%

statement 
	: 
	expressions EOF { console.log($1); return $$ };

expressions 
	: expressions expression SEMICOLON {$1.push($2);}
	| expressions assignment_expression SEMICOLON {$1.push($2);;}
	| expressions expression {$1.push($2);;}
	| {$$ = []};


operator: 
	'-' | 
	'+' |
	'*' |
	'/';

expression 
	: expression operator expression 
		{ $$ = new Node($2,[$1,$3]); }
	| NUMBER { $$ = new LeafNode($1) } 
	| value;

assignment_expression
	: value ASSIGNMENT_OPERATOR expression { $$ =  new Node($2,[$1,$3]) };

value
	: VAR { $$ = new LeafNode($1) };
