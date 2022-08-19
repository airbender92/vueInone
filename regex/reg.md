(?:pattern)
()表示捕获分组，()会把每个分组里的匹配的值保存起来，从左向右，以分组的左括号为标志，第一个出现的分组的组号为1，第二个为2，以此类推

(?:)表示非捕获分组，和捕获分组唯一的区别在于，非捕获分组匹配的值不会保存起来

(?:pattern)在使用 "或" 字符 (|) 来组合一个模式的各个部分是很有用。例如，'industr(?:y|ies)' 就是一个比 'industry|industries' 更简略的表达式。因为我们单独存储下 “y” 或者 “ies” 没有什么意义

(?=pattern)
正向肯定预查（look ahead positive assert），匹配pattern前面的位置。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。

简单说，以 xxx(?=pattern)为例，就是捕获以pattern结尾的内容

例如，"Windows(?=95|98|NT|2000)"能匹配"Windows2000"中的"Windows"，但不能匹配"Windows3.1"中的"Windows"。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。

(?!pattern)
正向否定预查(negative assert)，在任何不匹配pattern的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。

简单说，以 xxx(?!pattern)为例，就是捕获不以pattern结尾的内容

例如"Windows(?!95|98|NT|2000)"能匹配"Windows3.1"中的"Windows"，但不能匹配"Windows2000"中的"Windows"。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。

(?<=pattern)
反向(look behind)肯定预查，与正向肯定预查类似，只是方向相反。

简单说，以(?<=pattern)xxx为例，就是捕获以pattern开头的内容xxx。

例如，"(?<=95|98|NT|2000)Windows"能匹配"2000Windows"中的"Windows"，但不能匹配"3.1Windows"中的"Windows"。