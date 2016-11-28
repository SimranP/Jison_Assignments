%lex
%%

\s+	 	 	/*skip whitespace*/
[0-9]+   	return 'NUMBER'
"+"			return '+'
"-"			return '-'
"*"			return '*'
"/"			return '/'
"!"			return '!'
"("			return '('
")"			return ')'
";"			return 'SEMICOLON'
"^"			return 'EXPONENT'	
"%"			return '%'	
"=="		return '=='	
"<="		return '<='	
">="		return '>='	
"<"			return '<'	
">"			return '>'	
"if"        return 'if'
"{"         return '{'
"}"         return '}'
"true"      return 'true'
"false"     return 'false'
"="			return 'ASSIGNMENT_OPERATOR'
[a-z]+   	return 'VAR'
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
%left '<'
%left '>'
%left '=='
%left '<='
%left '>='
%left '/'
%left 'EXPONENT'
%right '!'
%left '%'


%start statement
%%

statement 
	: 
	expressions EOF { return $$ };

expressions 
	: expressions expression {$1.addNode($2);}
	| expressions assignment_expression SEMICOLON {$1.addNode($2);}
	| expressions dcm_block { $1.addTree($2);}
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
	| expression '%' expression 
		{ $$ = new Node($2,[$1,$3],"Arithmetic Expression"); }
	| expression EXPONENT expression 
		{ $$ = new Node($2,[$1,$3],"Arithmetic Expression"); }
	| expression '!' 
		{ $$ = new Node($2,[$1],"Arithmetic Expression"); }
	| '(' expression ')' { $$ = $2 }
	| expression SEMICOLON
	| NUMBER { $$ = new LeafNode($1,'Number') } 
	| value;

assignment_expression
	: value ASSIGNMENT_OPERATOR expression { $$ =  new Node($2,[$1,$3],"Assignment Expression") };

value
	: VAR { $$ = new LeafNode($1,'Identifier') };

dcm_block
	: 'if' logical_expression '{' expressions '}'  SEMICOLON
		{	
			$$ = new Tree();
			$4.parent = $$;
			$$.addNode(new Node($1,[$2,$4],"Decision-Making"));
		};

logical_expression
	: 'true'	{ $$ = new LeafNode($1,'Boolean') }
	| 'false'	{ $$ = new LeafNode($1,'Boolean') }
	| logical_expression '==' logical_expression { $$ = new Node($2,[$1,$3],"Logical Expression"); }
	| logical_expression '<=' logical_expression { $$ = new Node($2,[$1,$3],"Logical Expression"); }
	| logical_expression '>=' logical_expression { $$ = new Node($2,[$1,$3],"Logical Expression"); }
	| logical_expression '<' logical_expression { $$ = new Node($2,[$1,$3],"Logical Expression"); }
	| logical_expression '>' logical_expression { $$ = new Node($2,[$1,$3],"Logical Expression"); }
	|expression
	; 
