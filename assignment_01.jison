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

%left '-'
%left '+'
%left '*'
%left '/'

%start expressions
%%

expressions : e EOF { console.log("Result: ", $$); return $$; };

e :   e '+' e  { $$ = [ $1 , $2 , $3 ] } |
	  e '-' e  { $$ = [ $1 , $2 , $3 ] } | 
	  e '*' e  { $$ = [ $1 , $2 , $3 ] } | 
	  e '/' e  { $$ = [ $1 , $2 , $3 ] } | 
	 NUMBER;