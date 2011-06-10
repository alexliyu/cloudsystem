###############################################################################
#
# Copyright (c) 2011 Ruslan Spivak
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#
###############################################################################

__author__ = 'Ruslan Spivak <ruslan.spivak@gmail.com>'

import textwrap
import unittest

from slimit import ast
from slimit.parser import Parser
from slimit.visitors import nodevisitor


class ParserTestCase(unittest.TestCase):

    def test_line_terminator_at_the_end_of_file(self):
        parser = Parser()
        parser.parse('var $_ = function(x){}(window);\n')

    # XXX: function expression ?
    def _test_function_expression(self):
        text = """
        if (true) {
          function() {
            foo;
            location = 'http://anywhere.com';
          }
        }
        """
        parser = Parser()
        parser.parse(text)

    def test_modify_tree(self):
        text = """
        for (var i = 0; i < 10; i++) {
          var x = 5 + i;
        }
        """
        parser = Parser()
        tree = parser.parse(text)
        for node in nodevisitor.visit(tree):
            if isinstance(node, ast.Identifier) and node.value == 'i':
                node.value = 'hello'
        self.assertMultiLineEqual(
            tree.to_ecma(),
            textwrap.dedent("""
            for (var hello = 0; hello < 10; hello++) {
              var x = 5 + hello;
            }
            """).strip()
            )


class ASITestCase(unittest.TestCase):
    TEST_CASES = [
        ("""
        switch (day) {
          case 1:
            result = 'Mon';
            break
          case 2:
            break
        }
        """,
         """
         switch (day) {
           case 1:
             result = 'Mon';
             break;
           case 2:
             break;
         }
         """),

        ("""
        while (true)
          continue
        a = 1;
        """,
         """
         while (true) continue;
         a = 1;
         """),

        ("""
        return
        a;
        """,
        """
         return;
         a;
        """),
        # test 3
        ("""
        x = 5
        """,
         """
         x = 5;
         """),

        ("""
        var a, b
        var x
        """,
         """
         var a, b;
         var x;
         """),

        ("""
        var a, b
        var x
        """,
         """
         var a, b;
         var x;
         """),

        # test 6
        ("""
        return
        a + b
        """,
         """
         return;
         a + b;
         """),

        ('while (true) ;', 'while (true) ;'),

        ("""
        if (x) {
          y()
        }
        """,
         """
         if (x) {
           y();
         }
         """),

        # test 9
        ("""
        for ( ; i < length; i++) {
        }
        """,
         """
         for ( ; i < length; i++) {

         }
         """),

        ]

    def test_throw_statement(self):
        # expression is not optional in throw statement
        input = textwrap.dedent("""
        throw
          'exc';
        """)
        parser = Parser()
        # ASI at lexer level should insert ';' after throw
        self.assertRaises(SyntaxError, parser.parse, input)


def make_test_function(input, expected):

    def test_func(self):
        parser = Parser()
        result = parser.parse(input).to_ecma()
        self.assertMultiLineEqual(result, expected)

    return test_func

for index, (input, expected) in enumerate(ASITestCase.TEST_CASES):
    input = textwrap.dedent(input).strip()
    expected = textwrap.dedent(expected).strip()
    func = make_test_function(input, expected)
    setattr(ASITestCase, 'test_case_%d' % index, func)


