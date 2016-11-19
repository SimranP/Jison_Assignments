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
%}

%left '-'
%left '+'
%left '*'
%left '/'

%start expressions
%%

expressions : e EOF { console.log("Result: ", representation($$,[])); return $$; };

e :   e '+' e  { $$ = [$1, $2, $3] } |
	  e '-' e  { $$ = [$1, $2, $3] } | 
	  e '*' e  { $$ = [$1, $2, $3] } | 
	  e '/' e  { $$ = [$1, $2, $3] } | 
	 NUMBER;