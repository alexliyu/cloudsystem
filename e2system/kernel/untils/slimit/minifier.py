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

import sys
import optparse
import textwrap

from slimit.parser import Parser
from slimit.visitors.minvisitor import ECMAMinifier

def minify(text):
    parser = Parser()
    tree = parser.parse(text)
    minified = ECMAMinifier().visit(tree)
    return minified

def main():
    usage = textwrap.dedent("""\
    %prog [input file]

    If no input file is provided STDIN is used by default.
    Minified JavaScript code is printed to STDOUT.
    """)
    parser = optparse.OptionParser(usage=usage)
    options, args = parser.parse_args()

    if len(args) == 1:
        text = open(args[1]).read()
    else:
        text = sys.stdin.read()

    minified = minify(text)
    sys.stdout.write(minified)
