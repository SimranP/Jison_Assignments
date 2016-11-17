/* express any given mathematical expression with appropriate parenthesis. */

%lex
%%

\s+	 	 	/*skip*/

[0-9]+   	return 'NUMBER'
"+"			return '+'
<<EOF>>  	return 'EOF'

/lex

%left '+'

%start expressions
%%

expressions : e EOF { console.log("Result: ", $$) };

e :   e '+' e  { $$ = "(" + $1 + $2 + $3 + ")" } 
	| NUMBER;