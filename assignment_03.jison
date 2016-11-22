%lex
%%

\s+	 	 	/*skip*/
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

%right 'SEMICOLON'
%left 'ASSIGNMENT_OPERATOR'
%left '-'
%left '+'
%left '*'
%left '/'

%start statement
%%

statement : expression EOF;

expression 
	: expression '+' expression 
	| NUMBER
	| VAR
	| assignment_expression
	| expression SEMICOLON expression
	| expression SEMICOLON;

assignment_expression
	: VAR ASSIGNMENT_OPERATOR expression;
