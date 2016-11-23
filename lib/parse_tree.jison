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
	var Tree = require(process.cwd() + "/lib/tree_utils.js").Tree;
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
	: expressions expression SEMICOLON {$1.addNode($2);}
	| expressions assignment_expression SEMICOLON {$1.addNode($2);}
	| expressions expression {$1.addNode($2);}
	| {$$ = new Tree();};

expression 
	: expression '+' expression 
		{ $$ = new Node($2,[$1,$3],"Arithmetic Expression"); }
	| expression '-' expression 
		{ $$ = new Node($2,[$1,$3],"Arithmetic Expression"); }
	| expression '*' expression 
		{ $$ = new Node($2,[$1,$3],"Arithmetic Expression"); }
	| expression '/' expression 
		{ $$ = new Node($2,[$1,$3],"Arithmetic Expression"); }
	| expression EXPONENT expression 
		{ $$ = new Node($2,[$1,$3],"Arithmetic Expression"); }
	| expression '!' 
		{ $$ = new Node($2,[$1],"Arithmetic Expression"); }
	| expression '%' 
		{ $$ = new Node($2,[$1],"Arithmetic Expression"); }
	| NUMBER { $$ = new LeafNode($1,'Number') } 
	| value;

assignment_expression
	: value ASSIGNMENT_OPERATOR expression { $$ =  new Node($2,[$1,$3],"Assignment Expression") };

value
	: VAR { $$ = new LeafNode($1,'Identifier') };