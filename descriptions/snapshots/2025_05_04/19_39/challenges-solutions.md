# The Conflict:

Initial Command (mocha --loader ...): When you ran Mocha directly (without yarn in front) but with the --loader flag, Node.js tried to use the PnP loader. However, it was likely missing the full PnP environment setup that yarn normally provides. This could lead to subtle resolution failures, explaining why it didn't find any tests initially.
Second Command (yarn mocha --loader ...): When you ran Mocha through Yarn (yarn mocha) and also explicitly added the --loader flag, you created a conflict. Yarn was already setting up the PnP environment (including its loader mechanism), and then you were telling Node.js again via the flag to load the same PnP loader. This double-loading or conflicting setup likely caused the internal Node.js error (ERR_METHOD_NOT_IMPLEMENTED) you saw.


# The Solution 

(yarn mocha ...): By simply running yarn mocha without the explicit --loader flag, you allow Yarn to do its job correctly. Yarn sets up the PnP environment seamlessly in the background, and Mocha runs within that environment, resolving all its dependencies (and your test file imports) as expected via PnP.