%lex
%%

\s+	 	 	/*skip whitespace*/
[0-9]+   	return 'NUMBER'
[a-z]+   	return 'VAR'
"+"			return '+'
"-"			return '-'
"*"			return '*'
"/"			return '/'
"!"			return '!'
";"			return 'SEMICOLON'
"="			return 'ASSIGNMENT_OPERATOR'
"^"			return 'EXPONENT'	
<<EOF>>  	return 'EOF'

/lex

%{
	var Node = require(process.cwd() + "/lib/tree_utils.js").Node;
	var LeafNode = require(process.cwd() + "/lib/tree_utils.js").LeafNode;
%}

%left 'SEMICOLON'
%left 'ASSIGNMENT_OPERATOR'
%left '-'
%left '+'
%left '*'
%left '/'
%left 'EXPONENT'
%right '!'
%right '%'


%start statement
%%

statement 
	: 
	expressions EOF { return $$ };

expressions 
	: expressions expression SEMICOLON {$1.push($2);}
	| expressions assignment_expression SEMICOLON {$1.push($2);;}
	| expressions expression {$1.push($2);;}
	| {$$ = []};

expression 
	: expression '+' expression 
		{ $$ = new Node($2,[$1,$3]); }
	| expression '-' expression 
		{ $$ = new Node($2,[$1,$3]); }
	| expression '*' expression 
		{ $$ = new Node($2,[$1,$3]); }
	| expression '/' expression 
		{ $$ = new Node($2,[$1,$3]); }
	| expression EXPONENT expression 
		{ $$ = new Node($2,[$1,$3]); }
	| expression '!' 
		{ $$ = new Node($2,[$1]); }
	| expression '%' 
		{ $$ = new Node($2,[$1]); }
	| NUMBER { $$ = new LeafNode($1,'Number') } 
	| value;

assignment_expression
	: VAR ASSIGNMENT_OPERATOR expression { $$ =  new Node($2,[$1,$3]) };

value
	: VAR { $$ = new LeafNode($1,'Identifier') };