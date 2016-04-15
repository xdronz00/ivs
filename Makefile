# Copyright 2016 Jakub Fajkus, Miki Dronzeková, David Czernin, Đỗ Long Thành
#
# This file is part of Kalkulacka.
#
# Kalkulacka is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Kalkulacka is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Kalkulacka.  If not, see <http://www.gnu.org/licenses/>.


SRC = $(wildcard src/js/*.js)
WWW = $(SRC:src/js/%.js=www/js/%.js)


www/js: $(WWW)
www/js/%.js: src/js/%.js .babelrc
	mkdir -p $(@D)
	node_modules/babel-cli/bin/babel.js $< -o $@

doc:
	doxygen

test:
#supress echoing the lines to the terminal
#supress command not found error
	@echo "If the browsed will not start open the test/index.html in browser manually"
	@xdg-open tests/tests.html | true
	@open tests/tests.html | true

